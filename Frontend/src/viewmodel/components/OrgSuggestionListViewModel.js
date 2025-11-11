import { useState } from "react"


export const OrgSuggestionListViewModel = (FollowEvent, UnfollowEvent) => {


    const [followState, setFollowState] = useState("unfollowed")


    const HandleFollow = async(e) => {
        const data = { org_id : e.target.id }
        try {
            const result = await FollowEvent(data)
            console.log(result)
            if( result ) {
                setFollowState("followed")
            }
            else {
                setFollowState("error")
            }
        }
        catch(error) {
            setFollowState("error")
            console.log("UNE ERREUR LORS DU NON SUIVIS ", error)
        }
    }

    const HandleUnfollow = async(e) => {
        const data = { org_id : e.target.id }
        try {
            const result = await UnfollowEvent(data)
            console.log(result)
            if( result ) {
                setFollowState("unfollowed")
            }
            else {
                setFollowState("error")
            }
        }
        catch(error) {
            setFollowState("error")
            console.log("UNE ERREUR LORS DU NON SUIVIS ", error)
        }
    }


    return {
        followState,
        HandleFollow,
        HandleUnfollow
    }

}