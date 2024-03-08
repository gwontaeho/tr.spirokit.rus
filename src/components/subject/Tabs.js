"use client";
import { useTranslation } from "react-i18next";
import { useSubject } from "@/recoil";

export const Tabs = ({ svc }) => {
    const { t } = useTranslation();

    const [subject, setSubject] = useSubject();
    const { tab = 0 } = subject;

    const TABS = svc ? [t("subject.l.rst_v"), t("subject.l.tot_gph")] : [t("subject.l.rst_v"), t("subject.l.tot_gph"), t("subject.l.f_diag")];

    return (
        <div className="flex w-fit border-b h-12 text-lg [&>div]:flex [&>div]:w-48 [&>div]:justify-center [&>div]:items-center">
            {TABS.map((v, i) => (
                <div
                    aria-selected={tab === i}
                    key={`tab-${v}`}
                    className="border-b cursor-pointer aria-selected:border-primary aria-selected:text-primary hover:text-primary"
                    onClick={() => setSubject((prev) => ({ ...prev, tab: i }))}
                >
                    {v}
                </div>
            ))}
        </div>
    );
};
