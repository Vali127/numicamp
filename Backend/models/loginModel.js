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
        return row[0];
    }catch(error){
        throw new Error("Erreur dans le model :"+error.message);
    }
}

export async function getAccountUsage(username) {
    let connection
    try {
        const connection = await pool.getConnection()
        await connection.beginTransaction()

        const sql = ` SELECT id_profil FROM personne WHERE nom_profil = ? `

        const result = await  connection.query(sql, [username])
        await connection.commit()

        const res = result[0]

        if (res.length === 0 )
            return "organisational"
        return "personal"
    }
    catch(error) {
        if (connection) await connection.rollback()
        console.log(error)
    }
    finally {
        if (connection)  connection.release()
    }
}