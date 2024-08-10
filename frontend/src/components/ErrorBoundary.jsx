
import Navbar from './Navbar'
import { useNavigate } from 'react-router'
function ErrorBoundary() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1)
    }
    return (
        <>
            <Navbar />
            <div className="pt-24 h-full min-h-screen tracking-tighter bg-theme xsm:pb-24">
                <div className="pt-12 w-[40%] mx-auto flex flex-col place-items-center gap-5">
                    <img src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png" />
                    <span className="text-theme text-xl font-base text-center ">This page isn't available, Try searching for something else</span>
                    <button onClick = {handleClick} className = "py-1 px-4 text-white font-semibold rounded-lg bg-red-600">Go Back</button>
                </div>
            </div>
        </>
    )
}



export default ErrorBoundary