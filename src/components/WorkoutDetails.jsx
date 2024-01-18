import React, { useContext } from 'react'
import axios from 'axios'
import { WorkoutContext } from '../context/WorkoutContext'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { AuthContext } from '../context/AuthContext'

function WorkoutDetails({ workout }) {
    const { dispatch } = useContext(WorkoutContext)
    const { user } = useContext(AuthContext)

    const handelDelete = () => {
        axios.delete("https://post-site-api.vercel.app/api/" + workout._id, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then((res) => dispatch({ type: "DELETE_WORKOUT", payload: res.data }))
    }

    return (
        <section className='workout__details'>
            <div className="workout__details_top">
                <h4>{workout.title}</h4>
                <button onClick={() => handelDelete()}>X</button>
            </div>
            <p><strong>Load (kg): </strong> {workout.load} </p>
            <p><strong>Reps: </strong> {workout.reps} </p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
        </section>
    )
}

export default WorkoutDetails