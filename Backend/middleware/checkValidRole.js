export const checkValidRole = (...allowedRoles)=> (req, res, next) => {

    if(allowedRoles.includes(req.user.role)){
        next();
    }
    else{
        return res.status(403).json({message:"Acces refuse "});
    }
}
