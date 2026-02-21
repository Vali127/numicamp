import { profileApi } from "../api/profile.api.js"
import { PostApi } from "../api/post.api.js"
import { DateShortFormat } from "../utils/display.format.js"
import { API_CONFIG } from "../config.js"

export const profileModel = () => {
    const api = profileApi()
    const staticUrl = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/static/users`

    const getProfilData = async (obj) => {
        const { data: { user_data, ...rest } } = await api.getProfileDataApi(obj)
        user_data.photo_profil = `${staticUrl}/${user_data.photo_profil}`
        user_data.datenais = user_data.datenais ? DateShortFormat(user_data.datenais) : null
        user_data.date_creation = user_data.date_creation ? DateShortFormat(user_data.date_creation) : null
        return { user_data, ...rest }
    }

    const getProfilePostData = async (obj, type) => {
        const foo = await PostApi().getUserPostsApi(obj, type)
        return {
            rows: foo.publications.map(item => ({
                ...item,
                photo_pub: `${staticUrl}/${item.photo_pub}`,
                date_pub: DateShortFormat(item.date_pub)
            })),
            ownership: foo.owner
        }
    }

    const updateProfile = async (obj) => {
        obj.photo_profil = obj.photo_profil.replace(`${staticUrl}/`, '')
        return await api.updateProfileDataApi(obj)
    }

    return { getProfilData, getProfilePostData, updateProfile }
}