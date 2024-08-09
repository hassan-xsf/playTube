import React from 'react'

function ListVideoPage() {
    return (
        <div className="bg-white pl-96 pt-40 h-full min-h-screen tracking-tighter dark:bg-primary-black">
            <div className="w-[100%] mx-auto">
                <div className="flex flex-col gap-6">
                    <VideoBox />
                    <VideoBox />
                    <VideoBox />
                    <VideoBox />
                </div>
            </div>
        </div>
    )
}

function VideoBox() {
    return (<>
        <div className="bg-white rounded-md flex dark:bg-primary-black">
            <div className="relative">
                <img className="w-full h-full object-contain rounded-3xl" src="https://i.ytimg.com/vi/5h6Oe3yIJAA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA9Fx81c-o8BCJl6B5JMpzRl7po-Q" />
                <span className = "bg-black bg-opacity-70 text-white font-semibold text-base py-0.5 px-1 rounded-md tracking-wide absolute bottom-2 right-3">0:36</span>
            </div>
            <div className="flex mt-2 gap-3">

                <div className="px-5 flex flex-col gap-1">
                    <span className="font-semibold text-black text-xl leading-tight pb-1.5  dark:text-white">DSA with javascript got him appreciateion and a package</span>
                    <span className="font-normal text-black text-opacity-80 text-md leading-tight  dark:text-white dark:text-opacity-50">238 views • 20 hours ago </span>
                    <div className = "flex items-center gap-3 py-4">
                        <div className="rounded-full size-9 bg-white flex justify-center items-center overflow-hidden">
                            <img className="w-full h-full object-contain" src="https://yt3.ggpht.com/K6V8cVr3xJV9VFrZlgtdR3my0jdQ5qOCpXyb4UCFtcM8R3wFdpGxEk76aBG_L44c7AYdPFpstVE=s88-c-k-c0x00ffffff-no-rj" />
                        </div>
                        <span className = "text-black text-opacity-80 dark:text-white dark:text-opacity-50">
                            Chai aur Code
                        </span>
                    </div>
                    <span className="font-normal text-black text-opacity-80 text-md leading-tight dark:text-white dark:text-opacity-50">Quick IQ TEST - Are you a genius? IQ Test For Genius Only - How Smart Are Youy? By Genius Test.</span>
                </div>
            </div>
        </div>
    </>
    )
}



export default ListVideoPage


