import { SendMailForFeedBackNotification } from "../middleware/feedBackMailNotification.js";
import {verifyToken} from "../middleware/verifyToken.js";
import {FeedbackModel} from "../models/feedbackModel.js";


export async function sendFeedBackService (req, res) {
    try {

        const MODEL = FeedbackModel()
        verifyToken( req, res )
        const result = await MODEL.registerFeedback(req.user.id, req.body.content)
        
        
        SendMailForFeedBackNotification(req).catch(err => 
            console.error('Erreur envoi email:', err)
        )

        return {
            ok: result,
            message : "FeedBack envoyé avec succès !!"
        }

    } catch (error) {
        console.log(error)
        throw Error()
    }
}

export async function getFeedBackService (req, res) {
    try {
        const MODEL = FeedbackModel()
        verifyToken( req, res )
        const response = await MODEL.GetFeedBacks(req.user.id)

        return {
            ok: true,
            data : response.result,
            user_type : response.usage,
            message : "FeedBack reçu avec succès !!"
        }

    } catch (error) {
        console.log(error)
        throw Error()
    }
}