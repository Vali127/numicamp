import {useSignInContext} from "../../context/register.context.jsx"
import { useState, useEffect } from "react"
import {accountFormValidation} from "../../services/form.services.js";


export const PasswordFormVm = () => {

    const { accountForm, SetAccountForm } = useSignInContext()
    const { password } = accountFormValidation()
    const [ error, setError ] = useState({ type : null, message: null })
    const [ passwordError, setPasswordError ] = useState({ type : null, message: null })

    const CheckPasswordValidity = (e) => {
        if ( accountForm.password === "" && e.target.value !== "" )
            return setError({ type : "warning", message : "Veuillez choisir une mot de passe d' abord !" })

        if ( e.target.value !== accountForm.password )
            return setError({ type: "alert",  message: "mot de passe differente de celui choisi !" })

        return setError( { type: "success", message: null } )
    }

    const HandleInputPassword = (e) => {
        SetAccountForm({...accountForm, password: e.target.value})
        if ( password.checkLength(e.target.value).type != null ) { setPasswordError(password.checkLength(e.target.value)) }
        else { setPasswordError( password.checkExpression(e.target.value) ) }
    }






    //___________________________VISIBILITE DU MOT DE PASSE (UI)_____________________________________________________________
    const [passwordVisibility1, setPasswordVisibility1 ] = useState(false)
    const HandlePasswordVisibility1 = () => { setPasswordVisibility1(!passwordVisibility1) }
    useEffect(() => { document.getElementById('password_viewer1').innerHTML = (passwordVisibility1) ? '&#xE224;' : '&#xE220;' }, [passwordVisibility1])

    const [passwordVisibility2, setPasswordVisibility2 ] = useState(false)
    const HandlePasswordVisibility2 = () => { setPasswordVisibility2(!passwordVisibility2) }
    useEffect(() => { document.getElementById('password_viewer2').innerHTML = (passwordVisibility2) ? '&#xE224;' : '&#xE220;' }, [passwordVisibility2])

    return {
        error,
        accountForm,
        CheckPasswordValidity,
        HandleInputPassword,
        passwordError,
        HandlePasswordVisibility1,
        passwordVisibility1,
        HandlePasswordVisibility2,
        passwordVisibility2,
    }
}