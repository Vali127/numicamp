

export function schoolInsertionResult(result) {

    if (result.affectedRows === 0) {
        return {
            ok : false,
            message : "erreur lors de l' insertion",
        }
    } else {
        return {
            ok : true,
            message : "Insertion réussite",
        }
    }
}