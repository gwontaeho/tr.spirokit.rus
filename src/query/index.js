"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";
import { axiosInstance, refreshHeader } from "@/apis";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

class Holder {
  promise;
  resolve;
  reject;
  constructor() {
    this.hold();
  }
  hold() {
    this.promise = new Promise((resolve, reject) =>
      Object.assign(this, { reject, resolve })
    );
  }
}

export const QueryProvider = ({ children }) => {
  const router = useRouter();

  const lock = useRef({
    status: false,
    holder: new Holder(),
  });

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false, retry: false },
        },
        queryCache: new QueryCache({
          onError: async (error, query) => {
            if (error.response.status !== 401) return;

            if (lock.current.status === true) {
              await lock.current.holder.promise;
              return query.fetch();
            } else lock.current.status = true;

            try {
              const {
                data: {
                  response: { accessToken },
                },
              } = await axiosInstance.post(
                "/v1/auth/renewal",
                null,
                refreshHeader()
              );
              setCookie("accessToken", accessToken);
              error.config.headers.Authorization = `Bearer ${accessToken}`;

              lock.current.holder.resolve();
              lock.current.status = false;

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

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
