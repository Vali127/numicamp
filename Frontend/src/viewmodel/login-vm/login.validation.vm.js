import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { LoginModel } from "../../model/login.model.js"

export const LoginValidationVm = () => {
    const model = LoginModel()

    const { mutate, data, status } = useMutation({
        mutationFn: () => model.SubmitForm(),
        onSuccess: (response) => {
            if (response.ok) {
                localStorage.setItem('token', response.token)
                localStorage.setItem('usage', response.usage)
                localStorage.setItem('isLoggedIn', true)
            }
        },
        onError: (error) => console.error("Erreur : ", error),
    })

    useEffect(() => { mutate() }, [])

    return {
        message: data?.message ?? null,
        result: status === "pending" ? '' : status === "error" ? 'error' : data?.ok ? 'success' : 'failed',
        formUploaded: status === "pending",
    }
}