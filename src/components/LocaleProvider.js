"use client";

import "@/locales/i18n";
import i18n from "@/locales/i18n";

import { useState, useEffect, createContext } from "react";
import { Loading } from "./Loading";

export const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
    const [lang, setLang] = useState();

    useEffect(() => {
        setLang(localStorage.getItem("lang") || "ko");
    }, []);

    useEffect(() => {
        if (!lang) return;
        localStorage.setItem("lang", lang);
        i18n.changeLanguage(lang);
    }, [lang]);

    return (
        <>
            <LocaleContext.Provider value={{ lang, setLang }}>{children}</LocaleContext.Provider>
            {!lang && <div className="fixed top-0 w-full h-full bg-white" />}
        </>
    );
};
