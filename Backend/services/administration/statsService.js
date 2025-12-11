import {verifyToken} from "../../middleware/verifyToken.js";
import {StatsModel} from "../../models/administration/StatsModel.js";
import {domainStatsController} from "../../controllers/administration/statsController.js";

const MODEL = StatsModel()

export async function userStatsService(req, res) {
    try {
        verifyToken(req, res)
        const result = await MODEL.UsersStatsData()
        return {
            data: result,
            ok : true
        }
    } catch (err) {
        throw Error();
    }
}

export async function domainStatsService(req, res) {
    try {
        verifyToken(req, res)
        const result = await MODEL.getDomainStatsData()
        return {
            data: result,
            ok : true
        }
    } catch (err) {
        throw Error();
    }
}