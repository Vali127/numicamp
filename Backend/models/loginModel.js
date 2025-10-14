/**
 * param : mail por chercher le password
 * retour : objet contenant password,role et id pour la comparaison et token
 */
import {pool} from "../config/db.js";

export async function getLoginInfo(username){

    const sql = `SELECT id_profil,mail,id_role
                        FROM personne
                        WHERE nom_profil=?
                        UNION ALL
                        SELECT id_profil, mail, id_role
                        FROM organisation
                        WHERE nom_profil =?;`
    try{
        const [row] = await pool.query(sql, [username]);
        return{
            ok:true,
            row
        }
    }catch(error){
        return{
            ok : false,
            message : error
        }
    }
}