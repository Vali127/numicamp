import {pool} from "../config/db.js";

export async function followOrganisationModel(id_user, id_org) {
    let connection
    try {
        connection = await pool.getConnection()
        await connection.beginTransaction()

        const sql = `INSERT INTO abonner(id_profil_pers, id_profil_org) VALUES( ? , ? );`

        await connection.query(sql, [id_user, id_org])
        await connection.commit()

        return {
            ok : true,
            message : "organisation suivie",
            action : "follow"
        }
    }
    catch(error) {
        if (connection) await connection.rollback()
        throw new Error("Erreur depuis le model : ",error)
    }
    finally {
        connection.release()
    }
}

export async function unFollowOrganisationModel(id_user, id_org) {
    let connection
    try {
        connection = await pool.getConnection()
        await connection.beginTransaction()

        const sql = `DELETE FROM abonner WHERE id_profil_pers = ? AND id_profil_org = ? ;`

        await connection.query(sql, [id_user, id_org])
        await connection.commit()

        return {
            ok : true,
            message : "organisation non suivie",
            action : "unfollow"
        }
    }
    catch(error) {
        if (connection) await connection.rollback()
        throw new Error("Erreur depuis le model : ",error)
    }
    finally {
        connection.release()
    }
}