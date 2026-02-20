import { useEffect, useState } from "react"
import { PostModel } from "../../model/post.model.js"

export const UniqueFeedbackVm = (user_id, user_type) => {
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const GetEditorData = async () => {
            try {
                const response = user_type === "organisation"
                    ? await PostModel().GetPostingOrgData(user_id)
                    : await PostModel().GetPostingPersonData(user_id)
                setUserData(response)
            } catch (err) {
                console.error("ERREUR : ", err)
            }
        }
        GetEditorData()
    }, [])

    return { userData }
}