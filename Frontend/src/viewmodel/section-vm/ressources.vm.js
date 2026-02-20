import { useState, useEffect } from "react"
import { ressourcesModel } from "../../model/ressources.model"

export const RessourcesViewModel = () => {
    const model = ressourcesModel()
    const [section, setSection] = useState("news")
    const [news, setNews] = useState([])
    const [sites, setSites] = useState([])
    const [newsStatus, setNewsStatus] = useState("loading")
    const [siteStatus, setSiteStatus] = useState("loading")

    useEffect(() => {
        const FetchNews = async () => {
            try {
                setNewsStatus("loading")
                const response = await model.getNews()
                if (response.ok) {
                    setNews(response.data)
                    setNewsStatus("loaded")
                } else {
                    setNews([])
                    setNewsStatus("noInternet")
                }
            } catch (error) {
                console.error("ERREUR : ", error)
                setNews([])
                setNewsStatus("noInternet")
            }
        }
        FetchNews()
    }, [])

    useEffect(() => {
        const FetchSites = async () => {
            try {
                setSiteStatus("loading")
                const response = await model.getSites()
                setSites(response.data)
                setSiteStatus("loaded")
            } catch (error) {
                console.error("ERREUR : ", error)
                setSiteStatus("error")
            }
        }
        FetchSites()
    }, [])

    return { news, sites, newsStatus, siteStatus, section, setSection }
}