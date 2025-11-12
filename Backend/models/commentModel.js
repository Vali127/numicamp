import {pool} from "../config/db.js";

export async function insertComment({idPub,idUser,content}){
    const sql = `INSERT INTO commenter(id_pub,id_profil,contenue) VALUES (?,?,?)`;

    try{
        pool.query(sql,[idPub,idUser,content]);
        return{
            ok : true
        }
    }catch(err){
        throw new Error("Erreur lors de l’insertion : " + err.message);
    }
}
export async function getComment(idPub){
    const sql = `
     (
        SELECT 
            c.id_pub,
            c.contenue,
            c.date_creation_com,
            p.nom_profil,
            p.photo_profil
        FROM commenter c
        JOIN personne p ON c.id_profil = p.id_profil
        WHERE c.id_pub = ?
    )
    UNION
    (
        SELECT 
            c.id_pub,
            c.contenue,
            c.date_creation_com,
            o.nom_profil,
            o.photo_profil
        FROM commenter c
        JOIN organisation o ON c.id_profil = o.id_profil
        WHERE c.id_pub = ?
    )
    ORDER BY date_creation_com ASC
  `;

        try {
            const [rows] = await pool.query(sql, [idPub, idPub]);
            return {
                ok: true,
                message: "Commentaires récupérés avec succès",
                rows
            };
        } catch (err) {
            throw new Error("Erreur dans le modèle : " + err.message);
        }
    }
