/* eslint-disable react-hooks/rules-of-hooks */
import {useEffect, useState} from "react";
import {profileModel} from "../../model/profile.model.js";


export const userProfileViewModel = (id) => {

    const model = profileModel()

    const [ profileData, setProfileData ] = useState({})
    const [ posts, setPosts ] = useState([])
    const [ loaded, setLoaded ] = useState(false)

    const fetchData = async() => {
        const data = { profil_id : id }
        try {
            setLoaded(false)
            const response = await model.getProfilData(data)
            setProfileData(response)
        }
        catch(e) {
            console.error(e)
        }
    }

    const fetchPosts = async() => {
        const data = { user_id : id }
        const type = localStorage.getItem('usage')
        try {
            const response = await model.getProfilePostData(data, type)
            setPosts(response)
            setLoaded(true)
        }
        catch(e) {
            console.error(e)
        }
    }

    useEffect(
        () => { 
            fetchData()
            fetchPosts() 
        }, []
    )

    return {
        profileData,
        loaded,
        posts
    }
}