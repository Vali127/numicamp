import {usersApi} from "../api/usersApi.js";
import {API_CONFIG} from "../config.js";


export const UserModel = () => {

    const API = usersApi()
    const hostname = API_CONFIG.hostname
    const port = API_CONFIG.port

    const getUsers = async () => {
        const data = await API.getListApi()
        return {
            ok : data.ok,
            message : data.message,
            rows : data.rows ? data.rows.map( item => ({ ...item, photo_profil : "http://" + hostname + ":" + port + "/static/users/" + item.photo_profil }) ) : [],
        }
    }

    const deleteUser = async (id) => { return await API.deleteUserApi(id) }
    const blockUser = async (id) => { return await API.blockUserApi(id) }
    const unblockUser = async (id) => { return await API.unblockUserApi(id) }

    return {
        getUsers,
        deleteUser,
        blockUser,
        unblockUser,
    }

}