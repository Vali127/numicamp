import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ressourcesModel } from "../../model/ressources.model"

export const RessourcesViewModel = () => {
    const model = ressourcesModel()
    const [section, setSection] = useState("news")

    const { data: news = [], status: newsStatus } = useQuery({
        queryKey: ["news"],
        queryFn: async () => {
            const response = await model.getNews()
            if (!response.ok) throw new Error()
            return response.data
        },
    })

    const { data: sites = [], status: siteStatus } = useQuery({
        queryKey: ["sites"],
        queryFn: async () => {
            const response = await model.getSites()
            return response.data
        },
    })

    return {
        news, sites, section, setSection,
        newsStatus: newsStatus === "pending" ? "loading" : newsStatus === "error" ? "noInternet" : "loaded",
        siteStatus: siteStatus === "pending" ? "loading" : siteStatus === "error" ? "error" : "loaded",
    }
}