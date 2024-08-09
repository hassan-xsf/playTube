import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import { NavLink, Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setChannel } from '../../store/userSlice'

function Channel() {
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const mode = useSelector(state => state.theme.mode)
    const isLogged = useSelector(state => state.auth.authStatus)
    const authData = useSelector(state => state.auth.authData)
    const [profileData, setprofileData] = useState({})

    useEffect(() => {
        
        if (isLogged) {
            ; (async () => {
                try {
                    setLoading(true)
                    const channelInfo = await axios.get(`/api/v1/users/c/${channelId}`)
                    setprofileData(channelInfo.data.data)
                    dispatch(setChannel(channelInfo.data.data.username))
                }
                catch (error) {
                    console.log(error)
                    navigate("/notfound")
                }
                finally {
                    setLoading(false)
                }
            })
            ()
        }

    }, [channelId, navigate])

    const handleSubscribe = async () => {
        try {
            await axios.post(`/api/v1/sub/channel/${channelId}`)
            navigate(0)
        }
        catch (error) {
            console.log(error.response.data)
        }
    }


    return (loading ?
        <div className="w-full h-screen bg-theme"></div>

        :

        <div className="pl-5 pt-24 sm:pt-40 h-full min-h-screen tracking-tighter sm:pl-80 bg-black bg-theme">
            <div className="w-[80%] mx-auto">
                <div className="flex flex-col gap-x-4 gap-y-10 sm:gap-y-20 bg-theme min-h-screen">
                    <div className="w-full">
                        <div className="h-48 sm:h-62 lg:h-96 bg-black rounded-lg">
                            <img className="object-fill object-top size-full rounded-lg" src={profileData.coverImage || "https://img.freepik.com/free-vector/retro-styled-pattern-background_1048-6593.jpg"} />
                        </div>
                        <div className="-my-20 flex items-center mx-1 lg:mx-10">
                            <div className="size-24 lg:size-36 2xl:size-52 rounded-full bg-black ring-4 ring-white flex items-center">
                                <img className="object-fill object-top size-full rounded-full" src={profileData.avatar} />
                            </div>
                            <div className="mt-20 lg:mt-24 px-4 lg:px-6 flex flex-col tracking-wide w-[60%] lg:w-[70%] text-nowrap">
                                <span className="text-xl lg:text-3xl font-semibold text-theme ">{profileData.fullname}</span>
                                <span className="text-xs md:text-sm lg:text-lg font-light text-theme dark:opacity-70">@{profileData.username}</span>
                                <span className="text-xs md:text-sm lg:text-lg font-light text-theme dark:opacity-70 text-wrap">
                                    {profileData.subscribersCount} Subscribers
                                    <span className="block xsm:inline">
                                        <span className="hidden xsm:inline"> • </span>
                                        <Link to={`/c/${profileData.username}/subscribedto`} relative="path">{profileData.subscribedToCount} Subscribed</Link>
                                    </span>
                                </span>
                                {
                                    !profileData.isSubscribed ?
                                        (
                                            <button onClick={handleSubscribe} className="hover:scale-105 hover:bg-opacity-10 dark:hover:bg-opacity-30 transition-all mb-10 lg:mb-0 max-w-36 lg:max-w-xs mt-4 text-white bg-black bg-opacity-5 py-2 lg:py-3 lg:px-6 flex justify-center items-start border-black rounded-full dark:bg-gray-100 dark:bg-opacity-10">
                                                <svg className="size-5 sm:size-6 lg:size-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 3L21 21M9.37747 3.56325C10.1871 3.19604 11.0827 3 12 3C13.5913 3 15.1174 3.59 16.2426 4.6402C17.3679 5.69041 18 7.11479 18 8.6C18 10.3566 18.2892 11.7759 18.712 12.9122M17 17H15M6.45339 6.46451C6.15686 7.13542 6 7.86016 6 8.6C6 11.2862 5.3238 13.1835 4.52745 14.4866C3.75616 15.7486 3.37051 16.3797 3.38485 16.5436C3.40095 16.7277 3.43729 16.7925 3.58603 16.9023C3.71841 17 4.34762 17 5.60605 17H9M9 17V18C9 19.6569 10.3431 21 12 21C13.6569 21 15 19.6569 15 18V17M9 17H15" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                                <span className="font-semibold text-sm sm:text-md lg:text-xl text-theme px-4">Subscribe</span>
                                            </button>

                                        )
                                        :
                                        (

                                            <button onClick={handleSubscribe} className="mb-10 lg:mb-0 max-w-36 lg:max-w-xs mt-4 text-white bg-black bg-opacity-90 py-2 lg:py-3 lg:px-6 flex justify-center items-start border-black rounded-full dark:bg-gray-100 dark:bg-opacity-100">
                                                <svg className="size-5 sm:size-6 lg:size-7" viewBox="0 0 24 24" fill={mode == 'dark' ? "white" : 'white'} stroke={mode == 'dark' ? "black" : 'black'} xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                                <span className="font-bold text-sm sm:text-md lg:text-xl text-white px-4 dark:text-black">Subscribed</span>
                                            </button>
                                        )
                                }

                            </div>

                        </div>
                    </div>
                    {/* <span className="text-3xl font-bold text-theme mt-12">Videos {">"}</span> */}
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-2 md:gap-x-0 items-start place-items-start mt-12 text-md lg:text-lg font-semibold w-[100%] md:[w-80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] text-nowrap">
                        <NavLink
                            to="videos"
                            className={({ isActive }) => `rounded-xl text-theme shadow-white ${isActive ? "underline" : "no-underline"} decoration-4 underline-offset-8`}>
                            Videos
                        </NavLink>
                        <NavLink
                            to="subscribedto"
                            className={({ isActive }) => `rounded-xl text-theme shadow-white ${isActive ? "underline" : "no-underline"} decoration-4 underline-offset-8`}>
                            Subscribed
                        </NavLink>
                        {
                            authData.username === profileData.username && (
                                <>
                                    <NavLink
                                        to="dashboard"
                                        className={({ isActive }) => `rounded-xl text-theme shadow-white ${isActive ? "underline" : "no-underline"} decoration-4 underline-offset-8`}>
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        to="history"
                                        className={({ isActive }) => `rounded-xl text-theme shadow-white ${isActive ? "underline" : "no-underline"} decoration-4 underline-offset-8`}>
                                        History
                                    </NavLink>
                                    <NavLink
                                        to="edit"
                                        className={({ isActive }) => `rounded-xl text-theme shadow-white ${isActive ? "underline" : "no-underline"} decoration-4 underline-offset-8`}>
                                        Edit Channel
                                    </NavLink>
                                </>
                            )
                        }
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}




export default Channel;

