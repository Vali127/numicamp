
export function selectionResult(result) {
    if( result[0] < 0 ) {
        return {
            message : "Aucun données trouvé",
            data : result[0]
        }
    } else {
        return {
            message : "Données retrouvé",
            data : result[0]
        }
    }
}


export function deletionResult(result) {
    
    const [ data, metadata ] = result

    if ( result.affectedRows < 0 ) {
        return {
            ok : false,
            message : "Utilisateur non trouvé dans la base de données ! "
        }
    } else {
        return {
            ok : true,
            message : "Utilisateur supprimmé !"
        }
    }
}