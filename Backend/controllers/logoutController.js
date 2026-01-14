import {logoutService} from "../services/logoutService.js";


export async function logoutController(req,res){
    try {
        const result = await logoutService(req, res)
        res.status(200).json({ ok : result.ok, message : result.message });
    } catch (err) {
        res.status(401).send({ ok : false, message: err.message });
    }
}