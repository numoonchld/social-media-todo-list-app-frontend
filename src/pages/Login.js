import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { dispatch } = useAuthContext()


    const handleUserLogin = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:3000/login', {
            headers: {
                'Content-type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        })

        const responseJSON = await response.json()
        console.log(responseJSON)

        if (responseJSON.user) {
            localStorage.setItem("token", responseJSON.token)
            dispatch({ type: "LOGIN", payload: responseJSON.user })
            alert('Login success!')
            navigate('/')
        }
        else {
            alert('Login failed - check credentials!')
        }
    }

    return <>
        <div
            className="container d-flex flex-column justify-content-center align-items-center "
            style={{ height: "99vh" }}
        >
            <section className='card p-5 w-50'>
                <form onSubmit={handleUserLogin}>
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
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </section>
        </div>
    </>
}

export default Login