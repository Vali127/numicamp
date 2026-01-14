import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

//Context
const UiGlobalUiContext = createContext(null)

//Provider
export const GlobalUiContextProvider = ({children}) => {

    const navigate = useNavigate()

    const [refresh, setRefresh] = useState(false)
    const [userId, setUserId] = useState('')
    const [userType, setUserType] = useState('')
    const [currentSection, setCurrentSection] = useState('')
    const [userProfilId, setUserProfilId] = useState("")
    const [searchExpanded, setSearchExpanded] = useState(false)

    
    const GoToProfile = (id) => {           //visiter d' autre profil
        setUserProfilId(id)                 //id de l' utilisateur à visité
        setCurrentSection("profileVisit")   //changer de page
        setRefresh(!refresh)                //simulation de mise à jour
    }


    //Navigation parmis les routes en se basant sur un state(currentSection).
    useEffect(() => {
        const currentPath = location.pathname.split('/').pop()

        if (currentSection && currentPath !== currentSection) {
            switch (currentSection) {
                case 'feeds':               navigate("/Main/feeds");            setRefresh(!refresh) ; break
                case 'notifications':       navigate("/Main/notifications");    setRefresh(!refresh) ; break
                case 'resources':           navigate("/Main/ressources");       setRefresh(!refresh) ; break
                case 'resourceAdmin' :      navigate("/Main/resourceAdmin");    setRefresh(!refresh) ; break
                case 'schools':             navigate("/Main/schools");          setRefresh(!refresh) ; break
                case 'settings':            navigate("/Main/settings");         setRefresh(!refresh) ; break
                case 'profile' :            navigate("/Main/profile");          setRefresh(!refresh) ; break
                case 'profileVisit' :       navigate("/Main/profileVisit");     setRefresh(!refresh) ; break
                case 'search' :             navigate("/Main/search");           setRefresh(!refresh) ; break
                case 'dashboard' :          navigate("/Main/dashboard");        setRefresh(!refresh) ; break
                case 'feedback' :           navigate('/Main/feedback');         setRefresh(!refresh) ; break
                case 'users' :              navigate('/Main/users');            setRefresh(!refresh) ; break
                case 'adminSchoolSection' : navigate('/Main/schoolAdmin');      setRefresh(!refresh) ; break
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
        userProfilId,
        searchExpanded,
        setSearchExpanded,
        refresh,
        setRefresh
    }

    return (
        <UiGlobalUiContext.Provider value={value} >
            {children}
        </UiGlobalUiContext.Provider>
    )

}

//hooks
// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalUiContext = () => { return useContext(UiGlobalUiContext) }