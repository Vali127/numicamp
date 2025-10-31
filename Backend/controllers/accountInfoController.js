import {verifyToken} from "../middleware/verifyToken.js";
import {accountInfoService} from "../services/accountInfoService.js";


export async function accountInfoController(req, res, next) {
    try {
        verifyToken(req, res)
        const result = await accountInfoService(req)
        if (result.ok)
            return res.status(200).json({
                message: "requete reussite",
                ok : true,
                data : result.data
            })
        else
            return res.status(404).json({
                message: "compte introuvable",
                ok : false
            })
    }
    catch (error) {
        res.status(error.status||500).json({ message: error.message })
    }
}
