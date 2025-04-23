
import { useState } from 'react'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userService } from '../services/user.service.js'
import { Avatar } from '@mui/material'


export function UserDetails() {

    const [user, setUser] = useState(null)
    const { userId } = useParams()

    useEffect(() => {
        loadUser()
    }, [])

    async function loadUser() {
        try {
            const user = await userService.getById(userId)
            setUser(user)
        } catch (err) {
            showErrorMsg('Cannot load user')

        }
    }

    if (!user) return <h1>loadings....</h1>
    return (
        <div className="user-details main-layout">
            <Avatar alt={user.fullname} src={user.imgUrl || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'} />
            <p>Fullname: <span>{user.fullname}</span></p>
            <p>Username: <span>{user.username}</span></p>
            <p>Password: <span>{user.password}</span></p>
            <p>Score: <span>{user.score}</span></p>
            <button><Link to="/user">Back to List</Link></button>
        </div>
    )


}

