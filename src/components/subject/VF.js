"use client";
import { ResponsiveLine } from "@nivo/line";
import { COLORS_GRAPH } from "@/constants";

export const VF = ({ data }) => {
    const initMaxY = 1.4;
    const initMinY = -0.8;
    const initMaxX = 1.6;

    const getMaxRatio = () => {
        const flat = data.map((v) => v.data).flat();
        const ratioMaxY = flat.reduce((prev, curr) => (prev.y > curr.y ? prev : curr), { y: initMaxY })["y"] / initMaxY;
        const ratioMinY = flat.reduce((prev, curr) => (prev.y < curr.y ? prev : curr), { y: initMinY })["y"] / initMinY;
        const ratioMaxX = flat.reduce((prev, curr) => (prev.x > curr.x ? prev : curr), { x: initMaxX })["x"] / initMaxX;
        return Math.max(ratioMaxY, ratioMinY, ratioMaxX);
    };

    const maxY = Math.ceil(initMaxY * getMaxRatio());
    const minY = Math.floor(initMinY * getMaxRatio());
    const maxX = Math.ceil(initMaxX * getMaxRatio());

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
            <div className="text-xs">Flow(l/s)</div>
            <ResponsiveLine
                colors={(v) => COLORS_GRAPH[v.i % 10]}
                data={data}
                margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                xScale={{ type: "linear", min: 0, max: maxX }}
                yScale={{ type: "linear", min: minY, max: maxY }}
                axisBottom={{
                    tickValues: getTicks(maxX),
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
                gridXValues={getTicks(maxX)}
                gridYValues={getTicks(maxY, minY)}
                theme={{ axis: { domain: { line: { stroke: "#72B9CE" } }, ticks: { text: { fontSize: "0.75rem" } } } }}
            />
            <div className="text-right text-xs">Volume(L)</div>
        </section>
    );
};
