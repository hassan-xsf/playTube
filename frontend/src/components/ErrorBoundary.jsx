import logo from '../assets/logo.png'
import Navbar from './Navbar'

function ErrorBoundary() {

    return (
        <>
            <Navbar />
            <div className="pt-24 h-full min-h-screen tracking-tighter bg-theme xsm:pb-24">
                <div className="pt-12 w-[40%] mx-auto flex flex-col place-items-center gap-5">
                    <img src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png" />
                    <span className="text-theme text-xl font-base text-center ">This page isn't available, Try searching for something else</span>
                </div>
            </div>
        </>
    )
}



export default ErrorBoundary