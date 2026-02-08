import axios from "axios"
import { API_CONFIG } from '../config.js'


export const PostApi = () => {

    const BASE_URL = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/api/publication`
    const token = localStorage.getItem('token')

    const uploadPostApi = async ( dataPost ) => {
        return await axios.post( BASE_URL + "/create", dataPost, {
            headers: { 'Authorization' : "Bearer " + token }
        })
    }

    const uploadPostImageApi = async ( file ) => {
        const formData = new FormData()
        formData.append('image', file)
        return await axios.post( BASE_URL + "/upload-image", formData)
    }

    const getPostsFromOrg = async () => {
        const response = await axios.get( BASE_URL + "/subscribed", {
                headers : { 'Authorization' : "Bearer " + token }
            })
        return response.data
    }

    const getUserPostsApi = async (obj, user_type) => {
        const URL = (user_type === "personal") ? BASE_URL + "/user" : BASE_URL + "/organization"
        const response = await axios.get( URL, {
            headers : { Authorization : "Bearer " + token },
            params : obj
        })
        return response.data
    }

    const deletePostApi = async (postId) => {
        console.log("DATA to Delete : ", postId)
        const response = await axios.delete( BASE_URL + "/delete",
            {
                headers : { Authorization : "Bearer " + token },
                params : {id_post : postId}
            })
        return response.data
    }

    const getApplierPostsApi = async () => {
        const response = await axios.get( BASE_URL + "/applicants", {
            headers : { Authorization : "Bearer " + token },
        })
        return response.data
    }

    return {
        uploadPostApi,
        uploadPostImageApi,
        getPostsFromOrg,
        getUserPostsApi,
        deletePostApi,
        getApplierPostsApi,
    }
}