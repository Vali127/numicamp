import { useQuery } from "@tanstack/react-query"
import { PostModel } from "../../model/post.model.js"

export const UniqueFeedbackVm = (user_id, user_type) => {
    const { data: userData = {} } = useQuery({
        queryKey: ["editorData", user_id, user_type],
        queryFn: () => user_type === "organisation"
            ? PostModel().GetPostingOrgData(user_id)
            : PostModel().GetPostingPersonData(user_id),
        enabled: !!user_id,
    })

    return { userData }
}