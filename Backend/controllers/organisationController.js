/**
 * param : req contenu
 */
import { verifyToken } from "../middleware/verifyToken.js";
import {getOrganisationService} from "../services/organisationService.js";


export async function getOrganisationController(req, res) {
    try {
        verifyToken(req, res)
        const result = await getOrganisationService(req.user.id);
        if(result.ok){
            res.status(200).json({message: result.message, data: result.data });
        }
    } catch (err) {
        res.status(err.status||500).json({ message: err.message });
    }
}