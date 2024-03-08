"use client";
import { ResponsiveLine } from "@nivo/line";

export const Graph = ({ calibration }) => {
    const graph = (calibration || {}).graph?.volumeFlow || [];

    const maxY = 9;
    const minY = -9;
    const maxX = 5;

    return (
        <section className="relative card flex flex-col p-4 h-[40rem]">
            <div className="text-xs">Flow(l/s)</div>
            <ResponsiveLine
                colors={["#018ABE"]}
                data={[{ id: "graph", data: graph }]}
                margin={{ top: 20, right: 30, bottom: 30, left: 50 }}
                xScale={{ type: "linear", min: 0, max: maxX }}
                yScale={{ type: "linear", min: minY, max: maxY }}
                axisBottom={{
                    tickValues: [0, 1, 2, 3, 4, 5],
                    tickSize: 5,
                    tickPadding: 5,
                    format: ".2f",
                }}
                axisLeft={{
                    tickValues: [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    tickSize: 5,
                    tickPadding: 5,
                    format: ".2f",
                }}
                lineWidth={1}
                enablePoints={false}
                gridXValues={[0, 1, 2, 3, 4, 5]}
                gridYValues={[-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
                theme={{ axis: { domain: { line: { stroke: "#72B9CE" } } } }}
            />
            <div className="text-right text-xs">Volume(V)</div>
            <div className="absolute w-[calc(100%-80px-2rem)] right-[calc(30px+1rem)] h-[calc(100%-50px-4rem)] top-[calc(20px+2rem)] flex flex-col">
                <div className="flex-[3] bg-[#8FA365]/10" />
                <div className="flex-[1]" />
                <div className="flex-[2] bg-[#7FA3FF]/10" />
                <div className="flex-[1]" />
                <div className="flex-[1] bg-[#FF8D8D]/10" />
                <div className="flex-[2]" />
                <div className="flex-[1] bg-[#FF8D8D]/10" />
                <div className="flex-[1]" />
                <div className="flex-[2] bg-[#7FA3FF]/10" />
                <div className="flex-[1]" />
                <div className="flex-[3] bg-[#8FA365]/10" />
            </div>
        </section>
    );
};
