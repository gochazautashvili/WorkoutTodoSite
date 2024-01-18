import axios from 'axios'
import React, { useContext, useState } from 'react'
import { WorkoutContext } from '../context/WorkoutContext'
import { AuthContext } from '../context/AuthContext'

function WorkoutForm() {
    const { dispatch } = useContext(WorkoutContext)
    const { user } = useContext(AuthContext)

    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!user) {
            alert("you don't have a account ")
            return
        }

        axios.post("https://post-site-api.vercel.app/api", { title, reps, load }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((res) => dispatch({ type: "CREATE_WORKOUT", payload: res.data }))
            .then(() => {
                setTitle("")
                setReps("")
                setLoad("")
            })
            .catch(err => setError(err.message))
    }

    return (
        <form onSubmit={handleSubmit} className="addWorkout">
            <div className="addWorkout__box">
                <label>Workout Title</label>
                <input type="text" value={title} placeholder='Text here workout Title' onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="addWorkout__box">
                <label>Workout Reps</label>
                <input type="text" value={reps} placeholder='Text here workout Reps' onChange={e => setReps(e.target.value)} />
            </div>
            <div className="addWorkout__box">
                <label>Workout Load (in kg)</label>
                <input type="text" value={load} placeholder='Text here workout Load in KG' onChange={e => setLoad(e.target.value)} />
            </div>
            <button type='submit'>ADD Workout</button>
            {error && <p className='error'>{error}</p>}
        </form>
    )
}

export default WorkoutForm