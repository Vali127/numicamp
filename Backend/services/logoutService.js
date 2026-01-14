import {verifyToken} from "../middleware/verifyToken.js";
import { verifyAdmin } from "../models/administration/verifyAdmin.js";
import {createLogger} from "../utils/logger.js";
import {getUsername} from "../models/administration/mailModel.js";


export async function logoutService(req, res) {
    try {
        verifyToken(req, res);
        const isAdmin = await verifyAdmin(req.user.id);

        if (isAdmin) {
            const LOG = createLogger()
            const adminName = await getUsername(req.user.id)
            LOG.logOut(adminName)
        }
        return {
            ok : true,
            message : "Logout successfully",
        }
    } catch (error) {
        console.log(error)
    }
}