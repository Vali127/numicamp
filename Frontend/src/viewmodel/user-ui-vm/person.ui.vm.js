import { useEffect, useState } from "react"
import { HomeModel } from "../../model/home.model.js"

const isUserAuthenticated = () => !!localStorage.getItem("token")

export const PersonUiVm = () => {
    const { getAccountInfo, getUserDomains } = HomeModel()
    const [authenticated, setAuthenticated] = useState(false)
    const [userInfo, setUserInfo] = useState({ nom_personne: '', prenom_personne: '', nom_profil: '', photo_profil: '/src/assets/images/default-pfp.jpg', domains: [] })
    const [logout, setLogout] = useState(false)
    const [postModalVisibility, setPostModalVisibility] = useState(false)
    const [searchContent, setSearchContent] = useState("")
    const [searched, setSearched] = useState(false)

    useEffect(() => { setAuthenticated(isUserAuthenticated()) }, [])

    useEffect(() => {
        const HandleAccountInformation = async () => {
            try {
                const [res, res2] = await Promise.all([getAccountInfo(), getUserDomains()])
                setUserInfo({ ...res, domains: res2.data })
            } catch (e) {
                console.error(e)
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