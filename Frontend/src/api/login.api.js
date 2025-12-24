import axios from "axios";
import { API_CONFIG } from '../config.js'


export const  LoginApi = () => {
    const submitLogin = async (obj) => {
        return await axios.post(`http://${API_CONFIG.hostname}:${API_CONFIG.port}/api/login/checkLoginInfo`, obj)
    }

    return { 
        submitLogin 
    }
}