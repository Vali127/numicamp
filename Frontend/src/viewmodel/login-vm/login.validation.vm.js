import { useEffect, useState } from "react"
import { LoginModel } from "../../model/login.model.js"

export const LoginValidationVm = () => {
    const loginModel = LoginModel()
    const [message, setMessage] = useState(null)
    const [result, setResult] = useState('')
    const [formUploaded, setFormUploaded] = useState(true)

    useEffect(() => {
        const HandleModalBehavior = async () => {
            try {
                const response = await loginModel.SubmitForm()
                setMessage(response.message)
                if (response.ok) {
                    setResult('success')
                    localStorage.setItem('token', response.token)
                    localStorage.setItem('usage', response.usage)
                    localStorage.setItem('isLoggedIn', true)
                } else {
                    setResult('failed')
                }
            } catch (error) {
                console.error("Erreur : ", error)
                setResult('error')
            }
            setFormUploaded(false)
        }
        HandleModalBehavior()
    }, [])

    return { message, result, formUploaded }
}