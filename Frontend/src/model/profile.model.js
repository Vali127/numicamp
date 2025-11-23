import {profileApi} from "../api/profile.api.js";
import { PostApi } from "../api/post.api.js";
import { DateShortFormat } from "../utils/display.format.js";


export const  profileModel = () => {
    const api = profileApi()
    const file_api = `http://localhost:3000/static/users`

    const getProfilData = async (obj) => {
        const foo = await api.getProfileDataApi(obj)
        const res = foo.data
        res.user_data.photo_profil = `${file_api}/${res.user_data.photo_profil}`
        res.user_data.datenais = res.user_data.datenais ? DateShortFormat(res.user_data.datenais) : null
        res.user_data.date_creation = res.user_data.date_creation ? DateShortFormat(res.user_data.date_creation) : null 
        return res
    }

    const getProfilePostData = async (obj, type) => {
        const foo = await PostApi().getUserPostsApi(obj, type)
        const data = foo.rows
        return data.map((item) => ({...item, photo_pub : `http://localhost:3000/static/users/${item.photo_pub}` , date_pub : DateShortFormat(item.date_pub) }))
    }


    return {
        getProfilData,
        getProfilePostData
    }
}