import createClient from './modules/api.client.js'

export const commentApi = () => {
    const client = createClient('comment')
    const auth = { headers: client.getAuth() }

    return {
        postCommentApi: (data)   => client.post("sendComment", data, auth),
        getCommentsApi: (postId) => client.get("getComment", { ...auth, params: { idPub: postId } }),
    }
}