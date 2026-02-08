import {pool} from "../config/db.js";

export async function followOrganisationModel(id_user, id_org) {
    try {
        const sql = `INSERT INTO abonner(id_profil_pers, id_profil_org) VALUES( ? , ? );`
        const [result] = await pool.query(sql, [id_user, id_org])

        return {
            ok : result.affectedRows > 0,
            message : result.affectedRows > 0 ? "organisation suivie" : "une erreur s' est produite",
            action : "follow"
        }
    }
    catch(error) {
        throw new Error("Erreur depuis le model : " + error)
    }
}

export async function unFollowOrganisationModel(id_user, id_org) {
    try {

        const sql = `DELETE FROM abonner WHERE id_profil_pers = ? AND id_profil_org = ? ;`
        const [result] = await pool.query(sql, [id_user, id_org])

        return {
            ok : result.affectedRows > 0,
            message : result.affectedRows > 0 ? "organisation non suivie" : "une erreur s' est produite",
            action : "unfollow"
        }
    }
    catch(error) {
        throw new Error("Erreur depuis le model : " + error)
    }
}