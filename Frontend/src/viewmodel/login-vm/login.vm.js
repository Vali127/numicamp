import {useEffect, useState} from "react";
import {LoginServices} from "../../services/login.services.js";

export const loginVm = () => {

    const { isAllLoginFormFulFilled } = LoginServices()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const HandlePasswordVisibility = () => { setPasswordVisibility(!passwordVisibility) }

    // eslint-disable-next-line react-hooks/rules-of-hooks
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