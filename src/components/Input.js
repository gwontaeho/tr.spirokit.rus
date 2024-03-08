"use client";
import { forwardRef } from "react";

const Input = forwardRef(({ label, unit, ...rest }, ref) => {
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600">{label}</label>
            <div className="relative">
                <input {...rest} ref={ref} className="input disabled:bg-gray-50/80" />
                {!!unit && <div className="absolute top-1/2 right-4 text-primary -translate-y-1/2">{unit}</div>}
            </div>
        </div>
    );
});

Input.displayName = "Input";

export { Input };
