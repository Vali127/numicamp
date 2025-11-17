import {useLoginContext} from "../context/login.context.jsx";


export const LoginServices = () => {

    const { loginData } = useLoginContext()

    const  isAllLoginFormFulFilled = () => {
        return ! Object.values(loginData).includes("")
    }

    return {
        isAllLoginFormFulFilled
    }
}
