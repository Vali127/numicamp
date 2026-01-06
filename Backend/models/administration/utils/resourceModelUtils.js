

export function insertionResult(data) {
    if (data.affectedRows > 0) {
        return {
            ok : true,
            message: "resource ajouté avec succès",
        }
    }
    return {
        ok : false,
        message : "Échec de l' insertion du resource",
    }
}

export function deletionResult(data) {
    if (data.affectedRows > 0) {
        return {
            ok : true,
            message: "resource supprimée avec succès",
        }
    }
    return {
        ok : false,
        message : "Échec de la suppression du resource",
    }
}