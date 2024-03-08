"use client";
import Image from "next/image";
import dayjs from "dayjs";
import { useContext } from "react";
import { ResponsiveLine } from "@nivo/line";
import { RACES, CONDITIONS } from "@/constants";
import { LocaleContext } from "@/components/LocaleProvider";
import { useTranslation } from "react-i18next";

const GENDERS = { m: "Male", f: "Female" };

const VF = ({ label, data }) => {
  const COLORS = { pre: "#FF1E20", post: "#3B7EA9" };

  const initMaxY = 13;
  const initMinY = -7;
  const initMaxX = 14;

  const getMaxRatio = () => {
    const map = data.map((v) => v.data).flat();

    const ratioMaxY = map.reduce((prev, curr) => (prev.y > curr.y ? prev : curr), { y: initMaxY })["y"] / initMaxY;
    const ratioMinY = map.reduce((prev, curr) => (prev.y < curr.y ? prev : curr), { y: initMinY })["y"] / initMinY;
    const ratioMaxX = map.reduce((prev, curr) => (prev.x > curr.x ? prev : curr), { x: initMaxX })["x"] / initMaxX;
    return Math.max(ratioMaxY, ratioMinY, ratioMaxX);
  };

  const maxY = Math.ceil(initMaxY * getMaxRatio());
  const minY = Math.floor(initMinY * getMaxRatio());
  const maxX = Math.ceil(initMaxX * getMaxRatio());

  const getTicks = (max, min, itv) => {
    const interval = itv;
    let a = [];
    for (let i = 0; i < max; i += interval) a.push(i);
    if (!!min) for (let i = -interval; i > minY; i -= interval) a.unshift(i);
    return a;
  };

  return (
    <div className="h-full flex-1 flex flex-col">
      <div className="text-[10px] mb-[4px] text-center">{label}</div>
      <div className="relative flex-1">
        <ResponsiveLine
          colors={({ type }) => COLORS[type]}
          data={data}
          margin={{ right: 10, bottom: 30, left: 50 }}
          xScale={{ type: "linear", min: 0, max: maxX }}
          yScale={{ type: "linear", min: minY, max: maxY }}
          axisBottom={{
            tickValues: getTicks(maxX, null, 3.5),
            tickSize: 5,
            tickPadding: 5,
            format: ".1f",
          }}
          axisLeft={{
            tickValues: getTicks(maxY, minY, 3),
            tickSize: 5,
            tickPadding: 5,
            format: ".1f",
          }}
          lineWidth={1}
          enablePoints={false}
          gridXValues={getTicks(maxX, null, 3.5)}
          gridYValues={getTicks(maxY, minY, 3)}
          theme={{ axis: { domain: { line: { stroke: "#000" } } } }}
        />
        <div className="absolute w-[1px] h-[calc(100%-30px)] bg-black right-[10px] top-0" />
        <div className="absolute w-[calc(100%-60px)] h-[1px] bg-black top-0 right-[10px]" />
      </div>
    </div>
  );
};

const TV = ({ label, data }) => {
  const COLORS = { pre: "#FF1E20", post: "#3B7EA9" };

  const initMaxY = 8;
  const initMaxX = 5;

  const mapTv = data.map((v) => v.data).flat();
  const maxTvX = Math.ceil(mapTv.reduce((prev, curr) => (prev.x > curr.x ? prev : curr), { x: initMaxX })["x"]);
  const maxTvY = Math.ceil(mapTv.reduce((prev, curr) => (prev.y > curr.y ? prev : curr), { y: initMaxY })["y"]);

  const d = data.map((v) => ({ ...v, data: [...v.data, { x: maxTvX, y: v.data.at(-1).y }] }));

  const getTicks = (max) => {
    const interval = 1.5;
    let a = [];
    for (let i = 0; i < max; i += interval) a.push(i);
    return a;
  };

  return (
    <div className="h-full flex-1 flex flex-col">
      <div className="text-[10px] mb-[4px] text-center">{label}</div>
      <div className="relative flex-1">
        <ResponsiveLine
          colors={({ type }) => COLORS[type]}
          data={d}
          margin={{ right: 10, bottom: 30, left: 50 }}
          xScale={{ type: "linear", min: 0, max: maxTvX }}
          yScale={{ type: "linear", min: 0, max: maxTvY }}
          axisBottom={{
            tickValues: getTicks(maxTvX),
            tickSize: 5,
            tickPadding: 5,
            format: ".1f",
          }}
          axisLeft={{
            tickValues: getTicks(maxTvY),
            tickSize: 5,
            tickPadding: 5,
            format: ".1f",
          }}
          lineWidth={1}
          enablePoints={false}
          gridXValues={getTicks(maxTvX)}
          gridYValues={getTicks(maxTvY)}
          theme={{ axis: { domain: { line: { stroke: "#000" } } } }}
        />
        <div className="absolute w-[1px] h-[calc(100%-30px)] bg-black right-[10px] top-0" />
        <div className="absolute w-[calc(100%-60px)] h-[1px] bg-black top-0 right-[10px]" />
      </div>
    </div>
  );
};

const TV_SVC = ({ label, data }) => {
  const COLORS = { pre: "#FF1E20", post: "#3B7EA9" };

  const initMaxY = 1.4;
  const initMinY = -0.8;

  const getMaxRatio = () => {
    const map = data.map((v) => v.data).flat();
    const ratioMaxY = map.reduce((prev, curr) => (prev.y > curr.y ? prev : curr), { y: initMaxY })["y"] / initMaxY;
    const ratioMinY = map.reduce((prev, curr) => (prev.y < curr.y ? prev : curr), { y: initMinY })["y"] / initMinY;
    return Math.max(ratioMaxY, ratioMinY);
  };

  const maxY = Math.ceil(initMaxY * getMaxRatio());
  const minY = Math.floor(initMinY * getMaxRatio());

  const getInterval = (value) => {
    const remainder = value % 10;
    if (remainder === 0) return value / 10;
    if (remainder <= 5) return Math.floor(value / 10) + 0.5;
    return Math.ceil(value / 10);
  };

  const getTicks = (max, min) => {
    const range = max + Math.abs(min);
    const interval = getInterval(!!min ? range : max);
    let a = [];
    for (let i = 0; i < max; i += interval) a.push(i);
    if (!!min) for (let i = -interval; i > minY; i -= interval) a.unshift(i);
    return a;
  };

  return (
    <div className="h-full flex-1 flex flex-col">
      <div className="text-[10px] mb-[4px] text-center">{label}</div>
      <div className="relative flex-1">
        <ResponsiveLine
          colors={({ type }) => COLORS[type]}
          data={data}
          margin={{ right: 10, bottom: 30, left: 50 }}
          xScale={{ type: "linear", min: 0, max: 60 }}
          yScale={{ type: "linear", min: minY, max: maxY }}
          axisBottom={{
            tickValues: [0, 10, 20, 30, 40, 50, 60],
            tickSize: 5,
            tickPadding: 5,
            format: ".1f",
          }}
          axisLeft={{
            tickValues: getTicks(maxY, minY),
            tickSize: 5,
            tickPadding: 5,
            format: ".1f",
          }}
          lineWidth={1}
          enablePoints={false}
          gridXValues={[0, 10, 20, 30, 40, 50, 60]}
          gridYValues={getTicks(maxY, minY)}
          theme={{ axis: { domain: { line: { stroke: "#000" } } } }}
        />
        <div className="absolute w-[1px] h-[calc(100%-30px)] bg-black right-[10px] top-0" />
        <div className="absolute w-[calc(100%-60px)] h-[1px] bg-black top-0 right-[10px]" />
      </div>
    </div>
  );
};

export const ReportFVC = ({ data }) => {
  const { t } = useTranslation();
  const { lang } = useContext(LocaleContext);

  const { subject = {}, calibration = {}, trials = [], diagnosis = {}, clinic = {} } = data;
  const bestPre = trials.find(({ bronchodilator, best }) => bronchodilator === "pre" && best) || {};
  const bestPost = trials.find(({ bronchodilator, best }) => bronchodilator === "post" && best) || {};
  const trialsPre = trials.filter(({ bronchodilator }) => bronchodilator === "pre");
  const trialsPreGraphs = trialsPre.map(({ measurementId, graph }) => ({
    id: measurementId,
    data: graph.volumeFlow,
    type: "pre",
  }));

  const bestPreVf = bestPre.graph?.volumeFlow && { id: "001", data: bestPre.graph?.volumeFlow, type: "pre" };
  const bestPostVf = bestPost.graph?.volumeFlow && { id: "002", data: bestPost.graph?.volumeFlow, type: "post" };

  const bestPreTv = bestPre.graph?.timeVolume && { id: "001_", data: bestPre.graph?.timeVolume, type: "pre" };
  const bestPostTv = bestPost.graph?.timeVolume && { id: "002_", data: bestPost.graph?.timeVolume, type: "post" };

  const vfs = [bestPreVf, bestPostVf].filter(Boolean);
  const tvs = [bestPreTv, bestPostTv].filter(Boolean);

  const TITLES = [
    { l: "FVC", t: "FVC", u: "L" },
    { l: "FEV1", t: "FEV1", u: "L" },
    { l: "FEV1%", t: "FEV1PER", u: "%" },
    { l: "FEF25-75%", t: "FEF25_75", u: "L/s" },
    { l: "PEF", t: "PEF", u: "L/s" },
    { l: "PEFT", t: "PEFT", u: "s" },
    { l: "FET100%", t: "FET", u: "s" },
    { l: "FIVC", t: "FIVC", u: "L" },
    { l: "Vol Extrap", t: "VEXT", u: "mL" },
  ];

  return (
    <div className="absolute w-0 h-0 overflow-hidden">
      <div id="report-0" className="relative w-[1090px] h-[1682px] min-w-[1090px] min-h-[1682px] px-[30px] bg-white">
        <div className="absolute top-0 left-0 w-[144px] h-[144px]">
          <Image priority src="/logo_tr.svg" alt="logo_tr" width={144} height={144} />
        </div>
        <div className="flex flex-col items-center justify-between h-[120px] pt-[32px] text-[#1B3FA7] font-[700]">
          <div className="text-[30px]">SPIROMETRY REPORT</div>
          <div className="text-[24px]">[ {clinic.name} ]</div>
        </div>
        <div className="text-right font-[700] text-[#1B3FA7] mb-[8px]">[ Subject Result ]</div>
        <table className="w-full mb-[8px] text-[14px]">
          <tbody className="[&>tr>*]:border [&>tr>*]:h-[28px] [&>tr>*]:pl-[8px] [&>tr>th]:font-[500] [&>tr>th]:text-left [&>tr>td]:font-[700]">
            <tr className="[&>*]:w-1/6">
              <th>Name</th>
              <td>{subject.name}</td>
              <th>Race</th>
              <td>{RACES[subject.race]}</td>
              <th>Chart Number</th>
              <td>{subject.chartNumber}</td>
            </tr>
            <tr>
              <th>Age</th>
              <td>{subject.age}</td>
              <th>Height(cm)</th>
              <td>{subject.height}</td>
              <th>Physician</th>
              <td>{subject.clinicianName}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{GENDERS[subject.gender]}</td>
              <th>Weight(kg)</th>
              <td>{subject.weight}</td>
              <th>Meas Date</th>
              <td>{dayjs(bestPre.date).format("YYYY-MM-DD")}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between font-[700] text-[#1B3FA7] mb-[8px]">
          <div>SpiroKit Serial Number : {calibration.serialNumber}</div>
          <div>[ Calibration Result ]</div>
        </div>
        <table className="w-full mb-[16px] text-[14px]">
          <tbody className="[&>tr>*]:border [&>tr>*]:h-[28px] [&>tr>*]:pl-[8px] [&>tr>th]:font-[500] [&>tr>th]:text-left [&>tr>td]:font-[700]">
            <tr className="[&>*]:w-1/6">
              <th>Temperature(°C)</th>
              <td>{calibration.temperature}</td>
              <th>Relative Humidity(%)</th>
              <td>{calibration.humidity}</td>
              <th>P cmH2O</th>
              <td>{calibration.pressure}</td>
            </tr>
            <tr>
              <th>Calibartion Date</th>
              <td>{calibration.date}</td>
              <th>Inhale Gain</th>
              <td>{calibration.gain?.inhale}</td>
              <th>Exhale Gain</th>
              <td>{calibration.gain?.exhale}</td>
            </tr>
          </tbody>
        </table>
        <div className="text-center h-[38px] bg-[#DEE9FF] text-[24px] font-[700] mb-[16px]">
          Spirometry(BTPS) Best Data
        </div>
        <div className="flex mb-[16px]">
          <div className="flex-1">
            <table className="w-full h-full text-[14px]">
              <thead className="border-b h-[32px]">
                <tr className="[&>th]:font-[500]">
                  <th />
                  <th />
                  <th>Pre</th>
                  <th>Ref</th>
                  <th>%Ref</th>
                  <th>Post</th>
                  <th>%Chg</th>
                </tr>
              </thead>
              <tbody>
                {TITLES.map(({ l, t }) => {
                  const result = (bestPre.results || []).find(({ title }) => title === t) || {};
                  return (
                    <tr key={`rfb-${t}`} className="[&>th]:font-[500] [&>th]:text-left [&>td]:text-center">
                      <th>{l}</th>
                      <td>{result.unit}</td>
                      <td>{result.meas || "-"}</td>
                      <td>{result.pred || "-"}</td>
                      <td>{result.per || "-"}</td>
                      <td>{result.post || "-"}</td>
                      <td>{result.chg || "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex-1">
            <div className="flex justify-end space-x-[10px] font-[500] h-[32px]">
              <div className="text-[#FF1E20]">PRE: RED</div>
              <div className="text-[#3B7EA9]">POST: BLUE</div>
            </div>
            <div className="flex h-[240px]">
              <VF data={vfs} label="Volume(L)-Flow(L/s) graph" />
              <TV data={tvs} label="Time(s)-Volume(L) graph" />
            </div>
          </div>
        </div>
        <div className="text-center h-[38px] bg-[#DEE9FF] text-[24px] font-[700] mb-[16px]">
          Spirometry(BTPS) All Trials Pre Data
        </div>
        <ul className="flex mb-[16px] text-[14px] [&>li]:flex-1">
          <li>
            <div className="h-[32px] border-b" />
            {TITLES.map(({ l }) => {
              return (
                <div key={`rrl-${l}`} className="h-[28px] leading-[28px]">
                  {l}
                </div>
              );
            })}
            <div className="h-[28px] leading-[28px]">FVL ECode</div>
          </li>
          <li>
            <div className="h-[32px] border-b" />
            {TITLES.map(({ t, u }) => {
              return (
                <div key={`rru-${t}`} className="text-center h-[28px] leading-[28px]">
                  {u}
                </div>
              );
            })}
          </li>
          {Array(8)
            .fill(null)
            .map((_, i) => {
              const data = trialsPre[i];
              return (
                <li key={`qdw-${i}`} className="text-center">
                  <div className="h-[32px] border-b">Trial {i + 1}</div>
                  {TITLES.map(({ t }) => {
                    return (
                      <div key={`rrt-${t}`} className="h-[28px] leading-[28px]">
                        {data?.results?.find(({ title }) => title === t)?.meas || "-"}
                      </div>
                    );
                  })}
                  <div className="h-[28px] leading-[28px]">{data?.errorCode}</div>
                </li>
              );
            })}
        </ul>
        <div className="grid grid-cols-4 gap-x-[16px] gap-y-[12px] mb-[16px]">
          {Array(8)
            .fill(null)
            .map((_, i) => {
              const data = trialsPreGraphs[i] || { id: "empty", type: "pre", data: [{ x: 0, y: 0 }] };
              return (
                <div key={`pre-graph-${i}`} className="h-[208px]">
                  <VF data={[data]} label={`Pre Trial ${i + 1}`} />
                </div>
              );
            })}
        </div>
        <div className="text-center h-[38px] bg-[#DEE9FF] text-[24px] font-[700] mb-[8px]">Interpreatation</div>
        <div className="font-[700] mb-[8px]">
          FVL Error Code {diagnosis.errorCode} Grade {diagnosis.suitability}
        </div>
        <div className="font-[500]">{CONDITIONS[diagnosis.condition]?.[lang]}</div>
      </div>
    </div>
  );
};

export const ReportSVC = ({ data }) => {
  const { subject = {}, calibration = {}, trials = [], clinic = {} } = data;
  const bestPre = trials.find(({ bronchodilator, best }) => bronchodilator === "pre" && best) || {};
  const bestPost = trials.find(({ bronchodilator, best }) => bronchodilator === "post" && best) || {};
  const trialsPre = trials.filter(({ bronchodilator }) => bronchodilator === "pre");

  const bestPreTv = bestPre.graph?.timeVolume && { id: "001_", data: bestPre.graph?.timeVolume, type: "pre" };
  const bestPostTv = bestPost.graph?.timeVolume && { id: "002_", data: bestPost.graph?.timeVolume, type: "post" };

  const tvs = [bestPreTv, bestPostTv].filter(Boolean);

  const TITLES_SVC = [
    { l: "VC", t: "VC", u: "L" },
    { l: "IC", t: "IC", u: "L" },
    { l: "ERV", t: "ERV", u: "L" },
    { l: "IRV", t: "IRV", u: "L" },
  ];

  return (
    <div className="absolute w-0 h-0 overflow-hidden">
      <div id="report-1" className="relative w-[1090px] h-[1682px] px-[30px] bg-white">
        <div className="absolute top-0 left-0 w-[144px] h-[144px]">
          <Image priority src="/logo_tr.svg" alt="logo_tr" width={144} height={144} />
        </div>
        <div className="flex flex-col items-center justify-between h-[120px] pt-[32px] text-[#1B3FA7] font-[700]">
          <div className="text-[30px]">SPIROMETRY REPORT</div>
          <div className="text-[24px]">[ {clinic.name} ]</div>
        </div>
        <div className="text-right font-[700] text-[#1B3FA7] mb-[8px]">[ Subject Result ]</div>
        <table className="w-full mb-[8px] text-[14px]">
          <tbody className="[&>tr>*]:border [&>tr>*]:h-[28px] [&>tr>*]:pl-[8px] [&>tr>th]:font-[500] [&>tr>th]:text-left [&>tr>td]:font-[700]">
            <tr className="[&>*]:w-1/6">
              <th>Name</th>
              <td>{subject.name}</td>
              <th>Race</th>
              <td>{RACES[subject.race]}</td>
              <th>Chart Number</th>
              <td>{subject.chartNumber}</td>
            </tr>
            <tr>
              <th>Age</th>
              <td>{subject.age}</td>
              <th>Height(cm)</th>
              <td>{subject.height}</td>
              <th>Physician</th>
              <td>{subject.clinicianName}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{GENDERS[subject.gender]}</td>
              <th>Weight(kg)</th>
              <td>{subject.weight}</td>
              <th>Meas Date</th>
              <td>{dayjs(bestPre.date).format("YYYY-MM-DD")}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between font-[700] text-[#1B3FA7] mb-[8px]">
          <div>SpiroKit Serial Number : {calibration.serialNumber}</div>
          <div>[ Calibration Result ]</div>
        </div>
        <table className="w-full mb-[16px] text-[14px]">
          <tbody className="[&>tr>*]:border [&>tr>*]:h-[28px] [&>tr>*]:pl-[8px] [&>tr>th]:font-[500] [&>tr>th]:text-left [&>tr>td]:font-[700]">
            <tr className="[&>*]:w-1/6">
              <th>Temperature(°C)</th>
              <td>{calibration.temperature}</td>
              <th>Relative Humidity(%)</th>
              <td>{calibration.humidity}</td>
              <th>P cmH2O</th>
              <td>{calibration.pressure}</td>
            </tr>
            <tr>
              <th>Calibartion Date</th>
              <td>{calibration.date}</td>
              <th>Inhale Gain</th>
              <td>{calibration.gain?.inhale}</td>
              <th>Exhale Gain</th>
              <td>{calibration.gain?.exhale}</td>
            </tr>
          </tbody>
        </table>
        <div className="text-center h-[38px] bg-[#DEE9FF] text-[24px] font-[700] mb-[16px]">
          Spirometry(BTPS) Best Data
        </div>
        <div className="flex mb-[16px]">
          <div className="flex-1">
            <table className="w-full h-fit text-[14px]">
              <thead className="border-b h-[32px]">
                <tr className="[&>th]:font-[500]">
                  <th />
                  <th />
                  <th>Pre</th>
                  <th>Ref</th>
                  <th>%Ref</th>
                  <th>Post</th>
                  <th>%Chg</th>
                </tr>
              </thead>
              <tbody>
                {TITLES_SVC.map(({ l, t }) => {
                  const result = (bestPre.results || []).find(({ title }) => title === t) || {};
                  return (
                    <tr
                      key={`report-svc-best-${t}`}
                      className="h-[28px] [&>th]:font-[500] [&>th]:text-left [&>td]:text-center">
                      <th>{l}</th>
                      <td>{result.unit}</td>
                      <td>{result.meas || "-"}</td>
                      <td>{result.pred || "-"}</td>
                      <td>{result.per || "-"}</td>
                      <td>{result.post || "-"}</td>
                      <td>{result.chg || "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex-1">
            <div className="flex justify-end space-x-[10px] font-[500] h-[32px]">
              <div className="text-[#FF1E20]">PRE: RED</div>
              <div className="text-[#3B7EA9]">POST: BLUE</div>
            </div>
            <div className="flex h-[240px]">
              <TV_SVC data={tvs} label="Time(s)-Volume(L) graph" />
            </div>
          </div>
        </div>
        <div className="text-center h-[38px] bg-[#DEE9FF] text-[24px] font-[700] mb-[16px]">
          Spirometry(BTPS) All Trials Pre Data
        </div>
        <ul className="flex mb-[16px] text-[14px] [&>li]:flex-1">
          <li>
            <div className="h-[32px] border-b" />
            {TITLES_SVC.map(({ l }) => {
              return (
                <div key={`2efgg-${l}`} className="h-[28px] leading-[28px]">
                  {l}
                </div>
              );
            })}
          </li>
          <li>
            <div className="h-[32px] border-b" />
            {TITLES_SVC.map(({ t, u }) => {
              return (
                <div key={`2e2-${t}`} className="text-center h-[28px] leading-[28px]">
                  {u}
                </div>
              );
            })}
          </li>
          {Array(8)
            .fill(null)
            .map((_, i) => {
              const data = trialsPre[i];
              return (
                <li key={`1et3-${i}`} className="text-center">
                  <div className="h-[32px] border-b">Trial {i + 1}</div>
                  {TITLES_SVC.map(({ t }) => {
                    return (
                      <div key={`21dffg-${t}`} className="h-[28px] leading-[28px]">
                        {data?.results?.find(({ title }) => title === t)?.meas || "-"}
                      </div>
                    );
                  })}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
