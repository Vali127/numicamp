import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { RegisterModel } from "../../model/register.model.js"

export const RegisterValidationVm = () => {
    const model = RegisterModel();
    const { mutate, status, data } = useMutation({
        mutationFn: () => model.SubmitForm(),
        onError: (error) => console.error(error),
    })

    useEffect(() => { mutate() }, [])

    return {
        response: status === "pending" ? "loading" : status === "error" ? "failure" : data?.ok ? "success" : "failure"
    }
}