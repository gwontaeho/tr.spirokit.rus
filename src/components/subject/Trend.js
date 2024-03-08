"use client";
import { ResponsiveLine } from "@nivo/line";

export const Trend = ({ type, data }) => {
    const isFev1per = type === "fev1per";
    const flat = data.map((v) => v.data).flat();
    const maxY = flat.reduce((prev, curr) => (Number(prev.y) > Number(curr.y) ? prev : curr), { y: 0 })["y"];
    const tickValues = new Array(Math.ceil(Math.ceil(maxY) / Math.ceil(maxY / 6)) + 1 || 0).fill(null).map((_, i) => Math.ceil(maxY / 6) * i);

    return (
        <section className="relative w-full h-full flex flex-col p-4">
            <div className="text-xs">Volume(V)</div>
            <div className="flex-1 relative">
                <ResponsiveLine
                    data={data}
                    margin={{ top: 20, right: 20, bottom: 30, left: 50 }}
                    xScale={{ type: "point" }}
                    yScale={{ type: "linear", min: 0, max: isFev1per ? 100 : tickValues[tickValues.length - 1] }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                    }}
                    axisLeft={{
                        tickValues: isFev1per ? [0, 20, 40, 60, 80, 100] : tickValues,
                        tickSize: 5,
                        tickPadding: 5,
                        format: ".2f",
                    }}
                    lineWidth={1}
                    enablePointLabel
                    pointLabelYOffset={15}
                    gridYValues={isFev1per ? [0, 20, 40, 60, 80, 100] : tickValues}
                    theme={{ axis: { domain: { line: { stroke: "#72B9CE" } } } }}
                />
                {isFev1per && <div className="absolute top-[calc((100%-50px)*(3/10)+20px)] left-[50px] w-[calc(100%-70px)] h-[1px] bg-primary" />}
            </div>
            <div className="text-right text-xs">Date</div>
        </section>
    );
};
