import { verifyToken } from "../middleware/verifyToken.js";
import {
    getUserRSSLinkList,
    getUserRessourcePages,
    getResourceList,
    registerResource,
    deleteResource
} from "../models/RSSModel.js";
import Parser from "rss-parser";
import fetch from "node-fetch";
import he from "he";
import {verifyAdmin} from "../models/administration/verifyAdmin.js";

const parser = new Parser()


export async function getResourceListService(req, res) {
    try {
        verifyToken(req, res)
        const isAdmin = await verifyAdmin(req.user.id)
        console.log("is admin : ",isAdmin)
        if (!isAdmin) { return { ok : false, message : "Accès interdit , vous devez être un administrateur" } }

        const rows = await getResourceList();

        return {
            ok : true,
            message : "Liste des resources obténue",
            rows : rows
        }
    } catch (err) {
        throw Error(err);
    }
}

export async function getSiteServices(req, res) {
    try {
        verifyToken(req, res)
        const id_user = req.user.id

        const result = await getUserRessourcePages(id_user)
        return result.map( item => ({...item, favicon : getSiteFavIcon(item.lien)}) )

    } catch (error) {
        console.log(" /api/ressources/pages 's SERVICE ENDPOINT ERROR : \n", error)
        throw new Error(" /api/ressources/pages 's SERVICE ENDPOINT ERROR")
    }
}

export async function ResourceRegistrationService(req, res) {
    try {
        verifyToken(req, res)
        const isAdmin = await verifyAdmin(req.user.id)
        console.log("is admin : ",isAdmin)
        if (!isAdmin) { return { ok : false, message : "Accès non authorisé ! vous devez être un administrateur" } }

        const result = await registerResource(req.body.data)
        return {
            ok : result.ok,
            message : result.message
        }
    } catch (error) {
        console.log("Error : ", error)
        throw Error(error);
    }
}

export async function ResourceDeletionService(req, res) {
    try {
        verifyToken(req, res)
        const isAdmin = await verifyAdmin(req.user.id)
        console.log("is admin : ",isAdmin)
        if (!isAdmin) { return { ok : false, message : "Accès non authorisé ! vous devez être un administrateur" } }

        const result = await deleteResource(req.query.data.link, req.query.data.type)
        return {
            ok : result.ok,
            message : result.message
        }
    } catch (error) {
        console.log("Error : ", error)
        throw Error(error);
    }
}

export async function getRssFeedServices(req, res) {
    try {
        verifyToken(req, res)
        const id_user = req.user.id

        const user_rss_list = await getUserRSSLinkList(id_user)
        // Récupération des flux en parallèle pour le probleme de temps (trop long)
        const feeds = await Promise.all(user_rss_list.map(rss => parseRSS(rss)))

        const allArticles = []

        feeds.forEach((feed, index) => {
            if (!feed || !feed.items) return

            const rss = user_rss_list[index]
            const articles = feed.items.map(item => ({
                title: item.title || "",
                link: item.link || "",
                description: item.contentSnippet || item.description || "",
                pubDate: item.pubDate || "",
                source: feed.title || "",
                image: extractImageFromItem(item),
                favicon: getSiteFavIcon(rss),
                domainName: getDomainName(rss)
            }))

            allArticles.push(...articles)
        });

        // Trier par date décroissante
        allArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))

        console.log("\nFETCHING RESSOURCES FINISHED...\n")

        if ( allArticles.length === 0 ) {
            return {
                ok : false,
                connection : false
            }
        }

        return {
            ok: true,
            data: allArticles.slice(0, 20),
            connection : true
        };

    } catch (error) {
        console.error("ERROR : ", error);
        throw new Error("ERROR ON RSS SERVICE : " + error.message);
    }
}

async function parseRSS(url) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) { return null }

        let text = await res.text()
        text = he.encode(text, { useNamedReferences: true, allowUnsafeSymbols: true })

        return await parser.parseString(text)

    } catch (error) {
        console.warn(` [ FAILED ] : ${url}`, `\n\t`, error.message)
        return null
    } finally {
        clearTimeout(timeout)
    }
}

function getSiteFavIcon(link) {
    if (!link) return null
    try {
        const withoutProtocol = link.split("://")[1]
        const domain = withoutProtocol.split("/")[0]
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    } catch {
        return null
    }
}

function getDomainName(link) {
    if (!link) return null
    try {
        const withoutProtocol = link.split("://")[1]
        const domain = withoutProtocol.split("/")[0]
        return `https://${domain}`
    } catch {
        return null
    }
}




// Fonction pour extraire l'image de différentes sources
function extractImageFromItem(item) {
    // 1. Enclosure (podcast/media RSS)
    if (item.enclosure?.url) return item.enclosure.url;
    
    // 2. Media RSS namespace
    if (item['media:content']?.$ && item['media:content'].$.url) {
        return item['media:content'].$.url;
    }
    if (item['media:thumbnail']?.$ && item['media:thumbnail'].$.url) {
        return item['media:thumbnail'].$.url;
    }
    
    // 3. iTunes namespace
    if (item.itunes?.image) return item.itunes.image;
    
    // 4. Image directe
    if (item.image?.url) return item.image.url;
    if (item.thumbnail) return item.thumbnail;
    
    // 5. Parser le contenu HTML pour trouver la première image
    if (item.content || item['content:encoded']) {
        const content = item.content || item['content:encoded'];
        const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (imgMatch && imgMatch[1]) return imgMatch[1];
    }
    
    // 6. Parser la description HTML
    if (item.description) {
        const imgMatch = item.description.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (imgMatch && imgMatch[1]) return imgMatch[1];
    }
    
    // 7. Open Graph dans le lien (nécessite un fetch)
    // Cette partie nécessiterait de fetcher le lien pour extraire les meta tags
    
    return null;
}