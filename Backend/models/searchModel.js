import {pool} from "../config/db.js";

export async function searchModel(data) {
    console.log("debut model")
    const connection = await pool.getConnection();

    try{
        let res = {
            username: (await findUsername(data)).rows,
            user: (await findUser(data)).rows,
            orgName: (await findOrgName(data)).rows,
            org: (await findOrg(data)).rows,
            posts: await findPost(data)
        };

        return {
            ok : true,
            message : "Succes de recherche",
            res
        };

    }catch(err){
        throw new Error("Erreur dans le model :"+err);
    }
}

//recherche par nom_user ex: samantha
 async function findUsername(username){
    const sql = `SELECT * FROM personne WHERE nom_profil LIKE '%${username}%'`;
    try{
        const [rows] = await pool.query(sql) ;
        return {
            message : "Recherche par username Effectue",
            rows
        };
    }catch(err){
        throw new Error("Erreur dans la fonction findUsername :"+err);
    }
}
//recherche par nom_personne prenom_personne ex : Sale Menteur
async function findUser(fullname) {
    const [firstname, secondname] = fullname.split(" ");
    const sql = `
        SELECT * FROM personne
        WHERE (nom_personne LIKE ? OR prenom_personne LIKE ?)
           OR (nom_personne LIKE ? AND prenom_personne LIKE ?)
    `;
    try {
        const [rows] = await pool.query(sql, [
            `%${firstname}%`,
            `%${secondname || ""}%`,
            `%${firstname}%`,
            `%${secondname || ""}%`
        ]);

        return {
            message : "Recherche par fullname Effectue",
            rows
        };

    } catch (err) {
        throw new Error("Erreur dans la fonction findUser : " + err.message);
    }
}

//recherche par nom_organisation
async function findOrgName(orgName) {
    const sql = `SELECT * FROM organisation WHERE nom_organisation LIKE ?`;
    try {
        const [rows] = await pool.query(sql, [`%${orgName}%`]);

        return {
            message : "Recherche par orgName Effectue",
            rows
        };

    } catch (err) {
        throw new Error("Erreur dans la fonction findOrgName : " + err.message);
    }
}


//recherche par nom_profil de organisation
async function findOrg(username) {
    const sql = `SELECT * FROM organisation WHERE nom_profil LIKE ?`;
    try {
        const [rows] = await pool.query(sql, [`%${username}%`]);

        return {
            message : "Recherche par username des organisations Effectue",
            rows
        };

    } catch (err) {
        throw new Error("Erreur dans la fonction findOrg : " + err.message);
    }
}


//recherche par title et description
async function findPost(keyword) {
    const sqlPub = `
        SELECT p.*,
               pers.nom_personne, pers.prenom_personne, pers.nom_profil AS profil_pers, pers.photo_profil AS photo_pers,
               org.nom_organisation, org.nom_profil AS profil_org, org.photo_profil AS photo_org
        FROM publication p
                 LEFT JOIN personne pers ON p.id_profil_pers = pers.id_profil
                 LEFT JOIN organisation org ON p.id_profil_org = org.id_profil
        WHERE p.titre_pub LIKE ? OR p.description_pub LIKE ?
        ORDER BY p.date_pub DESC
    `;

    try {
        //Récupérer les publications + leurs auteurs
        const [publications] = await pool.query(sqlPub, [`%${keyword}%`, `%${keyword}%`]);

        return publications;
    } catch (err) {
        throw new Error("Erreur dans la fonction findPost : " + err.message);
    }
}

