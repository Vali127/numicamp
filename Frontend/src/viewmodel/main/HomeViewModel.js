import {useEffect, useState} from "react";


const isUserAuthenticated = () => {
    return !!localStorage.getItem("token");
}

export const HomeViewModel = () => {
    const [authenticated, setAuthenticated] = useState(false)
    useEffect(() => { setAuthenticated(isUserAuthenticated()) }, [authenticated])

    const [logout, setLogout] = useState(false)

    return {
        authenticated,
        logout,
        setLogout,
    }
}