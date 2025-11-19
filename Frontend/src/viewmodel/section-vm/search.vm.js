import { useEffect } from "react"
import { searchModel } from "../../model/search.model"


export const SearchViewModel = (prompt) => {

    const model = searchModel()

    const FetchPrompt = async () => {
        const data_to_send = { keywords : prompt }
        try {
            const received_data = await model.search(data_to_send)
            console.log("RESPONSE ON VIEW : ", received_data)
        }
        catch (err) {   
            console.log("ERROR ON SENDING PROMPT : ", err)
        }

    }

    useEffect(
        () => { FetchPrompt() }, []
    )

}