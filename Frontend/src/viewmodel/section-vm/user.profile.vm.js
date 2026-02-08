/* eslint-disable react-hooks/rules-of-hooks */
import {useEffect, useState} from "react";
import {profileModel} from "../../model/profile.model.js";


export const userProfileViewModel = (id) => {

    const model = profileModel()

    const [ profileData, setProfileData ] = useState({})
    const [ posts, setPosts ] = useState([])
    const [ ownership, setOwnership ] = useState(false)
    const [ loaded, setLoaded ] = useState(false)

    const fetchData = async() => {
        const data = { profil_id : id }
        try {
            setLoaded(false)
            const response = await model.getProfilData(data)
            let usage = response.user_type
            setProfileData(response)
            console.log("DATA : ", response)
            await fetchPosts(usage)
        }
        catch(e) {
            console.error(e)
        }
    }

    const fetchPosts = async(usage) => {
        const data = { user_id : id }
        console.log("USAGE : ", usage)
        try {
            const response = await model.getProfilePostData(data, usage)
            setPosts(response.rows)
            setOwnership(response.ownership)
            setLoaded(true)
        }
        catch(e) {
            console.error(e)
        }
    }

    useEffect(
        () => { 
            fetchData()
        }, []
    )

    return {
        profileData,
        loaded,
        posts,
        ownership,
        fetchData,
        fetchPosts,
    }
}