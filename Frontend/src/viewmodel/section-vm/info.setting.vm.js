import { useRef } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { HomeModel } from "../../model/home.model.js"
import { profileModel } from "../../model/profile.model.js"
import { uploadTempProfilePicture } from "../../api/upload.api.js"

export const InfoSettingVm = () => {
    const model = HomeModel()
    const queryClient = useQueryClient()
    const previousDataRef = useRef()

    const { data: userData, isSuccess: loaded } = useQuery({
        queryKey: ["accountInfo"],
        queryFn: async () => {
            const [res, res2] = await Promise.all([model.getAccountInfo(), model.getUserDomains()])
            return { ...res, domains: res2.data }
        },
    })

    const setUserData = (updater) => {
        queryClient.setQueryData(["accountInfo"], updater)
    }

    const { mutate: uploadImage } = useMutation({
        mutationFn: (file) => uploadTempProfilePicture(file),
        onSuccess: (res, file) => setUserData({ ...userData, photo_profilUrl: res.data.filename, photo_profil: URL.createObjectURL(file) }),
        onError: (e) => console.error(e),
    })

    const { mutate: UpdateNewAccountData, status } = useMutation({
        mutationFn: () => profileModel().updateProfile(userData),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["accountInfo"] })
            previousDataRef.current = null
        },
        onError: (e) => console.error(e),
    })

    const ManageFileUploading = (e) => uploadImage(e.target.files[0])

    return {
        userData,
        setUserData,
        loaded,
        status: status === "pending" ? "fetching" : status === "success" ? "fetched" : "normal",
        UpdateNewAccountData,
        ManageFileUploading,
    }
}