import {useEffect, useState} from "react"
import { CommentModel } from "../../model/comment.model.js"



export const CommentVm = (postId = null) => {

    const Model = CommentModel()

    const [ comment, setComment ] = useState("fetched")
    const [ content, setContent ] = useState("")
    const [ commentData, setCommentData ] = useState([])
    const [ refresh, setRefresh ] = useState(false)

    const SendComment = async(e) => {
        const data = {
            idPub : e.target.id,
            content : content
        }
        
        try {
            setComment("fetching")
            await Model.sendComment(data)
            setComment("fetched")
        }
        catch(error) {
            console.log("ERROR AT SENDING COMMENTS : ", error)
            setComment("error")
        } finally {
            setRefresh(!refresh)
            setContent("")
        }

    }

    const fetchComments = async() => {
        try {
            const res = await Model.getComments(postId)
            setCommentData(res)
        }
        catch (error) {
            console.log("ERROR FETCHING COMMENTS IN VM : ", error)
        }
    }

    useEffect(() => {
        fetchComments().then(r => r )
    }, [postId,refresh])

    return {
        comment,
        content,
        setContent,
        SendComment,
        fetchComments,
        commentData,
        setRefresh,
    }

}