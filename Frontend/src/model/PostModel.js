import { PostApi } from "../api/PostApi"


export function PostModel () {

    const UploadPostImage = async ( data ) => {
        
        const api = PostApi()
        return api.uploadPostImageApi(data)
    
    }

    const UploadPostData = async ( data ) => {
       const obj = {
        title : data.title,
        description : data.description,
        photoPath : data.photo,
        keywords : data.keywords,
        domains : data.domains
       }
       const api = PostApi()
       return await  api.uploadPostApi(obj)
    }


    return {
        UploadPostImage,
        UploadPostData
    }

}