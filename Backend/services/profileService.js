import { verifyToken } from "../middleware/verifyToken.js";
import { getProfileData } from "../models/profileModel.js";


export async function profileInfoService(req, res) {
    verifyToken(req, res)
    const { profil_id } = req.query
    const owner = ( String(profil_id) === String(req.user.id) )
    console.log("and is owner : ", owner)

    try {
        const res = await getProfileData(profil_id)

        console.log("RESPONSE : ", res)

        return {
            ...res,
            ok : true,
            owner : owner
        }
    } catch (error) {
        throw new Error("Erreur depuis service du profile Info " + error.message )
    }

}