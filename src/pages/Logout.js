import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const Logout = () => {
    const [isLoggedOut, setIsLoggedOut] = useState(false)

    const { dispatch } = useAuthContext()

    useEffect(() => {

        localStorage.removeItem('token')

        dispatch({ type: "LOGOUT" })
        setIsLoggedOut(true)


    }, [])

    return <>
        {isLoggedOut && <p> logged out </p>}
        {!isLoggedOut && <p> logging out... </p>}
    </>
}

export default Logout