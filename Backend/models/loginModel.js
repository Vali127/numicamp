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
        throw new Error("Erreur dans le model : "+error.message);
    }
}

export async function getAccountUsage(username) {
    try {
        //CHECK IF ADMIN
        const stmt = `SELECT nom_profil FROM personne WHERE id_role = "admin" AND nom_profil = ? `
        const [res_1] = await pool.query(stmt, [username]);
        if ( res_1.length > 0 && res_1[0].nom_profil === username ) { return "admin" }

        const sql = ` SELECT id_profil FROM personne WHERE nom_profil = ? `
        const result = await pool.query(sql, [username])
        const res = result[0]

        return (res.length === 0 ) ? "organisational" : "personal"
    }
    catch(error) {
        throw Error(error);
    }
}

export async function getAccountUsageById(id) {
    try {
        // CHECK ADMINS
        const stmt = `SELECT id_profil FROM personne WHERE id_role = "admin" AND id_profil = ? `
        const [res_1] = await pool.query(stmt, [id]);
        if ( res_1.length > 0 && res_1[0].id_profil === id ){ return "admin" }

        const sql = ` SELECT id_profil FROM personne WHERE id_profil = ? `
        const result = await  pool.query(sql, [id])
        const res = result[0]

        return (res.length === 0 ) ? "organisational" : "personal"
    }
    catch(error) {
        throw Error(error);
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