import {verifyToken} from "../middleware/verifyToken.js";
import {commentService, getCommentService} from "../services/commentService.js";

export async function sendCommentController(req, res) {
    try{
        verifyToken(req, res);
        const idUser = req.user.id;
        const { idPub, content }=req.body;
        const result = commentService({idPub,idUser,content});
        if (result.ok){
            res.status(200).send({message:"insertion de commentaire reussie"});
        }

    }catch(err){
        res.status(err.status||500).json({ message: err.message });
    }
}

export async function getCommentController(req, res) {
    try{
        verifyToken(req, res);
        const idPub = req.params.idPub;
        const result = getCommentService(idPub);
        if (result.ok){
            res.status(200).send({ok:true,rows:result.rows,message:result.message});
        }

    }catch(err){
        res.status(err.status||500).json({ message: err.message });
    }
}