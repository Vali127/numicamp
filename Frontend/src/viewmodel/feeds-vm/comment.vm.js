import { useEffect, useState } from "react"
import { CommentModel } from "../../model/comment.model.js"

export const CommentVm = (postId = null) => {
    const Model = CommentModel()
    const [comment, setComment] = useState("fetched")
    const [content, setContent] = useState("")
    const [commentData, setCommentData] = useState([])
    const [refresh, setRefresh] = useState(false)

    const SendComment = async (e) => {
        try {
            setComment("fetching")
            await Model.sendComment({ idPub: e.target.id, content })
            setComment("fetched")
        } catch (error) {
            console.error("ERROR AT SENDING COMMENTS : ", error)
            setComment("error")
        } finally {
            setRefresh(r => !r)
            setContent("")
        }
    }

    const fetchComments = async () => {
        try {
            const res = await Model.getComments(postId)
            setCommentData(res)
        } catch (error) {
            console.error("ERROR FETCHING COMMENTS IN VM : ", error)
        }
    }

    useEffect(() => { fetchComments() }, [postId, refresh])

    return { comment, content, setContent, SendComment, fetchComments, commentData, setRefresh }
}