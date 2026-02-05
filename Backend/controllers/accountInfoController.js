import {verifyToken} from "../middleware/verifyToken.js";
import {accountInfoService, userDomainsService, organisationInfoService, personInfoService} from "../services/accountInfoService.js";


export async function accountInfoController(req, res) {
    try {
        verifyToken(req, res)
        const result = await accountInfoService(req)
        res.status(200).json({ ok : result.ok, message : (result.ok) ? "requete reussite" : "compte introuvable", data : result.data || null })
    }
    catch (error) {
        res.status(error.status||500).json({ message: error.message })
    }
}


export async function userDomainsController(req, res) {
    try {
        verifyToken(req, res)
        const result = await userDomainsService(req)
        res.status(200).json({ ok : result.ok, message : (result.ok) ? "requete reussite" : "Domaines non retrouvé", data : result.data || null })
    }
    catch (error) {
        res.status(error.status||500).json({ message: error.message })
    }
}


export async function organisationInfoController(req, res) {
    try {
        const result = await organisationInfoService(req)
        res.status(200).json({ ok : result.ok, message : (result.ok) ? "information de l' organisation retrouvée" : "information de l' organisation introuvable", data : result.data || null })
    }
    catch(error) {
        res.status(error.status||500).json({ message: error.message })
    }
}


export async function personInfoController(req, res) {
    try {
        const result = await personInfoService(req)
        res.status(200).json({ ok : result.ok, message : (result.ok) ? "information du personne retrouvée" : "information du personne introuvable", data : result.data || null })
    }
    catch(error) {
        res.status(error.status||500).json({ message: error.message })
    }
}
