"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { I18nButton } from "@/components";

import { useUser } from "@/recoil";
import { signin, getMe } from "@/apis";
import { Loading } from "@/components";

export default function Signin() {
    const { t } = useTranslation();

    const router = useRouter();
    const [_, setUser] = useUser();

    const signinMutation = useMutation({
        mutationFn: (variables) => signin(variables),
    });

    const getMeMutation = useMutation({
        mutationFn: (variables) => getMe(variables),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { loginId, password } = data;
        try {
            const {
                response: { accessToken, refreshToken },
            } = await signinMutation.mutateAsync({ loginId, password });
            const {
                response: { id, name, clinicianRoleName },
            } = await getMeMutation.mutateAsync(accessToken);
            setCookie("accessToken", accessToken);
            setCookie("refreshToken", refreshToken);
            setUser({ id, name, clinicianRoleName });
            router.replace("/subjects");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const accessToken = getCookie("accessToken");
        if (!accessToken) return;
        router.replace("/");
    }, []);

    const formError = !!errors.loginId || !!errors.password;
    const isError = formError || signinMutation.isError || getMeMutation.isError;
    const isLoading = signinMutation.isLoading || getMeMutation.isLoading;
    const isSuccess = signinMutation.isSuccess && getMeMutation.isSuccess;
    const status = formError ? 401 : signinMutation.error?.response?.status;
    const errorMessage = {
        400: t("signin.m.v_1"),
        401: t("signin.m.v_0"),
        403: t("signin.m.v_2"),
    };

    return (
        <>
            <main className="flex h-screen justify-center items-center">
                <div className="card flex flex-col">
                    <div className="flex items-center justify-center h-60">
                        <Image priority src="/logo.svg" alt="logo" width={240} height={30} />
                    </div>
                    <form className="px-8 pb-8 flex flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="text-gray-600 w-24">{t("signin.l.id")}</div>
                                <input className="input" {...register("loginId", { required: true })} />
                            </div>
                            <div className="flex items-center">
                                <div className="text-gray-600 w-24">{t("signin.l.pw")}</div>
                                <input className="input" autoComplete="off" type="password" {...register("password", { required: true })} />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <button className="input w-full">{t("signin.l.signin")}</button>
                            <Link href="/signup">
                                <button className="input w-full">{t("signin.l.signup")}</button>
                            </Link>
                        </div>
                        {isError && <div className="text-red-600 text-sm text-center">{errorMessage[status]}</div>}
                    </form>
                    <div className="flex px-4 pb-4 justify-end">
                        <I18nButton />
                    </div>
                </div>
            </main>
            {(isLoading || isSuccess) && <Loading />}
        </>
    );
}
