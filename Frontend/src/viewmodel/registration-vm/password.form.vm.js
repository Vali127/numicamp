import { useState, useEffect } from "react"
import { useSignInContext } from "../../context/register.context.jsx"
import { accountFormValidation } from "../../services/form.services.js"

export const PasswordFormVm = () => {
    const { accountForm, setAccountForm } = useSignInContext()
    const { password } = accountFormValidation()
    const [error, setError] = useState({ type: null, message: null })
    const [passwordError, setPasswordError] = useState({ type: null, message: null })
    const [passwordVisibility1, setPasswordVisibility1] = useState(false)
    const [passwordVisibility2, setPasswordVisibility2] = useState(false)

    useEffect(() => {
        document.getElementById('password_viewer1').innerHTML = passwordVisibility1 ? '&#xE224;' : '&#xE220;'
    }, [passwordVisibility1])

    useEffect(() => {
        document.getElementById('password_viewer2').innerHTML = passwordVisibility2 ? '&#xE224;' : '&#xE220;'
    }, [passwordVisibility2])

    const HandleInputPassword = (e) => {
        setAccountForm({ ...accountForm, password: e.target.value })
        const lengthError = password.checkLength(e.target.value)
        setPasswordError(lengthError.type ? lengthError : password.checkExpression(e.target.value))
    }

    const CheckPasswordValidity = (e) => {
        if (accountForm.password === "" && e.target.value !== "")
            return setError({ type: "warning", message: "Veuillez choisir un mot de passe d'abord !" })
        if (e.target.value !== accountForm.password)
            return setError({ type: "alert", message: "Mot de passe différent de celui choisi !" })
        setError({ type: "success", message: null })
    }

    return {
        error, accountForm, passwordError,
        HandleInputPassword, CheckPasswordValidity,
        passwordVisibility1, HandlePasswordVisibility1: () => setPasswordVisibility1(v => !v),
        passwordVisibility2, HandlePasswordVisibility2: () => setPasswordVisibility2(v => !v),
    }
}