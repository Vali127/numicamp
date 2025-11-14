import {searchModel} from "../models/searchModel.js";

export async function searchService(data){
    const result = await searchModel(data);
    return result;
}
