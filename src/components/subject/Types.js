"use client";
import html2canvas from "html2canvas";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";
import { useSubject } from "@/recoil";

export const Types = ({ options }) => {
    const { t } = useTranslation();

    const [subject, setSubject] = useSubject();
    const { chartNumber, type = 0 } = subject;

    const handleClickJpg = async (i) => {
        try {
            const report = document.querySelector(`#report-${i}`);
            const canvas = await html2canvas(report, { scale: 2 });
            const uri = canvas.toDataURL("image/jpeg", 1.0);
            let link = document.createElement("a");
            link.href = uri;
            const title = `${chartNumber}_${dayjs().format("YYYYMMDD_HHmmss")}`;
            link.download = `${title}.jpeg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {}
    };

    const handleClickPdf = async (i) => {
        try {
            const report = document.querySelector(`#report-${i}`);
            const canvas = await html2canvas(report, { scale: 2 });
            const uri = canvas.toDataURL("image/jpeg", 1.0);
            const doc = new jsPDF("p", "mm", "a4");
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            doc.addImage(uri, "JPEG", 0, 0, pageWidth, pageHeight);
            const title = `${chartNumber}_${dayjs().format("YYYYMMDD_HHmmss")}`;
            doc.save(`${title}.pdf`);
        } catch (error) {}
    };

    return (
        <section className="card">
            <div className="p-4 font-medium">{t("subject.l.mea_type")}</div>
            {options.map(({ label, isNull, isLoading, hasReport }, i) => {
                return (
                    <div key={`type-${label}`} className="flex text-sm p-4 h-16 items-center">
                        <label className="flex-1 flex space-x-4">
                            <p className="w-12">{label}</p>
                            {!isLoading && !isNull && (
                                <input
                                    className="w-4"
                                    type="radio"
                                    checked={type === i}
                                    onChange={() => setSubject((prev) => ({ ...prev, type: i, tab: 0 }))}
                                />
                            )}
                        </label>
                        {hasReport &&
                            !isLoading &&
                            (isNull ? (
                                <p>{t("subject.m.i_0")}</p>
                            ) : (
                                <div className="flex space-x-2">
                                    <button className="input w-fit h-8" onClick={() => handleClickJpg(i)}>
                                        JPG
                                    </button>
                                    <button className="input w-fit h-8" onClick={() => handleClickPdf(i)}>
                                        PDF
                                    </button>
                                </div>
                            ))}
                    </div>
                );
            })}
        </section>
    );
};
