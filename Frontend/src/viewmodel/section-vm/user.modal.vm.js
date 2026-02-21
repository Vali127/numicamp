import { useMutation } from "@tanstack/react-query"
import { UserModel } from "../../model/usersModel.js"

export const UserModalViewModel = () => {
    const MODEL = UserModel()

    const options = {
        onError: (error) => console.error(error),
    }

    const { mutate: deleteUser, status: s1, data: d1 } = useMutation({ mutationFn: (id) => MODEL.deleteUser(id), ...options })
    const { mutate: blockUser, status: s2, data: d2 } = useMutation({ mutationFn: (id) => MODEL.blockUser(id), ...options })
    const { mutate: unblockUser, status: s3, data: d3 } = useMutation({ mutationFn: (id) => MODEL.unblockUser(id), ...options })

    const status = [s1, s2, s3].find(s => s !== "idle") ?? "idle"
    const data = d1 ?? d2 ?? d3

    return {
        status: status === "pending" ? "loading" : status === "error" ? "failed" : data?.ok ? "success" : "normal",
        response: data ?? { message: "", ok: false, state: "" },
        DeleteUser: (id) => { deleteUser(id) },
        BlockUser: (id) => { blockUser(id) },
        UnblockUser: (id) => { unblockUser(id) },
    }
}