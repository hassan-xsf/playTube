import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

function ProtectedRoute({ children , required = true}) {

    const navigate = useNavigate();
    const isLogged = useSelector(state => state.auth.authStatus)

    useEffect(() => {
        if(!isLogged && required) {
            navigate("/login")
        }
        else {
            if(isLogged && !required) {
                navigate("/")
            }
        }
    }, [isLogged,navigate])

    return children;
}

export default ProtectedRoute