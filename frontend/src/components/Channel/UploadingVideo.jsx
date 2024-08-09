import React from 'react'
import { useSelector } from 'react-redux'


function UploadingVideo() {
    const mode = useSelector(state => state.theme.mode)
    return (
        <>
            <div className="fixed inset-0 z-12 flex flex-col items-center justify-center bg-black/50 px-4 pt-4">
                <div class="mx-auto w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-theme p-4">
                    <div className="flex flex-col">
                        <div class="mb-6 flex items-start gap-4">
                            <span className="h-8 w-8 shrink-0 rounded-full ring-black ring-1 dark:ring-white bg-theme p-1 text-red-700">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke={mode == 'dark' ? "white" : 'black'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749" stroke={mode == 'dark' ? "white" : 'black'} stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                            </span>
                            <h2 class="text-2xl font-semibold">
                                Uploading Video.....
                                <span className="text-base block font-semibold text-theme">Please wait till your video is uploaded succesfully. Finish button will appear when the video is uploaded</span>
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
                            <div className="h-80 border-2 border-primary-black dark:border-white border-dashed w-full my-8 flex flex-col gap-4 justify-center items-center">
                                <span className="animate-bounce border-4 rounded-full border-primary-black dark:border-white p-4 bg-theme">
                                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                </span>
                                <span className="block text-md sm:text-xl text-theme font-semibold text-center">Uploading your video...</span>
                                {/* VIDEO UPLOADED SUCCESFULLY <svg xmlns="http://www.w3.org/2000/svg" className = "size-10 text-theme" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg> */}
                                <svg
                                    aria-hidden="true"
                                    role="status"
                                    className="size-10 animate-spin text-theme"
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
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-5">
                        <button disabled className="py-2 px-4 bg-black dark:bg-white text-white text-md sm:text-xl font-bold rounded-md dark:text-black">
                            Uploading...
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

export default UploadingVideo