import React from 'react'
import {VideoBox} from '../index'

function UserHistory() {
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