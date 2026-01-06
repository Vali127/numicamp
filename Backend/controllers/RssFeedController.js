import {getRssFeedServices, getSiteServices, getResourceListService, ResourceRegistrationService,ResourceDeletionService } from "../services/rssFeedServices.js"

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


export async function getResourceListController(req, res) {
    try {
        const result = await getResourceListService(req, res)
        res.status(200).json({ok : result.ok, message : result.message, rows : result.rows || null })
    } catch(error) {
        console.log("Error while getting resources lists : " + error)
        res.status(500).json({ ok : false, message : error.message || "something went wrong" })
    }
}

export async function ResourceRegistrationController(req, res) {
    try {
        const result = await ResourceRegistrationService(req, res)
        res.status(200).json({ ok : result.ok, message : result.message })
    } catch(error) {
        console.log("Error while saving resource : " + error)
        res.status(500).json({ ok : false, message : error.message || "something went wrong" })
    }
}

export async function ResourceDeletionController(req, res) {
    try {
        const result = await  ResourceDeletionService(req, res)
        res.status(200).json({ ok : result.ok, message : result.message })
    } catch(error) {
        console.log("Error while saving resource : " + error)
        res.status(500).json({ ok : false, message : error.message || "something went wrong" })
    }
}