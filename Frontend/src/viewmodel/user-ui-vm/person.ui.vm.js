import {useEffect, useState} from "react";
import {HomeModel} from "../../model/home.model.js";

export const PersonUiVm = () => {

    const { getAccountInfo, getUserDomains } = HomeModel()

    //Acces sur la page d' acceuil
    const [authenticated, setAuthenticated] = useState(false)
    useEffect(() => { setAuthenticated(isUserAuthenticated())}, [])

    const [searchContent, setSearchContent] = useState("")
    const [searched, setSearched] = useState(false)

    const [logout, setLogout] = useState(false)
    const [ postModalVisibility, setPostModalVisibility  ] = useState(false)
    const [userInfo, setUserInfo] = useState({ nom_personne: '', prenom_personne: '' , nom_profil: '', photo_profil : '/src/assets/images/default-pfp.jpg', domains : [] });


    const HandleAccountInformation = async () => {
        try {
            const res = await getAccountInfo()
            setUserInfo(res)
            const res2 = await getUserDomains()
            setUserInfo({...res, domains:res2.data})
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
        userInfo,
        postModalVisibility,
        setPostModalVisibility,
        searchContent,
        setSearchContent,
        searched,
        setSearched
    }
}


const isUserAuthenticated = () => {
    return localStorage.getItem("token")
}