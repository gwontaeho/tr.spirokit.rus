"use client";
import { ResponsiveLine } from "@nivo/line";
import { COLORS_GRAPH } from "@/constants";
import { useTranslation } from "react-i18next";

export const TV_SVC = ({ data }) => {
  const { t } = useTranslation();
  const initMaxY = 1.4;
  const initMinY = -0.8;

  const getMaxRatio = () => {
    const flat = data.map((v) => v.data).flat();
    const ratioMaxY = flat.reduce((prev, curr) => (prev.y > curr.y ? prev : curr), { y: initMaxY })["y"] / initMaxY;
    const ratioMinY = flat.reduce((prev, curr) => (prev.y < curr.y ? prev : curr), { y: initMinY })["y"] / initMinY;
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
    <section className="relative w-full h-full flex flex-col p-4">
      <div className="text-xs">Volume(V)</div>
      <ResponsiveLine
        colors={(v) => COLORS_GRAPH[v.i % 10]}
        data={data}
        margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
        xScale={{ type: "linear", min: 0, max: 60 }}
        yScale={{ type: "linear", min: minY, max: maxY }}
        axisBottom={{
          tickValues: [0, 10, 20, 30, 40, 50, 60],
          tickSize: 5,
          tickPadding: 5,
          format: ".2f",
        }}
        axisLeft={{
          tickValues: getTicks(maxY, minY),
          tickSize: 5,
          tickPadding: 5,
          format: ".2f",
        }}
        lineWidth={1}
        enablePoints={false}
        gridXValues={[0, 10, 20, 30, 40, 50, 60]}
        gridYValues={getTicks(maxY, minY)}
        theme={{ axis: { domain: { line: { stroke: "#72B9CE" } } } }}
      />
      <div className="text-right text-xs">Time(s)</div>
      {!data.length && (
        <div className="absolute rounded-lg w-full h-full bg-black/20 top-0 left-0 flex items-center justify-center">
          <p className="text-white text-3xl">{t("subject.m.i_1")}</p>
        </div>
      )}
    </section>
  );
};
