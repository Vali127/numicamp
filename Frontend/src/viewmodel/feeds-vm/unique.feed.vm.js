import { useEffect, useState } from "react"
import { PostModel } from "../../model/post.model.js"
import { SuggestionModel } from "../../model/suggestion.model.js"


export const UniqueFeedVm = (owner, feedOf) => {

    const [editor, setEditor] = useState({})
    const [followState, setFollowState] = useState("followed")
    const [org, setOrg] = useState(false)
    const [ commentSectionShown, setCommentSectionShown ] = useState(false)

    const MODEL = PostModel()

    const GetPostEditorInfo = async() => {
            try {
                console.log("feed of ", feedOf)
                const response = (feedOf === "organisation") ? await MODEL.GetPostingOrgData(owner) : await MODEL.GetPostingPersonData(owner)
                setEditor(response)
            }
            catch(error) {
                console.log("ERRER :" , error)
            }
        }

    const Follow = async(data) => {
        try {
            const model = SuggestionModel()
            const foo = await model.followModel(data)
            const res = foo.data
            
            if(res.ok)
                setFollowState("followed")
            else
                setFollowState("error")

        }
        catch(error) {
            console.log("An error occured : ", error)
            setFollowState("error")
        }
    }

    const Unfollow = async(data) => {
        try {
            const model = SuggestionModel()
            const foo = await model.unFollowModel(data)
            const res = foo.data

            if(res.ok)
                setFollowState("unfollowed")
            else
                setFollowState("error")
        }
        catch(error) {
            console.log("An error occured : ", error)
            setFollowState("error")
        }
    }
    
        useEffect(
            () => {
                if (feedOf === "organisation")
                    setOrg(true)
                else
                    setOrg(false)
                GetPostEditorInfo() 
            }, []
        )

    return {
        editor,
        Follow,
        Unfollow,
        followState,
        org,
        commentSectionShown,
        setCommentSectionShown
    }
    
}