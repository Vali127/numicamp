import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { UserModel } from "../../model/usersModel.js"

export const UsersViewModel = () => {
    const MODEL = UserModel()
    const [showBlockageModal, setShowBlockageModal] = useState(false)
    const [showDeletionModal, setShowDeletionModal] = useState(false)

    const { data, status, refetch: FetchUserList } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const result = await MODEL.getUsers()
            if (!result.ok) throw new Error("unauthorized")
            return result.rows
        },
    })

    return {
        FetchUserList,
        listStatus: status === "pending" ? "loading" : status === "error" ? "unauthorized" : "success",
        userList: data ?? [],
        showBlockageModal, setShowBlockageModal,
        showDeletionModal, setShowDeletionModal,
    }
}