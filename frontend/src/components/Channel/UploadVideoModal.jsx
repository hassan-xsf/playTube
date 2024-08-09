import React from 'react'
import { useSelector } from 'react-redux'


function UploadVideoModal() {
    const mode = useSelector(state => state.theme.mode)
    return (
        <>
            <div className="fixed inset-0 z-12 flex flex-col items-center justify-center bg-black/50 px-4 pt-4">
                <div class="mx-auto w-full max-w-lg h-3/4 rounded-lg border border-gray-700 bg-theme p-4 overflow-scroll">
                    <div className="flex flex-col">
                        <div class="mb-6 flex items-start gap-4">
                            <span class="h-8 w-8 shrink-0 rounded-full ring-black ring-1 dark:ring-white bg-theme p-1 text-red-700">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke={mode == 'dark' ? "white" : 'black'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749" stroke={mode == 'dark' ? "white" : 'black'} stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                            </span>
                            <h2 class="text-2xl font-semibold">
                                Upload Video
                                <span className="text-base block font-semibold text-theme">Fields marked with * are compulsory fields, Fill out all the fields and click on upload</span>
                            </h2>
                            <button class="h-6 w-6 shrink-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col">
                            <div className="h-80 border-4 border-primary-black dark:border-white border-dashed w-full my-8 flex flex-col gap-4 justify-center items-center">
                                <span className="animate-bounce border-4 rounded-full border-primary-black dark:border-white p-4 bg-theme">
                                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                </span>
                                <span className="block text-md sm:text-xl text-theme font-semibold text-center">Drag and drop your video to upload</span>
                                <input type="file" id="upload-video" class="sr-only" />
                                <label for="upload-video" className="cursor-pointer py-2 px-4 bg-black dark:bg-white text-white text-md sm:text-xl font-bold rounded-md dark:text-black">
                                    Select Video
                                </label>
                            </div>
                            <label for="upload-video" className="cursor-pointer font-semibold py-2 text-md sm:text-xl text-theme">
                                Choose Thumbnail*
                            </label>
                            <input type="file" id="upload-video" className="my-2 border-2 rounded-xl border-primary-black dark:border-white p-2 bg-theme text-theme file:rounded-xl file:bg-theme file:p-2 file:font-semibold" />
                            <label for="upload-video" className="cursor-pointer font-semibold py-2 text-md sm:text-xl text-theme">
                                Title*
                            </label>
                            <input type="text" id="video-tittle" className="my-2 border-2 rounded-xl border-primary-black dark:border-white p-2 bg-theme text-theme file:rounded-xl file:bg-theme file:p-2 file:font-semibold" />
                            <label for="upload-video" className="cursor-pointer font-semibold py-2 text-md sm:text-xl text-theme">
                                Description*
                            </label>
                            <textarea type="text" id="video-tittle" rows="5" className="my-2 border-2 rounded-xl border-primary-black dark:border-white p-2 bg-theme text-theme file:rounded-xl file:bg-theme file:p-2 file:font-semibold" />
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-5">

                        <button className="py-2 px-4 bg-black dark:bg-white text-white text-md sm:text-xl font-bold rounded-md dark:text-black">
                            Upload
                        </button>
                        <button className="py-2 px-4 bg-black dark:bg-white text-white text-md sm:text-xl font-bold rounded-md dark:text-black">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadVideoModal