import { useLoginContext } from "../context/login.context.jsx"
import { LoginApi } from "../api/login.api.js"

export const LoginModel = () => {
    const { loginData, recaptchaToken } = useLoginContext()
    const { submitLogin } = LoginApi()

    return {
        SubmitForm: () => submitLogin({ ...loginData, recaptchaToken })
    }
}