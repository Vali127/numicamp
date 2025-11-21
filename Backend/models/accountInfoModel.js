import { pool } from "../config/db.js";


export async function getAccountInfo(user_id, usage ) {
    
    let connection
    try {

        connection = await pool.getConnection()
        await connection.beginTransaction()

        let  sql
        if ( usage === "personal" )
            sql = `SELECT * FROM personne WHERE id_profil = ?`
        else
            sql = `SELECT * FROM organisation WHERE id_profil = ?`

        const [rows] = await connection.query( sql, [user_id] )

        if ( rows.length <= 0 )
            throw new Error("données introuvable")
        
        await connection.commit()
        return { ok: true, data: rows[0] }

    }
    catch (error) {
        if (connection) await connection.rollback()
        throw new Error("Erreur dans getAccountInfo Model : "+ error.message)
    }
    finally {
        if (connection) connection.release()
    }

}


export async function getUserDomains(id_user, usage) {

    let connection

    try {

        const connection = await pool.getConnection()
        await connection.beginTransaction()

        let sql
        if ( usage === "personal" ) {
            sql = `
            SELECT design_domaine 
            FROM domaine, orienter_pers 
            WHERE domaine.id_domaine = orienter_pers.id_domaine 
            AND orienter_pers.id_profil = ? `
        } else {
            sql = `
            SELECT design_domaine 
            FROM domaine, orienter_org 
            WHERE domaine.id_domaine = orienter_org.id_domaine 
            AND orienter_org.id_profil = ? `
        }

        const result = await connection.query(sql, [id_user])
        //await connection.commit()

        return { ok: true, data: result[0] }
    }
    catch (error) {
        if (connection) await connection.rollback()
        throw new Error('Erreur de recuperation de domaine : ' + error.message);
    }
    finally {
        if (connection) connection.release()
    }

}
