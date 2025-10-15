import axios from "axios";


export const  LoginFormApi = () => {
    const SubmitLogin = async (obj) => {
        return await axios.get("http://localhost:3000/api/login", obj)
    }

    return { SubmitLogin }
}