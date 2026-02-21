import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { HomeModel } from "../../model/home.model.js"

const isUserAuthenticated = () => !!localStorage.getItem("token")

export const AdminHomeViewModel = () => {
    const { getAccountInfo } = HomeModel()
    const [logout, setLogout] = useState(false)

    const { data: userInfo = {} } = useQuery({
        queryKey: ["accountInfo"],
        queryFn: () => getAccountInfo(),
        enabled: isUserAuthenticated(),
    })

    return {
        authenticated: isUserAuthenticated(),
        userInfo,
        logout, setLogout,
    }
}