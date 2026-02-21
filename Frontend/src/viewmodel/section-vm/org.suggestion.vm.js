import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { SuggestionModel } from "../../model/suggestion.model.js"

export const OrgSuggestionVm = () => {
    const queryClient = useQueryClient()

    const suggestion = SuggestionModel()
    const { data: suggestedOrganisation = [] } = useQuery({
        queryKey: ["orgSuggestions"],
        queryFn: () => suggestion.getOrganisationSuggestion(),
    })

    const { mutateAsync: Follow } = useMutation({
        mutationFn: (data) => suggestion.followModel(data),
        onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["orgSuggestions"] }),
        onError: (error) => console.error("An error occurred : ", error),
    })

    const { mutateAsync: Unfollow } = useMutation({
        mutationFn: (data) => suggestion.unFollowModel(data),
        onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["orgSuggestions"] }),
        onError: (error) => console.error("An error occurred : ", error),
    })

    return {
        isEmpty: suggestedOrganisation.length === 0,
        suggestedOrganisation,
        Follow: async (data) => { try { const res = await Follow(data); return res.data.ok } catch { return false } },
        Unfollow: async (data) => { try { const res = await Unfollow(data); return res.data.ok } catch { return false } },
    }
}