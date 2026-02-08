import { pool } from "../config/db.js";

export async function findUserProfile(profileId) {
    const [personRow] = await pool.query( "SELECT id_profil FROM personne WHERE id_profil = ?", [profileId] );
    
    if (personRow.length > 0) { return { id: personRow[0].id_profil, isOrganization: false }; }

    const [organizationRow] = await pool.query( "SELECT id_profil FROM organisation WHERE id_profil = ?", [profileId] );
    
    if (organizationRow.length > 0) { return { id: organizationRow[0].id_profil, isOrganization: true }; }
    
    throw new Error("Profile not found");
}

export async function insertKeywords(keywords, publicationId) {
    for (const keyword of keywords) {
        const [existingKeyword] = await pool.query("SELECT id_mot_cle FROM mot_cle WHERE mot_cle = ?", [keyword]);

        let keywordId;
        if (existingKeyword.length > 0) {
            keywordId = existingKeyword[0].id_mot_cle;
        } else {
            await pool.query( "INSERT INTO mot_cle (mot_cle) VALUES (?)", [keyword] );
            const [[{ id_mot_cle }]] = await pool.query("SELECT @last_mot_cle AS id_mot_cle");
            keywordId = id_mot_cle;
        }

        await pool.query( "INSERT INTO comprendre (id_pub, id_mot_cle) VALUES (?, ?)", [publicationId, keywordId]);
    }
}

export async function insertPublicationDomains(domains, publicationId) {

    if (!Array.isArray(domains) || domains.length === 0) {
        throw new Error("No domains provided");
    }

    const [domainRows] = await pool.query(
        `SELECT id_domaine FROM domaine WHERE design_domaine IN (${domains.map(() => '?').join(',')})`,
        domains
    );

    if (domainRows.length === 0) {
        throw new Error("No domains found");
    }

    for (const domain of domainRows) {
        await pool.query(
            "INSERT INTO concerner (id_pub, id_domaine) VALUES (?, ?)",
            [publicationId, domain.id_domaine]
        );
    }
}

export async function executePublicationInsertion(publicationData) {
    const { title, description, photoPath, profileId, isOrganization } = publicationData;
    
    const sql = `
        INSERT INTO publication (titre_pub, description_pub, photo_pub, id_profil_pers, id_profil_org)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    await pool.query(sql, [
        title,
        description,
        photoPath,
        isOrganization ? null : profileId,
        isOrganization ? profileId : null
    ]);
    
    const [[{ id_pub }]] = await pool.query("SELECT @last_id_pub AS id_pub");
    return id_pub;
}