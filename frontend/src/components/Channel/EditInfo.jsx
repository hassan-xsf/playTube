import React from 'react'
import { InputBox } from '../index'
import { useForm } from 'react-hook-form'

function EditInfo() {
    const { register, handleSubmit } = useForm();

    return (
        <>
            <div className="flex flex-col gap-4 w-[100%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] mb-10">
                <span className="font-[600] tracking-normal text-2xl text-theme mb-4">Editing your personal information....</span>
                <span className="font-[600] tracking-normal text-lg text-theme mb-4">Personal Info:</span>
                <form className = "flex flex-col gap-4">
                    <InputBox label="Email" type="text" name="email" required={false} register={register} inputStyle="editInfo" />
                    <InputBox label="Username" type="text" name="username" required={false} register={register} inputStyle="editInfo" />

                    <button className="w-[100%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] py-2 px-4 bg-black dark:bg-white text-white text-xl font-bold rounded-md dark:text-black text-nowrap">
                        Save Details
                    </button>
                </form>
                <form className = "flex flex-col gap-4 mt-4">
                    <InputBox label="Current Password" type="password" name="pi_cpass" required={true} register={register} inputStyle="editInfo" />
                    <InputBox label="New Password" type="password" name="pi_npass" required={true} register={register} inputStyle="editInfo" />
                    <InputBox label="Repeat New Password*" type="password" name="pi_nrpass" required={true} register={register} inputStyle="editInfo" />

                    <button className="w-[100%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] py-2 px-4 bg-black dark:bg-white text-white text-xl font-bold rounded-md dark:text-black text-nowrap">
                        Save Password
                    </button>
                </form>
                <form className = "flex flex-col gap-4 mt-4">
                    <InputBox label="Profile Picture" type="file" name="pi_ppic" required={true} register={register} inputStyle="editInfo" />
                    <InputBox label="Cover Picture" type="file" name="pi_cpic" required={true} register={register} inputStyle="editInfo" />

                    <button className="w-[100%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] py-2 px-4 bg-black dark:bg-white text-white text-xl font-bold rounded-md dark:text-black text-nowrap">
                        Save Pictures
                    </button>
                </form>
            </div>
        </>
    )
}

export default EditInfo