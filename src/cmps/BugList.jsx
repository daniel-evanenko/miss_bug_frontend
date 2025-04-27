/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { BugPreview } from './BugPreview'
import { useUser } from '../context/UserContext'

export function BugList({ bugs, onRemoveBug, onEditBug }) {

    const { loggedInUser } = useUser()

    function isAllowed(bug) {
        return loggedInUser && (loggedInUser.isAdmin || bug?.owner?._id === loggedInUser?._id)
    }

    return (
        <ul className="bug-list">
            {bugs.map((bug) => (
                <li className="bug-preview" key={bug._id}>
                    <BugPreview bug={bug} />
                    <div>
                        {isAllowed(bug) && (
                            <>
                                <button onClick={() => onRemoveBug(bug._id)}>
                                    Remove
                                </button>
                                <button onClick={() => onEditBug(bug)}>
                                    Edit
                                </button>
                            </>
                        )}
                        <button>
                            <Link to={`/bug/${bug._id}`}>Details</Link>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}
