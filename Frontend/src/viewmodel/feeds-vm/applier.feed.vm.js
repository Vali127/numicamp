import { useEffect, useState } from "react"
import { PostModel } from "../../model/post.model.js"

export const ApplierFeedVm = () => {
    const MODEL = PostModel()
    const [PostData, setPostData] = useState([])
    const [ownership, setOwnership] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    useEffect(() => {
        const GetFeeds = async () => {
            try {
                const response = await MODEL.getApplierPosts()
                setPostData(response.rows)
                setOwnership(response.ownership)
                setIsEmpty(response.rows.length === 0)
            } catch (error) {
                console.error(error)
                setIsEmpty(false)
            }
        }
        GetFeeds()
    }, [])

    return { PostData, ownership, isEmpty }
}