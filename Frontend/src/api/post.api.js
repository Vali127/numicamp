import axios from "axios"


export const PostApi = () => {

    const BASE_URL = "http://localhost:3000/api/publication"
    const token = localStorage.getItem('token')

    const uploadPostApi = async ( dataPost ) => {
        const response = await axios.post(`${BASE_URL}/sendPost`, dataPost, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        return response
    }

    const uploadPostImageApi = async ( file ) => {

        const formData = new FormData() //Natif a JS
        formData.append('image', file)
        const response = await axios.post(`${BASE_URL}/uploadPostImage`, formData)

        return response
    }

    const getPostsFromOrg = async () => {
        const response = await axios.get(`${BASE_URL}/pubDescriptionOrg`,
            {
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            }
        )

        return response
    }

    return {
        uploadPostApi,
        uploadPostImageApi,
        getPostsFromOrg
    }
}