import { useState } from "react"

export const UniqueOrgSuggestionVm = (FollowEvent, UnfollowEvent) => {

    const [followState, setFollowState] = useState("unfollowed")


    const HandleFollow = async(e) => {
        const data = { org_id : e.currentTarget.id }
        try {
            const result = await FollowEvent(data)
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
        const data = { org_id : e.currentTarget.id }
        try {
            const result = await UnfollowEvent(data)
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
        HandleUnfollow,
    }

}