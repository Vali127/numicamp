import {DashBoardModel} from "../../model/dasboard.model.js";
import {useEffect, useState} from "react";


export const UserStatsViewModel = () => {
    //MODEL
    const MODEL = DashBoardModel()

    //STATE
    const [userStats, setUsersStats] = useState({})
    const [error, setError] = useState(false)
    //FUNCTION
    const FetchUSersStats = async () => {
        try {
            const response = await MODEL.getUserStats()
            if (response.ok)
                setUsersStats(response.data)
            else
                setError(true)
        } catch (err) {
            console.error(err)
        }
    }

    //UseEffect
    useEffect(() => { FetchUSersStats() }, [])

    return {
        userStats,
        error,
    }

}

export const DomainStatsViewModel = () => {

    const MODEL = DashBoardModel()

    const [domainStats, setDomainStats] = useState([])
    const [error, setError] = useState(false)

    const FetchDomainStats = async () => {
        try {
            const result = await MODEL.getDomainStats()
            if (result.ok)
                setDomainStats(result.data)
            else
                setError(true)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => { FetchDomainStats() }, [])

    return {
        domainStats,
        error,
    }
}

export const PostChartsViewModel = () => {
    const MODEL = DashBoardModel()

    const [postsStats, setPostsStats] = useState([])
    const [error, setError] = useState(false)

    const FetchPostsStats = async () => {
        try {
             const response = await  MODEL.getPostsStats()
            if (response.ok)
                setPostsStats(response.data)
            else
                setError(true)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => { FetchPostsStats() }, [])
    return {
        postsStats,
        error,
    }
}