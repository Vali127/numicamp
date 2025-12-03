import { AccountApi } from "../api/account.api.js"
import { PostApi } from "../api/post.api.js"
import { DateShortFormat } from "../utils/display.format.js"


export function PostModel () {
    
    const api = PostApi()
    
    const UploadPostImage = async ( data ) => {
        return await api.uploadPostImageApi(data)
    }

    const UploadPostData = async ( data ) => {
       const obj = {
        title : data.title,
        description : data.description,
        photoPath : data.photo,
        keywords : data.keywords,
        domains : data.domains
       }
       
       return await  api.uploadPostApi(obj)
    }

    const GetPostFromOrg = async () => {
        const foo = await api.getPostsFromOrg()
        const data = foo.rows
        return data.map( item => ( { ...item, photo_pub : `http://localhost:3000/static/users/${item.photo_pub}`, date_pub : DateShortFormat(item.date_pub) } ) )
        
    }

    const GetPostingOrgData = async (id) => {
        const foo =  await AccountApi().getOrganisationDataApi(id)
        const data = foo.data
        data.photo_profil = `http://localhost:3000/static/users/${data.photo_profil}`
        return data
    }

    const GetPostingPersonData = async (id) => {
        const foo =  await AccountApi().getPersonDataApi(id)
        const data = foo.data
        data.photo_profil = `http://localhost:3000/static/users/${data.photo_profil}`
        return data
    }


    return {
        UploadPostImage,
        UploadPostData,
        GetPostFromOrg,
        GetPostingOrgData,
        GetPostingPersonData
    }

}