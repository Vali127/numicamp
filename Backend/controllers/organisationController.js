import { verifyToken } from "../middleware/verifyToken.js";
import {getOrganisationService,followOrganisationService, unFollowOrganisationService} from "../services/organisationService.js";


export async function getOrganisationController(req, res) {
    try {
        verifyToken(req, res)
        const result = await getOrganisationService(req.user.id);
        res.status(200).json({message: result.message, data: result.data });
    } catch (err) {
        res.status(err.status||500).json({ message: err.message });
    }
}

export async function followOrganisationController(req, res) {
    try {
        verifyToken(req, res)
        const result = await followOrganisationService(req)
        res.status(200).json({ok: result.ok, message: result.message, action: result.action })
    }
    catch (error) {
        res.status(error.status||500).json({ message: error.message })
    }
}

export async function unFollowOrganisationController(req, res) {
    try {
        verifyToken(req, res)
        const result = await unFollowOrganisationService(req)
        res.status(200).json({ok: result.ok, message: result.message, action: result.action })
    }
    catch (error) {
        res.status(error.status||500).json({ message: error.message })
    }
}