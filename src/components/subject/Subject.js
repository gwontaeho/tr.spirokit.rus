"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const Subject = ({ data }) => {
    const { t } = useTranslation();

    const { chartNumber, name, birthday, gender, subjectDetails = {} } = data;
    const { weight, height, smoking, smokingExperience, smokingPackYear, smokingStartAge, smokingStopAge } = subjectDetails;
    const period = smokingExperience
        ? !!smokingStopAge
            ? `${Number(smokingStopAge) - Number(smokingStartAge)}년`
            : `${new Date().getFullYear() - Number(birthday.slice(0, 4)) + 1 - Number(smokingStartAge)}년`
        : "-";

    const GENDERS = { m: "남", f: "여" };

    return (
        <section className="card w-80">
            <div className="p-4 font-medium">{t("subject.l.sbj_inf")}</div>
            <div className="p-4 flex flex-col text-sm space-y-4 [&>div]:flex [&>div>span]:w-32 [&>div>span]:text-gray-400">
                <div>
                    <span>{t("subject.l.cn")}</span>
                    <p>{chartNumber}</p>
                </div>
                <div>
                    <span>{t("subject.l.nm")}</span>
                    <p>{name}</p>
                </div>
                <div>
                    <span>{t("subject.l.birth")}</span>
                    <p>{birthday}</p>
                </div>
                <div>
                    <span>{t("subject.l.sex")}</span>
                    <p>{t(`subject.l.${gender}`)}</p>
                </div>
                <div>
                    <span>{t("subject.l.wgt")}</span>
                    <p>{weight} kg</p>
                </div>
                <div>
                    <span>{t("subject.l.hgt")}</span>
                    <p>{height} cm</p>
                </div>
                <div>
                    <span>{t("subject.l.exp")}</span>
                    <p>{smokingExperience ? t("subject.l.y") : t("subject.l.n")}</p>
                </div>
                <div>
                    <span>{t("subject.l.cur")}</span>
                    <p>{smokingExperience ? (smoking ? t("subject.l.y") : t("subject.l.y")) : "-"}</p>
                </div>
                <div>
                    <span>{t("subject.l.p_year")}</span>
                    <p>{!!smokingPackYear ? `${smokingPackYear}${t("subject.l.pack")}` : "-"}</p>
                </div>
                <div>
                    <span>{t("subject.l.period")}</span>
                    <p>{period}</p>
                </div>
                <Link href={`/subjects/${chartNumber}/update`}>
                    <button className="input h-8 w-full">{t("subject.l.mdf")}</button>
                </Link>
            </div>
        </section>
    );
};
