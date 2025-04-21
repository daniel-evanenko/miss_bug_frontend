/* eslint-disable react/prop-types */
import { UserPreview } from "./UserPreview";

export function UserList({ users }) {
    return (
        <div>
            {users.map((user) => (
                <UserPreview key={user._id} user={user}></UserPreview>

            ))}
        </div>
    )

}