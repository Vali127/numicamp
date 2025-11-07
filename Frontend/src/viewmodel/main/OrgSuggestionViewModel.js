import { useEffect, useState } from "react"
import { SuggestionModel } from "../../model/SuggestionModel"


export const OrgSuggestionViewModel = () => {

    const [ suggestedOrganisation, setSuggestedOrganisation ] = useState([])
    const [ isEmpty, setIsEmpty ] = useState(true)

    const HandleSuggestion = async() => {
        try {
            const model = SuggestionModel()
            const result = await model.getOrganisationSuggestion()
            
            if ( result.length == 0 ) 
                setIsEmpty(true)
            else
                setIsEmpty(false)
            
            setSuggestedOrganisation(result)
        }
        catch(error) {
            setIsEmpty(true)
            console.log("ERREUR DE RECUP :", error)
        }
    }

    useEffect( () => { HandleSuggestion() }, [] )


    const Follow = async(data) => {
        try {
            const model = SuggestionModel()
            const res = await model.followModel(data)
            
            return res.data.ok
        }
        catch(error) {
            console.log("An error occured : ", error)
            return false
        }
    }

    const Unfollow = async(data) => {
        try {
            const model = SuggestionModel()
            const res = await model.unFollowModel(data)

            return res.data.ok
        }
        catch(error) {
            console.log("An error occured : ", error)
            return false
        }
    }

    return {
        isEmpty,
        suggestedOrganisation,
        Follow,
        Unfollow,
    }

}