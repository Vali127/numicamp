import {HomeModel} from "../../model/home.model.js";
import {useEffect, useState} from "react";


export const AdminHomeViewModel = () => {

    //L'Admin est un compte personnel donc il utilise toutes les ressources des utilisateurs personnels.

    //MODEL
    const { getAccountInfo } = HomeModel();

    //STATES
    const [authenticated, setAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [logout, setLogout] = useState(false);

    //FUNCTIONS
    const HandleAccountInformation = async () => {
        try {
            const res = await getAccountInfo();
            setUserInfo(res);
        } catch (error) {
            console.log(error);
        }
    }

    //EFFECT
    useEffect(() => { setAuthenticated(isUserAuthenticated()); }, []);
    useEffect(() => { HandleAccountInformation(); }, []);
    return {
        authenticated,
        userInfo,
        logout,
        setLogout
    }

}

const isUserAuthenticated = () => {
    return localStorage.getItem("token")
}