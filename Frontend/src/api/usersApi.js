import axios from "axios";
import {API_CONFIG} from "../config.js";


export const usersApi = () => {

    const BASE_URL = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/api/users`
    const token = localStorage.getItem("token")

    const getListApi = async () => {
        const res = await axios.get(BASE_URL + '/userList',
            { headers: { Authorization: `Bearer ${token}` } },);
        return res.data
    }

    const deleteUserApi = async (id) => {
        const res = await axios.delete(BASE_URL + '/remove', {
            headers: { Authorization: `Bearer ${token}` },
            params: { id_user : id }
        })
        return res.data
    }

    const blockUserApi = async (id) => {
        const res = await axios.post(BASE_URL + '/block',{ id_user : id },{
            headers: { Authorization: `Bearer ${token}` }
        })
        return res.data
    }

    const unblockUserApi = async (id) => {
        const res = await axios.post(BASE_URL + '/unblock', { id_user : id },{
            headers: { Authorization: `Bearer ${token}` }
        })
        return res.data
    }

    return { getListApi, deleteUserApi, blockUserApi, unblockUserApi, }
}