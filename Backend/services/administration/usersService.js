import {verifyToken} from "../../middleware/verifyToken.js";
import {verifyAdmin} from "../../models/administration/verifyAdmin.js";
import {userModel} from "../../models/administration/userModel.js";


export async function userListsService(req, res) {
    try {

        const MODEL = userModel()

        verifyToken(req, res);
        const admin = await verifyAdmin(req.user.id)
        console.log("is admin ? : ",admin)

        if (!admin) { return { ok : false,  message : "Accès non authorisé !!", } }

        const  response = await MODEL.getAllUser()

        return {
            ok : true,
            message : response.message,
            rows : response.data
        }

    } catch (error) {
        throw Error(error);
    }
}

export async function userBlockageService(req, res) {
    try {
        const MODEL = userModel()
        verifyToken(req, res);
        const admin = await verifyAdmin(req.user.id)
        console.log("is admin ? : ",admin)
        if (!admin) { return { ok : false, message : "Accès non authorisé !!" } }
        const response = await MODEL.blockUser(req.body.id_user)
        return {
            ok : response.ok,
            message : response.message,
            state : response.state
        }
    } catch (error) {
        throw Error(error);
    }
}

export async function userDeblockageService(req, res) {
    try {
        const MODEL = userModel()
        verifyToken(req, res);
        const admin = await verifyAdmin(req.user.id)
        console.log("is admin ? : ",admin)
        if (!admin) { return { ok : false, message : "Accès non authorisé !!" } }
        const response = await MODEL.unblockUser(req.body.id_user)
        return {
            ok : response.ok,
            message : response.message,
            state : response.state
        }
    } catch (error) {
        throw Error(error);
    }
}

export async function userDeletionService(req, res) {
    try {
        const MODEL = userModel()
        verifyToken(req, res);
        const admin = await verifyAdmin(req.user.id)
        console.log("is admin ? : ",admin)
        if (!admin) { return { ok : false, message : "Accès non authorisé !!" } }
        const response = await MODEL.removeUser(req.query.id_user)
        return {
            ok : response.ok,
            message : response.message,
        }
    } catch (error) {
        throw Error(error);
    }
}