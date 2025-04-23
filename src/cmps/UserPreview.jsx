/* eslint-disable react/prop-types */

import { Avatar } from "@mui/material";

export function UserPreview({ user }) {

    return <article className="user-preview" >
        <Avatar alt={user.fullname} src={user.imgUrl || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'} />
        <h4>{user.fullname}</h4>
        <p>Username: <span>{user.username}</span></p>
        <p>Score: <span>{user.score}</span></p>
    </article>
}