import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from '../context/AuthContext'
import { WorkoutContext } from '../context/WorkoutContext'

function Navbar() {

    const { user, dispatch } = useContext(AuthContext)
    const { dispatch: workoutDispatch } = useContext(WorkoutContext)

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
        localStorage.removeItem("user")
        workoutDispatch({ type: "SET_WORKOUTS", payload: null })
    }

    return (
        <header className='navbar'>
            <div className="container">
                <div className="navbar__inner">
                    <Link to={"/"} >Home</Link>
                    {
                        !user && <div className="navbar__register">
                            <Link to={"/login"} >Login</Link>
                            <Link to={"/register"} >Register</Link>
                        </div>
                    }
                    {
                        user && <div className="user__side">
                            <p className="user">{user?.email}</p>
                            <button onClick={handleLogout} className='logout'>Logout</button>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Navbar