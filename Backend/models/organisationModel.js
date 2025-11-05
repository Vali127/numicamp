/**
 * requete pour recuperer les organisation avec les memes interets que la personne (id) mais pas encore suivie
 */
import {pool} from "../config/db.js";

export async function getOrganisation(idProfil) {


    try{
        const sqlOrg = `SELECT DISTINCT o.* FROM organisation o
                        JOIN orienter_org oo ON o.id_profil = oo.id_profil
                        WHERE oo.id_domaine IN (
                        SELECT id_domaine FROM orienter_pers WHERE id_profil = 'PF-96055c43b8ed'
                        )
                        AND o.id_profil NOT IN (
                        SELECT id_profil_org FROM abonner WHERE id_profil_pers = 'PF-96055c43b8ed'
                        );`

        const rows = await pool.query(sqlOrg, [idProfil,idProfil]);
        return {
            ok: true,
            data: rows[0]
        }
    }catch(err){
        throw new Error("Erreur dans Model : "+ err.message)
    }

}