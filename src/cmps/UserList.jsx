/* eslint-disable react/prop-types */
import { UserPreview } from "./UserPreview";

export function UserList({ users, onRemoveUser, onEditUser }) {
    return (
        <div>
            {users.map((user) => (
                <UserPreview key={user._id} user={user} onRemoveUser={onRemoveUser} onEditUser={onEditUser}></UserPreview>

            ))}
        </div>
    )

}