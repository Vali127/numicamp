import { CommentModel } from "../../model/CommentModel"
import { useEffect, useState } from "react"


export const CommentVM = (postId) => {

    const model = CommentModel()

    const [ commentData, setCommentData ] = useState([])

    const fetchComments = async() => {
        try {
            const res = await model.getComments(postId)
            setCommentData(res)
        }
        catch (error) {
            console.log("ERROR FETCHING COMMENTS IN VM : ", error)
        }
    }

    useEffect(() => {
        fetchComments().then(r => r )
    }, [])

    return {
        fetchComments,
        commentData
    }

}