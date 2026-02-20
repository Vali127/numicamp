import {useEffect, useState} from "react";
import {LoginServices} from "../../services/login.services.js";

export const LoginVm = () => {

    const { isAllLoginFormFulFilled } = LoginServices()
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const HandlePasswordVisibility = () => { setPasswordVisibility(!passwordVisibility) }

    useEffect(() => {
        document.getElementById('password_viewer').innerHTML = (passwordVisibility) ? '&#xE224;' : '&#xE220;'
    }, [passwordVisibility]);

    const SetConnexionButtonActivation = () => {
        setButtonDisabled(!isAllLoginFormFulFilled())
    }



    return {
        SetConnexionButtonActivation,
        buttonDisabled,
        passwordVisibility,
        HandlePasswordVisibility,
    }
}