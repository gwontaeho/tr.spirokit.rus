"use client";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSubject } from "@/recoil";

const Modal = ({ setOpen, date_from, date_to }) => {
  const { t } = useTranslation();

  const [_, setSubject] = useSubject();

  const [from, setFrom] = useState(date_from || "");
  const [to, setTo] = useState(date_to || "");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChangeFrom = ({ target: { value } }) => {
    setFrom(value);
  };

  const handleChangeTo = ({ target: { value } }) => {
    setTo(value);
  };

  const handleConfirm = () => {
    setSubject((prev) => ({ chartNumber: prev.chartNumber, date_from: from, date_to: to }));
    setOpen(false);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/30"
      onClick={() => setOpen(false)}>
      <div className="card flex flex-col w-[400px] p-4 space-y-8" onClick={(e) => e.stopPropagation()}>
        <Image priority src="/logo.svg" alt="logo" width={120} height={20} />
        <div className="flex space-x-4">
          <div className="flex flex-1 flex-col space-y-2">
            <label className="text-sm text-gray-400">{t("subject.l.start")}</label>
            <input type="date" className="input w-full" value={from} onChange={handleChangeFrom} />
          </div>
          <div className="flex flex-1 flex-col space-y-2">
            <label className="text-sm text-gray-400">{t("subject.l.end")}</label>
            <input type="date" className="input w-full" value={to} onChange={handleChangeTo} />
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="input" onClick={() => setOpen(false)}>
            {t("subject.l.close")}
          </button>
          <button className="input" onClick={handleConfirm}>
            {t("subject.l.ok")}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Histories = ({ data }) => {
  const { t } = useTranslation();

  const [subject, setSubject] = useSubject();
  const { chartNumber, date, date_from, date_to } = subject;

  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="card">
        <div className="p-4 font-medium">{t("subject.l.mea_his")}</div>
        <div className="flex justify-between items-center p-4 text-primary text-sm [&>button]:text-lg">
          <div>{!date_from && !date_to ? t("subject.l.all") : `${date_from || ""} ~ ${date_to || ""}`}</div>
          <button className="material-symbols-outlined" onClick={() => setOpen(true)}>
            date_range
          </button>
        </div>
        <ul className="text-sm max-h-96 overflow-y-auto [&>li]:p-4">
          {!data.length && <li>{t("subject.m.i_0")}</li>}
          {data.map((v) => (
            <li
              aria-selected={v === date}
              className="cursor-pointer aria-selected:bg-slate-100 hover:bg-gray-100 last:rounded-b-lg"
              key={`histories-${v}`}
              onClick={() =>
                setSubject((prev) => ({ chartNumber, date: v, date_from: prev.date_from, date_to: prev.date_to }))
              }>
              {v}
            </li>
          ))}
        </ul>
      </section>
      {open && createPortal(<Modal setOpen={setOpen} date_from={date_from} date_to={date_to} />, document.body)}
    </>
  );
};
