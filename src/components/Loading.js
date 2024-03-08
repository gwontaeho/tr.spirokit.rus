"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export const Loading = () => {
    const [isInitial, setIsInitial] = useState(true);

    useEffect(() => {
        setIsInitial(false);
    }, []);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    if (isInitial) return null;

    return createPortal(
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 z-50">
            <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </div>,
        document.body
    );
};
