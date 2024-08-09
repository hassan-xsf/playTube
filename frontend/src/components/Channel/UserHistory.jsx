import React , {useEffect} from 'react'
import {VideoBox} from '../index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function UserHistory() {
    const navigate = useNavigate();
    const channelName = useSelector(state => state.auth.channelUsername)
    const authData = useSelector(state => state.auth.authData)
    useEffect(() => {
        if(channelName !== authData.username) {
            return navigate("/notfound")
        }
    } , [])
    return (
        <>
            <span className="font-bold text-2xl sm:text-3xl text-center sm:text-start">
                History
            </span>
            <div className="grid grid-cols-1 gap-y-16 mb-24 lg:grid-cols-2 xl:grid-cols-3 5xl:grid-cols-3 6xl:grid-cols-4">
                <VideoBox className={"w-[90%] h-[90%]"} />
                <VideoBox className={"w-[90%] h-[90%]"} />
                <VideoBox className={"w-[90%] h-[90%]"} />
                <VideoBox className={"w-[90%] h-[90%]"} />
                <VideoBox className={"w-[90%] h-[90%]"} />
                <VideoBox className={"w-[90%] h-[90%]"} />

            </div>
        </>
    )
}
export default UserHistory