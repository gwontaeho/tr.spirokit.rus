"use client";
import { useTranslation } from "react-i18next";
import { useSubject } from "@/recoil";
import { TITLES_RESULT_FVC, TITLES_RESULT_SVC } from "@/constants";

export const Selected = ({ trials, svc }) => {
    const { t } = useTranslation();

    const [subject] = useSubject();
    const { pre_r, post_r } = subject;

    const pre = trials.find(({ measurementId }) => measurementId === pre_r)?.results || [];
    const post = trials.find(({ measurementId }) => measurementId === post_r)?.results || [];

    const titles = svc ? TITLES_RESULT_SVC : TITLES_RESULT_FVC;

    return (
        <ul className="card overflow-y-auto w-96 text-xs [&>li]:flex [&>li]:h-12 [&>li]:text-center [&>li>p]:flex-1 [&>li>p]:flex [&>li>p]:justify-center [&>li>p]:items-center">
            <li className="bg-header sticky top-0">
                <p></p>
                <p>{t("subject.l.ept_v")}</p>
                <p>{t("subject.l.per")}(%)</p>
                <p>{t("subject.l.n_ran")}</p>
                <p>chg</p>
            </li>
            {titles.map((v) => {
                const { pred, per, lower, upper, meas: preMeas } = pre.find(({ title }) => title === v.title) || {};
                const { meas: postMeas } = post.find(({ title }) => title === v.title) || {};
                const range = !!lower && !!upper ? `${lower || "-"}~${upper || "-"}` : "-";
                const chg = ((Number(postMeas) / Number(preMeas)) * 100).toFixed(2);

                return (
                    <li key={`selected-${v.title}`}>
                        <p>
                            {v.title}({v.unit})
                        </p>
                        <p>{pred || "-"}</p>
                        <p>{per || "-"}</p>
                        <p>{range}</p>
                        <p>{isNaN(chg) ? "-" : chg}</p>
                    </li>
                );
            })}
        </ul>
    );
};
