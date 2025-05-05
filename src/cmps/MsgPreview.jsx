

export function MsgPreview({ msg }) {

    return <article className="msg-preview" >
        <h4>By user: {msg.byUser.fullname}</h4>
        <p>About bug: <span>{msg.aboutBug.title}</span></p>
        <p>Msg: <span>{msg.txt}</span></p>
    </article>
}