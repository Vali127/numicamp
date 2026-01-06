import React, {useEffect} from "react";
import {ressourcesModel} from "../../model/ressources.model.js";

export const AdminRessourceViewModel = () => {

    const MODEL = ressourcesModel()

    const [currentTab, setCurrentTab] = React.useState("form")
    const [status, setStatus] = React.useState("normal")
    const [message, setMessage] = React.useState("")
    const [list, setList] = React.useState([])
    const [data, setData] = React.useState({
        link: "",
        name: "",
        type: "",
        description: "",
    });

    const fetchResources = async () => {
        try {
            const result = await MODEL.getList()
            setList(result.rows)
        } catch (error) {
            console.log(error)
            setList([])
        }
    }

    useEffect(() => {
        if (currentTab === "list")
            fetchResources()
    }, [currentTab])


    return {
        currentTab,
        setCurrentTab,
        data,
        setData,
        status,
        message,
        list,
    }
}