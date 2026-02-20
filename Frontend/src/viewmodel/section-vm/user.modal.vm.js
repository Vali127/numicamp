import { useState } from "react"
import { UserModel } from "../../model/usersModel.js"
import { useGlobalUiContext } from "../../context/ui.context.jsx"

export const UserModalViewModel = () => {
    const MODEL = UserModel()
    const { setRefresh } = useGlobalUiContext()
    const [status, setStatus] = useState("normal")
    const [response, setResponse] = useState({ message: "", ok: false, state: "" })

    const handleAction = async (action) => {
        try {
            setStatus("loading")
            const res = await action()
            setResponse(res)
            setStatus(res.ok ? "success" : "failed")
        } catch (error) {
            console.error(error)
            setStatus("failed")
        } finally {
            setRefresh(r => !r)
        }
    }

    return {
        status,
        response,
        DeleteUser: (id) => handleAction(() => MODEL.deleteUser(id)),
        BlockUser: (id) => handleAction(() => MODEL.blockUser(id)),
        UnblockUser: (id) => handleAction(() => MODEL.unblockUser(id)),
    }
}