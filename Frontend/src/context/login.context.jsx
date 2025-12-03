import {createContext, useContext, useState} from "react";

//CONTEXT
const LoginContext = createContext(null)

//PROVIDER
export const LoginContextProvider = ({children}) => {
    
    const [ loginData, setLoginData ] = useState({ username: "", password: "" });
    const [showLogInValidationModal, setShowLogInValidationModal] = useState(false)

    const SetLoginData = (data) => { setLoginData(data) }

    const values = {
        loginData,
        SetLoginData,
        showLogInValidationModal,
        setShowLogInValidationModal
    }

    return (
        <LoginContext.Provider value={values}>
            {children}
        </LoginContext.Provider>
    )
}

//HOOKS
// eslint-disable-next-line react-refresh/only-export-components
export const useLoginContext = () => { return useContext(LoginContext) }