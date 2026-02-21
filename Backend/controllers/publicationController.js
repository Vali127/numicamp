/**
 * Publication Controllers
 * Handles HTTP requests for publication operations
 */
import { verifyToken } from "../middleware/verifyToken.js";
import {
    getUserPublicationsService,
    getOrganizationPublicationsService,
    getSubscribedOrganizationsPublicationsService,
    createPublicationService,
    deletePublicationService,
    getOrganizationApplicantsService
} from "../services/publicationService.js";

export async function createPublicationController(req, res) {
    try {
        const { title, description, photoPath, keywords, domains } = req.body;
        verifyToken(req, res);
        const userId = req.user.id;
        const result = await createPublicationService({ title, description, photoPath, keywords, domains, userId });

        res.status(200).json({ ok : result.ok , message: "Publication created successfully" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export async function getUserPublicationsController(req, res) {
    try {
        const result = await getUserPublicationsService(req, res);
        if (result.ok) {
            res.status(200).json({
                message: result.message,
                publications: result.rows,
                owner: result.owner
            });
        }
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export async function getOrganizationPublicationsController(req, res) {
    try {
        const result = await getOrganizationPublicationsService(req, res);
        if (result.ok) {
            res.status(200).json({
                message: result.message,
                publications: result.rows,
                owner: result.owner
            });
        }
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export async function getSubscribedOrganizationsPublicationsController(req, res) {
    try {
        const result = await getSubscribedOrganizationsPublicationsService(req, res);
        if (result.ok) {
            res.status(200).json({
                message: result.message,
                publications: result.rows,
                owner: result.owner
            });
        }
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export async function deletePublicationController(req, res) {
    try {
        const result = await deletePublicationService(req, res);
        res.status(200).json({
            message: result.message,
            success: result.ok
        });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export async function getOrganizationApplicantsController(req, res) {
    try {
        const result = await getOrganizationApplicantsService(req, res);
        res.status(200).json({
            message: result.message,
            success: result.ok,
            owner: false,
            publications: result.rows
        });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export async function getPersonPubcontroller(req, res) {
    try{
        //recuperer les publications de l user
        const result = await getPersonPubService(req, res);
        if(result.ok){
            res.status(200).json({message: result.message, rows: result.rows, owner : result.owner });
        }
    }catch (err){
        res.status(err.status||500).json({ message: err.message });
    }
}

export async function getOrgPubController(req, res) {
    try{
        //recuperer les publications de l user
        const result = await getOrgPubService(req, res);
        if(result.ok){
            res.status(200).json({message: result.message, rows: result.rows, owner : result.owner });
        }
    }catch (err){
        res.status(err.status||500).json({ message: err.message });
    }
}

export async function getPubDescriptionOrgController(req,res) {
    try {
        //recuperer les publications des organisations ou l utilisateur est abonne
        const result = await getPubDescriptionOrgService(req,res);
        if(result.ok){
            res.status(200).json({message: result.message, rows: result.rows, ok: result.ok, owner : result.owner });
        }
    } catch (err) {
        res.status(err.status||500).json({ message: err.message , ok: false });
    }
}

export async  function postDeletionController(req, res) {
    try {
        const result = await  postDeletionService(req,res);
        res.status(200).json({message: result.message, ok : result.ok });
    } catch (err) {
        res.status(err.status||500).json({ message: err.message });
        console.log("ERROR \n", err)
    }
}

export async function postsForOrgController(req, res) {
    try {
        const result = await postForOrgService(req, res)
        res.status(200).json({message: result.message, ok : result.ok, owner : false, rows : result.rows});
    } catch (err) {
        res.status(err.status||500).json({ message: err.message });
    }
}