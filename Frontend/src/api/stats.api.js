import axios from "axios";
import {API_CONFIG} from "../config.js";


export const statsApi = () => {

    const BASE_URL = "http://" + API_CONFIG.hostname + ":" + API_CONFIG.port + "/api/stats"
    const token = localStorage.getItem("token");

    const getDomainsApi = async () => {
        const result = await axios.get( BASE_URL + "/domains", {
            headers : { Authorization: `Bearer ${token}` },
        } )
        return result.data
    }

    return {
        getDomainsApi,
    }

}