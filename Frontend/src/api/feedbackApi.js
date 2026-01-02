import axios from "axios";
import { API_CONFIG } from '../config.js'


export const feedbackApi = () => {
    const BASE_URL = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/api/feedback`;
    const token = localStorage.getItem('token');

    const getFeedback = async () => {
        const result = await axios.get(BASE_URL + '/list', {
            headers: { Authorization: `Bearer ${token}` }
        })
        return result.data
    }

    const sendFeedback = async (data) => {
        const result = await axios.post(BASE_URL + '/send',
            { content: data },
            { headers: { Authorization: `Bearer ${token}` },
        })
        return result.data
    }

    return {
        getFeedback,
        sendFeedback,
    }
}