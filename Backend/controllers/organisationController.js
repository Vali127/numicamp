/**
 * param : req contenu
 */
import {getOrganisationService} from "../services/organisationService.js";


export async function getOrganisationController(req, res) {
    try {
        const result = await getOrganisationService(req.user.id);
        if(result.ok){
            res.status(200).json({message: result.message, rows: result.rows });
        }
    } catch (err) {
        res.status(err.status||500).json({ message: err.message });
    }
}