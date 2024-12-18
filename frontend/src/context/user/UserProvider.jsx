import { useEffect, useState } from "react";

import authService from '../../services/auth.service';

import UserContext from './user';

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        updateUser()
    }, []);

    function updateUser() {
        authService
            .status()
            .then(res => res.data)
            .then((data) => {
                setUser(data);
            })
            .catch(err => setUser(null));
    }

    function logout() {
        authService
            .logout()
            .then(() => {
                setUser(null);
            })
            .catch(err => console.log(err));
    }

    return (
        <UserContext.Provider value={{ user, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;