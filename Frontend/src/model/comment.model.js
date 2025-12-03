import {commentApi} from "../api/comment.api.js"
import {DurationFormat} from "../utils/display.format.js";


export const CommentModel = () => {

    const api = commentApi()

    const sendComment = async(data) => {
        return await api.postCommentApi(data)
    }

    const getComments = async(postId) => {
        const foo = await api.getCommentsApi(postId)
        const data = foo.rows
        return data.map(item => (
            {
                ...item,
                date_creation_com :  DurationFormat(item.date_creation_com) ,
                photo_profil: `http://localhost:3000/static/users/${item.photo_profil}`
            }
        ))
    }


    return {
        sendComment,
        getComments
    }

}