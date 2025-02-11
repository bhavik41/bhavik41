import React, { useEffect, useState } from 'react'
import axios from '../config/axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../redux/authSlice'

const Student = () =>
{
    const { isAdmin } = useSelector((state) => state.auth)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(async () =>
    {
        if (!isAdmin) {
            navigate('/home');
        }
        try {
            const response = await axios.get('/admin/allusers')


            setUsers(response.data.users)
            console.log(users)
            return response.data


        } catch (error) {

        }
    }, [])
    return (
        <>
            {
                users.map((user, index) => (
                    <div key={index}>
                        <h1>{user.username}</h1>
                        <h1>{user.email}</h1>
                    </div>
                ))


            }
            <div>
                <button onClick={() => dispatch(logoutUser)}>logout</button>
            </div>

        </>
    )
}

export default Student