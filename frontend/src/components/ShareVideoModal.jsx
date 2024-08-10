import React , {useState} from 'react'
import { useNavigate , useLocation } from 'react-router';


function ShareVideoModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const [linkCopied,setlinkCopied] = useState(false)

    const fullURL = `${window.location.origin}${location.pathname}${location.search}${location.hash}`.replace("share" , "");

    const clipboard = () => {
        navigator.clipboard.writeText(fullURL)
        setlinkCopied(true)

    }
    const handleClose = () => {
        navigate(-1)
    }
    return (
        <>
            <div className="fixed inset-0 z-12 flex flex-col items-center justify-center bg-black/50 px-4 pt-4">
                <div className="mx-auto w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-theme p-4">
                    <div className="mb-6 flex items-start gap-4">
                        <span className="h-10 w-10 shrink-0 rounded-full ring-gray-500 ring-1 bg-theme p-1 text-red-700">
                            <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-76.8 -76.8 665.60 665.60" fill="#FFFFFF" stroke="#000000" strokeWidth="30.6">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="6.144" />
                                <g id="SVGRepo_iconCarrier"> <g> <path className="st0" d="M512,230.431L283.498,44.621v94.807C60.776,141.244-21.842,307.324,4.826,467.379 c48.696-99.493,149.915-138.677,278.672-143.14v92.003L512,230.431z" /> </g> </g>
                            </svg>
                        </span>
                        <h2 className="w-1/3 mx-auto text-2xl font-semibold text-center">
                            Share Video
                            <span className="text-base block font-semibold text-theme">Click on copy to copy the link</span>
                        </h2>
                        <button onClick={handleClose} className="h-10 w-10 shrink-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="flex w-full gap-2 mb-10 items-center justify-center">
                        <input type="text" className="w-4/5 rounded-lg text-sm text-black p-2 bg-theme ring-black ring-1 ring-opacity-50 dark:ring-white" defaultValue={fullURL} />
                        <button onClick = {clipboard} className = "py-2 px-4 bg-blue-500 text-white text-sm font-bold rounded-md">
                            Copy
                        </button>
                    </div>
                    {linkCopied && <span className="text-base block font-semibold text-blue-400 text-center">Link copied!</span>}

                </div>
            </div>
        </>
    )
}


export default ShareVideoModal