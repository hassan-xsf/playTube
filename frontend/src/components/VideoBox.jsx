import React from 'react'
import { useSelector } from 'react-redux'


function VideoBox({showChannelName = true , className = ""}) 
{
    const mode = useSelector(state => state.theme.mode)
    // const image = "https://i.ytimg.com/vi/5h6Oe3yIJAA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA9Fx81c-o8BCJl6B5JMpzRl7po-Q"
    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQntuO3gPMQzAdlnJ7C444S_5kclCtJp3uArw&s"
    return (<>
        <div className= {`rounded-2xl flex flex-col bg-theme ${className}">`}>
            <div className={`relative w-full h-40 sm:h-60 rounded-3xl bg-black ${mode === 'light' ? "bg-opacity-5" : "bg-opacity-90"}`}>
                <img className="w-full h-full object-contain rounded-3xl" src= {image}/>
                <span className = "bg-black bg-opacity-70 text-white font-semibold text-xs sm:text-sm py-0.5 px-1.5 rounded-md tracking-wide absolute bottom-2 right-2 mb-2 mr-2">12:36</span>
            </div>
            <div className="flex mt-2 gap-3">
                <div className="rounded-full size-10 sm:size-12 bg-white flex justify-center items-center overflow-hidden">
                    <img className="w-full h-full object-contain" src="https://yt3.ggpht.com/K6V8cVr3xJV9VFrZlgtdR3my0jdQ5qOCpXyb4UCFtcM8R3wFdpGxEk76aBG_L44c7AYdPFpstVE=s88-c-k-c0x00ffffff-no-rj" />
                </div>
                <div className = "flex justify-center flex-col w-3/4">
                    <span className = {`font-semibold text-sm sm:text-base leading-tight pb-1.5 text-theme line-clamp-2`}>DSA with javascript got him appreciateion and a package</span>
                    {showChannelName && <span className = {`font-[600]  text-sm sm:text-md leading-tigh tracking-[-0.5px] text-black text-opacity-50 dark:text-white dark:text-opacity-50`}>Fireship</span>}
                    <span className = {`font-[600] text-sm sm:text-md leading-tigh tracking-[-0.5px] text-black text-opacity-50 dark:text-white dark:text-opacity-50`}>238 views • 20 hours ago </span>
                </div>
            </div>
        </div>
    </>
    )
}


export default VideoBox