
import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userService } from '../services/user.service.js'
import { Avatar } from '@mui/material'
import { BugList } from '../cmps/BugList.jsx'
import { bugService } from '../services/bug.service.js'
import { useBug } from '../context/BugContext.jsx'


export function UserDetails() {

    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const [bugs, setBugs] = useState([])
    useEffect(() => {
        loadUser()
    }, [userId])

    async function loadUser() {
        try {
            const user = await userService.getById(userId)
            setUser(user)
            setBugs(user.bugs)
        } catch (err) {
            showErrorMsg('Cannot load user')

        }
    }


    async function onRemoveBug(bugId) {
        try {
            await bugService.remove(bugId)
            const updatedBugs = bugs.filter(bug => bug._id !== bugId)
            setBugs(updatedBugs)
            showSuccessMsg('Bug removed')
        } catch (err) {
            console.log('Error from onRemoveBug ->', err)
            showErrorMsg('Cannot remove bug')
        }
    }


    async function onEditBug(bug) {
        const severityInput = prompt('New severity?', bug.severity);
        if (severityInput === null) return;
        const severity = +severityInput;
        if (isNaN(severity)) return;

        const description = prompt('New description?', bug.description);
        if (description === null) return;

        const bugToSave = { ...bug, severity, description };

        try {
            await bugService.save(bugToSave);

            const updatedBugs = bugs.map(currBug =>
                currBug._id === bugToSave._id ? bugToSave : currBug
            );

            setBugs(updatedBugs);
            showSuccessMsg('Bug updated');
        } catch (err) {
            console.log('Error from onEditBug ->', err);
            showErrorMsg('Cannot update bug');
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
            <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} ></BugList>

        </section>
    )


}

