import { useState } from "react"
import { ressourcesModel } from "../../model/ressources.model"
import { useEffect } from "react"


export const RessourcesViewModel = () => {
    const model = ressourcesModel()
    
    const [section, setSection] = useState("news")
    const [news, setNews] = useState([])  // Changed to array
    const [sites, setSites] = useState([]) // Changed to array
    const [newsStatus, setNewsStatus] = useState("loading")
    const [siteStatus, setSiteStatus] = useState("loading") // Fixed setter name
    
    const FetchNews = async() => {
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
            setNews([])
            setNewsStatus("noInternet")
            console.log("ERREUR : ", error)
        }
    }
    
    const FetchSites = async() => {
        try {
            setSiteStatus("loading")
            const response = await model.getSites()
            setSites(response.data)
            setSiteStatus("loaded")
        } catch (error) {
            console.log("ERREUR : ", error)
            setSiteStatus("error")
        }
    }
    
    //EFFECT
    useEffect(() => { FetchNews() }, [])
    useEffect(() => { FetchSites() }, [])
    
    return {
        news,
        sites,
        newsStatus,
        siteStatus,
        section,
        setSection
    }
}