import { useEffect, useState } from "react"
import { PostModel } from "../../model/post.model.js"
import { SuggestionModel } from "../../model/suggestion.model.js"

export const UniqueFeedVm = (owner, feedOf) => {
    const MODEL = PostModel()
    const [editor, setEditor] = useState({})
    const [followState, setFollowState] = useState("followed")
    const [org] = useState(feedOf === "organisation")
    const [commentSectionShown, setCommentSectionShown] = useState(false)
    const [deletionModalVisibility, setDeletionModalVisibility] = useState(false)

    useEffect(() => {
        const GetPostEditorInfo = async () => {
            try {
                const response = feedOf === "organisation"
                    ? await MODEL.GetPostingOrgData(owner)
                    : await MODEL.GetPostingPersonData(owner)
                setEditor(response)
            } catch (error) {
                console.error("ERREUR :", error)
            }
        }
        GetPostEditorInfo()
    }, [])

    const Follow = async (data) => {
        try {
            const { data: res } = await SuggestionModel().followModel(data)
            setFollowState(res.ok ? "followed" : "error")
        } catch {
            setFollowState("error")
        }
    }

    const Unfollow = async (data) => {
        try {
            const { data: res } = await SuggestionModel().unFollowModel(data)
            setFollowState(res.ok ? "unfollowed" : "error")
        } catch {
            setFollowState("error")
        }
    }

    return {
        editor, Follow, Unfollow, followState, org,
        commentSectionShown, setCommentSectionShown,
        deletionModalVisibility, setDeletionModalVisibility,
    }
}

export const DeletionViewModel = (postId) => {
    const [status, setStatus] = useState("loading")

    useEffect(() => {
        const DeletePost = async () => {
            try {
                const response = await PostModel().DeletePost(postId)
                setStatus(response.success ? "success" : "error")
            } catch (err) {
                console.error(err)
                setStatus("error")
            }
        }
        DeletePost()
    }, [])

    return { status }
}