import axios from "axios";


export const feedbackApi = () => {
    const BASE_URL = 'http://localhost:3000/api/feedback';
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