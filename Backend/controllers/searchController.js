import { verifyToken } from "../middleware/verifyToken.js";
import {searchService} from "../services/searchService.js";

export async function searchController(req, res) {
    try{
        verifyToken(req, res);
        const result = await searchService(req.query.keywords);
        if(result.ok){
            res.status(200).json({message: result.message, res: result.res });
        }
    }catch (err){
        res.status(err.status||500).json({ message: err.message });
    }
}
