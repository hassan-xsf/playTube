import React from 'react';
function InputBox({ label, type, name, accept = "" , required = false , inputStyle = "default" , register}) {
    return (
        <>
            <div className={`relative ${inputStyle === "default" ? "mt-4 w-[70%] lg:w-[40%] 2xl:w-1/3 mx-auto" : ""}`}>
                <input
                    type={type}
                    {...register(name , 
                        {
                            required: required,
                            pattern: 
                            name === "email" ? 
                            {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email address'
                            } : name === "username" 
                            ? {
                                value: /^[a-zA-Z0-9]+$/,
                                message: 'Username can only contain letters and numbers'
                              }
                            : undefined
                        }
                    )}
                    accept={accept}
                    id={name}
                    className="peer block w-full px-3 pt-6 pb-2 border rounded-md bg-transparent placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-500 text-theme"
                    placeholder=" "
                />
                {
                    label && (<label
                        htmlFor={name}
                        className="absolute top-3 left-3 text-gray-500 sm:text-md transition-transform transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:top-3 peer-placeholder-shown:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-blue-500"
                    >
                        {label}
                    </label>)
                }
            </div>
        </>
    )
}

export default InputBox