import { useEffect, useState } from "react"
import { PostModel } from "../../model/PostModel"
import { SuggestionModel } from "../../model/SuggestionModel"


export const FeedVM = (owner, feedOf) => {

    const [editor, setEditor] = useState({})
    const [followState, setFollowState] = useState("followed")
    const [org, setOrg] = useState(false)
    const [ commentSectionShown, setCommentSectionShown ] = useState(false)

    const MODEL = PostModel()

    const GetPostEditorInfo = async() => {
            try {
                const response = await MODEL.GetPostingOrgData(owner)
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