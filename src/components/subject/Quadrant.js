"use client";

export const Quadrant = ({ trials }) => {
    const results = trials.find(({ bronchodilator, best }) => bronchodilator === "pre" && best)?.results || [];

    const fvc = results.find(({ title }) => title === "FVC") || {};
    const fev1 = results.find(({ title }) => title === "FEV1") || {};

    // x = fvc 측정값(meas) / fvc 예측값(pred)
    // y = fev1 측정값(meas) / fvc 측정값(meas)

    const x = fvc.meas / fvc.pred;
    const y = fev1.meas / fvc.meas;

    const posX = x * 100 > 100 ? 100 : x * 100 < 0 ? 0 : x * 100;
    const posY = y * 100 > 100 ? 100 : y * 100 < 0 ? 0 : y * 100;

    return (
        <section className="card flex flex-col relative w-96 h-96 text-xs [&>div>div]:flex [&>div>div]:justify-center [&>div>div]:items-center [&>div>div]:text-center">
            <div className="flex flex-[3] text-gray-600">
                <div className="flex-[8]">
                    제한성환기장애
                    <br />
                    restrictive
                </div>
                <div className="flex-[2]">
                    정상
                    <br />
                    normal
                </div>
            </div>
            <div className="flex flex-[7] text-gray-600">
                <div className="flex-[8]">
                    혼합형환기장애
                    <br />
                    mixed
                </div>
                <div className="flex-[2]">
                    폐쇄성
                    <br />
                    환기장애
                    <br />
                    obstructive
                </div>
            </div>
            <span className="absolute top-[30%] w-full h-[1px] bg-[#FF9191]" />
            <span className="absolute left-[80%] h-full w-[1px] bg-[#FF9191]" />
            <span className="absolute w-2 h-2 rounded-full -translate-x-1/2 translate-y-1/2 bg-[#FF9191]" style={{ left: `${posX}%`, bottom: `${posY}%` }}>
                <div className="absolute bg-white text-center w-24 rounded-lg border-[#FF9191] border p-2 -translate-x-1/2 left-1/2 translate-y-full -bottom-2 ">
                    {`${x.toFixed(2)} / ${y.toFixed(2)}`}
                    <div className="absolute border-t border-l bg-white border-[#FF9191] w-2 h-2 rotate-45 left-1/2 -translate-x-1/2 -top-1" />
                </div>
            </span>
        </section>
    );
};
