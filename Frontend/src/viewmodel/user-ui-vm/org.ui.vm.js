import { useEffect, useState } from "react"
import { HomeModel } from "../../model/home.model.js"

const isUserAuthenticated = () => !!localStorage.getItem("token")

export const OrgUiVm = () => {
    const model = HomeModel()
    const [authenticated, setAuthenticated] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const [logout, setLogout] = useState(false)
    const [postModalVisibility, setPostModalVisibility] = useState(false)
    const [searchContent, setSearchContent] = useState("")
    const [searched, setSearched] = useState(false)

    useEffect(() => { setAuthenticated(isUserAuthenticated()) }, [])

    useEffect(() => {
        const HandleAccountInformation = async () => {
            try {
                const [user_data, user_domains] = await Promise.all([
                    model.getAccountInfo(),
                    model.getUserDomains()
                ])
                setUserInfo({ ...user_data, domains: user_domains.data })
            } catch (error) {
                console.error(error)
            }
        }
        HandleAccountInformation()
    }, [])

    return {
        authenticated, logout, setLogout,
        userInfo, postModalVisibility, setPostModalVisibility,
        searchContent, setSearchContent, searched, setSearched,
    }
}