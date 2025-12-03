import axios from "axios";


export const  LoginApi = () => {
    const submitLogin = async (obj) => {
        return await axios.post("http://localhost:3000/api/login/checkLoginInfo", obj)
    }

    return { 
        submitLogin 
    }
}