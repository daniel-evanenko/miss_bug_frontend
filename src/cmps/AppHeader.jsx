
import { useEffect, useState } from 'react'
import { UserMsg } from './UserMsg'
import { Link, NavLink } from 'react-router-dom'
import { NicePopup } from './NicePopup'
import { LoginSignup } from './LoginSignup'
import { useUser } from '../context/UserContext.jsx'

export function AppHeader() {
    const { loggedInUser, handleLogin, handleSignup, handleLogout } = useUser()
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    useEffect(() => {
        // component did mount when dependancy array is empty
    }, [])

    function isAllowed() {
        return loggedInUser && loggedInUser.isAdmin
    }

    function onClosePopup() {
        setIsPopupOpen(false)
    }

    return (
        <header className='app-header container'>
            <div className='header-container'>
                <h1>Bugs are Forever</h1>

                <section className="login-signup-container">
                    {loggedInUser && <div className="user-preview">
                        <h3>Hello {<Link to={`/user/${loggedInUser._id}`}>{loggedInUser.fullname}</Link>}</h3>
                    </div>}
                </section>

                <nav className='app-nav'>
                    <NavLink to="/">Home</NavLink> |
                    <NavLink to="/bug">Bugs</NavLink> |
                    {isAllowed() && (
                        <>
                            <NavLink to="/user">Users</NavLink> <span>|</span>
                        </>
                    )}
                    {loggedInUser && <> <NavLink to="/msg">Msgs</NavLink> <span>|</span></>}
                    <NavLink to="/about">About</NavLink> |
                    {loggedInUser ? <a onClick={handleLogout}> Logout</a> : <a onClick={() => setIsPopupOpen(true)}>Login</a>}
                </nav>
            </div>
            {isPopupOpen && <NicePopup main={<LoginSignup onClose={onClosePopup} handleLogin={handleLogin} handleSignup={handleSignup} ></LoginSignup>} onClose={onClosePopup} />}

            <UserMsg />
        </header>
    )
}
