import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { HomeModel } from "../../model/home.model.js"

const isUserAuthenticated = () => !!localStorage.getItem("token")

export const PersonUiVm = () => {
    const { getAccountInfo, getUserDomains } = HomeModel()
    const [logout, setLogout] = useState(false)
    const [postModalVisibility, setPostModalVisibility] = useState(false)
    const [searchContent, setSearchContent] = useState("")
    const [searched, setSearched] = useState(false)

    const { data: userInfo = { nom_personne: '', prenom_personne: '', nom_profil: '', photo_profil: '/src/assets/images/default-pfp.jpg', domains: [] } } = useQuery({
        queryKey: ["accountInfo"],
        queryFn: async () => {
            const [res, res2] = await Promise.all([getAccountInfo(), getUserDomains()])
            return { ...res, domains: res2.data }
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