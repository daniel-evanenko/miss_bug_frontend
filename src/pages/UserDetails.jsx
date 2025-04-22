
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
            <h4>{user.fullname}</h4>
            <Avatar alt={user.fullname} src="/static/images/avatar/1.jpg" />
            <p>Username: <span>{user.username}</span></p>
            <p>Password: <span>{user.password}</span></p>
            <p>Score: <span>{user.score}</span></p>
            <button><Link to="/user">Back to List</Link></button>
        </div>
    )


}

