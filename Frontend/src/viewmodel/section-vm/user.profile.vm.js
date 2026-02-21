import { useQuery } from "@tanstack/react-query"
import { profileModel } from "../../model/profile.model.js"

export const UserProfileViewModel = (id) => {
    const model = profileModel()

    const { data: profileData = {}, isSuccess } = useQuery({
        queryKey: ["profileData", id],
        queryFn: () => model.getProfilData({ profil_id: id }),
        enabled: !!id,
    })

    const { data: postsData, refetch: fetchPosts } = useQuery({
        queryKey: ["profilePosts", id, profileData?.user_type],
        queryFn: () => model.getProfilePostData({ user_id: id }, profileData?.user_type),
        enabled: !!profileData?.user_type,
    })

    return {
        profileData,
        posts: postsData?.rows ?? [],
        ownership: postsData?.ownership ?? false,
        loaded: isSuccess && !!postsData,
        fetchData: () => { void fetchPosts() },
        fetchPosts: () => { void fetchPosts() },
    }
}