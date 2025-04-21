import { useEffect, useState } from "react";
import { UserList } from "../cmps/UserList";

export function UserIndex() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    function loadUsers() {
        const users = [
            {
                fullname: "Muki new",
                username: "muki",
                password: "muki1234",
                score: 110,
                _id: "W7mTVQ"
            },
            {
                fullname: "Muki new",
                username: "muki",
                password: "muki1234",
                score: 110,
                _id: "W7mTVQ"
            },
            {
                fullname: "Muki new",
                username: "muki",
                password: "muki1234",
                score: 110,
                _id: "W7mTVQ"
            },

        ]
        setUsers(users)
    }

    return (
        <div className="user-index">
            <h1>Users</h1>
            <UserList users={users}></UserList>
        </div>
    )

}