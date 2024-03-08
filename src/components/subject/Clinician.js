"use client";
import { useTranslation } from "react-i18next";

export const Clinician = ({ data }) => {
    const { t } = useTranslation();

    const { clinicianName, clinicianRoleName } = data;

    return (
        <section className="card w-80">
            <div className="p-4 font-medium">{t("subject.l.cli_inf")}</div>
            <div className="p-4 flex flex-col text-sm space-y-4 [&>div]:flex [&>div>span]:w-32 [&>div>span]:text-gray-400">
                <div>
                    <span>{t("subject.l.nm")}</span>
                    <p>{clinicianName}</p>
                </div>
                <div>
                    <span>{t("subject.l.role")}</span>
                    <p>{clinicianRoleName}</p>
                </div>
            </div>
        </section>
    );
};
