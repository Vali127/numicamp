import { useEffect, useState } from "react"
import { PostModel } from "../../model/post.model.js"


export const FeedsVm = () => {

    const MODEL = PostModel()

    const [ PostData, setPostData ] = useState([])
    const [ ownership, setOwnership ] = useState(false)
    const [ isEmpty, setIsEmpty ] = useState(true)


    const GetFeeds = async() => {
        try {
            const response = await MODEL.GetPostFromOrg()
            setOwnership(response.ownership)
            setPostData(response.rows)
            setIsEmpty(false)
        }
        catch(error) {
            console.log("ERREUR DE RECUPERATION DE PUBLICATION : ", error)
            setIsEmpty(true)
        }
    }

    

    useEffect(
        () => {
            GetFeeds()
        }, []
    )

    return {
        PostData,
        ownership,
        isEmpty,
    }

}