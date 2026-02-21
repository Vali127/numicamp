import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { searchModel } from "../../model/search.model"

export const SearchViewModel = (prompt) => {
    const [currentTab, setCurrentTab] = useState("posts")
    const model = searchModel()
    const { data, refetch: FetchPrompt } = useQuery({
        queryKey: ["search", prompt],
        queryFn: () => model.search({ keywords: prompt }),
        enabled: !!prompt,
    })

    return { currentTab, setCurrentTab, data, FetchPrompt }
}