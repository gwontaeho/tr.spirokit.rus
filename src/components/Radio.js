"use client";
import { forwardRef } from "react";

const Radio = forwardRef(({ label, options, ...rest }, ref) => {
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600">{label}</label>
            <div className="flex justify-between">
                {options.map(({ key, value }) => (
                    <div className="flex items-center justify-center" key={value}>
                        <input
                            {...rest}
                            ref={ref}
                            className="peer input cursor-pointer w-44 appearance-none outline-offset-0 checked:border-primary disabled:bg-gray-50/80"
                            type="radio"
                            value={value}
                        />
                        <span className="absolute pointer-events-none peer-disabled:text-gray-200">{key}</span>
                    </div>
                ))}
            </div>
        </div>
    );
});

Radio.displayName = "Radio";

export { Radio };
