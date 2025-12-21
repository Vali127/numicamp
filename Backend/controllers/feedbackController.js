import {getFeedBackService, sendFeedBackService} from "../services/feedBackService.js";


export async function sendFeedBackController( req, res ) {
    try {
        const result = await sendFeedBackService(req, res)
        if (result) {
            res.status(200).json({ message : result.message, ok : result.ok })
        } else {
            res.status(404).json({ message : result.message, ok : false })
        }
    } catch (err) {
        res.status(400).json({ message: err.message, ok: false })
    }
}

export async function getFeedBackController( req, res ) {
    try {
        const  result = await getFeedBackService(req, res)
        if (result) {
            res.status(200).json({ message : result.message, ok : result.ok, rows : result.data, user_type : result.user_type })
        } else {
            res.status(404).json({ message : result.message, ok : false })
        }
    } catch (err) {
        res.status(400).json({ message: err.message, ok: false })
    }
}