/**
 * Publication Services
 * Business logic for publication operations
 */
import { verifyToken } from "../middleware/verifyToken.js";
import {
    deletePublication,
    getOrganizationPublications,
    getUserPublications,
    getOrganizationApplicants,
    getSubscribedOrganizationsPublications,
    createPublication
} from "../models/publicationModel.js";

export async function createPublicationService(publicationData) {
    return await createPublication(publicationData);
}

export async function getUserPublicationsService(req, res) {
    verifyToken(req, res);
    const owner = (req.user.id === req.query.user_id);
    const result = await getUserPublications(req.query.user_id);

    return {
        ...result,
        owner
    };
}

export async function getOrganizationPublicationsService(req, res) {
    verifyToken(req, res);
    const owner = (req.user.id === req.query.user_id);
    const result = await getOrganizationPublications(req.query.user_id);
    
    return {
        ...result,
        owner
    };
}

export async function getSubscribedOrganizationsPublicationsService(req, res) {
    verifyToken(req, res);
    const owner = (req.user.id === req.query.user_id);
    const userProfileId = req.user.id;
    const result = await getSubscribedOrganizationsPublications(userProfileId);

    return {
        ...result,
        owner
    };
}

export async function deletePublicationService(req, res) {
    try {
        verifyToken(req, res);
        const publicationId = req.query.id_post;
        const deletionSuccess = await deletePublication(publicationId);
        const message = deletionSuccess 
            ? "Publication deleted successfully" 
            : "Failed to delete publication, please try again later";

        return {
            ok: deletionSuccess,
            message
        };
    } catch (error) {
        console.error("Error in deletePublicationService:", error);
        throw error;
    }
}

export async function getOrganizationApplicantsService(req, res) {
    try {
        verifyToken(req, res);
        return await getOrganizationApplicants(req.user.id);
    } catch (error) {
        console.error("Error in getOrganizationApplicantsService:", error);
        throw error;
    }
}