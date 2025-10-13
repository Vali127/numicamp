import {useEffect, useState} from "react";

export const loginViewModel = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const HandlePasswordVisibility = () => { setPasswordVisibility(!passwordVisibility) }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        document.getElementById('password_viewer').innerHTML = (passwordVisibility) ? '&#xE224;' : '&#xE220;'
    }, [passwordVisibility]);


    return {
        passwordVisibility,
        HandlePasswordVisibility,
    }
}