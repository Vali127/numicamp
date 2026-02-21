import { useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { PostModel } from "../../model/post.model.js"
import { SuggestionModel } from "../../model/suggestion.model.js"

export const UniqueFeedVm = (owner, feedOf) => {
    const MODEL = PostModel()
    const [followState, setFollowState] = useState("followed")
    const [org] = useState(feedOf === "organisation")
    const [commentSectionShown, setCommentSectionShown] = useState(false)
    const [deletionModalVisibility, setDeletionModalVisibility] = useState(false)

    const { data: editor = {} } = useQuery({
        queryKey: ["postEditor", owner, feedOf],
        queryFn: () => org ? MODEL.GetPostingOrgData(owner) : MODEL.GetPostingPersonData(owner),
        enabled: !!owner,
    })

    const { mutate: Follow } = useMutation({
        mutationFn: (data) => SuggestionModel().followModel(data),
        onSuccess: ({ data: res }) => setFollowState(res.ok ? "followed" : "error"),
        onError: () => setFollowState("error"),
    })

    const { mutate: Unfollow } = useMutation({
        mutationFn: (data) => SuggestionModel().unFollowModel(data),
        onSuccess: ({ data: res }) => setFollowState(res.ok ? "unfollowed" : "error"),
        onError: () => setFollowState("error"),
    })

    return {
        editor, Follow, Unfollow, followState, org,
        commentSectionShown, setCommentSectionShown,
        deletionModalVisibility, setDeletionModalVisibility,
    }
}

export const DeletionViewModel = (postId) => {
    const { status } = useQuery({
        queryKey: ["deletePost", postId],
        queryFn: () => PostModel().DeletePost(postId),
        enabled: !!postId,
        select: (res) => res.success ? "success" : "error",
        retry: false,
    })

    return { status: status === "error" ? "error" : status }
}