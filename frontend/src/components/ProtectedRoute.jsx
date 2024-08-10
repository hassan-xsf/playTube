import React, { useEffect , useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/userSlice'

function ProtectedRoute({ children, required = true, permission = false }) {

    const navigate = useNavigate();
    const isLogged = useSelector(state => state.auth.authStatus)
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        if (permission && !isLogged) {
            setLoading(true)
            ; (async () => {
                try {
                    const response = await axios.get("/api/v1/users/currentuser")
                    if (response && response.data) {
                        dispatch(login(response.data.data))
                    }
                    else {
                        dispatch(logout())
                    }
                }
                catch (e) {
                    console.log("Error: " + e?.response?.data?.message || "Something went wrong")
                    dispatch(logout())
                }
                finally {
                    setLoading(false)
                }
            })()
        }
        else if (!isLogged && required) {
            navigate("/login")
        }
        else {
            if (isLogged && !required && !permission) {
                navigate("/")
            }
        }
    }, [isLogged, navigate])

    if(!loading) return children;
}

export default ProtectedRoute