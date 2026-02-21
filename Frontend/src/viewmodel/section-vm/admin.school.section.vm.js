import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ImageServices } from "../../services/image.services.js"
import { SchoolModel } from "../../model/shool.model.js"

export const AdminSchoolViewModel = () => {
    const model = SchoolModel()
    const [currentTab, setCurrentTab] = useState("inscription")
    const [imagePreview, setImagePreview] = useState(null)
    const [imageError, setImageError] = useState(null)
    const [schoolData, setSchoolData] = useState({
        name: "", description: "", image: "", province: "", city: "", neighbourhood: "", site: ""
    })

    const { mutate: uploadImage } = useMutation({
        mutationFn: (file) => model.uploadImage(file),
        onSuccess: (res, file) => {
            setSchoolData({ ...schoolData, image: String(res.data) })
            setImagePreview(URL.createObjectURL(file))
        },
        onError: (error) => {
            console.error("Erreur upload : ", error)
            setImageError("Erreur lors de upload de l'image. Veuillez réessayer plus tard.")
            setSchoolData({ ...schoolData, image: "" })
            setImagePreview(null)
        },
    })

    const { mutate: sendData, status, data } = useMutation({
        mutationFn: () => model.registerSchool(schoolData),
        onError: (e) => console.error(e),
    })

    const HandleImage = (e) => {
        const file = e.target.files[0]
        if (!file) {
            setImageError(null)
            setSchoolData({ ...schoolData, image: "" })
            setImagePreview(null)
            return
        }

        const service = ImageServices()
        if (!service.isImageTypeValid(file.type)) {
            setImageError('Format de fichier non supporté. Veuillez choisir une image (JPEG, PNG, GIF, WebP).')
            setSchoolData({ ...schoolData, image: "" })
            setImagePreview(null)
            return
        }
        if (!service.isImageSizeValid(file.size)) {
            setImageError('La taille du fichier dépasse 5MB. Veuillez choisir une image plus petite.')
            setSchoolData({ ...schoolData, image: "" })
            setImagePreview(null)
            return
        }

        setImageError(null)
        uploadImage(file)
    }

    const resetImage = () => {
        setSchoolData({ ...schoolData, image: "" })
        setImagePreview(null)
        setImageError(null)
    }

    return {
        currentTab, setCurrentTab,
        HandleImage, resetImage,
        imagePreview, imageError,
        schoolData, setSchoolData,
        status: status === "pending" ? "loading" : status === "error" ? "error" : data?.ok ? "success" : "normal",
        message: data?.message ?? "Something went wrong.",
        sendData,
    }
}

export const SchoolListVm = () => {
    const { data: list = [], status } = useQuery({
        queryKey: ["schools"],
        queryFn: () => SchoolModel().getSchools(),
    })

    return {
        list,
        status: status === "pending" ? "loading" : status,
    }
}

export const SchoolDeletionVM = () => {
    const queryClient = useQueryClient()

    const { mutate: DeleteSchool, status, data } = useMutation({
        mutationFn: (id) => SchoolModel().deleteSchool(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["schools"] }),
        onError: (e) => console.error(e),
    })

    return {
        DeleteSchool,
        status: status === "pending" ? "loading" : status === "error" ? "error" : data?.ok ? "success" : "normal",
        message: status === "error" ? "Something went wrong." : data?.message ?? "",
    }
}