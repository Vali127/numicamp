import {useLoginContext} from "../context/login.context.jsx"
import {LoginApi} from "../api/login.api.js"

export const LoginModel = () => {

    const { loginData, recaptchaToken } = useLoginContext()
    const { submitLogin } = LoginApi()

    const SubmitForm = async() => {
        return await submitLogin({...loginData, recaptchaToken : recaptchaToken })
    }

    return { SubmitForm }
}