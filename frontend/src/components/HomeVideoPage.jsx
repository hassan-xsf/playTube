import React from 'react'
import {VideoBox} from './index'

function HomeVideoPage() {
    return (
        <div className="pl-5 pt-24 sm:pt-40 h-full min-h-screen tracking-tighter sm:pl-80 bg-black bg-theme pb-20">
            <div className="w-[90%] mx-auto sm:w-[70%] lg:w-[80%] 3xl:w-[90%]">
                <div className="grid grid-cols-1 gap-x-4 gap-y-20 lg:grid-cols-2 xl:grid-cols-3 6xl:grid-cols-4 7xl:grid-cols-5">
                    <VideoBox/>
                    <VideoBox/>
                    <VideoBox/>
                    <VideoBox/>
                    <VideoBox/>
                    <VideoBox/>
                    <VideoBox/>
                    <VideoBox/>
                    <VideoBox/>

                </div>
            </div>
        </div>
    )
}




export default HomeVideoPage


