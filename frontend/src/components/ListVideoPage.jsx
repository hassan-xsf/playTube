import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { dateToFormat } from '../utils/dateToFormat'
import { useSelector } from 'react-redux'
import {formatSeconds} from '../utils/formatSeconds'
import {Link} from 'react-router-dom'

function ListVideoPage() {
    const [loading, setLoading] = useState(true)
    const { searchParams } = useParams();
    const [SearchData, setSearchData] = useState([])
    

    useEffect(() => {
        ; (async () => {
            try {
                const res = await axios.get(`/api/v1/video/search/${searchParams}`)
                setSearchData(res.data.data)

            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        })()
    }, [searchParams])
    return (
        <div className="bg-white sm:pl-96 xl:pl-96 cursor-pointer  pt-32 h-full min-h-screen tracking-tighter dark:bg-primary-black">
            <div className="w-[100%] mx-auto">
                {!loading &&  <span className="text-theme font-semibold text-md ml-10 lg:mr-0">{!SearchData ? `No results found for '${searchParams}''` : `Results found for '${searchParams}'`} </span>}
                <div className="py-12 flex flex-col gap-6">
                    {loading ? (
                        Array.from({ length: 10 }).map((_, ind) => (
                            <SkeletonSearchVideoBox key={ind + 100} />
                        ))
                    ) : (
                        SearchData && SearchData.map((e) => (
                            <VideoBox key={e._id} data={e} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

function SkeletonSearchVideoBox() {
    return (<>
        <div className="bg-white rounded-md flex flex-col lg:flex-row dark:bg-primary-black w-[90%] mx-auto lg:mx-0 lg:w-[80%] xl:w-[70%]">
            <div className="relative dark:bg-white dark:bg-opacity-20 bg-black bg-opacity-20 rounded-md w-[45%] h-44">
            </div>
            <div className="flex mt-2 gap-1">
                <div className="px-5 flex flex-col">
                    <span className="font-semibold text-black text-sm lg:text-base xl:text-lg leading-tight pb-1.5 h-3 rounded-md dark:text-white dark:bg-white dark:bg-opacity-20 bg-black bg-opacity-20"></span>
                    <div className="flex items-center gap-3 py-4">
                        <div className="rounded-full size-9 flex justify-center items-center overflow-hidden dark:bg-white dark:bg-opacity-20 bg-black bg-opacity-20">
                        </div>
                        <span className="text-black text-sm text-opacity-80 dark:text-white dark:text-opacity-50 dark:bg-white dark:bg-opacity-20 bg-black bg-opacity-20 h-2 w-32">
                        </span>
                    </div>
                    <span className="font-normal text-md leading-tight text-black text-xsm lg:text-sm text-opacity-50 dark:text-white dark:text-opacity-50 line-clamp-2 hidden lg:block h-2 rounded-md dark:bg-white dark:bg-opacity-20 bg-black bg-opacity-20"></span>
                </div>
            </div>
        </div>
    </>
    )
}

function VideoBox({ data }) {
    const mode = useSelector(state => state.theme.mode)
    return (<>
        <div className="bg-white hover:scale-105 hover:transition-all rounded-md flex flex-col lg:flex-row dark:bg-primary-black w-[100%] items-center sm:items-start lg:mx-0 lg:w-[80%] xl:w-[60%]">
            <Link to = {`/video/${data._id}`} className={`relative w-1/2 h-40 sm:h-60 rounded-3xl bg-black ${mode === 'light' ? "bg-opacity-5" : "bg-opacity-90"}`}>
                <img className="w-full h-full object-contain rounded-3xl" src={data.thumbnail} />
                <span className="bg-black text-sm bg-opacity-70 text-white font-semibold py-0.5 px-1 rounded-md tracking-wide absolute bottom-2 right-3">{formatSeconds(data.duration)}</span>
            </Link>
            <div className="flex mt-2 gap-1 w-full sm:w-auto">
                <div className="px-5 flex flex-col mx-auto">
                    <Link to = {`/video/${data._id}`} className="font-semibold text-black text-sm lg:text-base xl:text-lg leading-tight pb-1.5  dark:text-white">{data.title}</Link>
                    <span className="font-normal text-black text-opacity-80 text-xsm lg:text-sm leading-tight  dark:text-white dark:text-opacity-50">{data.views} views • {dateToFormat(data.createdAt)} </span>
                    <Link to = {`/c/${data.videoOwner.username}`} className="flex items-center gap-3 py-4">
                        <div className="rounded-full size-9 bg-white flex justify-center items-center overflow-hidden">
                            <img className="w-full h-full object-contain" src= {data.videoOwner.avatar} />
                        </div>
                        <span className="text-black text-sm text-opacity-80 dark:text-white dark:text-opacity-50">
                            {data.videoOwner.fullname}
                        </span>
                    </Link>
                    <span className="font-normal text-md leading-tight text-black text-xsm lg:text-sm text-opacity-50 dark:text-white dark:text-opacity-50 line-clamp-2 hidden lg:block">{data.description}</span>
                </div>
            </div>
        </div>
    </>
    )
}



export default ListVideoPage


