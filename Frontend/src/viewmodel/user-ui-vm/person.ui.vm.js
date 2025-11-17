import {useEffect, useState} from "react";
import {HomeModel} from "../../model/home.model.js";

export const PersonUiVm = () => {

    const { getAccountInfo, getUserDomains } = HomeModel()

    //Acces sur la page d' acceuil
    const [authenticated, setAuthenticated] = useState(false)
    useEffect(() => { setAuthenticated(isUserAuthenticated()) }, [authenticated])

    const [section, setSection] = useState("feeds")

    const [logout, setLogout] = useState(false)
    const [ postModalVisibility, setPostModalVisibility  ] = useState(false)
    const [userInfo, setUserInfo] = useState({ nom_personne: '', prenom_personne: '' , nom_profil: '', photo_profil : '/src/assets/images/default-pfp.jpg', domains : [] });


    const HandleAccountInformation = async () => {
        try {
            const res = await getAccountInfo()
            setUserInfo(res.data)
            const res2 = await getUserDomains()
            const image_path = `http://localhost:3000/static/users/${res.data.photo_profil}`
            setUserInfo({...res.data, photo_profil: image_path, domains:res2.data})
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(()=> { HandleAccountInformation() }, [])

    return {
        authenticated,
        section,
        setSection,
        logout,
        setLogout,
        userInfo,
        postModalVisibility,
        setPostModalVisibility
    }
}


const isUserAuthenticated = () => {
    return !!localStorage.getItem("token")
}