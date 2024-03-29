"use client";

import { useTranslation } from "react-i18next";

export const Calibration = ({ calibration }) => {
  const { temperature, humidity, pressure, gain, inhale, exhale } =
    calibration || {};

  const { t } = useTranslation();

  return (
    <section className="flex space-x-4">
      <div className="card flex-1">
        <div className="font-medium p-4">Environment</div>
        <ul className="p-4 text-sm space-y-2 [&>li]:flex [&>li]:h-8 [&>li]:items-center [&>li>span]:w-36 [&>li>span]:text-gray-400">
          <li>
            <span>{t("PJ.TEMP")}(°C)</span>
            <p>{temperature}</p>
          </li>
          <li>
            <span>{t("PJ.HUM")}(%)</span>
            <p>{humidity}</p>
          </li>
          <li>
            <span>{t("PJ.PRES")}(cmH2O)</span>
            <p>{pressure}</p>
          </li>
        </ul>
      </div>
      <div className="card flex-1">
        <div className="font-medium p-4">{t("PJ.GAIN")}</div>
        <ul className="p-4 text-sm space-y-2 [&>li]:flex [&>li]:h-12 [&>li]:items-center [&>li>span]:w-36 [&>li>span]:text-gray-400">
          <li>
            <span>{t("PJ.INHALE")}</span>
            <p>{gain?.inhale}</p>
          </li>
          <li>
            <span>{t("PJ.EXHALE")}</span>
            <p>{gain?.exhale}</p>
          </li>
        </ul>
      </div>
      <div className="card flex-[1.5]">
        <div className="font-medium p-4">{t("PJ.CAL")}</div>
        <ul className="p-4 text-sm space-y-2 [&>li]:flex [&>li]:h-8 [&>li]:items-center [&>li>*]:w-36 [&>li>span]:text-gray-400">
          <li>
            <span />
            <p className="text-gray-400 flex-1 text-center">Volume(L)</p>
            <p className="text-gray-400 flex-1 text-center">Error(%)</p>
          </li>
          <li>
            <span>Inhale</span>
            <p className="flex-1 text-center">{inhale?.meas}</p>
            <p className="flex-1 text-center">{inhale?.error}</p>
          </li>
          <li>
            <span>Exhale</span>
            <p className="flex-1 text-center">{exhale?.meas}</p>
            <p className="flex-1 text-center">{exhale?.error}</p>
          </li>
        </ul>
      </div>
    </section>
  );
};
