import {useEffect, useState} from "react";
import {HomeModel} from "../../model/HomeModel.js";


const isUserAuthenticated = () => {
    return !!localStorage.getItem("token");
}

export const HomeViewModel = () => {

    const { getAccountInfo } = HomeModel()

    const [authenticated, setAuthenticated] = useState(false)
    useEffect(() => { setAuthenticated(isUserAuthenticated()) }, [authenticated])

    const [logout, setLogout] = useState(false)
    const [userInfo, setUserInfo] = useState({ nom_personne: '', prenom_personne: '' , nom_profil: '', photo_profil : '' });

    const HandleAccountInformation = async () => {
        try {
            const res = await getAccountInfo()
            setUserInfo(res.data)
            const rawPath = `http://localhost:3000/static/users/${res.data.photo_profil}`
            const image_path = rawPath.replace(/Users\//, '')
            console.log("CHEMIN : ",image_path)
            setUserInfo({...res.data, photo_profil: image_path})
            console.log("RESPONSE : ",res.data)
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(()=> { HandleAccountInformation() }, [])

    return {
        authenticated,
        logout,
        setLogout,
        userInfo
    }
}