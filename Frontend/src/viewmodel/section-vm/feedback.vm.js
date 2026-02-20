import { useEffect, useState } from "react"
import { FeedbackModel } from "../../model/feedback.model.js"

export const FeedbackViewModel = () => {
    const MODEL = FeedbackModel()
    const [typeOfUser, setTypeOfUser] = useState("")
    const [feedback, setFeedback] = useState("")
    const [history, setHistory] = useState([])
    const [status, setStatus] = useState({ list: "", form: "" })

    const DispatchFeedback = async () => {
        try {
            setStatus({ ...status, form: "loading" })
            const response = await MODEL.sendFeedback(feedback)
            setStatus({ ...status, form: response.ok ? "success" : "fail" })
        } catch (err) {
            console.error(err)
        }
    }

    const FetchFeedBacks = async () => {
        try {
            setStatus({ ...status, list: "loading" })
            const response = await MODEL.getFeedback()
            if (response.ok) {
                setTypeOfUser(response.user_type)
                setHistory(response.rows)
                setStatus({ ...status, list: "success" })
            } else {
                setHistory([])
                setStatus({ ...status, list: "fail" })
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => { FetchFeedBacks() }, [])

    return { feedback, setFeedback, DispatchFeedback, history, typeOfUser }
}