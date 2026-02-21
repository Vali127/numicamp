import { useQuery } from "@tanstack/react-query"
import { PostModel } from "../../model/post.model.js"

export const UniqueFeedbackVm = (user_id, user_type) => {
    const model = PostModel()
    const { data: userData = {} } = useQuery({
        queryKey: ["editorData", user_id, user_type],
        queryFn: () => user_type === "organisation"
            ? model.GetPostingOrgData(user_id)
            : model.GetPostingPersonData(user_id),
        enabled: !!user_id,
    })

    return { userData }
}