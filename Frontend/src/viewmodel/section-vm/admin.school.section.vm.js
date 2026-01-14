import {useState} from "react";
import {ImageServices} from "../../services/image.services.js";
import {PostModel} from "../../model/post.model.js";
import {SchoolModel} from "../../model/shool.model.js";
import error from "../../view/section/ressources/Error.jsx";


export const AdminSchoolViewModel = () => {

    const model = SchoolModel()

    const [currentTab, setCurrentTab] = useState("inscription");
    const [imagePreview, setImagePreview] = useState(null);
    const [imageError, setImageError] = useState(null);
    const [status, setStatus] = useState("normal");
    const [message, setMessage] = useState("");
    const [schoolData, setSchoolData] = useState({
        name : "",
        description : "",
        image : "",
        province : "",
        city : "",
        neighbourhood : "",
        site : ""
    });

    const HandleImage = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            setImageError(null)
            setSchoolData({...schoolData, image : ""})
            setImagePreview(null);
            return
        }
        const service = ImageServices()

        if (!service.isImageTypeValid(file.type)) {
            setImageError('Format de fichier non supporté. Veuillez choisir une image (JPEG, PNG, GIF, WebP).')
            setSchoolData({...schoolData, image : ""})
            setImagePreview(null)
            return
        }

        if (!service.isImageSizeValid(file.size)) {
            setImageError('La taille du fichier dépasse 5MB. Veuillez choisir une image plus petite.')
            setSchoolData({...schoolData, image : ""})
            setImagePreview(null)
            return
        }

        setImageError(null)

        try {
            const res = await model.uploadImage(file)
            setSchoolData({...schoolData, image : res.data })
            setImagePreview(URL.createObjectURL(file))
        }
        catch(error) {
            console.log("Erreur d' upload : ", error)
            setImageError("Erreur lors de l'upload de l'image. Veuillez réessayer plus tard.")
            setSchoolData({...schoolData, image: "" })
            setImagePreview(null)
        }
    }

    const resetImage = () => {
        setSchoolData({...schoolData, image : ""})
        setImagePreview(null)
        setImageError(null)
    }

    const sendData = async () => {
        try {
            setStatus("loading");
            const response = await model.registerSchool(schoolData)
            console.log("RESPONSE : ", response)
            if (response.ok)
                setStatus("success");
            else setStatus("error");
            setMessage(response.message);
        } catch (e) {
            console.error(e)
            setStatus("error")
            setMessage("Something went wrong.")
        }
    }


    return {
        currentTab,
        setCurrentTab,
        HandleImage,
        resetImage,
        imagePreview,
        imageError,
        setSchoolData,
        schoolData,
        status,
        sendData,
        message
    }
}

export const schoolListVm = () => {

    const MODEL = SchoolModel()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [status, setStatus] = useState("loading");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [list, setList] = useState([]);

    const FetchSchool = async () => {
        try {
            const result = await MODEL.getSchools()
            setList(result)
            setStatus((result.ok) ? "error" : "success")
        } catch (e) {
            console.error(e)
            setStatus("error")
        }
    }


    return {
        FetchSchool,
        status,
        list,
    }
}

export const SchoolDeletionVM = () => {
    const MODEL = SchoolModel()
    const [status, setStatus] = useState("normal");
    const [message, setMessage] = useState("")

    const DeleteSchool = async (id) => {
        try {
            const result = await MODEL.deleteSchool(id)
            setStatus((result.ok) ? "success" : "error")
            setMessage(result.message)
        } catch (e) {
            console.error(e)
            setStatus("error")
            setMessage( e.message || "Something went wrong.")
        }
    }

    return {
        DeleteSchool,
        status,
        message,
    }
}