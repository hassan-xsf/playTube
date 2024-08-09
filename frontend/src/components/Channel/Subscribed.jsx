import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';

function Subscribed() {

    const { channelId } = useParams();
    const [subscribedData, setsubscribedData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleTest = async () => {
            try {
                const req = await axios.get(`/api/v1/sub/all/${channelId}`)
                req.data.data.map((e) => {
                    const convertDate = new Date(e.createdAt).toLocaleDateString()
                    setsubscribedData(prev => [...prev, { date: convertDate, fullname: e.subscribedToName.fullname, avatar: e.subscribedToName.avatar, username: e.subscribedToName.username }])
                })
            }
            catch (error) {
                console.log(error.response.data.message)
            }
            finally {
                setLoading(false)
            }
        }
        handleTest();
    }, [])


    return (
        loading ||
        (
            <>
                <span className="font-bold text-2xl sm:text-3xl text-center sm:text-start">
                    Subscribed: {subscribedData.length}
                </span>
                <div className="grid grid-cols-1 gap-y-8 mb-24 bg-theme lg:p-10">
                    {
                        subscribedData.map((e, indx) =>
                            <SubscribedToBox date={e.date} fullname={e.fullname} avatar={e.avatar} username={e.username} key={indx} />
                        )
                    }
                </div>
            </>
        )

    )
}
function SubscribedToBox({ date, fullname, avatar, username }) {
    return (
        <>
            <Link to = {`/c/${username}`} className="hover:scale-105  hover:transition-all flex items-center lg:items-start justify-center gap-4 bg-black bg-opacity-10 dark:bg-gray-100 dark:bg-opacity-10 rounded-3xl p-2 hover:bg-opacity-20 dark:hover:bg-opacity-40">
                <div className="rounded-full size-16 bg-white flex justify-center items-center overflow-hidden">
                    <img className="w-full h-full object-contain rounded-full" src={avatar} />
                </div>
                <div className="flex flex-col items-start w-[80%]">
                    <span className="font-[600] tracking-normal text-sm lg:text-lg text-theme">{fullname}</span>
                    <span className="py-1.5 text-sm lg:text-base tracking-wide font-[450] text-theme">
                        @{username}
                    </span>
                </div>
                <span className="py-1.5 text-xs lg:text-lg tracking-wide font-[450] text-center text-theme">
                    Subscribed On: {date}
                </span>
            </Link>
        </>
    )
}

export default Subscribed