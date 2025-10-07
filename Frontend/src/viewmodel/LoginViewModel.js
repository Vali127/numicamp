import {useEffect, useState} from "react";

export const loginViewModel = () => {

    //___________________________VISIBILITE DU MOT DE PASSE (UI)_____________________________________________________________
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const HandlePasswordVisibility = () => { setPasswordVisibility(!passwordVisibility) }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        document.getElementById('password_viewer').innerHTML = (passwordVisibility) ? '&#xE224;' : '&#xE220;'
    }, [passwordVisibility]);


    //________________________MANIPULATION DES DONNEES______________________________________________________________________
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loginData, setLoginData] = useState({username : '', password: ''})
    const GetLoginName = (e) => { setLoginData({ ...loginData , username : e.target.value }) }
    const GetLoginPassword = (e) => { setLoginData({ ...loginData , password: e.target.value }) }

    return {
        passwordVisibility,
        HandlePasswordVisibility,
        loginData,
        GetLoginName,
        GetLoginPassword
    }
}