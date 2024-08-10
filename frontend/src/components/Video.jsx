import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router'
import { dateToFormat } from '../utils/dateToFormat'
import axios from "axios"
import { Outlet } from 'react-router'

function Video() {

    const { videoId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const isLogged = useSelector(state => state.auth.authStatus)
    const authData = useSelector(state => state.auth.authData)
    const [VideoData, setVideoData] = useState({})
    const [isCommentActive, setCommentActive] = useState(false)
    const mode = useSelector(state => state.theme.mode)
    const [isSubbed, setisSubbed] = useState(false)
    const [totalSub, settotalSub] = useState(0)

    const [isLiked, setisLiked] = useState(false)
    const [totalLikes,setTotalLikes] = useState(0)

    useEffect(() => {
        ; (async () => {
            try {
                setLoading(true)
                const videoInfo = await axios.get(`/api/v1/video/${videoId}`)
                if (videoInfo) {
                    setVideoData(videoInfo.data.data[0])
                    settotalSub(videoInfo.data.data[0].totalSubs)
                    await axios.patch(`/api/v1/video/${videoId}`)
                    const likes = await axios.get(`/api/v1/likes/video/totallikes/${videoId}`) 
                    setTotalLikes(likes.data.data || 0)

                }
                if (isLogged) {
                    const subData = await axios.get(`/api/v1/sub/hassubbed/${videoId}`)
                    if (subData) {
                        setisSubbed(subData.data.data.subbed)
                    }
                    const likeData = await axios.get(`/api/v1/likes/video/hasliked/${videoId}`)
                    console.log(likeData)
                    if (likeData) {
                        setisLiked(likeData.data.data.liked)
                    }
                }
            }
            catch (error) {
                console.log(error.message)
                navigate("/notfound")
            }
            finally {
                setLoading(false)
            }
        })
            ()


    }, [videoId, navigate])

    const likeHandle = async () => {
        if(!isLogged) return navigate("/login")
        try {
            const test = await axios.post(`/api/v1/likes/video/toggle/${VideoData._id}`)
            setisLiked(test.data.data.liked)
            setTotalLikes(test.data.data.totalLikes)
        }
        catch (error) {
            console.log(error?.response?.data)
        }
    }
    const dislikeHandle = async() => {
        if(isLiked) await likeHandle();
    }
    const handleSubscribe = async () => {
        if(!isLogged) return navigate("/login")
        try {
            const test = await axios.post(`/api/v1/sub/channel/${VideoData.videoOwner.username}`)
            console.log(test.data.data)
            setisSubbed(test.data.data.subbed)
            settotalSub(test.data.data.totalSub)
        }
        catch (error) {
            console.log(error?.response?.data)
        }
    }

    return (
        <>
            {
                loading ? <div className = "pt-32 text-8xl text-red-900 text-center"></div> :
                <div className="pt-32 h-full min-h-screen tracking-tighter bg-theme">
                    <section className="min-h-screen w-[93%] mx-auto flex flex-col lg:flex-row items-start gap-10">
                        <div className="w-[90%] lg:w-[66%] mx-auto flex flex-col justify-center">
                            <video
                                className="h-full w-full rounded-3xl object-contain"
                                controls
                                autoPlay
                            >
                                <source
                                    src={VideoData.videoFile}
                                    type="video/mp4" />
                            </video>
                            <div className="flex flex-col flex-start my-3">
                                <span className="font-[600] text-xl md:text-2xl text-theme text-center lg:text-start">{VideoData.title}</span>
                            </div>
                            <div className="flex flex-col lg:flex-row justify-between items-center gap-5 xl:gap-12 pt-4">
                                <Link to={`/c/${VideoData.videoOwner.username}`} className="flex items-center gap-3.5 pb-1 flex-col lg:flex-row">
                                    <div className="rounded-full size-12 bg-white flex justify-center items-center overflow-hidden">
                                        <span>
                                            <img className="hover:scale-105 hover:transition-all w-full h-full object-contain" src={VideoData.videoOwner.avatar} />
                                        </span>

                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-lg text-theme text-nowrap">{VideoData.videoOwner.fullname}</span>
                                        <span className="font-normal text-black text-sm leading-tight  dark:text-white dark:text-opacity-50">{totalSub} subscribers </span>
                                    </div>
                                </Link>
                                <div className="flex justify-between flex-grow gap-1 xsm:gap-5 lg:gap-0">
                                    <div className={`text-white ${isSubbed ? "bg-black bg-opacity-90 dark:bg-white" : "bg-black bg-opacity-5 dark:bg-gray-100 dark:bg-opacity-10"}  py-3 px-3 xl:px-6 flex justify-start items-center border-black rounded-full`}>
                                        <button onClick={handleSubscribe} className="flex items-center hover:scale-105 hover:bg-opacity-10 dark:hover:bg-opacity-30 transition-all">
                                            {
                                                !isSubbed ?
                                                    <>
                                                        <svg className="size-4 sm:size-6" viewBox="0 0 24 24" fill="none" stroke={mode == 'dark' ? "white" : 'black'} xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <span className="font-semibold text-xs sm:text-md lg:text-base text-theme px-3">Subscribe</span>
                                                    </>
                                                    :
                                                    <>
                                                        <svg className="size-4 sm:size-6" viewBox="0 0 24 24" fill={mode == 'dark' ? "white" : 'white'} stroke={mode == 'dark' ? "black" : 'black'} xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>

                                                        <span className="font-semibold text-xs sm:text-md lg:text-base text-white dark:text-black px-3">Subscribed</span>
                                                    </>
                                            }
                                        </button>

                                    </div>
                                    <div className="w-full flex justify-end gap-1 xsm:gap-2 xl:gap-10 items-center">
                                        <div className="text-white bg-black bg-opacity-5 py-1 px-6 xl:px-9 flex justify-start items-center border-black rounded-full dark:bg-gray-100 dark:bg-opacity-10">
                                            <div className="flex justify-center items-center gap-2 tracking-wide">
                                                <svg onClick = {likeHandle} className={`cursor-pointer size-4 sm:size-6 lg:size-8 hover:dark:text-white hover:text-primary-black hover:scale-110 hover:transition-all ${mode == 'dark' ? "text-[#262626]" : 'text-[#F2F2F2]'} ${isLiked ? "text-primary-black dark:text-[#F2F2F2]" : 'text-[#F2F2F2] dark:text-[#262626]'} `} viewBox="0 0 24 24" fill="currentColor" stroke={mode == 'dark' ? "white" : 'black'} xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M15.9 4.5C15.9 3 14.418 2 13.26 2c-.806 0-.869.612-.993 1.82-.055.53-.121 1.174-.267 1.93-.386 2.002-1.72 4.56-2.996 5.325V17C9 19.25 9.75 20 13 20h3.773c2.176 0 2.703-1.433 2.899-1.964l.013-.036c.114-.306.358-.547.638-.82.31-.306.664-.653.927-1.18.311-.623.27-1.177.233-1.67-.023-.299-.044-.575.017-.83.064-.27.146-.475.225-.671.143-.356.275-.686.275-1.329 0-1.5-.748-2.498-2.315-2.498H15.5S15.9 6 15.9 4.5zM5.5 10A1.5 1.5 0 0 0 4 11.5v7a1.5 1.5 0 0 0 3 0v-7A1.5 1.5 0 0 0 5.5 10z" /></svg>
                                                <span className="text-theme text-xs sm:text-md lg:text-base font-semibold">{totalLikes}</span>
                                                <span className="h-10 bg-black bg-opacity-30 w-[1px] mx-2"></span>
                                                <svg onClick = {dislikeHandle} className={`cursor-pointer size-4 sm:size-6 lg:size-8 mb-1 hover:dark:text-white hover:text-primary-black hover:scale-110 hover:transition-all ${mode == 'dark' ? "text-[#262626]" : 'text-[#F2F2F2]'}`} viewBox="0 0 24 24" fill = "currentColor" stroke={mode == 'dark' ? "white" : 'black'} xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.1 20.5c0 1.5 1.482 2.5 2.64 2.5.806 0 .869-.613.993-1.82.055-.53.121-1.174.267-1.93.386-2.002 1.72-4.56 2.996-5.325V8C15 5.75 14.25 5 11 5H7.227C5.051 5 4.524 6.432 4.328 6.964A15.85 15.85 0 0 1 4.315 7c-.114.306-.358.546-.638.82-.31.306-.664.653-.927 1.18-.311.623-.27 1.177-.233 1.67.023.299.044.575-.017.83-.064.27-.146.475-.225.671-.143.356-.275.686-.275 1.329 0 1.5.748 2.498 2.315 2.498H8.5S8.1 19 8.1 20.5zM18.5 15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-3 0v7a1.5 1.5 0 0 0 1.5 1.5z" /></svg>
                                            </div>
                                        </div>
                                        <Link to="share" className="text-white bg-black bg-opacity-5 py-3 px-4 xl:px-6 flex justify-center items-center border-black rounded-full dark:bg-gray-100 dark:bg-opacity-10">
                                            <svg className="size-6 lg:size-8" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-76.8 -76.8 665.60 665.60" fill="#E5E5E5" stroke="#000000" strokeWidth="30.6">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="6.144" />
                                                <g id="SVGRepo_iconCarrier"> <g> <path className="st0" d="M512,230.431L283.498,44.621v94.807C60.776,141.244-21.842,307.324,4.826,467.379 c48.696-99.493,149.915-138.677,278.672-143.14v92.003L512,230.431z" /> </g> </g>
                                            </svg>
                                            <span className="font-semibold text-xs sm:text-md lg:text-base text-theme px-2">Share</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col bg-gray-600 bg-opacity-5 my-6 py-4 px-4 rounded-3xl tracking-normal dark:bg-opacity-30">
                                <span className="font-semibold text-md text-theme">{VideoData.views} views {dateToFormat(VideoData.createdAt)}</span>
                                <span className="py-1.5 font-semibold text-sm line-clamp-6 sm:line-clamp-none">
                                    {VideoData.description}
                                </span>
                            </div>
                            <div className="flex flex-col my-6 px-4">
                                <span className="text-2xl font-bold tracking-tight text-theme pb-10">159 Comments</span>
                                <div className="flex items-start gap-6">
                                    <div className="rounded-full size-12 bg-white flex justify-center items-center overflow-hidden">
                                        <img className="w-full h-full object-contain" src="https://yt3.ggpht.com/K6V8cVr3xJV9VFrZlgtdR3my0jdQ5qOCpXyb4UCFtcM8R3wFdpGxEk76aBG_L44c7AYdPFpstVE=s88-c-k-c0x00ffffff-no-rj" />
                                    </div>
                                    <div className="flex flex-col w-full gap-1.5">
                                        <input
                                            className="w-full outline-none bg-theme text-md" type="text" placeholder="Add a comment.."
                                            onFocus={() => setCommentActive(true)}
                                            onBlur={() => setCommentActive(false)}
                                        />
                                        <div className="w-full h-0.5 bg-opacity-40 bg-black dark:bg-white"></div>
                                        <div className="flex gap-4 justify-end text-lg mt-2 text-black">
                                            <button className={` ${isCommentActive ? "block" : "hidden"} bg-opacity-10 font-semibold bg-black text-sm dark:bg-white py-1 rounded-full px-5`}>Comment</button>
                                            <button className={` ${isCommentActive ? "block" : "hidden"} bg-opacity-10 font-semibold bg-black text-sm dark:bg-white py-1 rounded-full px-5`}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center px-4 gap-8 pt-8 pb-8">
                                <Comment />
                                <Comment />
                                <Comment />
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 w-[90%] xsm:w-3/4 sm:w-2/3 lg:w-1/3">
                            <VideoSuggestion />
                            <VideoSuggestion />
                            <VideoSuggestion />
                            <VideoSuggestion />
                            <VideoSuggestion />
                            <VideoSuggestion />
                            <VideoSuggestion />
                            <VideoSuggestion />
                        </div>
                    </section>
                </div>
            }
            <Outlet />
        </>
    )
}
function Comment() {
    const mode = useSelector(state => state.theme.mode)
    return <>

        <div className="flex items-start gap-4">
            <div className="rounded-full size-12 bg-white flex justify-center items-center overflow-hidden">
                <img className="w-full h-full object-contain" src="https://yt3.ggpht.com/K6V8cVr3xJV9VFrZlgtdR3my0jdQ5qOCpXyb4UCFtcM8R3wFdpGxEk76aBG_L44c7AYdPFpstVE=s88-c-k-c0x00ffffff-no-rj" />
            </div>
            <div className="flex flex-col items-start w-[80%]">
                <div className="flex justify-center items-end gap-4">
                    <span className="font-[600] tracking-normal text-md text-theme">@hassanshakil</span>
                    <span className="font-normal tracking-tight text-sm opacity-80 text-theme">2 weeks ago</span>
                </div>
                <span className="py-1.5 tracking-wide font-[450] text-theme text-sm  line-clamp-3 xs:line-clamp-none">
                    Your teaching style is incredibly effective and engaging. The way you simplify complex topics makes learning enjoyable and accessible. Thank you for all your hard work and dedication!
                </span>
                <div className="flex gap-2 items-center">
                    <svg className="size-5" viewBox="0 0 24 24" fill={mode == 'dark' ? "#0F0F0F" : 'white'} stroke={mode == 'dark' ? "white" : 'black'} xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M15.9 4.5C15.9 3 14.418 2 13.26 2c-.806 0-.869.612-.993 1.82-.055.53-.121 1.174-.267 1.93-.386 2.002-1.72 4.56-2.996 5.325V17C9 19.25 9.75 20 13 20h3.773c2.176 0 2.703-1.433 2.899-1.964l.013-.036c.114-.306.358-.547.638-.82.31-.306.664-.653.927-1.18.311-.623.27-1.177.233-1.67-.023-.299-.044-.575.017-.83.064-.27.146-.475.225-.671.143-.356.275-.686.275-1.329 0-1.5-.748-2.498-2.315-2.498H15.5S15.9 6 15.9 4.5zM5.5 10A1.5 1.5 0 0 0 4 11.5v7a1.5 1.5 0 0 0 3 0v-7A1.5 1.5 0 0 0 5.5 10z" /></svg>
                    <span className="font-normal tracking-tight text-sm opacity-80 text-theme pr-2">62</span>
                    <svg className="size-5" viewBox="0 0 24 24" fill={mode == 'dark' ? "#0F0F0F" : 'white'} stroke={mode == 'dark' ? "white" : 'black'} xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.1 20.5c0 1.5 1.482 2.5 2.64 2.5.806 0 .869-.613.993-1.82.055-.53.121-1.174.267-1.93.386-2.002 1.72-4.56 2.996-5.325V8C15 5.75 14.25 5 11 5H7.227C5.051 5 4.524 6.432 4.328 6.964A15.85 15.85 0 0 1 4.315 7c-.114.306-.358.546-.638.82-.31.306-.664.653-.927 1.18-.311.623-.27 1.177-.233 1.67.023.299.044.575-.017.83-.064.27-.146.475-.225.671-.143.356-.275.686-.275 1.329 0 1.5.748 2.498 2.315 2.498H8.5S8.1 19 8.1 20.5zM18.5 15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-3 0v7a1.5 1.5 0 0 0 1.5 1.5z" /></svg>
                </div>
            </div>
        </div>
    </>
}

function VideoSuggestion() {
    return (<>
        <div className="rounded-md flex bg-theme">
            <div className="relative w-[70%]">
                <img className="w-full h-full object-contain rounded-2xl" src="https://i.ytimg.com/vi/5h6Oe3yIJAA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA9Fx81c-o8BCJl6B5JMpzRl7po-Q" />
                <span className="bg-black bg-opacity-70 text-white font-semibold text-sm sm:text-md py-0.5 px-1 rounded-md tracking-wide absolute bottom-2 right-3">0:36</span>
            </div>
            <div className="flex mt-2">
                <div className="px-3 flex flex-col">
                    <span className="font-semibold text-black text-xs xl:text-sm sm:text-base leading-tight dark:text-white">DSA with javascript got him appreciateion and a package</span>
                    <div className="flex items-center gap-1 pt-2 pb-0.5">
                        <span className="font-[600] text-xs lg:text-sm xl:text-md text-black text-opacity-80 dark:text-white dark:text-opacity-50">
                            Chai aur Code
                        </span>
                    </div>
                    <span className="font-[600]  text-sm sm:text-md text-black text-opacity-80 text-md leading-tight  dark:text-white dark:text-opacity-50">238 views • 20 hours ago </span>
                </div>
            </div>
        </div>
    </>
    )
}


export default Video