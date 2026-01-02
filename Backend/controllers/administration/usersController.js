import {
    userBlockageService, userDeblockageService,
    userDeletionService,
    userListsService
} from "../../services/administration/usersService.js";


export async function userListsController(req, res) {
    try {
        const result = await userListsService(req, res);

        if (result.ok) {
            res.status(200).json({ ok : result.ok, message : result.message, rows : result.rows });
        } else {
            res.status(200).json({ ok : false ,message : result.message });
        }
    } catch (error) {
        res.status(500).json({ message : error.message, ok: false });
        console.log(error);
    }
}

export async function userDeletionController(req, res) {
    try {
        const result = await userDeletionService(req, res);
        res.status(200).json({ ok : result.ok, message : result.message });
    } catch (error) {
        res.status(500).json({ message : error.message, ok: false });
        console.log(error);
    }
}

export async function userBlockageController(req, res) {
    try {
        const result = await userBlockageService(req, res);
        res.status(200).json({ ok : result.ok, message : result.message, state : result.state });
    } catch (error) {
        res.status(500).json({ message : error.message, ok: false });
        console.log(error);
    }
}

export async function userDeblockageController(req, res) {
    try {
        const result = await userDeblockageService(req, res)
        res.status(200).json({ ok : result.ok, message : result.message, state : result.state });
    } catch (error) {
        res.status(500).json({ message : error.message, ok: false });
        console.log(error);
    }
}