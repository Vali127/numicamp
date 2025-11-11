import { useEffect, useState } from "react"
import { PostModel } from "../../model/PostModel"


export const FeedsViewModel = () => {

    const MODEL = PostModel()

    const [ PostData, setPostData ] = useState([])
    const [ isEmpty, setIsEmpty ] = useState(true)


    const GetFeeds = async() => {
        try {
            const response = await MODEL.GetPostFromOrg()
            setPostData(response)
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
        isEmpty,
    }

}