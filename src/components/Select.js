"use client";
import { forwardRef, useState } from "react";

const Select = forwardRef(({ label, options, ...rest }, ref) => {
    const [hidden, setHidden] = useState(true);

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600">{label}</label>
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

export { Select };
