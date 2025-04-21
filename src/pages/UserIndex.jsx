import { useEffect, useState } from "react";
import { UserList } from "../cmps/UserList";
import { userService } from "../services/user.service";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { NicePopup } from "../cmps/NicePopup";
import { UserEdit } from "../cmps/UserEdit";

export function UserIndex() {
    const [users, setUsers] = useState([])
    const [userToEdit, setUserToEdit] = useState(userService.getEmptyUser())
    const [isPopupOpen, setIsPopupOpen] = useState(false)


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
    function onOpenUserPopup({ user = userService.getEmptyUser() }) {
        setUserToEdit(user)
        setIsPopupOpen(true)
        console.log("🚀 ~ onOpenUserPopup ~ userToEdit:", user)
    }

    async function onSubmitUser(user) {
        setIsPopupOpen(false)

        if (user._id) handleEditUser(user)
        else handleAddUser(user)

        try {
            const savedUser = await userService.save(user)
            setUsers(prevUsers => prevUsers.map((currUser) =>
                currUser._id === savedUser._id ? savedUser : currUser
            ))
            showSuccessMsg('User updated')
        } catch (err) {
            console.log(err)
            showErrorMsg('Cannot add user')
        } finally {
            setUserToEdit(userService.getEmptyUser())
        }

    }

    async function handleEditUser(userToEdit) {
        try {
            const savedUser = await userService.save(userToEdit)
            setUsers(prevUsers => prevUsers.map((currUser) =>
                currUser._id === savedUser._id ? savedUser : currUser
            ))
            showSuccessMsg('User updated')
        } catch (err) {
            console.log(err)
            showErrorMsg('Cannot add user')
        } finally {
            setUserToEdit(userService.getEmptyUser())
        }
    }

    async function handleAddUser(userToAdd) {
        try {
            const savedUser = await userService.save(userToAdd)
            setUsers(prevUsers => [savedUser, ...prevUsers])
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
                <button onClick={onOpenUserPopup}>Add user</button>
            </div>
            <UserList users={users} onRemoveUser={onRemoveUser} onEditUser={onOpenUserPopup} ></UserList>
            {isPopupOpen && <NicePopup main={<UserEdit user={userToEdit} onSubmit={onSubmitUser} ></UserEdit>} onClose={() => setIsPopupOpen(false)} />}
        </div>
    )

}