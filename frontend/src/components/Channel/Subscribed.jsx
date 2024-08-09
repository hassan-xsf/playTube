import React from 'react'


function Subscribed() {
    return (
        <>
            <div className="grid grid-cols-1 gap-y-8 mb-24 bg-theme lg:p-10">
                <SubscribedToBox />
                <SubscribedToBox />
                <SubscribedToBox />
                <SubscribedToBox />
            </div>
        </>
    )
}

function SubscribedToBox() {
    return (
        <>
            <div className="flex items-center lg:items-start justify-center gap-4 bg-black bg-opacity-10 dark:bg-gray-100 dark:bg-opacity-10 rounded-3xl p-2">
                <div className="rounded-full size-16 bg-white flex justify-center items-center overflow-hidden">
                    <img className="w-full h-full object-contain rounded-full" src="https://yt3.ggpht.com/K6V8cVr3xJV9VFrZlgtdR3my0jdQ5qOCpXyb4UCFtcM8R3wFdpGxEk76aBG_L44c7AYdPFpstVE=s88-c-k-c0x00ffffff-no-rj" />
                </div>
                <div className="flex flex-col items-start w-[80%]">
                    <span className="font-[600] tracking-normal text-sm lg:text-lg text-theme">Hassan Shakil</span>
                    <span className="py-1.5 text-sm lg:text-base tracking-wide font-[450] text-theme">
                        20k Subscribers
                    </span>
                </div>
                <span className="py-1.5 text-xs lg:text-lg tracking-wide font-[450] text-center text-theme">
                    Subscribed On: 24/1/2013
                </span>
            </div>
        </>
    )
}

export default Subscribed