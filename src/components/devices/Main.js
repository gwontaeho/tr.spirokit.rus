"use client";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";
import { Calibration, Graph } from "@/components/devices";
import { getDevices, getCalibrations, getCalibration } from "@/apis";

const Report = ({ selectedDevice, calibration }) => {
    const { date, temperature, pressure, humidity, gain = {}, inhale = {}, exhale = {} } = calibration;

    return (
        <div className="absolute w-0 h-0 overflow-hidden">
            <div id="report-device" className="relative w-[1090px] h-[1682px] min-w-[1090px] min-h-[1682px] px-[30px] bg-white">
                <div className="absolute top-0 left-0 w-[144px] h-[144px]">
                    <Image priority src="/logo_tr.svg" alt="logo_tr" width={144} height={144} />
                </div>
                <div className="flex flex-col items-center justify-between h-[120px] pt-[32px] text-[#1B3FA7] font-[700] mb-[32px]">
                    <div className="text-[30px]">SPIROMETRY REPORT</div>
                    {/* <div className="text-[24px]">[ ? ]</div> */}
                </div>
                <div className="text-center h-[38px] bg-[#DEE9FF] text-[24px] font-[700] mb-[16px]">SpiroKit Serial Number</div>
                <div className="border border-black flex mb-[16px] font-[600] [&>div]:py-1.5 [&>div]:px-3">
                    <div className="flex-1 border-r border-black">SpiroKit Serial Number</div>
                    <div className="flex-1">{selectedDevice}</div>
                </div>
                <div className="text-center h-[38px] bg-[#DEE9FF] text-[24px] font-[700] mb-[16px]">Date</div>
                <div className="border border-black flex mb-[16px] font-[600] [&>div]:py-1.5 [&>div]:px-3">
                    <div className="flex-1 border-r border-black">Calibration Date</div>
                    <div className="flex-1">{date}</div>
                </div>
                <div className="text-center h-[38px] bg-[#DEE9FF] text-[24px] font-[700] mb-[16px]">Environment</div>
                <div className="border border-black mb-[16px] font-[600] [&>div>div]:py-1.5 [&>div>div]:px-3">
                    <div className="flex border-b border-black">
                        <div className="flex-1 border-r border-black">Temperature(°C)</div>
                        <div className="flex-1">{temperature}</div>
                    </div>
                    <div className="flex border-b border-black">
                        <div className="flex-1 border-r border-black">Pressure(cmH2O)</div>
                        <div className="flex-1">{pressure}</div>
                    </div>
                    <div className="flex">
                        <div className="flex-1 border-r border-black">Humidity(%)</div>
                        <div className="flex-1">{humidity}</div>
                    </div>
                </div>
                <div className="text-center h-[38px] bg-[#DEE9FF] text-[24px] font-[700] mb-[16px]">Gain</div>
                <div className="border border-black mb-[16px] font-[600] [&>div>div]:py-1.5 [&>div>div]:px-3">
                    <div className="flex border-b border-black">
                        <div className="flex-1 border-r border-black">Inhale Gain</div>
                        <div className="flex-1">{gain.inhale}</div>
                    </div>
                    <div className="flex">
                        <div className="flex-1 border-r border-black">Exhale Gain</div>
                        <div className="flex-1">{gain.exhale}</div>
                    </div>
                </div>
                <div className="text-center h-[38px] bg-[#DEE9FF] text-[24px] font-[700] mb-[16px]">Calibration Result</div>
                <div className="border border-black mb-[16px] font-[600] [&>div>div]:py-1.5 [&>div>div]:px-3">
                    <div className="flex border-b border-black">
                        <div className="flex-1 border-r border-black">Inhale Volume(L)</div>
                        <div className="flex-1">{inhale.meas}</div>
                    </div>
                    <div className="flex border-b border-black">
                        <div className="flex-1 border-r border-black">Inhale Error(%)</div>
                        <div className="flex-1">{inhale.error}</div>
                    </div>
                    <div className="flex border-b border-black">
                        <div className="flex-1 border-r border-black">Exhale Volume(L)</div>
                        <div className="flex-1">{exhale.meas}</div>
                    </div>
                    <div className="flex">
                        <div className="flex-1 border-r border-black">Exhale Error(%)</div>
                        <div className="flex-1">{exhale.error}</div>
                    </div>
                </div>
                <Graph calibration={calibration} />
            </div>
        </div>
    );
};

export const Main = () => {
    const { t } = useTranslation();

    const [selectedDevice, setSelectedDevice] = useState();
    const [selectedCalibration, setSelectedCalibration] = useState();

    const devicesQuery = useQuery({ queryKey: ["devices"], queryFn: () => getDevices() });
    const calibrationsQuery = useQuery({
        queryKey: ["calibrations", selectedDevice],
        queryFn: () => getCalibrations(selectedDevice),
        enabled: !!selectedDevice,
    });
    const calibrationQuery = useQuery({
        queryKey: ["calibration", selectedCalibration],
        queryFn: () => getCalibration(selectedCalibration),
        enabled: !!selectedCalibration,
    });

    const devices = devicesQuery.data?.response || [];
    const calibrations = calibrationsQuery.data?.response || [];
    const calibration = calibrationQuery.data?.response || {};

    const handleClickJpg = async () => {
        try {
            const report = document.querySelector("#report-device");
            const canvas = await html2canvas(report, { scale: 2 });
            const uri = canvas.toDataURL("image/jpeg", 1.0);
            let link = document.createElement("a");
            link.href = uri;
            const title = `${selectedDevice}_${dayjs().format("YYYYMMDD_HHmmss")}`;
            link.download = `${title}.jpeg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {}
    };

    const handleClickPdf = async () => {
        try {
            const report = document.querySelector("#report-device");
            const canvas = await html2canvas(report, { scale: 2 });
            const uri = canvas.toDataURL("image/jpeg", 1.0);
            const doc = new jsPDF("p", "mm", "a4");
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            doc.addImage(uri, "JPEG", 0, 0, pageWidth, pageHeight);
            const title = `${selectedDevice}_${dayjs().format("YYYYMMDD_HHmmss")}`;
            doc.save(`${title}.pdf`);
        } catch (error) {}
    };

    return (
        <>
            <main className="flex p-8 space-x-8">
                <div className="space-y-4">
                    <section className="w-80 card">
                        <div className="p-4 font-medium">{t("dev.l.list")}</div>
                        <ul className="text-sm [&>li]:p-4 [&>li]:flex [&>li>span]:w-28">
                            <li>
                                <span>{t("dev.l.sn")}</span>
                                <p>{t("dev.l.cnt")}</p>
                            </li>
                            {devices.map(({ serialNumber, calibrationCount }) => (
                                <li
                                    aria-selected={serialNumber === selectedDevice}
                                    className="cursor-pointer aria-selected:bg-slate-100 hover:bg-gray-100 last:rounded-b-lg"
                                    key={`device-${serialNumber}`}
                                    onClick={() => setSelectedDevice(serialNumber)}
                                >
                                    <span>{serialNumber}</span>
                                    <p>{calibrationCount}</p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {!!selectedDevice && (
                        <section className="card">
                            <div className="p-4 font-medium">{t("dev.l.his")}</div>
                            <ul className="text-sm max-h-96 overflow-y-auto [&>li]:p-4">
                                {calibrations.map(({ calibrationId, date }) => (
                                    <li
                                        key={`calibration-${calibrationId}`}
                                        aria-selected={calibrationId === selectedCalibration}
                                        className="cursor-pointer aria-selected:bg-slate-100 hover:bg-gray-100 last:rounded-b-lg"
                                        onClick={() => setSelectedCalibration(calibrationId)}
                                    >
                                        {date}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {!!selectedCalibration && (
                        <section className="card">
                            <div className="p-4 font-medium">{t("dev.l.down")}</div>
                            <div className="flex items-center justify-center space-x-4 text-sm p-4">
                                <button className="input h-8 w-fit" onClick={handleClickJpg}>
                                    JPG
                                </button>
                                <button className="input h-8 w-fit" onClick={handleClickPdf}>
                                    PDF
                                </button>
                            </div>
                        </section>
                    )}
                </div>

                {!!selectedCalibration && (
                    <div className="flex flex-col flex-1 space-y-4">
                        <Calibration calibration={calibration} />
                        <Graph calibration={calibration} />
                    </div>
                )}
            </main>
            {calibrationQuery.isSuccess && <Report selectedDevice={selectedDevice} calibration={calibration} />}
        </>
    );
};
