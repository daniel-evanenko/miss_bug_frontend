
import { useUser } from '../context/UserContext'
import { MsgPreview } from './MsgPreview'

export function MsgList({ msgs, onRemoveMsg }) {
    const { loggedInUser } = useUser()

    function isAdmin() {
        return loggedInUser && loggedInUser.isAdmin
    }

    return (
        <ul className="msg-list">
            {msgs.map((msg) => (
                <li className="msg-preview" key={msg._id}>
                    <MsgPreview msg={msg}></MsgPreview>
                    <div>
                        {isAdmin() && (
                            <>
                                <button onClick={() => onRemoveMsg(msg._id)}>
                                    Remove
                                </button>

                            </>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    )
}
