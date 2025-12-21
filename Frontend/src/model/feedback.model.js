import {feedbackApi} from "../api/feedbackApi.js";


export const FeedbackModel = () => {

    const API = feedbackApi()

    const getFeedback = async () => {
        return await API.getFeedback()
    }

    const sendFeedback = async (feedback) => {
        return await API.sendFeedback(feedback)
    }

    return {
        getFeedback,
        sendFeedback,
    }

}