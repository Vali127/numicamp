import createClient from './modules/api.client.js'

export const schoolApi = () => {
    const client = createClient('etablishment')
    const auth = { headers: client.getAuth() }

    return {
        uploadSchoolImage: (file)  => {
            const formData = new FormData()
            formData.append("image", file)
            return client.post("upload/image", formData, auth)
        },
        registerSchool: (data) => client.post("register",        { data }, auth),
        getSchools:     ()     => client.get("getEtablishment",  auth),
        deleteSchool:   (id)   => client.delete("remove", { ...auth, params: { id } }),
    }
}