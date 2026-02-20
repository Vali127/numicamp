import { searchApi } from "../api/search.api.js"
import { Combine, UniqueValue } from "../utils/data.js"
import { DateShortFormat } from "../utils/display.format.js"
import { API_CONFIG } from "../config.js"

export const searchModel = () => {
    const api = searchApi()
    const staticUrl = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/static/users`

    const withPhoto = (item) => ({ ...item, photo_profil: `${staticUrl}/${item.photo_profil}` })

    const search = async (obj) => {
        const foo = (await api.searchValueApi(obj)).data.res

        const data = {
            org: foo.org.map(withPhoto),
            orgName: foo.orgName.map(withPhoto),
            users: foo.user.map(withPhoto),
            username: foo.username.map(withPhoto),
            posts: foo.posts.map(item => ({
                ...item,
                photo_pub: `${staticUrl}/${item.photo_pub}`,
                date_pub: DateShortFormat(item.date_pub)
            }))
        }

        return {
            organisations: UniqueValue(Combine(data.org, data.orgName), 'id_profil'),
            users: UniqueValue(Combine(data.users, data.username), 'id_profil'),
            posts: data.posts
        }
    }

    return { search }
}