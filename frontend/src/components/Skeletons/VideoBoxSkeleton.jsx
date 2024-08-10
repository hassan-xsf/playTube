import React from 'react'
import { useSelector } from 'react-redux'

function VideoBoxSkeleton({ className = "", showChannelName = true }) {
    const mode = useSelector(state => state.theme.mode)
    return (
        <div className={`animate-pulse rounded-2xl flex hover:scale-105 hover:transition-all flex-col bg-theme ${className}">`}>
            <div className={`relative w-full h-40 sm:h-60 rounded-3xl bg-white ${mode === 'light' ? "bg-opacity-5" : "bg-opacity-20"}`}>
            </div>
            <div className="flex mt-2 gap-3">

                <span className="rounded-full size-10 sm:size-12 bg-white bg-opacity-20 flex justify-center items-center overflow-hidden">
                </span>

                <div className="flex justify-center flex-col w-3/4 gap-2">
                    <span className="rounded-full size-10 w-[60%] h-4 bg-white bg-opacity-20 flex justify-center items-center overflow-hidden"></span>
                    <span className="rounded-full size-10 w-[30%] h-2 bg-white bg-opacity-20 flex justify-center items-center overflow-hidden"></span>
                </div>
            </div>
        </div>
    )
}

export default VideoBoxSkeleton