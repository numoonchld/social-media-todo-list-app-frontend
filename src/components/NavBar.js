import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const NavBar = () => {

    const { user } = useAuthContext()


    return <>
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex flex-row justify-content-end align-items-center" id="navbarTogglerDemo01">
                    <ul className="navbar-nav mx-lg-5 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-brand nav-link mx-3">Home</Link>
                        </li>
                        {!user &&
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link mx-3">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link mx-3">Register</Link>
                                </li>
                            </>
                        }
                        {user &&
                            <>
                                <li className="nav-item">
                                    <Link to="/users" className="nav-link mx-3">Users</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/todos" className="nav-link mx-3">{user.username}'s To-Dos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/logout" className="nav-link mx-3">Logout</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    </>
}

export default NavBar