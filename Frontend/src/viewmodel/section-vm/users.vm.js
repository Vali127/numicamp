import { useEffect, useState } from "react"
import { UserModel } from "../../model/usersModel.js"

export const UsersViewModel = () => {
    const MODEL = UserModel()
    const [listStatus, setListStatus] = useState('')
    const [userList, setUserList] = useState([])
    const [showBlockageModal, setShowBlockageModal] = useState(false)
    const [showDeletionModal, setShowDeletionModal] = useState(false)

    const FetchUserList = async () => {
        try {
            setListStatus('loading')
            const result = await MODEL.getUsers()
            if (result.ok) {
                setUserList(result.rows)
                setListStatus('success')
            } else {
                setListStatus('unauthorized')
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => { FetchUserList() }, [])

    return {
        FetchUserList,
        listStatus, userList,
        showBlockageModal, setShowBlockageModal,
        showDeletionModal, setShowDeletionModal,
    }
}