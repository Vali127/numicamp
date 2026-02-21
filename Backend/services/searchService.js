import {searchModel} from "../models/searchModel.js";

export async function searchService(data){
    return await searchModel(data);
}
