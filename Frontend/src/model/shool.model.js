import {schoolApi} from "../api/schoolApi.js";
import {API_CONFIG} from "../config.js";


export const SchoolModel = () => {
    const API = schoolApi()

    const uploadImage = async (file) => { return await API.uploadSchoolImage(file) }
    const registerSchool = async (data) => { return await API.registerSchool(data) }
    const getSchools = async () => {
        const data = await API.getSchools()
        return data.etablishment.map((school) => ({ ...school, photo_etab : `http://${API_CONFIG.hostname}:${API_CONFIG.port}/static/users/${school.photo_etab}` }))
    }
    const deleteSchool = async (id) => { return await API.deleteSchool(id) }

    return {
        uploadImage,
        registerSchool,
        getSchools,
        deleteSchool,
    }
}