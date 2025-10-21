import {useEffect, useRef, useState} from "react";
import {LoginModel} from "../../model/LoginModel.js"

export const  LogInValidationModalViewModel = () => {

    const loginModel = LoginModel()

    const [ message, setMessage ] = useState(null)
    const [ result, setResult ] = useState('')
    const [ formUploaded, setFormUploaded ] = useState(true)
    const hasRun = useRef(false)

    const HandleModalBehavior = async() => {
        try {
            const response = await loginModel.SubmitForm()
            console.log(response)
            setMessage(response.data.message)
            if (response.data.ok) {
                setResult('success')
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('isLoggedIn', true )
            }
            else {
                setResult('failed')
            }
        } catch (error) {
            setResult('error')
            console.log("Erreur : ",error)
        }
        setFormUploaded(false)
    }

    useEffect(() => {
        // Protection contre la double exécution en StrictMode(eviter d envoyer la requete deux fois)
        if (hasRun.current) { return }
        hasRun.current = true
        HandleModalBehavior()
    }, [])

    return {
        message,
        result,
        formUploaded,
    }
}