"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import { axiosInstance, refreshHeader } from "@/apis";

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Providers = ({ children }) => {
    const router = useRouter();

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
                queryCache: new QueryCache({
                    onError: async (error, query) => {
                        if (error.response.status !== 401) return;
                        try {
                            const {
                                data: {
                                    response: { accessToken },
                                },
                            } = await axiosInstance.post("/v1/auth/renewal", null, refreshHeader());
                            setCookie("accessToken", accessToken);
                            error.config.headers.Authorization = `Bearer ${accessToken}`;
                            return query.fetch();
                        } catch (error) {
                            deleteCookie("accessToken");
                            deleteCookie("refreshToken");
                            router.replace("/signin");
                        }
                    },
                }),
            })
    );

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
