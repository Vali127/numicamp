import { AccountApi } from "../api/account.api.js"
import { PostApi } from "../api/post.api.js"
import { DateShortFormat } from "../utils/display.format.js"
import { API_CONFIG } from "../config.js"

export const PostModel = () => {
    const api = PostApi()
    const staticUrl = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/static/users`

    const formatPost = (item) => ({
        ...item,
        photo_pub: `${staticUrl}/${item.photo_pub}`,
        date_pub: DateShortFormat(item.date_pub)
    })

    const formatProfile = (data) => ({
        ...data,
        photo_profil: `${staticUrl}/${data.photo_profil}`
    })

    const UploadPostImage = (data) => api.uploadPostImageApi(data)

    const UploadPostData = (data) => api.uploadPostApi({
        title: data.title,
        description: data.description,
        photoPath: data.photo,
        keywords: data.keywords,
        domains: data.domains
    })

    const GetPostFromOrg = async () => {
        const foo = await api.getPostsFromOrg()
        return { rows: foo.publications.map(formatPost), ownership: foo.owner }
    }

    const GetPostingOrgData = async (id) => {
        const { data } = await AccountApi().getOrganisationDataApi(id)
        return formatProfile(data)
    }

    const GetPostingPersonData = async (id) => {
        const { data } = await AccountApi().getPersonDataApi(id)
        return formatProfile(data)
    }

    const DeletePost = (id) => api.deletePostApi(id)

    const getApplierPosts = async () => {
        const foo = await api.getApplierPostsApi()
        return { rows: foo.publications.map(formatPost), ownership: foo.owner }
    }

    return {
        UploadPostImage,
        UploadPostData,
        GetPostFromOrg,
        GetPostingOrgData,
        GetPostingPersonData,
        DeletePost,
        getApplierPosts
    }
}