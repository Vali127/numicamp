import { useEffect, useState } from "react"
import { SuggestionModel } from "../../model/suggestion.model.js"

export const OrgSuggestionVm = () => {
    const [suggestedOrganisation, setSuggestedOrganisation] = useState([])
    const [isEmpty, setIsEmpty] = useState(true)

    useEffect(() => {
        const HandleSuggestion = async () => {
            try {
                const result = await SuggestionModel().getOrganisationSuggestion()
                setIsEmpty(result.length === 0)
                setSuggestedOrganisation(result)
            } catch (error) {
                console.error("ERREUR DE RECUP :", error)
                setIsEmpty(true)
            }
        }
        HandleSuggestion()
    }, [])

    const Follow = async (data) => {
        try {
            const res = await SuggestionModel().followModel(data)
            return res.data.ok
        } catch (error) {
            console.error("An error occurred : ", error)
            return false
        }
    }

    const Unfollow = async (data) => {
        try {
            const res = await SuggestionModel().unFollowModel(data)
            return res.data.ok
        } catch (error) {
            console.error("An error occurred : ", error)
            return false
        }
    }

    return { isEmpty, suggestedOrganisation, Follow, Unfollow }
}