import {useEffect, useState} from "react";
import {PostModel} from "../../model/post.model.js";


export const UniqueFeedbackVm = (user_id, user_type) => {

    const [userData, setUserData] = useState({})


    const GetEditorData = async () => {
        try {
            console.log("ID USER : ", user_id)
            console.log("TYPE USER : ", user_type)
            const response = ( user_type === "organisation" ) ? await PostModel().GetPostingOrgData(user_id) : await PostModel().GetPostingPersonData(user_id)
            setUserData(response)
            console.log("EDITOR : ", response)
        } catch (err) {
            console.error("ERREUR : ",err)
        }
    }

    useEffect(() => { GetEditorData() }, [])

    return {
        userData
    }

}