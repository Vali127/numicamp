import axios from "axios"


export const PostApi = () => {

    const uploadPostApi = async ( dataPost ) => {
        const response = await axios.post("http://localhost:3000/api/publication/pubDescription", dataPost, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response
    }

    return {
        uploadPostApi
    }
}