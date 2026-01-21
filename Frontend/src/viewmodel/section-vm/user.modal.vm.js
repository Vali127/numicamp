import {useState} from "react";
import {UserModel} from "../../model/usersModel.js";
import {useGlobalUiContext} from "../../context/ui.context.jsx";


export const userModalViewModel = () => {
    //MODEL
    const MODEL = UserModel()

    //context
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { refresh, setRefresh } = useGlobalUiContext()

    //STATE
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [status, setStatus] = useState("normal")
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [response, setResponse] = useState({
        message: "",
        ok : false,
        state : ""
    })

    //FUNCTION
    const DeleteUser = async (id) => {
        try {
            setStatus("loading")
            const response = await MODEL.deleteUser(id)
            setResponse(response)
            setStatus(response.ok ? "success" : "failed" )

        } catch (error) {
            console.error(error)
            setStatus("failed")
        } finally {
            setRefresh(!refresh)
        }
    }

    const BlockUser = async (id) => {
        try {
            console.log(id)
            setStatus("loading")
            const response = await MODEL.blockUser(id)
            setResponse(response)
            if (response.ok)
                setStatus("success")
            else
                setStatus("failed")

        } catch (error) {
            console.error(error)
            setStatus("failed")
        } finally {
            setRefresh(!refresh)
        }
    }

    const UnblockUser = async (id) => {
        try {
            setStatus("loading")
            const response = await MODEL.unblockUser(id)
            setResponse(response)
            if (response.ok)
                setStatus("success")
            else
                setStatus("failed")

        } catch (error) {
            console.error(error)
            setStatus("failed")
        } finally {
            setRefresh(!refresh)
        }
    }

    return {
        status,
        response,
        DeleteUser,
        BlockUser,
        UnblockUser,
    }

}