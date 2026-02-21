import {getComment, insertComment} from "../models/commentModel.js";

export async function commentService(data){
    return await insertComment(data);
}

export async function getCommentService(idPub){
    return await getComment(idPub);
}