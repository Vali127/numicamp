import { schoolApi } from "../api/schoolApi.js"
import { API_CONFIG } from "../config.js"

export const SchoolModel = () => {
    const API = schoolApi()
    const staticUrl = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/static/users`

    const getSchools = async () => {
        const { etablishment } = await API.getSchools()
        return etablishment.map(school => ({
            ...school,
            photo_etab: `${staticUrl}/${school.photo_etab}`
        }))
    }

    return {
        uploadImage: (file) => API.uploadSchoolImage(file),
        registerSchool: (data) => API.registerSchool(data),
        deleteSchool: (id) => API.deleteSchool(id),
        getSchools,
    }
}