import {searchApi} from "../api/search.api.js"
import { Combine, UniqueValue } from "../utils/data.js"

export const searchModel = () => {
    
    const api = searchApi()
    
    const search = async (obj) => {
        const foo = await (await api.searchValueApi(obj)).data.res
        
        const data = {
            ...foo,
            org : foo.org.map( item => ({ ...item, photo_profil : `http://localhost:3000/static/users/${item.photo_profil}` }) ),
            orgName : foo.orgName.map( item => ({ ...item, photo_profil : `http://localhost:3000/static/users/${item.photo_profil}` }) ),
            posts : foo.posts.map( item => ({ ...item, photo_pub : `http://localhost:3000/static/users/${item.photo_pub}` }) ),
            users : foo.user.map( item => ({ ...item, photo_profil : `http://localhost:3000/static/users/${item.photo_profil}` }) ),
            username : foo.username.map( item => ({ ...item, photo_profil : `http://localhost:3000/static/users/${item.photo_profil}` }) )
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