import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form';


function UploadVideoModal() {

    const { register, watch, handleSubmit } = useForm();

    const videoFile = watch("video")
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const mode = useSelector(state => state.theme.mode)

    const handleClose = () => {
        navigate(-1)
    }

    const handleUpload = (e) => {
        
        if(videoFile?.[0]) {
            const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
            if (!allowedTypes.includes(videoFile.type)) {
                return setError("Invalid file type. Only MP4, WebM, and Ogg are allowed.")
            }
        }
        if(thumbnail?.[0]) {
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(videoFile.type)) {
                return setError("Invalid file type. Only JPEG, PNG are allowed.")
            }
        }
        console.log(e)
    }
    return (
        <>
            <div className="fixed inset-0 z-12 flex flex-col items-center justify-center bg-black/50 px-4 pt-4">
                <form onSubmit={handleSubmit(handleUpload)} className="mx-auto w-full max-w-lg h-3/4 rounded-lg border border-gray-700 bg-theme p-4 overflow-x-hidden">
                    <div className="flex flex-col">
                        <div className="mb-6 flex items-start gap-4">
                            <span className="h-8 w-8 shrink-0 rounded-full ring-black ring-1 dark:ring-white bg-theme p-1 text-red-700">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke={mode == 'dark' ? "white" : 'black'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749" stroke={mode == 'dark' ? "white" : 'black'} strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </span>
                            <h2 className="text-2xl font-semibold">
                                Upload Video
                                <span className="text-base block font-semibold text-theme">All fields are compulsory, Fill out all the fields and then click on Upload</span>
                                {error && <span className="text-base block font-semibold text-red-600">{error}</span>}
                            </h2>
                            <button onClick={handleClose} className="h-6 w-6 shrink-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col">
                            <div className="h-80 border-4 border-primary-black dark:border-white border-dashed w-full my-8 flex flex-col gap-4 justify-center items-center">
                                <span className="animate-bounce border-4 rounded-full border-primary-black dark:border-white p-4 bg-theme">
                                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </span>
                                <span className="block text-md sm:text-xl text-theme font-semibold text-center">

                                    {videoFile?.[0] && videoFile[0].name ? `Upload ${videoFile[0].name}` : "Drag and drop your video to upload"}

                                </span>
                                <input {...register("video", { required: true })} type="file" accept = {"video/*"}  id="upload-video" className="sr-only" />
                                <label htmlFor="upload-video" className="cursor-pointer py-2 px-4 bg-black dark:bg-white text-white text-md sm:text-xl font-bold rounded-md dark:text-black">
                                    Select Video
                                </label>
                            </div>
                            <label htmlFor="upload-video" className="cursor-pointer font-semibold py-2 text-md sm:text-xl text-theme">
                                Choose Thumbnail*
                            </label>
                            <input {...register("thumbnail", { required: true })} type="file" accept = {"image/*"} id="upload-video" className="my-2 border-2 rounded-xl border-primary-black dark:border-white p-2 bg-theme text-theme file:rounded-xl file:bg-theme file:p-2 file:font-semibold" />
                            <label htmlFor="upload-video" className="cursor-pointer font-semibold py-2 text-md sm:text-xl text-theme">
                                Title*
                            </label>
                            <input {...register("title", { required: true })} type="text" id="video-tittle" className="my-2 border-2 rounded-xl border-primary-black dark:border-white p-2 bg-theme text-theme file:rounded-xl file:bg-theme file:p-2 file:font-semibold" />
                            <label htmlFor="upload-video" className="cursor-pointer font-semibold py-2 text-md sm:text-xl text-theme">
                                Description*
                            </label>
                            <textarea {...register("description", { required: true })} type="text" id="video-tittle" rows="5" className="my-2 border-2 rounded-xl border-primary-black dark:border-white p-2 bg-theme text-theme file:rounded-xl file:bg-theme file:p-2 file:font-semibold" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-5">

                        <button className="py-2 px-4 bg-black dark:bg-white text-white text-md sm:text-xl font-bold rounded-md dark:text-black">
                            Upload
                        </button>
                        <button onClick={handleClose} className="py-2 px-4 bg-black dark:bg-white text-white text-md sm:text-xl font-bold rounded-md dark:text-black">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UploadVideoModal