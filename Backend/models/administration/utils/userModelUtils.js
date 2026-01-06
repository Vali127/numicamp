
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

    if ( result.affectedRows <= 0 ) {
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

export function blockageResult(result) {

    const [ data, metadata ] = result

    if ( result.affectedRows <= 0 ) {
        return {
            ok : false,
            message : "Utilisateur non bloqué,un problème s'est produit ! ",
            state : "unblocked"
        }
    } else {
        return {
            ok : true,
            message : "Utilisateur bloqué !",
            state : "blocked"
        }
    }
}

export function deblockageResult(result) {

    const [ data, metadata ] = result

    if ( result.affectedRows <= 0 ) {
        return {
            ok : false,
            message : "Utilisateur non débloqué,un problème s'est produit ! ",
            state : "blocked"
        }
    } else {
        return {
            ok : true,
            message : "Utilisateur débloqué !",
            state : "unblocked"
        }
    }
}