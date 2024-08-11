import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
function About() {


    return (
        <>

            <div className="pt-24 h-full min-h-screen tracking-tighter bg-theme xsm:pb-24">
                <div className="pt-12 w-[40%] mx-auto flex flex-col place-items-center gap-5">
                    <Link to="/" className="text-white flex items-center justify-center gap-2 bg-theme lg:gap-4">
                        <img className="max-w-8 lg:max-w-11" src={logo} />
                        <span className="text-base sm:text-2xl lg:text-3xl font-bold tracking-tighter text-theme  lg:tracking-[-3px]">PlayTube
                        </span>
                    </Link>
                    <span className="text-theme text-lg font-base text-center ">A video streaming platform where you can watch , share or create your moments, Created by a newbie developer <span className="font-semibold text-red-600">Hassan Shakil
                        <Link to = "https://www.linkedin.com/in/hassan-shakil-32631231b/" className = "ml-2 size-4 inline"><img className = "inline size-4" src = "https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"/></Link></span></span>
                    <span className="text-theme text-lg font-base text-center ">This project was made as a fun and practice project to further improve my skills as a web developer</span>
                    <span className="text-theme font-base text-center">Made using the
                        <span className="font-serif font-bold text-xl tracking-widest mx-2">
                            MERN
                        </span>
                    stack</span>
                    <div className="flex justify-center items-center gap-2 ">
                        <img className="h-12" src="https://static-00.iconduck.com/assets.00/mongodb-original-icon-921x2048-hvrb89lu.png" />
                        <img className="h-10" src="https://cdn.icon-icons.com/icons2/2699/PNG/512/expressjs_logo_icon_169185.png" />
                        <img className="h-12" src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" />
                        <img className="h-12" src="https://cdn.iconscout.com/icon/free/png-256/free-node-js-1174925.png?f=webp" />
                    </div>
                </div>
            </div >
        </>
    )
}



export default About