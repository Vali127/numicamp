import createClient from './modules/api.client.js'

export const feedbackApi = () => {
    const client = createClient('feedback')
    const auth = { headers: client.getAuth() }

    return {
        getFeedback:  ()     => client.get("list", auth),
        sendFeedback: (data) => client.post("send", { content: data }, auth),
    }
}