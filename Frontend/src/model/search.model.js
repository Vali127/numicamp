import {searchApi} from "../api/search.api.js"
import { Combine, UniqueValue } from "../utils/data.js"
import { DateShortFormat } from "../utils/display.format.js"
import { API_CONFIG } from "../config.js"

export const searchModel = () => {
    
    const api = searchApi()
    
    const search = async (obj) => {
        const foo = await (await api.searchValueApi(obj)).data.res
        
        const data = {
            ...foo,
            org : foo.org.map( item => ({ ...item, photo_profil : `http://${API_CONFIG.hostname}:${API_CONFIG.port}/static/users/${item.photo_profil}` }) ),
            orgName : foo.orgName.map( item => ({ ...item, photo_profil : `http://${API_CONFIG.hostname}:${API_CONFIG.port}/static/users/${item.photo_profil}` }) ),
            posts : foo.posts.map( item => ({ ...item, photo_pub : `http://${API_CONFIG.hostname}:${API_CONFIG.port}/static/users/${item.photo_pub}`, date_pub : DateShortFormat(item.date_pub) }) ),
            users : foo.user.map( item => ({ ...item, photo_profil : `http://${API_CONFIG.hostname}:${API_CONFIG.port}/static/users/${item.photo_profil}` }) ),
            username : foo.username.map( item => ({ ...item, photo_profil : `http://${API_CONFIG.hostname}:${API_CONFIG.port}/static/users/${item.photo_profil}` }) )
        }
        
        console.log("Feeds MODEL : ", data.posts )
        
        return {
            organisations : UniqueValue(Combine(data.org, data.orgName), 'id_profil'),
            users : UniqueValue(Combine(data.users, data.username), 'id_profil'),
            posts : data.posts
        }
    }

    return {
        search
    }

}