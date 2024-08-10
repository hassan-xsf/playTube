import React, { useEffect, useState } from 'react'
import { VideoBox, VideoBoxSkeleton } from './index'
import axios from 'axios'

function HomeVideoPage() {

    const [VideoData, setVideoData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAllVideos = async () => {
            try {
                const req = await axios.get(`/api/v1/video/all`)
                setVideoData(req.data.data)
            }
            catch (error) {
                console.log(error)
                console.log(error?.response?.data?.message)
            }
            finally {
                setLoading(false) // change
            }
        }
        getAllVideos();
    }, [])

    return (
        <div className="pl-5 pt-24 sm:pt-40 h-full min-h-screen tracking-tighter sm:pl-80 bg-black bg-theme pb-20">
            <div className="w-[90%] mx-auto sm:w-[70%] lg:w-[80%] 3xl:w-[90%]">
                <div className="grid grid-cols-1 gap-x-4 gap-y-20 lg:grid-cols-2 xl:grid-cols-3 6xl:grid-cols-4 7xl:grid-cols-5">
                    {loading ? (
                        Array.from({ length: 10 }).map((_, ind) => (
                            <VideoBoxSkeleton key={ind + 100} />
                        ))
                    ) : (
                        VideoData && VideoData.map((video) => (
                            <VideoBox key={video._id} data={video} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}




export default HomeVideoPage


