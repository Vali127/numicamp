import {
    deleteEtablishment,
    getEtablishment,
    getSchoolName,
    insertNewEtablishment
} from "../models/etablishmentModel.js";
import {verifyToken} from "../middleware/verifyToken.js";
import {verifyAdmin} from "../models/administration/verifyAdmin.js";
import {createLogger} from "../utils/logger.js";
import {getUsername} from "../models/administration/mailModel.js";

export async function getEtablishmentService() {
    return await getEtablishment();
}

export async  function addEtablishmentService(req,res){
    try{
        verifyToken(req, res)
        const isAdmin = await verifyAdmin(req.user.id)
        if(!isAdmin){ return{ ok: false, message : "accès non authorisé, vous devez être administrateur" } }

        //log
        const LOG = createLogger()
        const adminName = await getUsername(req.user.id)
        const school = req.body.data.name
        LOG.addSchool(adminName, school)

        return await insertNewEtablishment(req.body.data)
    } catch (err) {
        console.log("Erreur : ",err)
        throw Error();
    }
}

export async function DeletionService(req,res){
    try {
        verifyToken(req, res)
        const isAdmin = await verifyAdmin(req.user.id)
        if(!isAdmin){ return{ ok: false, message : "accès non authorisé, vous devez être administrateur" } }

        const school = await getSchoolName(req.query.id)
        const result = await deleteEtablishment(req.query.id)

        //Log
        if(result.ok){
            const LOG = createLogger()
            const  adminName = await getUsername(req.user.id)
            LOG.removeSchool(adminName, school)
        }

        return {
            ok: result.ok,
            message: result.message
        }
    } catch (err) {
        console.log("Erreur : ",err)
        throw Error(err);
    }
}