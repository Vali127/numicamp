import { usersApi } from "../api/usersApi.js"
import { API_CONFIG } from "../config.js"

export const UserModel = () => {
    const API = usersApi()
    const staticUrl = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/static/users`

    const getUsers = async () => {
        const data = await API.getListApi()
        return {
            ok: data.ok,
            message: data.message,
            rows: data.rows?.map(item => ({ ...item, photo_profil: `${staticUrl}/${item.photo_profil}` })) ?? []
        }
    }

    return {
        getUsers,
        deleteUser: (id) => API.deleteUserApi(id),
        blockUser: (id) => API.blockUserApi(id),
        unblockUser: (id) => API.unblockUserApi(id),
    }
}