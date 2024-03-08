"use client";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";

import { Loading } from "@/components";
import { getClinicians, updateClinicianStatus } from "@/apis";

export const Main = () => {
    const { t } = useTranslation();

    const perPage = 16;
    const [name, setName] = useState("");
    const [page, setPage] = useState(1);

    const { register, handleSubmit } = useForm();

    const { data, isLoading, refetch } = useQuery({ queryKey: ["clinicians", name], queryFn: () => getClinicians({ name, page: 1, size: 999 }) });
    const clinicians = data?.response || [];
    const total = clinicians.length;
    const chunked = [];
    for (let i = 0; i < clinicians.length; i += perPage) {
        const sliced = clinicians.slice(i, i + perPage);
        chunked.push(sliced);
    }

    const mutation = useMutation({
        mutationFn: (variables) => updateClinicianStatus(variables),
        onSuccess: refetch,
    });

    const onSubmit = ({ name }) => {
        setName(name);
        setPage(1);
    };

    const handleClick = ({ clinicianId, status }) => {
        mutation.mutate({ clinicianId, status: status === "enabled" ? "disabled" : "enabled" });
    };

    return (
        <>
            <main className="p-8 space-y-4">
                <form className="flex space-x-4" onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name")} className="input" placeholder={t("cli.m.p_0")} />
                    <button className="material-symbols-outlined input w-fit">search</button>
                </form>
                <div className="flex-1 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {clinicians.map((v, i) => {
                        const { clinicianId, clinicianName, date, roleName, status } = v;

                        return (
                            <div
                                key={`clinician-${clinicianId}`}
                                className="relative card h-40 p-4 flex flex-col justify-between [&>div]:flex [&>div]:items-center [&>div>span]:w-32 [&>div>span]:text-gray-400 [&>div>span]:text-sm"
                            >
                                <div>
                                    <span>{t("cli.l.nm")}</span>
                                    <p className="text-primary">{clinicianName}</p>
                                </div>
                                <div>
                                    <span>{t("cli.l.role")}</span>
                                    <p>{roleName}</p>
                                </div>
                                <div>
                                    <span>{t("cli.l.reg_dt")}</span>
                                    <p>{date}</p>
                                </div>
                                <div>
                                    <span>{t("cli.l.aut_man")}</span>
                                    <p data-status={status} className="text-green-600 data-[status=disabled]:text-red-600">
                                        {status === "enabled" ? t("cli.l.aut") : t("cli.l.den")}
                                    </p>
                                </div>
                                <button className="bottom-4 right-4 absolute input h-8 w-fit" onClick={() => handleClick({ clinicianId, status })}>
                                    {status === "enabled" ? t("cli.l.den") : t("cli.l.aut")}
                                </button>
                            </div>
                        );
                    })}
                </div>
                {/* {!!total && <Pagination page={page} perPage={perPage} count={total} onChange={(v) => setPage(v)} />} */}
            </main>
            {(isLoading || mutation.isLoading) && <Loading />}
        </>
    );
};

// export const Main = () => {
//     const perPage = 10;
//     const [name, setName] = useState("");
//     const [page, setPage] = useState(1);

//     const { register, handleSubmit } = useForm();

//     const { data, refetch } = useQuery({ queryKey: ["clinicians", name], queryFn: () => getClinicians({ name, page: 1, size: 999 }) });
//     const clinicians = data?.response?.clinicians || [];
//     const total = clinicians.length;
//     const chunked = [];
//     for (let i = 0; i < clinicians.length; i += perPage) {
//         const sliced = clinicians.slice(i, i + perPage);
//         const slicedLength = sliced.length;
//         if (slicedLength < perPage) for (let j = 0; j < perPage - slicedLength; j++) sliced.push({});
//         chunked.push(sliced);
//     }

//     const { mutate } = useMutation({
//         mutationFn: (variables) => updateClinicianStatus(variables),
//         onSuccess: refetch,
//     });

//     const onSubmit = ({ name }) => {
//         setName(name);
//         setPage(1);
//     };

//     const handleClick = ({ clinicianId, status }) => {
//         mutate({ clinicianId, status: status === "enabled" ? "disabled" : "enabled" });
//     };

//     return (
//         <main className="p-8 space-y-4">
//             <form className="flex space-x-4" onSubmit={handleSubmit(onSubmit)}>
//                 <input {...register("name")} className="input" />
//                 <button className="material-symbols-outlined input w-fit">search</button>
//             </form>
//             <table className="rounded-lg overflow-hidden shadow bg-white w-full text-sm max-w-screen-2xl">
//                 <thead className="bg-header [&_th]:p-4 [&_th]:font-normal [&_th]:w-60">
//                     <tr>
//                         <th>이름</th>
//                         <th>등록일자</th>
//                         <th>직책</th>
//                         <th>승인여부</th>
//                         <th>승인관리</th>
//                     </tr>
//                 </thead>
//                 <tbody className="text-gray-600 [&_td]:text-center [&_td]:p-4 [&_td]:py-4">
//                     {(chunked[page - 1] || []).map(({ clinicianId, clinicianName, date, roleName, status }, i) => {
//                         const key = `clinician-${clinicianId || i}`;

//                         return (
//                             <tr key={key}>
//                                 <td>{clinicianName || "-"}</td>
//                                 <td>{date}</td>
//                                 <td>{roleName}</td>
//                                 <td>{status}</td>
//                                 <td>
//                                     {!!clinicianId && (
//                                         <button className="input h-8 w-fit" onClick={() => handleClick({ clinicianId, status })}>
//                                             {status === "enabled" ? "거부" : "승인"}
//                                         </button>
//                                     )}
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//             <Pagination page={page} perPage={perPage} count={total} onChange={(v) => setPage(v)} />
//         </main>
//     );
// };
