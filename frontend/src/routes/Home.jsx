import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../redux/authSlice'

const Home = () =>
{
    const { users, error, success, isAdmin } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() =>
    {
        console.log(users)
        console.log(isAdmin)
    }, [])

    const logout = () =>
    {
        dispatch(logoutUser())
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <>
            {isAdmin ? (
                <Link to='/students' >All users</Link>
            ) : (<>
                users Panal</>)
            }
            <div>
                <button onClick={logout}>logout</button>
            </div>
        </>


    )
}

export default Home