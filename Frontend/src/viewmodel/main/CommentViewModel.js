import { useState } from "react"
import { CommentModel } from "../../model/CommentModel"



export const CommentViewModel = () => {

    const Model = CommentModel()

    const [ comment, setComment ] = useState("fetched")
    const [ content, setContent ] = useState("")

    const SendComment = async(e) => {
        const data = {
            idPub : e.target.id,
            content : content
        }
        
        try {
            setComment("fetching")
            const response = await Model.sendComment(data)
            setComment("fetched")
            console.log("RESPONSE : ", response)
        }
        catch(error) {
            console.log("ERROR AT SENDING COMMENTS : ", error)
            setComment("error")
        }

    }

    return {
        comment,
        content,
        setContent,
        SendComment
    }

}