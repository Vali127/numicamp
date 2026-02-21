import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ressourcesModel } from "../../model/ressources.model.js"
import { statsModel } from "../../model/stats.model.js"

export const AdminRessourceViewModel = () => {
    const MODEL = ressourcesModel()
    const queryClient = useQueryClient()
    const [currentTab, setCurrentTab] = useState("form")
    const [data, setData] = useState({ link: "", name: "", type: "", description: "", domain: "" })
    const [deletionModal, setDeletionModal] = useState(false)

    const { data: domains = [] } = useQuery({
        queryKey: ["domains"],
        queryFn: async () => (await statsModel().getDomains()).data,
    })

    const { data: list = [] } = useQuery({
        queryKey: ["resourceList"],
        queryFn: async () => (await MODEL.getList()).rows,
        enabled: currentTab === "list",
    })

    const { mutate: sendData, data: formResult = { message: "", status: "normal" }, status: sendStatus } = useMutation({
        mutationFn: () => MODEL.createResource(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resourceList"] }),
        onError: (error) => console.error(error),
    })

    return {
        currentTab, setCurrentTab,
        data, setData,
        list, deletionModal, setDeletionModal,
        sendData,
        formResult: sendStatus === "pending" ? { message: "", status: "loading" }
            : sendStatus === "error" ? { message: "Something went wrong", status: "error" }
                : formResult.ok === false ? { message: formResult.message, status: "failed" }
                    : sendStatus === "success" ? { message: formResult.message, status: "success" }
                        : { message: "", status: "normal" },
        domains,
    }
}

export const ResourceDeletionModalVM = () => {
    const MODEL = ressourcesModel()
    const queryClient = useQueryClient()

    const { mutate: DeleteResource, status, data } = useMutation({
        mutationFn: ({ id, type }) => MODEL.deleteResource(id, type),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resourceList"] }),
        onError: (err) => console.error(err),
    })

    return {
        status: status === "pending" ? "loading" : status === "error" ? "error" : data?.ok ? "success" : status,
        message: status === "error" ? "Something went wrong" : data?.message ?? "",
        DeleteResource: (id, type) => DeleteResource({ id, type }),
    }
}