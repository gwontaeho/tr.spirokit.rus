"use client";
import { useState } from "react";
import { COLORS_GRAPH } from "@/constants";
import { TV_SVC } from "./";

export const Graphs_SVC = ({ trials }) => {
    const [selectedTrials, setSelectedTrials] = useState([]);

    const pre = trials.filter(({ bronchodilator }) => bronchodilator === "pre");
    const post = trials.filter(({ bronchodilator }) => bronchodilator === "post");

    const tvs = trials
        .map(({ measurementId, graph: { timeVolume } }, i) => ({ id: measurementId, data: timeVolume, i }))
        .filter(({ id }) => selectedTrials.includes(id));

    const handleChange = (measurementId) => {
        setSelectedTrials((prev) => {
            if (prev.includes(measurementId)) return prev.filter((v) => v !== measurementId);
            else return [...prev, measurementId];
        });
    };

    return (
        <div className="space-y-4">
            <div className="card h-96">
                <TV_SVC data={tvs} />
            </div>
            <div className="flex space-x-4 [&>div]:flex-1 [&>div]:space-y-4">
                <div>
                    {pre.map(({ measurementId, best, bronchodilator, date, graph }, i) => {
                        const { timeVolume } = graph;
                        return (
                            <label
                                key={`pre-graph-svc-${measurementId}`}
                                className="flex flex-col card border-primary cursor-pointer hover:bg-gray-100"
                                style={{ borderWidth: best ? 1 : 0 }}
                            >
                                <div className="p-4 text-sm flex justify-between">
                                    <div>
                                        {bronchodilator.toUpperCase()} · Trial{i + 1} · {date}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="w-4"
                                        checked={selectedTrials.includes(measurementId)}
                                        style={{ accentColor: COLORS_GRAPH[i] }}
                                        onChange={() => handleChange(measurementId)}
                                    />
                                </div>
                                <div className="h-72">
                                    <TV_SVC data={[{ id: measurementId, data: timeVolume, i }]} />
                                </div>
                            </label>
                        );
                    })}
                </div>
                <div>
                    {post.map(({ measurementId, best, bronchodilator, date, graph }, i) => {
                        const { timeVolume } = graph;
                        return (
                            <label
                                key={`post-graph-svc-${measurementId}`}
                                className="flex flex-col card border-primary cursor-pointer hover:bg-gray-100"
                                style={{ borderWidth: best ? 1 : 0 }}
                            >
                                <div className="p-4 text-sm flex justify-between">
                                    <div>
                                        {bronchodilator.toUpperCase()} · Trial{i + 1} · {date}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="w-4"
                                        checked={selectedTrials.includes(measurementId)}
                                        style={{ accentColor: COLORS_GRAPH[pre.length + i] }}
                                        onChange={() => handleChange(measurementId)}
                                    />
                                </div>
                                <div className="h-72">
                                    <TV_SVC data={[{ id: measurementId, data: timeVolume, i }]} />
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
