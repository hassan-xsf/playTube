import React, { useEffect, useState } from 'react'
import { InputBox } from '../index'
import { useForm } from 'react-hook-form'
import axios from "axios"
import {  useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

function EditInfo() {

    const { register: registerPass, handleSubmit: handleSubmitPass } = useForm()
    const { register: registerPic, handleSubmit: handleSubmitPic } = useForm()
    const { register: registerCoverPic, handleSubmit: handleSubmitCPic } = useForm()
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const authData = useSelector(state => state.auth.authData)
    const { register: registerInfo, handleSubmit: handleSubmitInfo, formState: { errors: infoError } } = useForm({ defaultValues: { fullname: authData.fullname, email: authData.email } })
    const channelName = useSelector(state => state.auth.channelUsername)

    useEffect(() => {
        if(channelName !== authData.username) {
            return navigate("/notfound")
        }
    } , [])

    const editNameOrEmail = async (e) => {
        setError("")
        if (success === "") {
            if (!e.fullname && !e.email) {
                setError("Please enter email or fullname to edit!")
            }
            else {
                try {
                    const res = await axios.patch("/api/v1/users/updatedetails", { fullname: e.fullname || "", email: e.email || "" },
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }
                    )
                    setSuccess("Personal details have been saved!")
                    setTimeout(() => navigate(0), 1000)
                    console.log(res)
                } catch (error) {
                    setError(error.response?.data?.message || "Something went wrong")
                }
            }
        }
    }
    const editPassword = async (e) => {
        setError("")
        if (success === "") {
            if (!e.pi_cpass && !e.pi_npass) {
                setError("Please enter passwords in order to save!")
            }
            else {
                try {
                    if (e.pi_cpass === e.pi_npass) {
                        return setError("Please select a new password!")
                    }
                    if (e.pi_npass !== e.pi_nrpass) {
                        return setError("Password's dont match!")
                    }
                    const res = await axios.post("/api/v1/users/changepass", { oldPassword: e.pi_cpass || "", newPassword: e.pi_npass || "" },
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }
                    )
                    setSuccess("Password have been saved!")
                    setTimeout(() => navigate(0), 1000)
                    console.log(res)
                } catch (error) {
                    setError(error.response?.data?.message || "Something went wrong")
                }
            }
        }
    }

    const editProfilePic = async (e) => {
        setError("")
        if (success === "") {
            if (!e.avatar[0] || e.avatar[0]?.type !== "image/jpeg") {
                setError("Please upload a file first!")
            }
            else {
                const formData = new FormData();
                formData.append('avatar', e.avatar[0]);
                try {
                    const res = await axios.patch('/api/v1/users/updateavatar', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    setSuccess("Profile picture has been saved!")
                    setTimeout(() => navigate(0), 1000)
                    console.log(res)
                } catch (error) {
                    setError(error.response?.data?.message || "Something went wrong")
                }
            }
        }
    }
    const editCoverPic = async (e) => {
        setError("")
        if (success === "") {
            if (!e.coverImage[0] || e.coverImage[0]?.type !== "image/jpeg") {
                setError("Please upload a file first!")
            }
            else {
                const formData = new FormData();
                formData.append('coverImage', e.coverImage[0]);
                try {
                    const res = await axios.patch('/api/v1/users/updatecover', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    setSuccess("Cover picture has been saved!")
                    setTimeout(() => navigate(0), 1000)
                    console.log(res)
                } catch (error) {
                    setError(error.response?.data?.message || "Something went wrong")
                }
            }
        }
    }
    return (
        <>
            <div className="flex flex-col gap-4 w-[100%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] mb-10">
                <span className="font-[600] tracking-normal text-2xl text-theme mb-4">Editing your personal information....</span>
                <span className="font-[600] tracking-normal text-lg text-theme mb-4">Personal Info:</span>
                <form onSubmit={handleSubmitInfo(editNameOrEmail)} className="flex flex-col gap-4">
                    <InputBox label="Email" type="text" name="email" required={false} register={registerInfo} inputStyle="editInfo" />
                    {infoError.email && <span className="font-[600] tracking-normal text-sm mb-4 text-red-600">{infoError.email.message}</span>}
                    <InputBox label="Fullname" type="text" name="fullname" required={false} register={registerInfo} inputStyle="editInfo" />

                    <button className="w-[100%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] py-2 px-4 bg-black dark:bg-white text-white text-xl font-bold rounded-md dark:text-black text-nowrap">
                        Save Details
                    </button>
                </form>
                <form onSubmit={handleSubmitPass(editPassword)} className="flex flex-col gap-4 mt-4">
                    <InputBox label="Current Password" type="password" name="pi_cpass" required={true} register={registerPass} inputStyle="editInfo" />
                    <InputBox label="New Password" type="password" name="pi_npass" required={true} register={registerPass} inputStyle="editInfo" />
                    <InputBox label="Repeat New Password*" type="password" name="pi_nrpass" required={true} register={registerPass} inputStyle="editInfo" />

                    <button className="w-[100%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] py-2 px-4 bg-black dark:bg-white text-white text-xl font-bold rounded-md dark:text-black text-nowrap">
                        Save Password
                    </button>
                    {error && <span className="font-[600] tracking-normal text-sm mb-4 text-red-600">{error}</span>}
                    {success && <span className="font-[600] tracking-normal text-sm mb-4 text-green-600">{success}</span>}
                </form>
                <form onSubmit={handleSubmitPic(editProfilePic)} className="flex flex-col gap-4 mt-4">
                    <InputBox label="Profile Picture" type="file" accept="image/*" name="avatar" required={true} register={registerPic} inputStyle="editInfo" />

                    <button className="w-[100%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] py-2 px-4 bg-black dark:bg-white text-white text-xl font-bold rounded-md dark:text-black text-nowrap">
                        Save
                    </button>
                </form>
                <form onSubmit={handleSubmitCPic(editCoverPic)} className="flex flex-col gap-4 mt-4">
                    <InputBox label="Cover Picture" type="file" accept="image/*" name="coverImage" required={true} register={registerCoverPic} inputStyle="editInfo" />

                    <button className="w-[100%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] py-2 px-4 bg-black dark:bg-white text-white text-xl font-bold rounded-md dark:text-black text-nowrap">
                        Save
                    </button>
                </form>
            </div>
        </>
    )
}

export default EditInfo