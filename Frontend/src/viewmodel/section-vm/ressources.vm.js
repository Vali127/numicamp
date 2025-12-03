import { useState } from "react"
import { ressourcesModel } from "../../model/ressources.model"
import { useEffect } from "react"

export const RessourcesViewModel = () => {
    
    //MODEL
    const model = ressourcesModel()
    //STATE
    const [news, setNews] = useState({})
    const [status, setStatus] = useState("loading")

    //FUNCTION
    const FetchNews = async() => {
        try {
            setStatus("loading")
            const response = await model.getNews()
            if ( response.ok ) {
                setNews(response.data)
                console.log("DATA : ", response.data)
                setStatus("loaded") 
            } else {
                setNews({})
                setStatus("noInternet")
            }
        }
        catch (error) {
            setNews({})
            setStatus("error")
            console.log("ERREUR : ", error)
        }
    }


    //EFFECT
    useEffect( () => { FetchNews() } , [])

    return {
        news,
        status
    }

}