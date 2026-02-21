import { useState } from "react"

export const UniqueOrgSuggestionVm = (FollowEvent, UnfollowEvent) => {
    const [followState, setFollowState] = useState("unfollowed")

    const handleAction = async (e, action, successState) => {
        const data = { org_id: e.currentTarget.id }
        try {
            const result = await action(data)
            setFollowState(result ? successState : "error")
        } catch (error) {
            console.error("ERREUR : ", error)
            setFollowState("error")
        }
    }

    return {
        followState,
        HandleFollow: (e) => handleAction(e, FollowEvent, "followed"),
        HandleUnfollow: (e) => handleAction(e, UnfollowEvent, "unfollowed"),
    }
}