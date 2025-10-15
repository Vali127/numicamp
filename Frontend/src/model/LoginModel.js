import {useLoginContext} from "../context/LoginContext.jsx"
import {LoginFormApi} from "../api/LoginFormApi.js"

export const LoginModel = () => {

    const { loginData } = useLoginContext()
    const { SubmitLogin } = LoginFormApi()

    const SubmitForm = async() => {
        return await SubmitLogin(loginData)
    }

    return { SubmitForm }
}