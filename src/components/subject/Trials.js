"use client";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useSubject } from "@/recoil";
import { TITLES_RESULT_FVC, TITLES_RESULT_SVC, COLORS_GRAPH } from "@/constants";

export const Trials = ({ trials, type, svc }) => {
    const { t: i18n } = useTranslation();

    const [subject, setSubject] = useSubject();
    const { pre_r, post_r, pre_g, post_g } = subject;

    const r = type === "pre" ? pre_r : post_r;
    const g = type === "pre" ? pre_g : post_g;

    const t = trials.filter(({ bronchodilator }) => bronchodilator === type);
    const preCount = trials.filter(({ bronchodilator }) => bronchodilator === "pre").length;

    const titles = svc ? TITLES_RESULT_SVC : TITLES_RESULT_FVC;

    // const { measurementId, results, date, best } = t?.[0] || {};
    // const d = date ? dayjs(date).format("HH:mm") : "";
    
    return (
        
        <ul className="card relative overflow-y-auto flex flex-1 text-center text-xs [&>li]:flex-1 [&>li>*]:flex [&>li>*]:items-center [&>li>*]:justify-center [&>li>*]:h-12">
            <li className="h-fit">
                <p className="sticky top-0 bg-header">{type.toUpperCase()} </p>
                {/* <p>{i18n("subject.l.mea_time")}</p> */}
                {titles.map(({ title, unit }) => (
                    <p key={`title-fvc-${title}`}>
                        {title}({unit})
                    </p>
                ))}
            </li>
            {Array(8)
                .fill(0)
                .map((_, i) => {
                    
                    const { measurementId, results, date, best } = t?.[i] || {};
                    const d = date ? dayjs(date).format("HH:mm") : "";

                    return (
                        <li
                            aria-selected={!!measurementId && measurementId === r}
                            key={`trial-${measurementId}-${i}`}
                            className="h-fit aria-selected:bg-slate-100 hover:bg-gray-100 cursor-pointer"
                            onClick={() => !!measurementId && setSubject((prev) => ({ ...prev, [`${type}_r`]: measurementId }))}
                        >
                            <label
                                data-best={best}
                                className="[&>span]:text-base cursor-pointer sticky top-0 bg-header border border-transparent"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {!!measurementId && (
                                    <>
                                        {i + 1}
                                        <input
                                            checked={g?.includes(measurementId)}
                                            type="checkbox"
                                            className="absolute top-1 right-1 w-3 cursor-pointer"
                                            style={{ accentColor: COLORS_GRAPH[type === "pre" ? i : preCount + i] }}
                                            onChange={(e) => {
                                                setSubject((prev) => {
                                                    const prev_g = prev[`${type}_g`];
                                                    const next_g = !prev_g
                                                        ? [measurementId]
                                                        : prev_g.includes(measurementId)
                                                        ? prev_g.filter((v) => v !== measurementId)
                                                        : [...prev_g, measurementId];

                                                    return { ...prev, [`${type}_g`]: next_g };
                                                });
                                            }}
                                        />
                                        {best && <span className="material-symbols-outlined absolute top-0 left-0 text-primary">star</span>}
                                    </>
                                )}
                            </label>
                            {/* <p>{d}</p> */}
                            {titles.map((v) => (
                                <p key={`meas-fvc-${v.title}`}>{results?.find(({ title }) => title === v.title)?.meas}</p>
                            ))}
                        </li>
                    );
                })}
        </ul>
    );
};
