import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { HomeModel } from "../../model/home.model.js"

const isUserAuthenticated = () => !!localStorage.getItem("token")

export const OrgUiVm = () => {
    const model = HomeModel()
    const [logout, setLogout] = useState(false)
    const [postModalVisibility, setPostModalVisibility] = useState(false)
    const [searchContent, setSearchContent] = useState("")
    const [searched, setSearched] = useState(false)

    const { data: userInfo = {} } = useQuery({
        queryKey: ["accountInfo"],
        queryFn: async () => {
            const [user_data, user_domains] = await Promise.all([
                model.getAccountInfo(),
                model.getUserDomains()
            ])
            return { ...user_data, domains: user_domains.data }
        },
        enabled: isUserAuthenticated(),
    })

    return {
        authenticated: isUserAuthenticated(),
        logout, setLogout,
        userInfo, postModalVisibility, setPostModalVisibility,
        searchContent, setSearchContent, searched, setSearched,
    }
}