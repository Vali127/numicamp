import {useLoginContext} from "../context/login.context.jsx"
import {LoginApi} from "../api/login.api.js"

export const LoginModel = () => {

    const { loginData } = useLoginContext()
    const { submitLogin } = LoginApi()

    const SubmitForm = async() => {
        return await submitLogin(loginData)
    }

    return { SubmitForm }
}