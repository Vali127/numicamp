import {getEtablishment, insertNewEtablishment} from "../models/etablishmentModel.js";
import {verifyToken} from "../middleware/verifyToken.js";
import {verifyAdmin} from "../models/administration/verifyAdmin.js";

export async function getEtablishmentService() {
    return await getEtablishment();
}

export async  function addEtablishmentService(req,res){
    try{
        verifyToken(req, res)
        const isAdmin = await verifyAdmin(req.user.id)
        if(!isAdmin){ return{ ok: false, message : "accès non authorisé, vous devez être administrateur" } }

        return await insertNewEtablishment(req.body.data)
    } catch (err) {
        console.log("Erreur : ",err)
        throw Error();
    }
}