import {pool} from '../config/db.js';

async function getDomainIds(connection, domaines) {

    if (!Array.isArray(domaines) || domaines.length === 0) {
        throw new Error("Aucun domaine fourni");
    }

    const placeholders = domaines.map(() => '?').join(',');
    const [domainesRows] = await connection.query(
        `SELECT id_domaine FROM domaine WHERE design_domaine IN (${placeholders})`,
        domaines
    );

    if (domainesRows.length === 0) {
        throw new Error("Aucun domaine trouvé");
    }

    return domainesRows;
}

async function getProfileId(connection, tableName, profilName) {
    const [profilRow] = await connection.query(
        `SELECT id_profil FROM ${tableName} WHERE nom_profil = ?`,
        [profilName]
    );

    if (profilRow.length === 0) {
        throw new Error("Profil introuvable");
    }

    return profilRow[0].id_profil;
}

async function insertDomainRelations(connection, tableName, idProfil, domainesRows) {
    const sql = `INSERT INTO ${tableName} (id_profil, id_domaine) VALUES (?, ?)`;

    for (const domain of domainesRows) {
        await connection.query(sql, [idProfil, domain.id_domaine]);
    }
}

export async function insertUserProfile(config) {
    const { sql, params, tableName, relationTable, profilName, domaines } = config;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [result] = await connection.query(sql, params);
        const idProfil = await getProfileId(connection, tableName, profilName);
        const domainesRows = await getDomainIds(connection, domaines);
        await insertDomainRelations(connection, relationTable, idProfil, domainesRows);

        await connection.commit();
        return { ok: true, result };
    } catch (error) {
        await connection.rollback();
        throw new Error(`Erreur modèle: ${error.message}`);
    } finally {
        connection.release();
    }
}