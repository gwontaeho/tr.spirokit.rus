"use client";

import { useLayoutEffect, useState } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { appWithTranslation } from "next-i18next";
import { useLocale } from "@/hooks";

// import en from "./locale-en.json";
// import ko from "./locale-ko.json";
// import ru from "./locale-ru.json";

import en from "./locale-en.v2.json";
import ko from "./locale-ko.v2.json";
import ru from "./locale-ru.v2.json";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en,
        },
        ko: {
            translation: ko,
        },
        ru: {
            translation: ru,
        },
    },
    lng: "ko",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;

/* temp */
export const LocaleProvider = appWithTranslation(({ children }) => {
    const [initLocale, setInitLocale] = useState(false);
    const { locale, setLocale } = useLocale();

    useLayoutEffect(() => {
        const lang = localStorage.getItem("lang");
        if (locale !== lang) setLocale(lang);
        setInitLocale(true);
    }, []);

    if (!initLocale) return <body />;
    return children;
});
