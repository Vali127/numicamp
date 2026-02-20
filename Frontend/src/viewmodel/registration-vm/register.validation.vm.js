import { useState, useEffect } from "react"
import { RegisterModel } from "../../model/register.model.js"

export const RegisterValidationVm = () => {
    const { SubmitForm } = RegisterModel()
    const [response, setResponse] = useState('')

    useEffect(() => {
        const HandleModalBehavior = async () => {
            try {
                setResponse('loading')
                const res = await SubmitForm()
                setResponse(res.ok ? 'success' : 'failure')
            } catch (error) {
                console.error(error)
                setResponse('failure')
            }
        }
        HandleModalBehavior()
    }, [])

    return { response }
}