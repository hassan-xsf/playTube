import React, { useEffect, useLayoutEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { InputBox } from '../components/index'
import { useForm } from 'react-hook-form'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/userSlice'

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.auth.authStatus)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [clicked, setClicked] = useState(false)
    const [error, setError] = useState("")

    const registerUser = async (data) => {
        setError("")
        const formData = new FormData();

        formData.append('fullname', data.fullname);
        formData.append('email', data.email);
        formData.append('username', data.username);
        formData.append('password', data.password);

        if (data.avatar && data.avatar.length > 0) {
            formData.append('avatar', data.avatar[0]);
        }
        if (data.coverImage && data.coverImage.length > 0) {
            formData.append('coverImage', data.coverImage[0]);
        }
        setClicked(true)

        try {
            const res = await axios.post("/api/v1/users/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            if (res.status === 200) {
                console.log("User registered: ")
                try {
                    const loginres = await axios.post("/api/v1/users/login", { username: data.username, password: data.password }, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    });
                    if (loginres) {
                        dispatch(login(loginres.data.data.user))
                        setTimeout(() => navigate("/") , 200)
                    }
                }
                catch (e) {
                    setError(e.response?.data?.message);
                    console.log(e.response?.data);
                }

            }
        } catch (e) {
            setError(e.response?.data?.message);
            console.log(e.response?.data);
        }
        finally {
            setClicked(false)
        }
    }
    return (!isLogged &&
        <div className="pl-0 sm:pl-16 md:pl-60 pt-24 h-full min-h-screen tracking-tighter bg-theme xsm:pb-24">
            <div className="mx-auto">
                <form onSubmit={handleSubmit(registerUser)} className="w-[90%] flex flex-col">
                    <div className="text-white flex items-center justify-center gap-4">
                        <img className="max-w-16 lg:max-w-20" src={logo} />
                        <span className="text-4xl lg:text-5xl font-bold tracking-[-3px] text-theme">PlayTube</span>
                    </div>
                    <span className="w-[70%] lg:w-[40%] 2xl:w-1/3 mx-auto text-theme text-lg md:text-xl font-semibold text-center mt-6 ">Create a new account</span>
                    <span className="w-[70%] lg:w-[40%] 2xl:w-1/3 mx-auto text-theme md:text-sm font-semibold text-center mt-2 ">Fields marked with * are required fiels</span>
                    {
                        error &&
                        <span className="w-[70%] lg:w-[40%] 2xl:w-1/3 mx-auto text-red-600 md:text-sm font-semibold text-center mt-2 ">{error}</span>
                    }
                    <InputBox label="Fullname*" type="text" name="fullname" required={true} register={register} />
                    <InputBox label="Email*" type="text" name="email" required={true} register={register} />
                    {errors.email && <span className="w-[70%] lg:w-[40%] 2xl:w-1/3 mx-auto text-red-600 md:text-sm font-semibold text-start ">{errors.email.message}</span>}
                    <InputBox label="Username*" type="text" name="username" required={true} register={register} />
                    {errors.username && <span className="w-[70%] lg:w-[40%] 2xl:w-1/3 mx-auto text-red-600 md:text-sm font-semibold text-start ">{errors.username.message}</span>}
                    <InputBox label="Password*" type="password" name="password" required={true} register={register} />

                    <InputBox label="Profile Picture*" type="file" name="avatar" accept="image/*" required={true} register={register} />
                    <InputBox label="Cover Picture" type="file" name="coverImage" accept="image/*" required={false} register={register} />

                    <Link to="/login" className="w-[70%] lg:w-[40%] 2xl:w-1/3 mx-auto text-theme text-lg font-semibold my-4 ">Already have an account?</Link>
                    <button disabled={clicked} className="py-2 px-4 bg-black dark:bg-white w-[30%] lg:w-[20%] 2xl:w-[10%] mx-auto text-white text-sm sm:text-xl font-bold rounded-md dark:text-black">
                        {clicked ? "Loading.." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    )
}



export default Register