import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const navigate = useNavigate()

    const { user } = useAuthContext()

    const [allUsers, setAllUsers] = useState([])

    const getAllUsers = async () => {

        const response = await fetch('http://localhost:3000/user/', {
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            method: 'GET',
        })

        const responseJSON = await response.json()

        if (responseJSON.status === 'ok') {
            setAllUsers(responseJSON.allUsers)
        }
    }

    useEffect(() => {
        if (user) {
            getAllUsers()
        }
        else {
            navigate('/login')
        }
    }, [])

    return <>
        {allUsers.map(user => <Link
            to={`/users/${user._id}`}
            key={user._id}
            className='w-100'
        >
            <div
                className='card w-100 p-5 my-3'
            >

                <span>
                    {user.username}
                </span>
                <br />
                <span className='fw-lighter fst-italic'>
                    user ID: {user._id}
                </span>

            </div></Link>)}
    </>
}

export default Users