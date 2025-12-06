import { verifyToken } from "../middleware/verifyToken.js";
import { getUserRSSLinkList, getUserRessourcePages } from "../models/RSSModel.js";
import Parser from "rss-parser";
import fetch from "node-fetch";
import he from "he";

const parser = new Parser()


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
                image: item.enclosure?.url || item.image?.url || item.media?.thumbnail?.url || item['media:thumbnail']?.$ || item['media:content']?.$?.url || item.thumbnail || item.itunes?.image || null,
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
