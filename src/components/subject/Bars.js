"use client";
import { useSubject } from "@/recoil";

export const Bars = ({ trials }) => {
    const [subject] = useSubject();
    const { pre_r, post_r } = subject;

    const results = trials.find(({ measurementId }) => measurementId === pre_r)?.results || [];
    const post = trials.find(({ measurementId }) => measurementId === post_r)?.results || [];

    const fvc = results.find(({ title }) => title === "FVC") || {};
    const fev1per = results.find(({ title }) => title === "FEV1PER") || {};
    const fev1 = results.find(({ title }) => title === "FEV1") || {};
    const fef25_75 = results.find(({ title }) => title === "FEF25_75") || {};

    const data = [
        { title: "FVC", label: "FVC", result: fvc },
        { title: "FEV1PER", label: "FEV1%", result: fev1per },
        { title: "FEV1", label: "FEV1", result: fev1 },
        { title: "FEF25_75", label: "FEF25_75", result: fef25_75 },
    ];

    return (
        <section className="grid grid-cols-2 gap-4">
            {data.map(({ title, label, result }) => {
                const { min, max, lower, upper, meas } = result;

                const postMeas = post.find((v) => v.title === title)?.meas || "";

                const length = max - min;
                const posLower = Math.round(((lower - min) / length) * 100);
                const posUpper = Math.round(((upper - min) / length) * 100);
                let posMeas = ((meas - min) / length) * 100;
                let posPost = ((postMeas - min) / length) * 100;

                if (posMeas < 0) posMeas = 0;
                if (posMeas > 100) posMeas = 100;
                if (posPost < 0) posPost = 0;
                if (posPost > 100) posPost = 100;

                return (
                    <div key={`bar-${title}`} className="card flex flex-col">
                        <div className="p-4 font-medium">{label}</div>
                        <div className="px-4 h-24 flex items-center justify-center">
                            <div className="relative border rounded-3xl h-8 w-5/6 bg-[#FFF5F5] border-[#FF9191]">
                                {!isNaN(posLower) && (
                                    <div className="absolute flex items-center justify-center h-full w-[1px] bg-[#FF9191]" style={{ left: `${posLower}%` }} />
                                )}
                                {!isNaN(posUpper) && (
                                    <div className="absolute flex items-center justify-center h-full w-[1px] bg-[#FF9191]" style={{ left: `${posUpper}%` }} />
                                )}
                                {!isNaN(posMeas) && (
                                    <div
                                        className="absolute -top-7 -translate-x-1/2 text-xs border border-primary bg-white/50 w-20 h-8 flex items-center justify-center rounded"
                                        style={{ left: `${posMeas}%` }}
                                    >
                                        {meas}
                                        <div className="absolute border-b border-r bg-white border-primary w-2 h-2 rotate-45 -bottom-1" />
                                    </div>
                                )}
                                {!!postMeas && !isNaN(posPost) && (
                                    <div
                                        className="absolute -bottom-7 -translate-x-1/2 text-xs border border-primary bg-white/50 w-20 h-8 flex items-center justify-center rounded"
                                        style={{ left: `${posPost}%` }}
                                    >
                                        {postMeas}
                                        <div className="absolute border-t border-l bg-white border-primary w-2 h-2 rotate-45 -top-1" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};
