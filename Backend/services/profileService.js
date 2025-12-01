import { verifyToken } from "../middleware/verifyToken.js";
import { getProfileData } from "../models/profileModel.js";
import { updateProfilModel } from "../models/profilUpdateModel.js"
import path from "path";
import {moveProfilePicture} from "../utils/fileManager.js";


export async function profileInfoService(req, res) {
    verifyToken(req, res)
    const {profil_id} = req.query
    const owner = ( String(profil_id) === String(req.user.id) )

    try {
        const res = await getProfileData(profil_id)
        return {
            ...res,
            ok : true,
            owner : owner
        }
    } catch (error) {
        throw new Error("Erreur depuis service du profile Info " + error.message )
    }

}

export async function profileUpdateService(req, res) {
    try {
        verifyToken(req, res)
        const {id_profil} = req.body
        const owner = ( String(id_profil) === String(req.user.id) )
        
        if (!owner)
            return false

        if (req.body.photo_profilUrl) {
            const photoPath = moveProfilePicture(req.body.photo_profilUrl, req.body.nom_profil)
            const parts = photoPath.split(path.sep)
            const head = parts.indexOf('Users')
            const real_path = parts.slice( head + 1 ).join(path.sep)
            req.body.photo_profil = real_path
        }

        return await updateProfilModel(req.body)
    }
    catch (error) {
        throw new Error("Erreur depuis service du profile service " + error.message )
    }
}