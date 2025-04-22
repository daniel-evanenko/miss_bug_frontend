/* eslint-disable react/prop-types */

export function UserPreview({ user }) {

    return <article >
        <h4>{user.fullname}</h4>
        <h1>USER PHOTO</h1>
        <p>Username: <span>{user.username}</span></p>
        <p>Score: <span>{user.score}</span></p>
    </article>
}