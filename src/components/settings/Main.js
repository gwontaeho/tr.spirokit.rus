"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getCookie, deleteCookie } from "cookies-next";

import { Loading } from "@/components";
import { useUser, useSubject } from "@/hooks";
import { getMe } from "@/apis";

export const Main = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const [, , resetUser] = useUser();
    const [, , resetSubject] = useSubject();
    const accessToken = getCookie("accessToken");

    const { data } = useQuery({
        queryKey: ["getMe"],
        queryFn: () => getMe(accessToken),
    });
    const { name, clinicianRoleName } = data?.response || {};

    const [isLoading, setIsLoading] = useState(false);

    const handleClickSignout = () => {
        setIsLoading(true);
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        resetUser();
        resetSubject();
        router.replace("/signin");
    };

    return (
        <>
            <main className="p-8">
                <section className="card w-80">
                    <div className="p-4 font-medium">{t("PJ.ACCT_INFO")}</div>
                    <div className="p-4 flex flex-col text-sm space-y-4 [&>div]:flex [&>div>span]:w-24 [&>div>span]:text-gray-400">
                        <div>
                            <span>{t("PJ.NM")}</span>
                            <p>{name}</p>
                        </div>
                        <div>
                            <span>{t("PJ.ROLE")}</span>
                            <p>{clinicianRoleName}</p>
                        </div>
                        <button className="input h-8 w-full" onClick={handleClickSignout}>
                            {t("PJ.SGN_OUT")}
                        </button>
                    </div>
                </section>
            </main>
            {isLoading && <Loading />}
        </>
    );
};
