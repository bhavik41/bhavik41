import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './routes/login'
import SignUp from './routes/signup'
import Home from './routes/Home'
import Student from './routes/Student'

const App = () =>
{
  return (

    <>
      <Router>
        <ToastContainer position='top-right' autoClose={3000} />
        <Routes>
          <Route path="/" element={<div>home</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/students" element={<Student />} />
        </Routes>
      </Router>
    </>

  )
}

export default App