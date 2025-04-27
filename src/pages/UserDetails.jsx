
import { useState } from 'react'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userService } from '../services/user.service.js'
import { Avatar } from '@mui/material'
import { BugList } from '../cmps/BugList.jsx'
import { bugService } from '../services/bug.service.js'


export function UserDetails() {

    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const [bugs, setBugs] = useState([])

    useEffect(() => {
        loadUser()
        loadBugs()
    }, [userId])

    async function loadBugs() {
        const bugs = await bugService.getBugsByOwnerId(userId)
        setBugs(bugs)
    }

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
        <section>
            <div className="user-details main-layout">
                <Avatar alt={user.fullname} src={user.imgUrl || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'} />
                <p>Fullname: <span>{user.fullname}</span></p>
                <p>Username: <span>{user.username}</span></p>
                {/* <p>Password: <span>{user.password}</span></p> */}
                <p>Score: <span>{user.score}</span></p>
                <button><Link to="/user">Back to List</Link></button>
            </div>
            {bugs.length ? <h1>User bugs</h1> : <h1>User has no bugs</h1>}
            <BugList bugs={bugs}></BugList>

        </section>
    )


}

