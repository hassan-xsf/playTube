import React from 'react'
import { useSelector } from 'react-redux'
import { formatSeconds } from '../utils/formatSeconds'
import { dateToFormat } from '../utils/dateToFormat'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function VideoBox({ data, showChannelName = true, className = "" }) {
    const navigate = useNavigate();

    const mode = useSelector(state => state.theme.mode)
    return (<>
        <div className={`rounded-2xl flex cursor-pointer hover:scale-105 hover:transition-all flex-col bg-theme ${className}">`}>
            <Link to = {`/video/${data._id}`} className={`relative w-full h-40 sm:h-60 rounded-3xl bg-black ${mode === 'light' ? "bg-opacity-5" : "bg-opacity-90"}`}>
                <img className="w-full h-full object-contain rounded-3xl" src={data.thumbnail} />
                <span className="bg-black bg-opacity-70 text-white font-semibold text-xs py-0.5 px-1.5 rounded-md tracking-wide absolute bottom-2 right-2 mb-2 mr-2">{formatSeconds(data.duration)}</span>
            </Link>
            <div className="flex mt-2 gap-3">
                {
                    data.videoOwner && <Link to={`/c/${data.videoOwner.username}/videos`} className="rounded-full size-10 sm:size-12 bg-theme ring-1 ring-white ring-opacity-20 flex justify-center items-center overflow-hidden">
                        <img className="w-full h-full object-contain" src={data.videoOwner.avatar} />
                    </Link>
                }
                <div className="flex justify-center flex-col w-3/4">
                    <Link to = {`/video/${data._id}`}  className={`font-semibold text-sm sm:text-base leading-tight pb-1.5 text-theme line-clamp-2`}>{data.title}</Link>
                    {showChannelName && <Link to={`/c/${data.videoOwner.username}/videos`} className={`font-[600]  text-sm sm:text-md leading-tigh tracking-[-0.5px] text-black text-opacity-50 dark:text-white dark:text-opacity-50`}>{data.videoOwner.fullname}</Link>}
                    <Link to = {`/video/${data._id}`} className={`font-[600] text-sm sm:text-md leading-tigh tracking-[-0.5px] text-black text-opacity-50 dark:text-white dark:text-opacity-50`}>{data.views} views • {dateToFormat(data.createdAt)} </Link>
                </div>
            </div>
        </div>
    </>
    )
}


export default VideoBox