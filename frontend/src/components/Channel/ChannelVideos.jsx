import React, { useEffect , useState } from 'react'
import {VideoBox} from '../index'
import axios from 'axios'
import { useParams } from 'react-router'


function ChannelVideos() {

    const [loading,setLoading] = useState(false)
    const [VideosData,setVideosData] = useState({})
    const {channelId} = useParams();
    useEffect(() => {
        ;(async () => {
            try {
                const videosData = await axios.get(`/api/v1/users/videos/${channelId}`)
                setVideosData(videosData.data.data.userVideos)
                console.log(videosData.data.data.userVideos)
            } catch (error) {
                console.log(error?.response?.data)
            }
            finally {
                setLoading(true)
            }
        })
        ()
    })
    return (
        loading &&
        <>
            <span className="font-bold text-2xl sm:text-3xl text-center sm:text-start">
                Videos
            </span>
            <div className="grid grid-cols-1 gap-y-16 mb-24 lg:grid-cols-2 xl:grid-cols-3 5xl:grid-cols-3 6xl:grid-cols-4">
                {
                    VideosData.map((data) => (
                        <VideoBox key = {data._id} showChannelName={false} className={"w-[90%] h-[90%]"} data = {data}/>
                    ))
                }
                {/* <VideoBox showChannelName={false} className={"w-[90%] h-[90%]"} />
                <VideoBox showChannelName={false} className={"w-[90%] h-[90%]"} />
                <VideoBox showChannelName={false} className={"w-[90%] h-[90%]"} />
                <VideoBox showChannelName={false} className={"w-[90%] h-[90%]"} />
                <VideoBox showChannelName={false} className={"w-[90%] h-[90%]"} />
                <VideoBox showChannelName={false} className={"w-[90%] h-[90%]"} /> */}
            </div>
        </>
    )
}

export default ChannelVideos