import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CommentModel } from "../../model/comment.model.js"

export const CommentVm = (postId = null) => {
    const Model = CommentModel()
    const queryClient = useQueryClient()
    const [content, setContent] = useState("")

    const { data: commentData = [] } = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => Model.getComments(postId),
        enabled: postId !== null,
    })

    const { status, mutate: SendComment } = useMutation({
        mutationFn: (e) => Model.sendComment({ idPub: e.target.id, content }),
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: ["comments", postId] })
            setContent("")
        },
        onError: (error) => console.error("ERROR AT SENDING COMMENTS : ", error),
    })

    return {
        comment: status === "idle" ? "fetched" : status === "pending" ? "fetching" : status,
        content,
        setContent,
        SendComment,
        commentData,
    }
}