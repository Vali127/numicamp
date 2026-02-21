import { commentApi } from "../api/comment.api.js"
import { DurationFormat } from "../utils/display.format.js"
import { API_CONFIG } from "../config.js"

export const CommentModel = () => {
    const api = commentApi()

    const sendComment = (data) => api.postCommentApi(data)

    const getComments = async (postId) => {
        const { rows } = await api.getCommentsApi(postId)
        return rows.map(item => ({
            ...item,
            date_creation_com: DurationFormat(item.date_creation_com),
            photo_profil: `http://${API_CONFIG.hostname}:${API_CONFIG.port}/static/users/${item.photo_profil}`
        }))
    }

    return { sendComment, getComments }
}