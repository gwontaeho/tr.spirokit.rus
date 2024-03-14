"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";
import { axiosInstance, refreshHeader } from "@/apis";

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

class Holder {
    isLocked = false;
    promise;
    reject;
    resolve;
    constructor() {
        this.hold();
    }
    hold() {
        this.promise = new Promise((resolve, reject) =>
            Object.assign(this, {
                reject: () => {
                    this.isLocked = false;
                    reject(this.hold());
                },
                resolve: () => {
                    this.isLocked = false;
                    resolve(this.hold());
                },
            })
        );
    }
    lock() {
        this.isLocked = true;
    }
}
export const QueryProvider = ({ children }) => {
    const router = useRouter();

    const holder = useRef(new Holder());

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: { refetchOnWindowFocus: false, retry: false },
                },
                queryCache: new QueryCache({
                    onError: async (error, query) => {
                        if (error.response.status !== 401) return;

                        if (holder.current.isLocked) {
                            try {
                                /* await for resolve */
                                await holder.current.promise;
                                return query.fetch();
                            } catch (error) {
                                /* reject (refresh error) */
                                return;
                            }
                        } else {
                            holder.current.lock();
                        }

                        /* try refresh */
                        try {
                            const {
                                data: {
                                    response: { accessToken },
                                },
                            } = await axiosInstance.post("/v1/auth/renewal", null, refreshHeader());
                            setCookie("accessToken", accessToken);
                            error.config.headers.Authorization = `Bearer ${accessToken}`;

                            /* unlock with resolve */
                            holder.current.resolve();
                            return query.fetch();
                        } catch (error) {
                            /* unlock with reject */
                            holder.current.reject();
                            deleteCookie("accessToken");
                            deleteCookie("refreshToken");
                            router.replace("/signin");
                            return;
                        }
                    },
                }),
            })
    );

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
