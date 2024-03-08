"use client";

import { useEffect, useState, useContext } from "react";
import i18n from "@/locales/i18n";
import { LocaleContext } from "./LocaleProvider";

export const I18nButton = () => {
    const { lang, setLang } = useContext(LocaleContext);

    const locales = [
        { label: "KO", value: "ko" },
        { label: "EN", value: "en" },
    ];

    return (
        <select className="input w-fit" value={lang} onChange={(e) => setLang(e.target.value)}>
            {locales.map(({ label, value }) => {
                return (
                    <option key={`locale-${value}`} value={value}>
                        {label}
                    </option>
                );
            })}
        </select>
    );
};
