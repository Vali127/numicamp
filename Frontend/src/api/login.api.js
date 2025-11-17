import axios from "axios";


export const  LoginApi = () => {
    const SubmitLogin = async (obj) => {
        return await axios.post("http://localhost:3000/api/login/checkLoginInfo", obj)
    }

    return { SubmitLogin }
}