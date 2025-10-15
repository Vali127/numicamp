import {createContext, useContext, useEffect, useState} from "react";


const LoginContext = createContext(null)

export const LoginContextProvider = ({children}) => {
    const [ loginData, setLoginData ] = useState({ username: "", password: "" });

    const SetLoginData = (data) => { setLoginData(data) }


    const values = {
        loginData,
        SetLoginData
    }

    return (
        <LoginContext.Provider value={values}>
            {children}
        </LoginContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginContext = () => { return useContext(LoginContext) }