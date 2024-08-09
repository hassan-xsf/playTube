import axios from "axios"
import { useNavigate } from "react-router"
import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { logout } from "../store/userSlice"
import { useDispatch } from "react-redux"

function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.authStatus)
    useEffect(() => {
        if (!authStatus) {
            navigate("/")
        }
        else {
            ; (async () => {
                try {
                    const logoutUser = await axios.post("/api/v1/users/logout")
                    if (logoutUser) {
                        dispatch(logout())
                    }
                }
                catch (e) {
                    console.log(e.response.data)
                }
                finally {
                    navigate("/")
                }
            })()
        }
    }, [])
    return (
        <>
            <div className="w-full h-screen bg-theme">
                <div className="text-lg text-theme w-1/2 mx-auto">
                    Logging you out...
                </div >
            </div>
        </>
    )
}
export default Logout;