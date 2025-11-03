import jwt from 'jsonwebtoken';

// Version pour utilisation en controller
export const verifyToken = (req, res) => {
    console.log('verifying token...')
    const authHeader = req.headers["authorization"];
    const token =  authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"Aucun token recu"});
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        console.error("Erreur de la verification du token :", error.message);
        return res.status(403).json({message:"Token invalide"});
    }
}
