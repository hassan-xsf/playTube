import React from 'react'

import { Outlet } from 'react-router'

function VideoSkeleton() {

    return (
        <>
            {
                <div className="pt-32 h-full min-h-screen tracking-tighter bg-theme">
                    <section className="min-h-screen w-[93%] mx-auto flex flex-col lg:flex-row items-start gap-10">
                        <div className="w-[90%] lg:w-[66%] mx-auto flex flex-col justify-center">
                            <span
                                className="h-full w-full rounded-3xl object-contain"

                            >
                                <div className="animate-pulse sm:h-[300px] lg:h-[500px] xl:h-[600px] dark:bg-white dark:bg-opacity-20 bg-black bg-opacity-20 rounded-3xl "></div>
                            </span>
                            <div className="flex flex-col flex-start my-3">
                                <span className="animate-pulse font-[600] text-xl md:text-2xl text-theme text-center lg:text-start h-5 w-[50%] dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-20 rounded-3xl"></span>
                            </div>
                            <div className="flex flex-col lg:flex-row justify-between items-center gap-5 xl:gap-12 pt-4">
                                <span className="flex items-center gap-3.5 pb-1 flex-col lg:flex-row">
                                    <div className="animate-pulse rounded-full size-12 dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-20 flex justify-center items-center overflow-hidden">
                                        <span>
                                            <span className="hover:scale-105 bg-black hover:transition-all w-full h-full object-contain" />
                                        </span>

                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="animate-pulse font-semibold text-lg text-theme text-nowrap h-4 px-32 w-full rounded-3xl dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-20"></span>
                                        <span className="animate-pulse font-normal text-black text-sm leading-tight h-2 rounded-3xl w-1/2 dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-20"></span>
                                    </div>
                                </span>
                            </div>
                            <div className="animate-pulse flex flex-col rounded-3xl dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-20 h-20 mt-10">
                                <span className="font-semibold text-md text-theme"></span>
                                <span className="py-1.5 font-semibold text-sm line-clamp-6 sm:line-clamp-none">

                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 w-[90%] xsm:w-3/4 sm:w-2/3 lg:w-1/3">
                            <VideoSuggestion />
                            <VideoSuggestion />
                            <VideoSuggestion />
                            <VideoSuggestion />
                            <VideoSuggestion />
                            <VideoSuggestion />
                            <VideoSuggestion />
                            <VideoSuggestion />
                        </div>
                    </section>
                </div>
            }
            <Outlet />
        </>
    )
}
function VideoSuggestion() {
    return (<>
        <div className="rounded-md flex bg-theme gap-2 items-start">
            <div className="w-72 h-36 rounded-2xl dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-20">
            </div>
            <div className = "flex flex-col w-[40%]">

                <span className="mb-5 font-semibold text-black text-xs xl:text-sm sm:text-base leading-tight dark:text-white rounded-3xl dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-20 h-5"></span>
                <span className="font-[600] text-xs lg:text-sm xl:text-md text-black text-opacity-80 dark:text-white rounded-3xl dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-20 h-3 w-1/2"></span>
            </div>
        </div>
    </>
    )
}


export default VideoSkeleton