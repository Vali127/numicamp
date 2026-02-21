import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FeedbackModel } from "../../model/feedback.model.js"

export const FeedbackViewModel = () => {
    const MODEL = FeedbackModel()
    const queryClient = useQueryClient()
    const [feedback, setFeedback] = useState("")

    const { data, isError } = useQuery({
        queryKey: ["feedbacks"],
        queryFn: async () => {
            const response = await MODEL.getFeedback()
            if (!response.ok) throw new Error()
            return response
        },
    })

    const { mutate: DispatchFeedback, status: formStatus } = useMutation({
        mutationFn: () => MODEL.sendFeedback(feedback),
        onSuccess: (response) => {
            if (!response.ok) throw new Error()
            void queryClient.invalidateQueries({ queryKey: ["feedbacks"] })
        },
        onError: (err) => console.error(err),
    })

    return {
        feedback, setFeedback,
        DispatchFeedback,
        history: data?.rows ?? [],
        typeOfUser: data?.user_type ?? "",
        status: {
            list: isError ? "fail" : data ? "success" : "loading",
            form: formStatus === "pending" ? "loading" : formStatus === "error" ? "fail" : formStatus === "success" ? "success" : "",
        }
    }
}