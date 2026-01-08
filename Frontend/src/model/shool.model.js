import {schoolApi} from "../api/schoolApi.js";


export const SchoolModel = () => {
    const API = schoolApi()

    const uploadImage = async (file) => { return await API.uploadSchoolImage(file) }
    const registerSchool = async (data) => { return await API.registerSchool(data) }

    return {
        uploadImage,
        registerSchool,
    }
}