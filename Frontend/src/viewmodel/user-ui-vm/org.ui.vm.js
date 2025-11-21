import {useEffect, useState} from "react";
import {HomeModel} from "../../model/home.model.js";

export const OrgUiVm = () => {

    //Acces sur la page d' acceuil
    const [authenticated, setAuthenticated] = useState(false)
    useEffect(() => { setAuthenticated(isUserAuthenticated()) }, [authenticated])

    const [ userData, setUserData ] = useState({})
    const [ userDomains , setUserDomains ] = useState({})
    const [ postModalVisibility, setPostModalVisibility ] = useState(false)
    const [ section, setSection ] = useState("profile")


    const HandleUserAccountInformation = async() => {
        const model = HomeModel()
        try {
            const response = await model.getAccountInfo()
            const domains = await model.getUserDomains()
            const pfp = `http://localhost:3000/static/users/${response.data.photo_profil}`
            setUserData({...response.data, photo_profil : pfp })
            setUserDomains(domains.data)
        }
        catch(error) {
            console.log("ERREUR DE DONNEES : ", error)
        }
    }

    useEffect( () => { HandleUserAccountInformation() }, [] )
    useEffect(() => { console.log('UserData : ', userData) }, [userData])

    return {
        authenticated,
        userData,
        userDomains,
        postModalVisibility,
        setPostModalVisibility,
        section,
        setSection
    }
}


const isUserAuthenticated = () => {
    return !!localStorage.getItem("token")
}