import {getComment, insertComment} from "../models/commentModel.js";

export async function commentService(data){
    const result = insertComment(data);
    return result;
}

export async function getCommentService(idPub){
    const result = await getComment(idPub);
    return result;
}