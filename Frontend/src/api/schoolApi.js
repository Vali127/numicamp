import {API_CONFIG} from "../config.js";
import axios from "axios";


export const schoolApi = () => {

    const BASE_URL = "http://" + API_CONFIG.hostname + ":" + API_CONFIG.port + "/api/etablishment";
    const token = localStorage.getItem("token");

    const uploadSchoolImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post( BASE_URL + "/upload/image", formData, {
            headers: { Authorization: `Bearer ${token}` }
        }  )
        return response.data;
    }

    const registerSchool = async (data) => {
        const response = await axios.post( BASE_URL + "/register", {data : data}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data;
    }

    const getSchools = async () => {
        const response = await axios.get( BASE_URL + "/getEtablishment", {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    const deleteSchool = async (id) => {
        const response = await axios.delete( BASE_URL + "/remove", {
            headers: { Authorization: `Bearer ${token}` },
            params : { id : id }
        })
        return response.data;
    }

    return {
        uploadSchoolImage,
        registerSchool,
        getSchools,
        deleteSchool
    }
}