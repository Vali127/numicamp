import { useState, useEffect } from "react"
import { ressourcesModel } from "../../model/ressources.model.js"
import { statsModel } from "../../model/stats.model.js"

export const AdminRessourceViewModel = () => {
    const MODEL = ressourcesModel()
    const [currentTab, setCurrentTab] = useState("form")
    const [domains, setDomains] = useState([])
    const [formResult, setFormResult] = useState({ message: "", status: "normal" })
    const [list, setList] = useState([])
    const [data, setData] = useState({ link: "", name: "", type: "", description: "", domain: "" })
    const [deletionModal, setDeletionModal] = useState(false)

    const FetchDomains = async () => {
        try {
            const result = await statsModel().getDomains()
            setDomains(result.data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchResources = async () => {
        try {
            const result = await MODEL.getList()
            setList(result.rows)
        } catch (error) {
            console.error(error)
            setList([])
        }
    }

    const sendData = async () => {
        try {
            setFormResult({ ...formResult, status: "loading" })
            const result = await MODEL.createResource(data)
            setFormResult({ status: result.ok ? "success" : "failed", message: result.message })
        } catch (error) {
            console.error(error)
            setFormResult({ status: "error", message: error.message || "Something went wrong" })
        }
    }

    useEffect(() => {
        if (currentTab === "list") fetchResources()
    }, [currentTab])

    return {
        currentTab, setCurrentTab,
        data, setData,
        list, deletionModal, setDeletionModal,
        sendData, formResult,
        FetchDomains, fetchResources, domains
    }
}

export const ResourceDeletionModalVM = () => {
    const MODEL = ressourcesModel()
    const [status, setStatus] = useState("normal")
    const [message, setMessage] = useState("")

    const DeleteResource = async (id, type) => {
        try {
            setStatus("loading")
            const result = await MODEL.deleteResource(id, type)
            setMessage(result.message)
            setStatus(result.ok ? "success" : "error")
        } catch (err) {
            console.error(err)
            setStatus("error")
            setMessage("Something went wrong")
        }
    }

    return { status, message, DeleteResource }
}