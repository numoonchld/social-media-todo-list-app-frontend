import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleUserRegistration = async (event) => {
        event.preventDefault()
        console.log('submitting user registration', { username, email, password })

        const response = await fetch('http://localhost:3000/user/', {
            headers: {
                'Content-type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                username,
                email,
                password
            })
        })

        const responseJSON = await response.json()
        console.log(responseJSON)

        if (responseJSON.status === 'ok') navigate('/login')
    }


    return <>

        <section className='card p-5 w-50'>
            <form onSubmit={handleUserRegistration}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        aria-describedby="emailHelp"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </section>

    </>
}

export default Register