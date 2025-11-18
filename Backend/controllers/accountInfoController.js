import {verifyToken} from "../middleware/verifyToken.js";
import {accountInfoService, userDomainsService, organisationInfoService, personInfoService} from "../services/accountInfoService.js";


export async function accountInfoController(req, res) {
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

export async function userDomainsController(req, res) {
    try {
        verifyToken(req, res)
        const result = await userDomainsService(req)
        if (result.ok)
            return res.status(200).json({
                message: "requete reussite",
                ok : true,
                data : result.data
            })
        else
            return res.status(404).json({
                message: "requtes a echoué",
                ok : false
            })
    }
    catch (error) {
        res.status(error.status||500).json({ message: error.message })
    }
}

export async function organisationInfoController(req, res) {
    try {

        const result = await organisationInfoService(req)
        if (result.ok) {
            return res.status(200).json({
                message : "organisation info got !",
                ok: true,
                data : result.data
            })
        }
        else {
            return res.status(404).json({
                message: "request for organisation data failed",
                ok : false
            })
        }

    }
    catch(error) {
        res.status(error.status||500).json({ message: error.message })
    }
}

export async function personInfoController(req, res) {
    try {

        const result = await personInfoService(req)
        if (result.ok) {
            return res.status(200).json({
                message : "person info got !",
                ok: true,
                data : result.data
            })
        }
        else {
            return res.status(404).json({
                message: "request for person data failed",
                ok : false
            })
        }

    }
    catch(error) {
        res.status(error.status||500).json({ message: error.message })
    }
}
