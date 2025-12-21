import {FeedbackModel} from "../../model/feedback.model.js";
import {useEffect, useState} from "react";


export const FeedbackViewModel = () => {
    //MODEL
    const MODEL = FeedbackModel()


    //STATE
    const [typeOfUser, setTypeOfUser] = useState("")
    const [feedback, setFeedback] = useState("")
    const [history, setHistory] = useState([])
    const [status, setStatus] = useState({ list : "", form : "" })


    //FUNCTION
    const DispatchFeedback = async () => {
        try {
            setStatus({...status, form : "loading"});
            const response = await MODEL.sendFeedback(feedback);
            console.log("DATA : ", response)
            if (response.ok) { setStatus({...status, form : "success"}) }
            else { setStatus({...status, form : "fail"}) }
        } catch (err) {
            console.error(err)
        }
    }

    const FetchFeedBacks = async () => {
        try {
            setStatus({...status, list : "loading"});
            const response = await MODEL.getFeedback()
            console.log("DATA LIST : ", response)
            if (response.ok) {
                setTypeOfUser(response.user_type)
                setStatus({...status, form : "success"})
                setHistory(response.rows)
            } else {
                setStatus({...status, form : "fail"})
                setHistory([])
            }
        } catch (err) {
            console.error(err)
        }
    }

    //EFFECT
    useEffect(() => { FetchFeedBacks() },[])

    return {
        feedback,
        setFeedback,
        DispatchFeedback,
        history,
        typeOfUser,
    }
}