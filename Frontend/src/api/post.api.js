import axios from "axios"


export const PostApi = () => {

    const BASE_URL = "http://localhost:3000/api/publication"
    const token = localStorage.getItem('token')

    const uploadPostApi = async ( dataPost ) => {
        return await axios.post( BASE_URL + "/sendPost", dataPost, {
            headers: { 'Authorization' : "Bearer " + token }
        })
    }

    const uploadPostImageApi = async ( file ) => {
        const formData = new FormData()
        formData.append('image', file)
        return await axios.post( BASE_URL + "/uploadPostImage", formData)
    }

    const getPostsFromOrg = async () => {
        const response = await axios.get( BASE_URL + "/pubDescriptionOrg", {
                headers : { 'Authorization' : "Bearer " + token }
            })
        return response.data
    }

    const getUserPostsApi = async (obj, user_type) => {
        const URL = (user_type === "personal") ? BASE_URL + "/person" : BASE_URL + "/org"
        const response = await axios.get( URL, {
            headers : { Authorization : "Bearer " + token },
            params : obj
        })
        return response.data
    }

    return {
        uploadPostApi,
        uploadPostImageApi,
        getPostsFromOrg,
        getUserPostsApi
    }
}