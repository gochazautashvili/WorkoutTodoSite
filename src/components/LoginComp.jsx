import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function LoginComp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("https://post-site-api.vercel.app/user/login", { email, password })

      localStorage.setItem("user", JSON.stringify(res.data))

      dispatch({ type: "LOGIN", payload: res.data })
      navigate("/")
    } catch (error) {
      setError(error?.response?.data?.error)
    }
  }

  return (
    <section onSubmit={handleLogin} className='login'>
      <h1>Log in</h1>
      <p className="error">{error}</p>
      <form className='login__form'>
        <label>Email:</label>
        <input type="text" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="text" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </section>
  )
}

export default LoginComp