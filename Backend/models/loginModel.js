/**
 * param : mail por chercher le password
 * retour : objet contenant password,role et id pour la comparaison et token
 */
import {pool} from "../config/db.js";

export async function getLoginInfo(username){

    const sql = `SELECT id_profil,mail,id_role,mot_de_passe
                        FROM personne
                        WHERE nom_profil=?
                        UNION ALL
                        SELECT id_profil, mail, id_role,mot_de_passe
                        FROM organisation
                        WHERE nom_profil =?;`
    try{
        const [row] = await pool.query(sql, [username, username]);
        return row[0]
    }catch(error){
        throw error
    }
}