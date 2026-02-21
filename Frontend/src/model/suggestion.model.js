import { OrgSuggestionApi } from "../api/org.suggestion.api.js"
import { API_CONFIG } from "../config.js"

export const SuggestionModel = () => {
    const api = OrgSuggestionApi()
    const staticUrl = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/static/users`

    const getOrganisationSuggestion = async () => {
        const { data } = await api.getOrganisationSuggestionApi()
        return data.map(item => ({ ...item, photo_profil: `${staticUrl}/${item.photo_profil}` }))
    }

    return {
        getOrganisationSuggestion,
        followModel: (data) => api.followApi(data),
        unFollowModel: (data) => api.unfollowApi(data),
    }
}