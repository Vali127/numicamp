/**
 * param : titre,description,nom_profil (auteur) de la publication, photopath
 * retour : succes ou echec
 */
export async function insertPublication({ title, description, profil_name ,photoPath = null}) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [rowPers] = await connection.query(
            "SELECT id_profil FROM personne WHERE nom_profil = ?",
            [profil_name]
        );
        const [rowOrg] = await connection.query(
            "SELECT id_profil FROM organisation WHERE nom_profil = ?",
            [profil_name]
        );

        let idProfil = null;
        let isOrg = false;

        //si trouve dans table personne
        if (rowPers.length > 0) {
            idProfil = rowPers[0].id_profil;
        }
        //si trouve dans table organisation
        else if (rowOrg.length > 0) {
            idProfil = rowOrg[0].id_profil;
            isOrg = true;
        }
        else {
            throw new Error("Profil introuvable !");
        }

        //Insertion dans la table publication
        const sql = `
      INSERT INTO publication (titre_pub, description_pub, photo_pub, id_profil_pers, id_profil_org)
      VALUES (?, ?, ?, ?, ?);
    `;
        await connection.query(sql, [
            title,
            description,
            photoPath,
            isOrg ? null : idProfil,
            isOrg ? idProfil : null
        ]);

        await connection.commit();

        return{
            ok: true
        }
        // console.log(" Publication ajoutée avec succès !");

    } catch (err) {

        await connection.rollback();
        throw new Error("Erreur lors de l’insertion : " + err.message);

    } finally {
        connection.release();
    }
}
