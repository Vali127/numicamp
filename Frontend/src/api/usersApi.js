import createClient from './modules/api.client.js'

export const usersApi = () => {
    const client = createClient('users')
    const auth = { headers: client.getAuth() }

    return {
        getListApi:    ()    => client.get("userList", auth),
        deleteUserApi: (id)  => client.delete("remove",  { ...auth, params: { id_user: id } }),
        blockUserApi:  (id)  => client.post("block",   { id_user: id }, auth),
        unblockUserApi:(id)  => client.post("unblock", { id_user: id }, auth),
    }
}