import axios from "axios"


export const PostApi = () => {

    const uploadPostApi = async ( dataPost ) => {
        const response = await axios.post("http://localhost:3000/api/publication/sendPost", dataPost, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response
    }

    const uploadPostImageApi = async ( file ) => {

        const formData = new FormData() //Natif a JS
        formData.append('image', file)
        const response = await axios.post("http://localhost:3000/api/publication/uploadPostImage", formData)

        return response
    }

    return {
        uploadPostApi,
        uploadPostImageApi
    }
}