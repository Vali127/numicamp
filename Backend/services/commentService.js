import {insertComment} from "../models/commentModel.js";

export async function commentService(data){
    const result = insertComment(data);
    return result;
}