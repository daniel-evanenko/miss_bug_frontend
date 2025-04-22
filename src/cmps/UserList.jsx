/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { UserPreview } from "./UserPreview";

export function UserList({ users, onRemoveUser, onEditUser }) {
    return (
        <ul className="user-list">
            {users.map((user) => (
                <li className="user-preview" key={user._id}>
                    <UserPreview user={user} />
                    <div>
                        <button
                            onClick={() => {
                                onRemoveUser(user._id)
                            }}
                        >
                            Remove
                        </button>
                        <button
                            onClick={() => {
                                onEditUser({ user })
                            }}
                        >
                            Edit
                        </button>
                        <button><Link to={`/user/${user._id}`}>Details</Link></button>
                    </div>
                </li>
            ))}
        </ul>
    )

}