
import { useEffect, useState } from 'react'
import { UserMsg } from './UserMsg'
import { NavLink } from 'react-router-dom'
import { userService } from '../services/user.service'
import { NicePopup } from './NicePopup'
import { LoginSignup } from './LoginSignup'

export function AppHeader() {
    const [loggedinUser, setLoggedinUser] = useState(userService.getLoggedinUser())
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    useEffect(() => {
        // component did mount when dependancy array is empty
    }, [])

    async function onLogout() {
        console.log('logout');
        try {
            await userService.logout()
            setLoggedinUser(null)
        } catch (err) {
            console.log('can not logout');
        }
    }

    return (
        <header className='app-header container'>
            <div className='header-container'>
                <h1>Bugs are Forever</h1>

                <section className="login-signup-container">
                    {loggedinUser && <div className="user-preview">
                        <h3>Hello {loggedinUser.fullname}</h3>
                    </div>}
                </section>

                <nav className='app-nav'>
                    <NavLink to="/">Home</NavLink> |
                    <NavLink to="/bug">Bugs</NavLink> |
                    <NavLink to="/user">Users</NavLink> |
                    <NavLink to="/about">About</NavLink> |
                    {loggedinUser ? <a onClick={onLogout}> Logout</a> : <a onClick={() => setIsPopupOpen(true)
                    }>Login</a>}
                </nav>
            </div>
            {isPopupOpen && <NicePopup main={<LoginSignup></LoginSignup>} onClose={() => setIsPopupOpen(false)} />}

            <UserMsg />
        </header>
    )
}
