"use client";

import { useLocale } from "@/hooks";

export const I18nButton = () => {
  const { locale, setLocale } = useLocale();

  const locales = [
    { label: "KO", value: "ko" },
    { label: "EN", value: "en" },
    { label: "RU", value: "ru" },
  ];

  return (
    <select
      className="input w-fit"
      value={locale}
      onChange={(e) => setLocale(e.target.value)}
    >
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
