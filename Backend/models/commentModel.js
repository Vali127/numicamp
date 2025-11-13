import {pool} from "../config/db.js";



export async function insertComment({idPub,idUser,content}){
    
    const sql = `INSERT INTO commenter(id_pub,id_profil,contenue) VALUES (?,?,?)`
    
    let connection
    try{
        
        connection = await pool.getConnection()
        await connection.beginTransaction()

        await connection.query(sql,[idPub,idUser,content])  
        await connection.commit()
        
        return{
            ok : true
        }

    }catch(err){
        if (connection) await connection.rollback()
        throw new Error("Erreur lors de l'insertion : " + err.message);
    }
    finally {
        if (connection) connection.release()
    }
}


export async function getComment(idPub){
    const sql = `
     (
        SELECT 
            c.id_pub,
            c.contenue,
            c.date_creation_com,
            p.id_profil,
            p.nom_profil,
            p.nom_personne,
            p.prenom_personne,
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
            o.id_profil,
            o.nom_profil,
            o.nom_organisation,
            NULL AS prenom_personne,
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
