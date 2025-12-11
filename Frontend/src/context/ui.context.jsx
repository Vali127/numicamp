import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

//Context
const UiGlobalUiContext = createContext(null)

//Provider
export const GlobalUiContextProvider = ({children}) => {

    const navigate = useNavigate()


    const [userId, setUserId] = useState('')
    const [userType, setUserType] = useState('')
    const [currentSection, setCurrentSection] = useState('')
    const [userProfilId, setUserProfilId] = useState("")

    const GoToProfile = (id) => {
        setUserProfilId(id)
        setCurrentSection("profileVisit")
    }

    // Solution 1 : Chemins absolus
    useEffect(() => {
        const currentPath = location.pathname.split('/').pop()

        if (currentSection && currentPath !== currentSection) {
            switch (currentSection) {
                case 'feeds': navigate("/Main/feeds") ; break
                case 'notifications': navigate("/Main/notifications") ; break
                case 'resources': navigate("/Main/ressources") ; break
                case 'schools': navigate("/Main/schools") ; break
                case 'settings': navigate("/Main/settings") ; break
                case 'profile' : navigate("/Main/profile") ; break
                case 'profileVisit' : navigate("/Main/profileVisit") ; break
                case 'search' : navigate("/Main/search") ; break
                case 'dashboard' : navigate("/Main/dashboard") ; break
                default : break
            }
        }
    }, [currentSection])


    const value = {
        currentSection,
        setCurrentSection,
        userId,
        setUserId,
        userType,
        setUserType,
        GoToProfile,
        userProfilId
    }

    return (
        <UiGlobalUiContext.Provider value={value} >
            {children}
        </UiGlobalUiContext.Provider>
    )

}

//hooks
// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalUiContext = () => {
    return useContext(UiGlobalUiContext)
}