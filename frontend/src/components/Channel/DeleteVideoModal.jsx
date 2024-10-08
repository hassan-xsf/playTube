import React from 'react'
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { useSelector } from 'react-redux';


function DeleteVideoModal() {
    const navigate = useNavigate();
    const { videoId } = useParams();
    const authData = useSelector(state => state.auth.authData)

    const handleClose = () => {
        navigate(-1)
    }
    const deleteVideo = () => {
        if (authData) {

            ; (async () => {
                try {
                    await axios.delete(`/api/v1/video/${videoId}`)
                    navigate(`/c/${authData.username}/dashboard`);
                }
                catch (error) {
                    console.log("Invalid video Id found!")
                    navigate(`/c/${authData.username}/dashboard`);
                }
            })
            ()
        }
    }
    return (
        <>
            <div className="fixed inset-0 z-12 flex flex-col items-center justify-center bg-black/50 px-4 pt-4">
                <div className="mx-auto w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-theme p-4">
                    <div className="mb-6 flex items-start gap-4">
                        <span className="h-8 w-8 shrink-0 rounded-full ring-red-900 ring-1 bg-theme p-1 text-red-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="red"
                                aria-hidden="true">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                            </svg>
                        </span>
                        <h2 className="text-2xl font-semibold">
                            Delete Video
                            <span className="text-base block font-semibold text-theme">Are you sure you want to delete the video? No deleted videos can be recovered
                                <span className="block text-red-600 pt-4">Remember: This is a non-repeatable action</span></span>
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
                    <div className="grid grid-cols-2 gap-4">

                        <button onClick={deleteVideo} className="py-2 px-4 bg-red-600 text-white text-xl font-bold rounded-md dark:text-black">
                            Delete
                        </button>
                        <button onClick={handleClose} className="py-2 px-4 bg-black dark:bg-white text-white text-xl font-bold rounded-md dark:text-black">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default DeleteVideoModal