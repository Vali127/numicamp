import {useState, useEffect, useRef} from "react"
import {HomeModel} from "../../model/home.model.js"
import {profileModel} from "../../model/profile.model.js";
import {uploadTempProfilePicture} from "../../api/upload.api.js";

export const InfoSettingVm = () => {

    const model = HomeModel()

    const [userData, setUserData] = useState(null)
    const previousDataRef = useRef()
    const [loaded, setLoaded] = useState(false)
    const [status, setStatus] = useState("normal")

    //charger les anciens données
    const FetchAccountCurrentData = async () => {
        try {
            setLoaded(false)
            const res = await model.getAccountInfo()
            const res2 = await model.getUserDomains()
            setUserData({...res, domains:res2.data})
            setLoaded(true)
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => { FetchAccountCurrentData().then(r => r ) }, [])

    const ManageFileUploading = async (e) => {
        const file = e.target.files[0]
        try {
            const res = await uploadTempProfilePicture(file)
            /*
             photo_profilUrl : nom du fichier uploadé temporairement
             photo_profil : preview sur l'UI de l' utilisateur
             */
            setUserData({...userData, photo_profilUrl : res.data.filename, photo_profil : URL.createObjectURL(file) })
        }
        catch (e) {
            console.log(e)
        }
    }

    const UpdateNewAccountData = async () => {
        try {
            setStatus("fetching")
            await profileModel().updateProfile(userData)
            await FetchAccountCurrentData()
            setStatus("fetched")
            previousDataRef.current = null
        }
        catch (e) {
            console.log(e)
        }
    }

    //changer l'état lors des changements.
    useEffect(() => {
        if ( JSON.stringify(userData) !== JSON.stringify(previousDataRef.current) && previousDataRef.current !== undefined && previousDataRef.current !== null && status === "fetched" ) {
            setStatus("normal")
        }
        previousDataRef.current = userData
    }, [userData, status])



    return {
        userData,
        setUserData,
        loaded,
        status,
        UpdateNewAccountData,
        ManageFileUploading
    }

}