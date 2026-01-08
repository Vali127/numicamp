import {userStatsService, domainStatsService, postStatsService, domainListService} from "../../services/administration/statsService.js";


export async function userStatsController(req, res) {
    try {
        const result = await  userStatsService(req, res)
        if (result.ok) {
            res.status(200).json({ message: 'User stats fetched', data: result.data, ok : true })
        } else {
            res.status(200).json({ message: 'an error occured', data: result.data, ok : false })
        }
    } catch (err) {
        console.error(" USER STATS ERROR : ",err)
        res.status(500).send({ message: err.message, ok : false });
    }
}

export async function domainStatsController(req, res) {
    try {
        const result = await  domainStatsService(req, res)
        if (result.ok) {
            res.status(200).json({ message: 'domain stats fetched', data: result.data, ok : true })
        } else {
            res.status(200).json({ message: 'an error occured', data: result.data, ok : false })
        }
    } catch (err) {
        console.error(" USER STATS ERROR : ",err)
        res.status(500).send({ message: err.message, ok : false });
    }
}

export async function postStatsController(req, res) {
    try {
        const result = await  postStatsService(req, res)
        if (result.ok) {
            res.status(200).json({ message: 'post stats fetched', data: result.data, ok : true })
        } else {
            res.status(200).json({ message: 'an error occured', data: result.data, ok : false })
        }
    } catch (err) {
        console.error(" USER STATS ERROR : ",err)
        res.status(500).send({ message: err.message, ok : false });
    }
}

export async function domainListController(req, res) {
    try {
        const result = await domainListService(req, res)
        res.status(200).json({ message: result.message , data: result.data || null, ok : result.ok })
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: err.message, ok : false });
    }
}