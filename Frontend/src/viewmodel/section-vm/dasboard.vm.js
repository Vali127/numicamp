import { useQuery } from "@tanstack/react-query"
import { DashBoardModel } from "../../model/dasboard.model.js"

const useDashboardQuery = (key, fetchFn, initialData) => {
    const { data = initialData, isError: error } = useQuery({
        queryKey: [key],
        queryFn: async () => {
            const result = await fetchFn()
            if (!result.ok) throw new Error()
            return result.data
        },
        retry: false,
    })
    return { data, error }
}

export const UserStatsViewModel = () => {
    const MODEL = DashBoardModel()
    const { data: userStats, error } = useDashboardQuery("userStats", () => MODEL.getUserStats(), {})
    return { userStats, error }
}

export const DomainStatsViewModel = () => {
    const MODEL = DashBoardModel()
    const { data: domainStats, error } = useDashboardQuery("domainStats", () => MODEL.getDomainStats(), [])
    return { domainStats, error }
}

export const PostChartsViewModel = () => {
    const MODEL = DashBoardModel()
    const { data: postsStats, error } = useDashboardQuery("postsStats", () => MODEL.getPostsStats(), [])
    return { postsStats, error }
}