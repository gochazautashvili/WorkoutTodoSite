import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import Navbar from './components/Navbar'
import { AuthContext } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import { useContext } from 'react'

function App() {

  const { user } = useContext(AuthContext)

  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
