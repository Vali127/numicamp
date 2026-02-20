import { useEffect, useState } from "react"
import { DashBoardModel } from "../../model/dasboard.model.js"

const useDashboardFetch = (fetchFn, initialState) => {
    const [data, setData] = useState(initialState)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await fetchFn()
                result.ok ? setData(result.data) : setError(true)
            } catch (err) {
                console.error(err)
                setError(true)
            }
        }
        fetch()
    }, [])

    return { data, error }
}

export const UserStatsViewModel = () => {
    const MODEL = DashBoardModel()
    const { data: userStats, error } = useDashboardFetch(() => MODEL.getUserStats(), {})
    return { userStats, error }
}

export const DomainStatsViewModel = () => {
    const MODEL = DashBoardModel()
    const { data: domainStats, error } = useDashboardFetch(() => MODEL.getDomainStats(), [])
    return { domainStats, error }
}

export const PostChartsViewModel = () => {
    const MODEL = DashBoardModel()
    const { data: postsStats, error } = useDashboardFetch(() => MODEL.getPostsStats(), [])
    return { postsStats, error }
}