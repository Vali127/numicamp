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
        //Voir si admin
        const stmt = `SELECT nom_profil FROM personne WHERE id_role = "admin" AND nom_profil = ? `
        const [res_1] = await connection.query(stmt, [username]);
        if ( res_1.length > 0 && res_1[0].nom_profil === username ){
            return "admin"
        }

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




export async function getAccountUsageById(id) {
    let connection
    try {
        const connection = await pool.getConnection()
        await connection.beginTransaction()
        //Voir si admin
        const stmt = `SELECT id_profil FROM personne WHERE id_role = "admin" AND id_profil = ? `
        const [res_1] = await connection.query(stmt, [id]);
        await connection.commit()
        if ( res_1.length > 0 && res_1[0].id_profil === id ){ return "admin" }

        const sql = ` SELECT id_profil FROM personne WHERE id_profil = ? `
        const result = await  connection.query(sql, [id])
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

export async function isUserBlocked(username) {
    try {
        const usage = await getAccountUsage(username);
        const table = ( usage === "organisational" ) ? "organisation" : "personne"
        const stmt = `SELECT etat_profil FROM ?? WHERE nom_profil = ? `
        const [result] = await pool.query( stmt, [table,username]);
        return result[0].etat_profil === "bloque"
    } catch (error) {
        throw Error("Erreur dans le model :"+error.message);
    }
}