/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { UserPreview } from "./UserPreview";
import { useUser } from "../context/UserContext";
import { bugService } from "../services/bug.service";
import { useEffect, useState } from "react";

export function UserList({ users, onRemoveUser, onEditUser }) {
    const { loggedInUser } = useUser()
    const [allowedUsers, setAllowedUsers] = useState([]);

    useEffect(() => {
        async function checkAllowed() {
            const allowed = [];

            for (const user of users) {
                const bugs = await bugService.getBugsByOwnerId(user._id);
                if (bugs.length === 0) {
                    allowed.push(user._id);
                }
            }

            setAllowedUsers(allowed);
        }

        if (loggedInUser?.isAdmin) {
            checkAllowed();
        }
    }, [users, loggedInUser]);


    function canEdit() {
        return loggedInUser && loggedInUser.isAdmin
    }

    return (
        <ul className="user-list">
            {users.map((user) => (
                <li className="user-preview" key={user._id}>
                    <UserPreview user={user} />
                    <div>
                        {canEdit() && (
                            <>
                                {allowedUsers.includes(user._id) &&
                                    <button
                                        onClick={() => {
                                            onRemoveUser(user._id)
                                        }}
                                    >
                                        Remove
                                    </button>
                                }

                                <button
                                    onClick={() => {
                                        onEditUser({ user })
                                    }}
                                >
                                    Edit
                                </button>
                                <button><Link to={`/user/${user._id}`}>Details</Link></button>
                            </>
                        )}

                    </div>
                </li>
            ))}
        </ul>
    )

}