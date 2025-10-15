import {useLoginContext} from "../context/LoginContext.jsx";


export const LoginFormServices = () => {

    const { loginData } = useLoginContext()

    const  isAllLoginFormFulFilled = () => {
        return ! Object.values(loginData).includes("")
    }

    return {
        isAllLoginFormFulFilled
    }
}
