"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { COLORS_GRAPH } from "@/constants";
import { VF, TV } from "./";

export const Graphs = ({ trials }) => {
    const { t } = useTranslation();

    const [selectedTrials, setSelectedTrials] = useState([]);

    const pre = trials.filter(({ bronchodilator }) => bronchodilator === "pre");
    const post = trials.filter(({ bronchodilator }) => bronchodilator === "post");

    const vfs = trials
        .map(({ measurementId, graph: { volumeFlow } }, i) => ({ id: measurementId, data: volumeFlow, i }))
        .filter(({ id }) => selectedTrials.includes(id));
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
            <div className="relative card grid grid-cols-2 h-96">
                <VF data={vfs} />
                <TV data={tvs} />
                {!selectedTrials.length && (
                    <div className="absolute rounded-lg w-full h-full bg-black/20 top-0 left-0 flex items-center justify-center">
                        <p className="text-white text-3xl">{t("subject.m.i_1")}</p>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-2 gap-4 [&>div]:space-y-4">
                <div>
                    {pre.map(({ measurementId, best, bronchodilator, date, graph }, i) => {
                        const { volumeFlow, timeVolume } = graph;
                        return (
                            <label key={`pre-graph-${measurementId}`} className="flex flex-col card cursor-pointer hover:bg-gray-100">
                                <div className="p-4 text-sm flex justify-between relative">
                                    <div />
                                    {best && (
                                        <div className="absolute top-2 left-2 [&>span]:text-3xl">
                                            <span className="material-symbols-outlined text-primary">star</span>
                                        </div>
                                    )}
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
                                <div className="h-72 grid grid-cols-2 gap-4">
                                    <div>
                                        <VF data={[{ id: measurementId, data: volumeFlow, i }]} />
                                    </div>
                                    <div>
                                        <TV data={[{ id: measurementId, data: timeVolume, i }]} />
                                    </div>
                                </div>
                            </label>
                        );
                    })}
                </div>
                <div>
                    {post.map(({ measurementId, best, bronchodilator, date, graph }, i) => {
                        const { volumeFlow, timeVolume } = graph;
                        return (
                            <label key={`post-graph-${measurementId}`} className="flex flex-col card cursor-pointer hover:bg-gray-100">
                                <div className="p-4 text-sm flex justify-between relative">
                                    <div />
                                    {best && (
                                        <div className="absolute top-2 left-2 [&>span]:text-3xl">
                                            <span className="material-symbols-outlined text-primary">star</span>
                                        </div>
                                    )}
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
                                <div className="h-72 grid grid-cols-2 gap-4">
                                    <div>
                                        <VF data={[{ id: measurementId, data: volumeFlow, i: pre.length + i }]} />
                                    </div>
                                    <div>
                                        <TV data={[{ id: measurementId, data: timeVolume, i: pre.length + i }]} />
                                    </div>
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
