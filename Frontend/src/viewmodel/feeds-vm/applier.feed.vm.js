import { useQuery } from "@tanstack/react-query"
import { PostModel } from "../../model/post.model.js"

export const ApplierFeedVm = () => {
    const MODEL = PostModel()

    const { data, isError } = useQuery({
        queryKey: ["applierPosts"],
        queryFn: () => MODEL.getApplierPosts(),
    })

    return {
        PostData: data?.rows ?? [],
        ownership: data?.ownership ?? false,
        isEmpty: isError ? false : (data?.rows?.length ?? 1) === 0,
    }
}