import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { WorkoutContext } from '../context/WorkoutContext'
import { AuthContext } from '../context/AuthContext'

function Home() {
    const { workouts, dispatch } = useContext(WorkoutContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const getWorkout = async () => {
            const res = await axios.get("https://post-site-api.vercel.app/api", {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            dispatch({ type: "SET_WORKOUTS", payload: res?.data })
        }

        if (user) {
            getWorkout()
        }
    }, [dispatch, user])

    return (
        <main className='home'>
            <div className="container">
                <div className="home__inner">
                    <div className="home__workout">
                        {
                            workouts && workouts.map(workout => {
                                return (
                                    <WorkoutDetails key={workout._id} workout={workout} />
                                )
                            })
                        }
                    </div>
                    <WorkoutForm />
                </div>
            </div>
        </main>
    )
}

export default Home