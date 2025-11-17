import {commentApi} from "../api/comment.api.js"
import {DurationFormat} from "../utils/display.format.js";


export const CommentModel = () => {

    const api = commentApi()

    const sendComment = async(data) => {
        const res = await api.sendCommentApi(data)
        return res.data
    }

    const getComments = async(postId) => {
        const foo1 = await api.getCommentsApi(postId)
        const foo2 = foo1.data.rows
        return foo2.map(item => (
            {
                ...item,
                date_creation_com :  DurationFormat(item.date_creation_com) ,
                photo_profil: `http://localhost:3000/static/users/${item.photo_profil}`
            }
            )
        )
    }


    return {
        sendComment,
        getComments
    }

}