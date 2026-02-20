import { useState, useEffect, useRef } from "react"
import { HomeModel } from "../../model/home.model.js"
import { profileModel } from "../../model/profile.model.js"
import { uploadTempProfilePicture } from "../../api/upload.api.js"

export const InfoSettingVm = () => {
    const model = HomeModel()
    const [userData, setUserData] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [status, setStatus] = useState("normal")
    const previousDataRef = useRef()

    const FetchAccountCurrentData = async () => {
        try {
            setLoaded(false)
            const [res, res2] = await Promise.all([model.getAccountInfo(), model.getUserDomains()])
            setUserData({ ...res, domains: res2.data })
            setLoaded(true)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => { FetchAccountCurrentData() }, [])

    useEffect(() => {
        if (
            JSON.stringify(userData) !== JSON.stringify(previousDataRef.current) &&
            previousDataRef.current !== undefined &&
            previousDataRef.current !== null &&
            status === "fetched"
        ) {
            setStatus("normal")
        }
        previousDataRef.current = userData
    }, [userData, status])

    const ManageFileUploading = async (e) => {
        const file = e.target.files[0]
        try {
            const res = await uploadTempProfilePicture(file)
            setUserData({ ...userData, photo_profilUrl: res.data.filename, photo_profil: URL.createObjectURL(file) })
        } catch (e) {
            console.error(e)
        }
    }

    const UpdateNewAccountData = async () => {
        try {
            setStatus("fetching")
            await profileModel().updateProfile(userData)
            await FetchAccountCurrentData()
            setStatus("fetched")
            previousDataRef.current = null
        } catch (e) {
            console.error(e)
        }
    }

    return { userData, setUserData, loaded, status, UpdateNewAccountData, ManageFileUploading }
}