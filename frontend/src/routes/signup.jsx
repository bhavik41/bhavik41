import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'


const SignUp = () =>
{

    const [formData, setFormData] = useState({ email: '', password: '', role: 'ADMIN', name: '' })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, error, success } = useSelector((state) => state.auth)

    const token = localStorage.getItem('token')
    const inputhandler = (e) =>
    {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        console.log(formData)
        dispatch(signup({ name: formData.name, email: formData.email, password: formData.password, role: formData.role }))
    }

    useEffect(() =>
    {
        if (token) {
            navigate('/home')
        }
        if (isLoading) {
            return <div>Loading...</div>
        }
        if (success == true) {
            navigate('/login')
        }
    }, [success])



    return (
        <>
            <div>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:-</label>
                        <input
                            name='name'
                            onChange={inputhandler}
                            type="text" />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            name='email'
                            onChange={inputhandler}
                            type="email" />
                    </div>

                    <div>
                        <label htmlFor="Role">
                            Role:
                        </label>
                        <select
                            onChange={inputhandler}
                            name="role"
                            id="role">
                            <option value="ADMIN">Admin</option>
                            <option value="USER">User</option>
                        </select>
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

export default SignUp