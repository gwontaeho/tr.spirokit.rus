"use client";
import { ResponsiveLine } from "@nivo/line";
import { COLORS_GRAPH } from "@/constants";

export const TV = ({ data }) => {
    const initMaxY = 1.4;
    const initMaxX = 1.6;

    const flat = data.map((v) => v.data).flat();
    const maxX = Math.ceil(flat.reduce((prev, curr) => (prev.x > curr.x ? prev : curr), { x: initMaxX })["x"]);
    const maxY = Math.ceil(flat.reduce((prev, curr) => (prev.y > curr.y ? prev : curr), { y: initMaxY })["y"]);
    const d = data.map((v) => ({ ...v, data: [...v.data, { x: maxX, y: v.data.at(-1).y }] }));

    const getInterval = (value) => {
        const remainder = value % 10;
        if (remainder === 0) return value / 10;
        if (remainder <= 5) return Math.floor(value / 10) + 0.5;
        return Math.ceil(value / 10);
    };

    const getTicks = (max) => {
        const interval = getInterval(max);
        let a = [];
        for (let i = 0; i < max; i += interval) a.push(i);
        return a;
    };

    return (
        <section className="relative w-full h-full flex flex-col p-4">
            <div className="text-xs">Volume(L)</div>
            <ResponsiveLine
                colors={(v) => COLORS_GRAPH[v.i % 10]}
                data={d}
                margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                xScale={{ type: "linear", min: 0, max: maxX }}
                yScale={{ type: "linear", min: 0, max: maxY }}
                axisBottom={{
                    tickValues: getTicks(maxX),
                    tickSize: 5,
                    tickPadding: 5,
                    format: ".2f",
                }}
                axisLeft={{
                    tickValues: getTicks(maxY),
                    tickSize: 5,
                    tickPadding: 5,
                    format: ".2f",
                }}
                lineWidth={1}
                enablePoints={false}
                gridXValues={getTicks(maxX)}
                gridYValues={getTicks(maxY)}
                theme={{ axis: { domain: { line: { stroke: "#72B9CE" } }, ticks: { text: { fontSize: "0.75rem" } } } }}
            />
            <div className="text-right text-xs">Time(s)</div>
        </section>
    );
};
