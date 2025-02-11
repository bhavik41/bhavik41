import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'


const Login = () =>
{

    const [formData, setFormData] = useState({ email: '', password: '' })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { error, loading, success, user } = useSelector((state) => state.auth)

    const inputhandler = (e) =>
    {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        dispatch(login({ email: formData.email, password: formData.password }))
    }

    useEffect(() =>
    {
        console.log(localStorage.getItem('token'))
        if (localStorage.getItem('token')) {
            navigate('/home')
        }
    }, [success])
    return (
        <>
            <div>
                <form action="" onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            name='email'
                            onChange={inputhandler}
                            type="email" />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            name='password'
                            onChange={inputhandler}
                            type="password" />
                    </div>
                    <div>
                        <label htmlFor="submit">submit</label>
                        <button type='submit'>submit</button>
                    </div>
                </form>
            </div>
        </>

    )
}

export default Login