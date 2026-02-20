import { useEffect, useState } from "react"
import { searchModel } from "../../model/search.model"

export const SearchViewModel = (prompt) => {
    const model = searchModel()
    const [data, setData] = useState(null)
    const [currentTab, setCurrentTab] = useState("posts")

    const FetchPrompt = async () => {
        try {
            const received_data = await model.search({ keywords: prompt })
            setData(received_data)
        } catch (err) {
            console.error("ERROR ON SENDING PROMPT : ", err)
        }
    }

    useEffect(() => { FetchPrompt() }, [])

    return { currentTab, setCurrentTab, data, FetchPrompt }
}