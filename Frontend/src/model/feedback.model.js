import { feedbackApi } from "../api/feedbackApi.js"

export const FeedbackModel = () => {
    const API = feedbackApi()

    return {
        getFeedback: () => API.getFeedback(),
        sendFeedback: (feedback) => API.sendFeedback(feedback),
    }
}