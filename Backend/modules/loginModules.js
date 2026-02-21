import jwt from "jsonwebtoken";

export function generateToken(userInfo) {
    return jwt.sign(
        {
            id: userInfo.id_profil,
            role: userInfo.id_role,
            email: userInfo.mail
        },
        process.env.JWT_SECRET
    );
}