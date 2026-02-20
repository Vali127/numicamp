import { useEffect, useState } from "react"
import { PostModel } from "../../model/post.model.js"

export const FeedsVm = () => {
    const MODEL = PostModel()
    const [PostData, setPostData] = useState([])
    const [ownership, setOwnership] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    useEffect(() => {
        const GetFeeds = async () => {
            try {
                const response = await MODEL.GetPostFromOrg()
                setOwnership(response.ownership)
                setPostData(response.rows)
                setIsEmpty(response.rows.length === 0)
            } catch (error) {
                console.error("ERREUR DE RECUPERATION DE PUBLICATION : ", error)
                setIsEmpty(true)
            }
        }
        GetFeeds()
    }, [])

    return { PostData, ownership, isEmpty }
}