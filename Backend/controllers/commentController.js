import {verifyToken} from "../middleware/verifyToken.js";
import {commentService, getCommentService} from "../services/commentService.js";

export async function sendCommentController(req, res) {
    try{
        verifyToken(req, res);
        const idUser = req.user.id;
        const { idPub, content }=req.body;
        const result = await commentService({idPub,idUser,content});
        res.status(200).send({message: result.ok ? "insertion de commentaire reussie" : "echec d' insertion du commentaire", ok : result.ok});
    }catch(err){
        res.status(err.status||500).json({ message: err.message, ok : false });
    }
}


export async function getCommentController(req, res) {
    try{
        verifyToken(req, res);
        const idPub = req.query.idPub;
        const result = await getCommentService(idPub);
        res.status(200).send({ok:true,rows:result.rows,message:result.message});
    }catch(err){
        res.status(err.status||500).json({ message: err.message });
    }
}