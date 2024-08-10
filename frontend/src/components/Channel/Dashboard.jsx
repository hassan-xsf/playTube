import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
    const mode = useSelector(state => state.theme.mode)

    const navigate = useNavigate();
    const channelName = useSelector(state => state.auth.channelUsername)
    const authData = useSelector(state => state.auth.authData)
    const [loading, setLoading] = useState(false)
    const [dashData, setdashData] = useState({})

    useEffect(() => {
        if (channelName !== authData.username) {
            return navigate("/notfound")
        }
        ; (async () => {
            try {
                const req = await axios.get(`/api/v1/users/dashboard/`)
                setdashData(req.data.data)
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(true)
            }

        })
            ()
    }, [])
    return (
        !loading ? <div className="flex flex-col gap-5 xl:gap-0 justify-between w-[90%] h-screen lg:w-[50%] xl:w-[90%] mx-auto xl:flex-row"></div>
        :
        <>
            <div className="flex flex-col gap-5 xl:gap-0 justify-between w-[90%] lg:w-[50%] xl:w-[90%] mx-auto xl:flex-row">
                <span className="text-3xl font-semibold text-theme text-center xl:text-start">Welcome back, {authData.fullname}</span>
                <Link to="upload" className="inline-flex text-xl justify-center items-center gap-x-2 bg-black bg-opacity-10 dark:bg-gray-100 dark:bg-opacity-10 text-theme rounded-full px-5 py-4 font-semibold text-black">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"></path>
                    </svg>
                    Upload video
                </Link>
            </div>
            <div className="grid lg:grid-cols-3 gap-10 w-[95%] mx-auto">
                <div className="grid grid-rows-2 justify-center py-6 lg:h-48 bg-black bg-opacity-10 dark:bg-gray-100 dark:bg-opacity-10 rounded-xl ">
                    <div className="flex items-center justify-center mb-10 gap-4">
                        <span className="size-10 rounded-full flex justify-center items-center bg-theme">
                            <svg className="size-6 object-fill" xmlns="http://www.w3.org/2000/svg" fill="none" stroke={mode == 'dark' ? "white" : 'black'} width="24" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </span>
                        <span className="text-3xl lg:text-2xl  font-semibold text-theme text-center">Total views</span>
                    </div>
                    <span className="text-3xl lg:text-4xl 2xl:text-6xl font-semibold text-theme text-center">{dashData.totalViews}</span>
                </div>
                <div className="grid grid-rows-2 justify-center py-6 h-48 bg-black bg-opacity-10 dark:bg-gray-100 dark:bg-opacity-10 rounded-xl ">
                    <div className="flex items-center justify-center mb-10 gap-4">
                        <span className="size-10 rounded-full flex justify-center items-center bg-theme">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke={mode == 'dark' ? "white" : 'black'} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path></svg>
                        </span>
                        <span className="text-3xl lg:text-2xl  font-semibold text-theme text-start truncate">Total subscribers</span>
                    </div>
                    <span className="text-3xl lg:text-4xl 2xl:text-6xl font-semibold text-theme text-center">{dashData.totalSubs}</span>
                </div>
                <div className="grid grid-rows-2 justify-center py-6 h-48 bg-black bg-opacity-10 dark:bg-gray-100 dark:bg-opacity-10 rounded-xl ">
                    <div className="flex items-center justify-center mb-10 gap-4">
                        <span className="size-10 rounded-full flex justify-center items-center bg-theme">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={mode == 'dark' ? "white" : 'black'} width="20" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path></svg>
                        </span>
                        <span className="text-3xl lg:text-2xl font-semibold text-theme text-center">Total likes</span>
                    </div>
                    <span className="text-3xl lg:text-4xl 2xl:text-6xl font-semibold text-theme text-center">{dashData.totalLikes}</span>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-y-8 mb-24 bg-theme lg:p-10">
                {
                    dashData && dashData.userVideos.map((e) => (
                        <DashboardVideoBox data = {e} key = {e._id}/>
                    ))
                }
            </div>
            <Outlet />
        </>
    )
}
function DashboardVideoBox({data}) {
    return (
        <>
            <div className="cursor-pointer hover:bg-opacity-20 dark:hover:bg-opacity-40 hover:scale-105 hover:transition-all flex items-center lg:items-start justify-center gap-4 bg-black bg-opacity-10 dark:bg-gray-100 dark:bg-opacity-10 rounded-3xl p-2">
                    <Link to={`/video/${data._id}`} className="rounded-xl size-40 bg-white flex justify-center items-center overflow-hidden">
                        <img className="w-full h-full object-contain" src={data.thumbnail} />
                    </Link>
                    <Link to={`"/video"/${data._id}`} className="flex flex-col items-start w-[100%] lg:w-[80%]">
                        <span className="font-[600] tracking-normal text-lg lg:text-2xl text-theme mb-4">{data.title}</span>
                        <span className="tracking-wide font-[450] text-xs sm:text-sm lg:text-lg text-theme">
                            Uploaded On: 24/1/2013
                        </span>
                        <span className=" tracking-wide font-[450] text-xs sm:text-sm lg:text-lg text-theme">
                            Views: {data.views}
                        </span>
                        <span className="tracking-wide font-[450] text-xs sm:text-sm lg:text-lg text-theme">
                            Likes: {data.totalLikes}
                        </span>
                    </Link>
                <Link to={`delete/${data._id}`}>
                    <svg className="hover:stroke-red-500 size-10 lg:size-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg>
                </Link>
            </div>
        </>
    )
}

export default Dashboard