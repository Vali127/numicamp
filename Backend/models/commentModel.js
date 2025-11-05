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