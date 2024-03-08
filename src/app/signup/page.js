"use client";
import Link from "next/link";
import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useTranslation } from "react-i18next";
import { checkid, getCountries, getClinics, getRoles, signup } from "@/apis";
import { Loading } from "@/components";
import { useUser } from "@/recoil";

const Input = forwardRef(({ label, message, ...rest }, ref) => {
    return (
        <div className="flex">
            <div className="w-28 h-10 flex items-center">{!!label && <label className="text-sm text-gray-600">{label}</label>}</div>
            <div className="flex flex-col space-y-2">
                <input {...rest} ref={ref} className="input peer" />
                {!!message && <span className="w-96 text-xs text-gray-400 peer-aria-[invalid=true]:text-red-600">{message}</span>}
            </div>
        </div>
    );
});

Input.displayName = "Input";

const Select = forwardRef(({ label, options, ...rest }, ref) => {
    const [hidden, setHidden] = useState(true);

    return (
        <div className="flex">
            <div className="w-28 h-10 flex items-center">
                <label className="text-sm text-gray-600">{label}</label>
            </div>
            <div className="flex flex-col">
                <button
                    type="button"
                    aria-invalid={!!rest["aria-invalid"]}
                    disabled={rest.disabled}
                    className="input text-left focus:outline outline-2 -outline-offset-2"
                    onClick={() => setHidden(false)}
                >
                    {options.find(({ value }) => value === rest.value)?.label}
                </button>
                <div hidden={hidden} className="relative">
                    <div className="fixed w-screen h-screen top-0 left-0" onClick={() => setHidden(true)} />
                    <ul className="card absolute top-2 w-full border bg-white z-50">
                        {options.map(({ value, label }) => {
                            return (
                                <li
                                    key={`${rest.name}-${value}`}
                                    className="flex items-center px-4 h-10 hover:bg-gray-100"
                                    onClick={() => {
                                        rest.onChange(value);
                                        setHidden(true);
                                    }}
                                >
                                    {label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
});

Select.displayName = "Select";

export default function Signup() {
    const { t } = useTranslation();

    const router = useRouter();
    const [_, setUser] = useUser();

    useEffect(() => {
        const accessToken = getCookie("accessToken");
        if (!accessToken) return;
        router.replace("/");
    }, []);

    const {
        control,
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const [alpha2, clinicId] = watch(["alpha2", "clinicId"]);

    const checkidMutation = useMutation({
        mutationFn: (variables) => checkid(variables),
        onSuccess: ({ response }) => {
            if (response) setError("loginId", { type: "d", message: t("signup.m.v_2") });
            else clearErrors("loginId");
        },
    });

    const signupMutation = useMutation({
        mutationFn: (variables) => signup(variables),
        onSuccess: () => router.push("/signin"),
        onError: (error) => console.log(error),
    });

    const countriesQuery = useQuery({ queryKey: ["countries"], queryFn: () => getCountries() });
    const clinicsQuery = useQuery({ queryKey: ["clinics", alpha2], queryFn: () => getClinics(alpha2), enabled: !!alpha2 });
    const rolesQuery = useQuery({ queryKey: ["roles", clinicId], queryFn: () => getRoles(clinicId), enabled: !!clinicId });

    const countries = (countriesQuery.data?.response || []).map(({ name, alpha2 }) => ({ label: name, value: alpha2 }));
    const clinics = (clinicsQuery.data?.response || []).map(({ name, id }) => ({ label: name, value: id }));
    const roles = (rolesQuery.data?.response || []).map(({ name, id }) => ({ label: name, value: id }));

    const onSubmit = (data) => {
        const { loginId, roleId, name, password, confirmPassword } = data;
        signupMutation.mutate({ loginId, roleId, name, password, confirmPassword });
    };

    const REGEX_LOGIN_ID = /^[a-zA-Z0-9]{5,20}$/;
    const REGEX_PASSWORD = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    return (
        <>
            <main className="flex h-screen justify-center items-center">
                <div className="card p-8 flex flex-col space-y-8">
                    <Link href="/signin">
                        <Image priority src="/logo.svg" alt="logo" width={180} height={30} />
                    </Link>
                    <form className="flex flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
                        <Input {...register("name", { required: true })} label={t("signup.l.nm")} aria-invalid={!!errors.name} message={t("signup.m.v_0")} />
                        <Input
                            {...register("loginId", {
                                required: true,
                                pattern: REGEX_LOGIN_ID,
                                validate: {
                                    checkid: (value) => checkidMutation.mutate(value),
                                },
                            })}
                            label={t("signup.l.id")}
                            message={errors.loginId?.message || t("signup.m.v_1")}
                            aria-invalid={!!errors.loginId}
                        />
                        <div className="space-y-2">
                            <Input
                                {...register("password", { required: true, pattern: { value: REGEX_PASSWORD } })}
                                type="password"
                                label={t("signup.l.pw")}
                                aria-invalid={!!errors.password}
                            />
                            <Input
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: (value, formValues) => value === formValues.password,
                                })}
                                type="password"
                                message={t("signup.m.v_3")}
                                aria-invalid={!!errors.confirmPassword}
                            />
                        </div>
                        <Controller
                            name="alpha2"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => {
                                return (
                                    <Select
                                        {...field}
                                        label={t("signup.l.ctr")}
                                        disabled={!countries.length}
                                        options={countries}
                                        aria-invalid={!!errors.alpha2}
                                    />
                                );
                            }}
                        />
                        <Controller
                            name="clinicId"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => {
                                return (
                                    <Select
                                        {...field}
                                        label={t("signup.l.org")}
                                        disabled={!alpha2 || !clinics.length}
                                        options={clinics}
                                        aria-invalid={!!errors.clinicId}
                                    />
                                );
                            }}
                        />
                        <Controller
                            name="roleId"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => {
                                return (
                                    <Select
                                        {...field}
                                        label={t("signup.l.role")}
                                        disabled={!clinicId || !roles.length}
                                        options={roles}
                                        aria-invalid={!!errors.roleId}
                                    />
                                );
                            }}
                        />
                        <button className="input w-full">{t("signup.l.signup")}</button>
                    </form>
                </div>
            </main>
            {signupMutation.isSuccess && <Loading />}
        </>
    );
}
