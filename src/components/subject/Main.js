"use client";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  Subject,
  Histories,
  Trials,
  VF,
  TV,
  Quadrant,
  Bars,
  Selected,
  Tabs,
  TV_SVC,
  Graphs,
  Trend,
  Graphs_SVC,
  Types,
  ReportFVC,
  ReportSVC,
  Clinician,
} from "./";
import { useLocale } from "@/hooks";
import { Loading } from "@/components";

import {
  getSubject,
  getHistories,
  getResults,
  getTrends,
  getPredictTrends,
} from "@/apis";
import { CONDITIONS, GRADES, ERROR_CODE } from "@/constants";
import { useSubject } from "@/hooks";

import minMax from "dayjs/plugin/minMax";
dayjs.extend(minMax);

const FVC = ({ data }) => {
  const { t } = useTranslation();

  const { locale } = useLocale();

  const [subject] = useSubject();
  const { tab, pre_g = [], post_g = [] } = subject;

  const { trials = [], diagnosis = {} } = data;

  const g = pre_g.concat(post_g);
  const vfs = trials
    .map(({ measurementId, graph: { volumeFlow } }, i) => ({
      id: measurementId,
      data: volumeFlow,
      i,
    }))
    .filter(({ id }) => g.includes(id));
  const tvs = trials
    .map(({ measurementId, graph: { timeVolume } }, i) => ({
      id: measurementId,
      data: timeVolume,
      i,
    }))
    .filter(({ id }) => g.includes(id));

  return (
    <div className="flex-1 space-y-4">
      <Tabs />

      {!tab && (
        <div className="flex flex-col space-y-4">
          <div className="relative card grid grid-cols-2 h-96">
            <VF data={vfs} />
            <TV data={tvs} />
            {!g.length && (
              <div className="absolute rounded-lg w-full h-full bg-black/20 top-0 left-0 flex items-center justify-center">
                <p className="text-white text-3xl">{t("subject.m.i_1")}</p>
              </div>
            )}
          </div>
          <div className="flex space-x-4 h-96">
            <Trials trials={trials} type="pre" />
            <Trials trials={trials} type="post" />
            <Selected trials={trials} />
          </div>
          <Bars trials={trials} />
        </div>
      )}

      {tab === 1 && <Graphs trials={trials} />}

      {tab === 2 && (
        <div className="space-y-4">
          <div className="flex space-x-4 h-96">
            <Quadrant trials={trials} />
            <div className="card flex-1">
              <div className="[&>div]:flex [&>div]:border-b [&>div]:h-12 [&>div>*]:flex [&>div>*]:items-center [&>div>div]:px-4 [&>div>div]:font-medium [&>div>span]:w-60 [&>div>div]:text-primary [&>div>span]:border-r [&>div>span]:justify-center">
                <div>
                  <span>{t("subject.l.mea_lev")}</span>
                  <div>{diagnosis.suitability}</div>
                </div>
                <div>
                  <span>{t("subject.l.diag_rst")}</span>
                  <div>{diagnosis.condition?.replaceAll("_", " ")}</div>
                </div>
                <div>
                  <span>{t("subject.l.err_code")}</span>
                  <div>{diagnosis.errorCode}</div>
                </div>
              </div>
              <div className="p-8 space-y-2">
                <p>{CONDITIONS[diagnosis.condition]?.[locale]}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="p-4 flex items-center space-x-2">
              <div className="font-medium">{t("subject.l.mea_lev")}</div>
              <div className="text-sm">({t("subject.m.i_2")})</div>
            </div>
            {Object.entries(GRADES).map(([key, value]) => {
              return (
                <div
                  key={`grade-${key}`}
                  className="text-sm flex border-t [&>div]:flex [&>div]:items-center"
                >
                  <div
                    aria-checked={diagnosis.suitability === key}
                    className="relative text-gray-400 border-r w-16 min-w-[4rem] justify-center aria-checked:text-primary"
                  >
                    {key}
                    {diagnosis.suitability === key && (
                      <span className="absolute w-1.5 h-1.5 bg-primary top-2 right-2 rounded-full" />
                    )}
                  </div>
                  <div className="p-4">{t(value)}</div>
                </div>
              );
            })}
          </div>

          <div className="card">
            <div className="p-4 font-medium">{t("subject.l.diag_rst")}</div>
            {Object.entries(CONDITIONS).map(([key, value]) => {
              return (
                <div
                  key={`grade-${key}`}
                  className="text-sm flex border-t [&>div]:flex [&>div]:items-center"
                >
                  <div
                    aria-checked={diagnosis.condition === key}
                    className="relative text-gray-400 border-r w-60 justify-center aria-checked:text-primary"
                  >
                    {value["title"]}
                    {diagnosis.condition === key && (
                      <span className="absolute w-1.5 h-1.5 bg-primary top-2 right-2 rounded-full" />
                    )}
                  </div>
                  <div className="p-4 flex-1">{t(value["guide"])}</div>
                </div>
              );
            })}
          </div>

          <div className="card">
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="font-medium">{t("subject.l.err_code")}</div>
                <div className="text-sm space-x-1 [&>span]:underline [&>span]:underline-offset-4">
                  (<span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>)
                </div>
              </div>
              <div className="text-sm">*{t("subject.m.i_3")}</div>
            </div>
            {Object.entries(ERROR_CODE).map(([key, value]) => {
              return (
                <div
                  key={`grade-${key}`}
                  className="text-sm flex border-t [&>div]:flex [&>div]:items-center"
                >
                  <div className="border-r w-16 min-w-[4rem] justify-center">
                    {key}
                  </div>
                  <div className="p-4">{t(value)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const SVC = ({ data }) => {
  const [subject] = useSubject();
  const { tab, pre_g = [], post_g = [] } = subject;

  const { trials = [] } = data;

  const g = pre_g.concat(post_g);
  const tvs = trials
    .map(({ measurementId, graph: { timeVolume } }, i) => ({
      id: measurementId,
      data: timeVolume,
      i,
    }))
    .filter(({ id }) => g.includes(id));

  return (
    <div className="flex-1 space-y-4">
      <Tabs svc />
      {!tab && (
        <div className="space-y-4">
          <div className="card h-96">
            <TV_SVC data={tvs} />
          </div>
          <div className="flex space-x-4">
            <Trials trials={trials} type="pre" svc />
            <Trials trials={trials} type="post" svc />
            <Selected trials={trials} svc />
          </div>
        </div>
      )}
      {tab === 1 && <Graphs_SVC trials={trials} />}
    </div>
  );
};

export const Trends = ({ data, to, lastTrendDate, predictData }) => {
  const xValues = new Array(6)
    .fill(null)
    .map((_, i) => dayjs(to).subtract(i, "M").format("YYYY-MM"))
    .reverse();

  const fvc = xValues.map((x) => ({
    x,
    y: data.find(({ date }) => date === x)?.fvc || null,
  }));
  const fev1 = xValues.map((x) => ({
    x,
    y: data.find(({ date }) => date === x)?.fev1 || null,
  }));
  const pef = xValues.map((x) => ({
    x,
    y: data.find(({ date }) => date === x)?.pef || null,
  }));
  const fef25_75 = xValues.map((x) => ({
    x,
    y: data.find(({ date }) => date === x)?.fef25_75 || null,
  }));
  const fev1per = xValues.map((x) => ({
    x,
    y: data.find(({ date }) => date === x)?.fev1per || null,
  }));

  const predictFvc = !!predictData.length
    ? [
        fvc.find(({ x }) => x === lastTrendDate),
        ...predictData.map(({ date, fvc }) => ({ x: date, y: fvc })),
      ]
    : [];
  const predictFev1 = !!predictData.length
    ? [
        fev1.find(({ x }) => x === lastTrendDate),
        ...predictData.map(({ date, fev1 }) => ({ x: date, y: fev1 })),
      ]
    : [];
  const predictPef = !!predictData.length
    ? [
        pef.find(({ x }) => x === lastTrendDate),
        ...predictData.map(({ date, pef }) => ({ x: date, y: pef })),
      ]
    : [];
  const predictFef = !!predictData.length
    ? [
        fef25_75.find(({ x }) => x === lastTrendDate),
        ...predictData.map(({ date, fef25_75 }) => ({ x: date, y: fef25_75 })),
      ]
    : [];
  const predictFev1per = !!predictData.length
    ? [
        fev1per.find(({ x }) => x === lastTrendDate),
        ...predictData.map(({ date, fev1per }) => ({ x: date, y: fev1per })),
      ]
    : [];

  return (
    <div className="flex-1 space-y-4">
      <div className="card">
        <div className="p-4 font-medium">FVC</div>
        <div className="h-80">
          <Trend
            data={[
              { id: "trend-fvc", data: fvc },
              { id: "predict-fvc", data: predictFvc },
            ]}
          />
        </div>
      </div>
      <div className="card">
        <div className="p-4 font-medium">FEV1</div>
        <div className="h-80">
          <Trend
            data={[
              { id: "trend-fev1", data: fev1 },
              { id: "predict-fvc", data: predictFev1 },
            ]}
          />
        </div>
      </div>
      <div className="card">
        <div className="p-4 font-medium">PEF</div>
        <div className="h-80">
          <Trend
            data={[
              { id: "trend-pef", data: pef },
              { id: "predict-fvc", data: predictPef },
            ]}
          />
        </div>
      </div>
      <div className="card">
        <div className="p-4 font-medium">FEF25-75%</div>
        <div className="h-80">
          <Trend
            data={[
              { id: "trend-fef25_75", data: fef25_75 },
              { id: "predict-fvc", data: predictFef },
            ]}
          />
        </div>
      </div>
      <div className="card">
        <div className="p-4 font-medium">FEV1%</div>
        <div className="h-80">
          <Trend
            type="fev1per"
            data={[
              { id: "trend-fev1per", data: fev1per },
              { id: "predict-fev1per", data: predictFev1per },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export const Main = () => {
  const { chartNumber } = useParams();

  const [subject, setSubject] = useSubject();
  const { date, date_from, date_to, type = 0 } = subject;

  const to = dayjs().format("YYYY-MM");
  const from = dayjs(to).subtract(6, "M").format("YYYY-MM");

  const subjectQuery = useQuery({
    queryKey: ["subject", chartNumber],
    queryFn: () => getSubject(chartNumber),
    enabled: !!chartNumber,
  });

  const historiesQuery = useQuery({
    queryKey: [
      "histories",
      chartNumber,
      date_from || "2000-01-01",
      date_to || "2099-12-31",
    ],
    queryFn: () =>
      getHistories({
        chartNumber,
        from: date_from || "2000-01-01",
        to: date_to || "2099-12-31",
      }),
    enabled: !!chartNumber,
  });

  const fvcQuery = useQuery({
    queryKey: ["results", chartNumber, "fvc", date],
    queryFn: () => getResults({ chartNumber, type: "fvc", date }),
    enabled: !!chartNumber && !!date,
  });

  const svcQuery = useQuery({
    queryKey: ["results", chartNumber, "svc", date],
    queryFn: () => getResults({ chartNumber, type: "svc", date }),
    enabled: !!chartNumber && !!date,
  });

  const trendsQuery = useQuery({
    queryKey: ["trends", chartNumber],
    queryFn: () => getTrends({ chartNumber, from, to }),
    enabled: !!chartNumber,
  });

  const subjectData = subjectQuery.data || {};
  const historiesData = historiesQuery.data || {};
  const fvcData = fvcQuery.data || {};
  const svcData = svcQuery.data || {};
  const trendsData = trendsQuery.data || {};

  const lastTrendDate =
    !!(trendsData.response || []).length &&
    dayjs
      .max((trendsData.response || []).map(({ date }) => dayjs(date)))
      .format("YYYY-MM");

  const predictQuery = useQuery({
    queryKey: ["trends", chartNumber, lastTrendDate],
    queryFn: () => getPredictTrends({ chartNumber, date: lastTrendDate }),
    enabled: chartNumber && !!lastTrendDate,
  });

  const predictData = predictQuery.data || {};

  const { code, subCode } = subjectData;
  const isSuccess = code === 200 && subCode === 0;
  const isError = (code === 200 && subCode === 2004) || subjectQuery.isError;

  useEffect(() => {
    if (isSuccess)
      setSubject((prev) =>
        prev.chartNumber === chartNumber ? prev : { chartNumber }
      );
  }, [isSuccess]);

  const options = [
    {
      label: "FVC",
      hasReport: true,
      isNull: fvcData.subCode === 2004,
      isSuccess: fvcData.subCode === 0,
      isLoading: fvcQuery.isLoading,
    },
    {
      label: "SVC",
      hasReport: true,
      isNull: svcData.subCode === 2004,
      isSuccess: svcData.subCode === 0,
      isLoading: svcQuery.isLoading,
    },
    { label: "TREND", hasReport: false },
  ];

  if (isError) return null;

  return (
    <>
      {isSuccess && (
        <main className="flex p-8 space-x-8">
          <div className="space-y-4">
            <Subject data={subjectData.response || {}} />
            <Clinician data={subjectData.response || {}} />
            <Histories data={historiesData.response || []} />
            {!!date && <Types options={options} />}
          </div>

          {!!date && (
            <>
              {type === 0 && <FVC data={fvcData.response || {}} />}
              {type === 1 && <SVC data={svcData.response || {}} />}
              {type === 2 && (
                <Trends
                  data={trendsData.response || []}
                  lastTrendDate={lastTrendDate}
                  predictData={predictData.response || []}
                  to={to}
                />
              )}
            </>
          )}

          <ReportFVC data={fvcData.response || {}} />
          <ReportSVC data={svcData.response || {}} />
        </main>
      )}
      {subjectQuery.isLoading && <Loading />}
    </>
  );
};
