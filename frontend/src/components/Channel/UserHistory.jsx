import React, { useEffect, useState } from 'react'
import { VideoBox , VideoBoxSkeleton} from '../index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import axios from 'axios'

function UserHistory() {
    const navigate = useNavigate();
    const channelName = useSelector(state => state.auth.channelUsername)
    const authData = useSelector(state => state.auth.authData)
    const [loading, setLoading] = useState(true)
    const [userHistory, setuserHistory] = useState({})
    useEffect(() => {
        if (channelName !== authData.username) {
            return navigate("/notfound")
        }
        ; (async () => {
            try {
                const history = await axios.get(`/api/v1/users/watchhistory`)
                setuserHistory(history.data.data.watchHistory.slice(-10))

            } catch (error) {
                console.log(error?.response?.data)
            }
            finally {
                setLoading(false)
            }
        })
            ()
    }, [])

    return (
        <>
            <span className="font-bold text-2xl sm:text-3xl text-center sm:text-start">
                Last 10 videos history
            </span>
            <div className="grid grid-cols-1 gap-y-16 mb-24 lg:grid-cols-2 xl:grid-cols-3 5xl:grid-cols-3 6xl:grid-cols-4">
                {loading ? (
                    Array.from({ length: 10 }).map((_, ind) => (
                        <VideoBoxSkeleton key={ind + 100} className={"w-[90%] h-[90%]"} />
                    ))
                ) : (
                    userHistory.map((e) => (
                        <VideoBox key={e._id} className={"w-[90%] h-[90%]"} data={e} owner={e.owner} />
                    ))
                )}

                {

                }

            </div>
        </>
    )
}
export default UserHistory