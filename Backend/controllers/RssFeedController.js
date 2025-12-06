import {getRssFeedServices, getSiteServices} from "../services/rssFeedServices.js"

export async function getRssFeedController(req, res) {
    try {
        const result = await getRssFeedServices(req)
        if ( result.ok ) {
            res.status(200).json({ message : "feeds are fetched", ok : true, data : result.data, connection : result.connection })
        } else {
            res.status(200).json({message : "No connection access", ok : false, connection : result.connection })
        }
    }
    catch (error) {
        res.status(500).json({ message : "an Error occured !" + error.message , ok : false, connection : true })
    }
}


export async function getSiteController(req, res) {
    try {
        const result = await getSiteServices(req)
        res.status(200).json({message : "page ressources fetched", ok : true, data : result })
    }
    catch (error) {
        res.status(500).json({ message : "an Error occured !" + error.message , ok : false })
    }
}