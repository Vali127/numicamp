import { useLoginContext } from "../context/login.context.jsx"

export const LoginServices = () => {
    const { loginData } = useLoginContext()

    return {
        isAllLoginFormFulFilled: () => !Object.values(loginData).includes("")
    }
}