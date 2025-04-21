import { useEffect, useState } from "react";
import { UserList } from "../cmps/UserList";
import { userService } from "../services/user.service";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export function UserIndex() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.query()
        setUsers(users)
    }
    async function onRemoveUser(userId) {
        try {
            await userService.remove(userId)
            console.log('Deleted Succesfully!')
            setUsers(prevUsers => prevUsers.filter((user) => user._id !== userId))
            showSuccessMsg('User removed')
        } catch (err) {
            console.log('Error from onRemoveUser ->', err)
            showErrorMsg('Cannot remove user')
        }

    }
    async function onEditUser(user) {
        const userToEdit = {
            ...user,
            fullname: prompt('Fullname?'),
            username: prompt('Username?'),
            password: prompt('password?'),
            score: +prompt('score?')
        }

        try {
            const savedUser = await userService.save(userToEdit)
            setUsers(prevUsers => prevUsers.map((currUser) =>
                currUser._id === savedUser._id ? savedUser : currUser
            ))
            showSuccessMsg('User updated')
        } catch (err) {
            console.log(err)
            showErrorMsg('Cannot add user')
        }

    }
    async function onAddUser() {
        const user = {
            fullname: prompt('Fullname?'),
            username: prompt('Username?'),
            password: prompt('password?'),
            score: +prompt('score?')
        }
        try {
            const savedUser = await userService.save(user)
            setUsers(prevUsers => [savedUser, ...prevUsers ])
            showSuccessMsg('User added')
        } catch (err) {
            console.log(err)
            showErrorMsg('Cannot add user')
        }
    }



    return (
        <div className="user-index">
            <div className="header">
                <h1>Users</h1>
                <button onClick={onAddUser}>Add user</button>
            </div>
            <UserList users={users} onRemoveUser={onRemoveUser} onEditUser={onEditUser} ></UserList>
        </div>
    )

}