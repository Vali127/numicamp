import { pool } from "../config/db.js";


export async function getAccountInfo(user_id) {

    let connection;
    try {

        connection = await pool.getConnection()
        await connection.beginTransaction()

        const sql = `SELECT * FROM personne WHERE id_profil = ?`
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
