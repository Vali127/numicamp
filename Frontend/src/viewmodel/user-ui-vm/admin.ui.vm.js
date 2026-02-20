import { useEffect, useState } from "react"
import { HomeModel } from "../../model/home.model.js"

const isUserAuthenticated = () => !!localStorage.getItem("token")

export const AdminHomeViewModel = () => {
    const { getAccountInfo } = HomeModel()
    const [authenticated, setAuthenticated] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const [logout, setLogout] = useState(false)

    useEffect(() => { setAuthenticated(isUserAuthenticated()) }, [])

    useEffect(() => {
        const HandleAccountInformation = async () => {
            try {
                const res = await getAccountInfo()
                setUserInfo(res)
            } catch (error) {
                console.error(error)
            }
        }
        HandleAccountInformation()
    }, [])

    return { authenticated, userInfo, logout, setLogout }
}