import axios from 'axios'

export const commentApi = () => {

    const BASE_URL = "http://localhost:3000/api/comment"
    const token = localStorage.getItem('token')

    const postCommentApi = async (data) => {
        const res = await axios.post( BASE_URL + "/sendComment", data, {
            headers : { 'Authorization' : "Bearer " + token }
        })
        return res.data
    }

    const getCommentsApi = async ( postId ) => {
        const res = await axios.get( BASE_URL + "/getComment", {
            headers : {'Authorization' : "Bearer " + token},
            params : { idPub : postId }
        })
        return res.data
    }


    return {
        postCommentApi,
        getCommentsApi  
    }

}