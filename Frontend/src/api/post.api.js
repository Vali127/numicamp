import createClient from './modules/api.client.js'

export const PostApi = () => {
    const client = createClient('publication')
    const auth = { headers: client.getAuth() }

    return {
        uploadPostApi: (dataPost) => client.post("create",       dataPost, auth),
        uploadPostImageApi: (file) => {
            const formData = new FormData()
            formData.append('image', file)
            return client.post("upload-image", formData)
        },
        getPostsFromOrg: () => client.get("subscribed", auth),
        getUserPostsApi: (obj, type) => client.get(type === "personal" ? "user" : "organization", { ...auth, params: obj }),
        deletePostApi: (postId) => client.delete("delete", { ...auth, params: { id_post: postId } }),
        getApplierPostsApi: () => client.get("applicants", auth),
    }
}