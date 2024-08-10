import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form';
import axios from "axios"

// canceling token logic help from GPT :)

function UploadVideoModal() {

    const { register, watch, handleSubmit } = useForm();
    const cancelTokenSourceRef = useRef(null)
    const videoFile = watch("video")

    const [clicked, setClicked] = useState(false)
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const mode = useSelector(state => state.theme.mode)
    const authData = useSelector(state => state.auth.authData)
    useEffect(() => {
        // Canceling req when user reloads or components unmounts
        return () => {
            if (cancelTokenSourceRef.current) {
                cancelTokenSourceRef.current.cancel('Component unmounted: Operation canceled.');
            }
        };
    }, []);

    const handleClose = () => {
        if (cancelTokenSourceRef.current) {
            cancelTokenSourceRef.current.cancel('Component unmounted: Operation canceled.');
        }
        navigate(-1)
    }

    const handleUpload = async (e) => {
        setError("")
        if (clicked) {
            return;
        }

        if (e.video?.[0]) {
            const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
            if (!allowedTypes.includes(e.video[0].type)) {
                return setError("Invalid file type. Only MP4, WebM, and Ogg are allowed.")
            }
        }
        if (e.thumbnail?.[0]) {
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(e.thumbnail[0].type)) {
                return setError("Invalid file type. Only JPEG, PNG are allowed.")
            }
        }
        setClicked(true)
        const formData = new FormData();

        formData.append('title', e.title);
        formData.append('description', e.description);

        formData.append('thumbnail', e.thumbnail[0]);

        formData.append('video', e.video[0]);



        try {
            cancelTokenSourceRef.current = axios.CancelToken.source();
            const res = await axios.post("/api/v1/video/upload", formData, {
                cancelToken: cancelTokenSourceRef.current.token,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            if(res) {
                navigate(`/video/${res.data.data._id}`); 
                console.log(res.data.data)
            }
        } catch (error) {
            setError(error.response?.data?.message);
        }
        finally {
            setClicked(false)
        }
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
                                <span className={`${clicked ? "animate-spin" : "animate-bounce"} border-4 rounded-full border-primary-black dark:border-white p-4 bg-theme`}>
                                    {
                                        !clicked ? (

                                            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                            )
                                            :
                                            (
                                                <svg
                                                    aria-hidden="true"
                                                    role="status"
                                                    width="50" height="50"
                                                    viewBox="0 0 100 101"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="currentColor"></path>
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill={mode == 'dark' ? "black" : 'white'}></path>
                                                </svg>
                                            )
                                    }
                                </span>
                                <span className="block text-md sm:text-xl text-theme font-semibold text-center">

                                    {videoFile?.[0] && videoFile[0].name ? `Upload ${videoFile[0].name}` : "Drag and drop your video to upload"}

                                </span>
                                <input {...register("video", { required: true })} disabled={clicked} type="file" accept={"video/*"} id="upload-video" className="sr-only" />
                                <label htmlFor="upload-video" className="cursor-pointer py-2 px-4 bg-black dark:bg-white text-white text-md sm:text-xl font-bold rounded-md dark:text-black">
                                    Upload Video
                                </label>
                            </div>
                            <label htmlFor="upload-video" className="cursor-pointer font-semibold py-2 text-md sm:text-xl text-theme">
                                Choose Thumbnail*
                            </label>
                            <input {...register("thumbnail", { required: true })} disabled={clicked} type="file" accept={"image/*"} id="upload-video" className="my-2 border-2 rounded-xl border-primary-black dark:border-white p-2 bg-theme text-theme file:rounded-xl file:bg-theme file:p-2 file:font-semibold" />
                            <label htmlFor="upload-video" className="cursor-pointer font-semibold py-2 text-md sm:text-xl text-theme">
                                Title*
                            </label>
                            <input {...register("title", { required: true })} disabled={clicked} type="text" id="video-tittle" className="my-2 border-2 rounded-xl border-primary-black dark:border-white p-2 bg-theme text-theme file:rounded-xl file:bg-theme file:p-2 file:font-semibold" />
                            <label htmlFor="upload-video" className="cursor-pointer font-semibold py-2 text-md sm:text-xl text-theme">
                                Description*
                            </label>
                            <textarea {...register("description", { required: true })} disabled={clicked} type="text" id="video-tittle" rows="5" className="my-2 border-2 rounded-xl border-primary-black dark:border-white p-2 bg-theme text-theme file:rounded-xl file:bg-theme file:p-2 file:font-semibold" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-5">

                        <button className="py-2 px-4 bg-black dark:bg-white text-white text-md sm:text-xl font-bold rounded-md dark:text-black">
                            {clicked ? "Uploading.." : "Upload"}
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