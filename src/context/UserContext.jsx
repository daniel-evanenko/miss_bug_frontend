import { createContext, useContext, useEffect, useState } from 'react'
import { userService } from '../services/user.service'
import { showSuccessMsg } from '../services/event-bus.service';


const UserContext = createContext()


export function UserProvider({ children }) {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const savedUser = userService.getLoggedinUser();
        if (savedUser) setLoggedInUser(savedUser);
    }, []);

    const handleLogin = async (credentials) => {
        const loggedInUser = await userService.login(credentials);
        setLoggedInUser(loggedInUser);
        showSuccessMsg(`Welcome ${loggedInUser.fullname}`);

    };

    const handleSignup = async (credentials) => {
        const newUser = await userService.signup(credentials);
        setLoggedInUser(newUser);
        showSuccessMsg(`Welcome ${newUser.fullname}`);

    };

    const handleLogout = async () => {
        await userService.logout();
        setLoggedInUser(null);
    };

    return (
        <UserContext.Provider value={{ loggedInUser, handleLogin, handleSignup, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
