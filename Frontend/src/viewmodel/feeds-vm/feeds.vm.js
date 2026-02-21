import { useQuery } from "@tanstack/react-query"
import { PostModel } from "../../model/post.model.js"

export const FeedsVm = () => {
    const MODEL = PostModel()

    const { data, isError } = useQuery({
        queryKey: ["orgPosts"],
        queryFn: () => MODEL.GetPostFromOrg(),
    })

    return {
        PostData: data?.rows ?? [],
        ownership: data?.ownership ?? false,
        isEmpty: isError ? true : (data?.rows?.length ?? 1) === 0,
    }
}