"use client";

import Link from "next/link";
import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { LOCALES } from "@/constants";
import { useLocale } from "@/hooks";
import { getMe } from "@/apis";

export const Header = ({ h1 }) => {
    const { t } = useTranslation();
    const { locale, setLocale } = useLocale();

    const accessToken = getCookie("accessToken");

    const { data } = useQuery({
        queryKey: ["getMe"],
        queryFn: () => getMe(accessToken),
        enabled: !!accessToken,
    });

    return (
        <header className="h-20 px-8 flex items-center justify-between bg-white border-b">
            <h1 className="text-xl font-medium">{t(h1)}</h1>
            <div className="flex items-center space-x-4">
                <select className="input w-fit" value={locale} onChange={(e) => setLocale(e.target.value)}>
                    {LOCALES.map(({ label, value }) => {
                        return (
                            <option key={`locale-${value}`} value={value}>
                                {label}
                            </option>
                        );
                    })}
                </select>

                <Link href="/settings" className="material-symbols-outlined text-primary">
                    settings
                </Link>
            </div>
        </header>
    );
};
