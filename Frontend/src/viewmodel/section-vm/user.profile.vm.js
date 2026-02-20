import { useEffect, useState } from "react"
import { profileModel } from "../../model/profile.model.js"

export const UserProfileViewModel = (id) => {
    const model = profileModel()
    const [profileData, setProfileData] = useState({})
    const [posts, setPosts] = useState([])
    const [ownership, setOwnership] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const fetchPosts = async (usage) => {
        const response = await model.getProfilePostData({ user_id: id }, usage)
        setPosts(response.rows)
        setOwnership(response.ownership)
        setLoaded(true)
    }

    const fetchData = async () => {
        try {
            setLoaded(false)
            const response = await model.getProfilData({ profil_id: id })
            setProfileData(response)
            await fetchPosts(response.user_type)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => { fetchData() }, [])

    return { profileData, loaded, posts, ownership, fetchData, fetchPosts }
}