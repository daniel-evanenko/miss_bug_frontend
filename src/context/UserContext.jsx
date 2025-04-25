import { createContext, useContext, useEffect, useState } from 'react'
import { userService } from '../services/user.service'
import { showSuccessMsg } from '../services/event-bus.service';


const UserContext = createContext()


export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = userService.getLoggedinUser();
        if (savedUser) setUser(savedUser);
    }, []);

    const handleLogin = async (credentials) => {
        console.log("🚀 ~ handleLogin ~ handleLogin:", handleLogin)
        const loggedInUser = await userService.login(credentials);
        setUser(loggedInUser);
        showSuccessMsg(`Welcome ${loggedInUser.fullname}`);

    };

    const handleSignup = async (credentials) => {
        const newUser = await userService.signup(credentials);
        setUser(newUser);
        showSuccessMsg(`Welcome ${newUser.fullname}`);

    };

    const handleLogout = async () => {
        await userService.logout();
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, handleLogin, handleSignup, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
