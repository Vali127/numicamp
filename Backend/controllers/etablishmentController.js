import {getEtablishmentService, addEtablishmentService} from "../services/etablishmentService.js";

/**
 *
 * @param req
 * @param res
 * @returns etablishments array
 */
export async function getEtablishmentController(req,res){

    try {
        const result = await getEtablishmentService();
        if (result.ok) {
            res.status(200).json({message: result.message, ok : result.ok, etablishment : result.rows });
        }
    } catch (error) {
        res.status(error.status||500).json({ message: error.message });
    }
}

export async function addEtablishmentController(req,res){
    try {
        const result = await addEtablishmentService(req,res);
        res.status(200).json({ok:result.ok, message : result.message});
    } catch (error) {
        res.status(error.status||500).json({ message: error.message });
    }
}