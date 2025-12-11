import { RessourcesViewModel } from "../../../viewmodel/section-vm/ressources.vm.js";
import {UnderDev} from "../../tempComponent/UnderDev.jsx";
import Error from "./Error.jsx";
import{ LoadingRessources,LoadingSitesRessources } from "./loading.ressources.jsx";
import NoInternet from "./no.internet.jsx";
import RessourceNavBar from "./ressource.navbar.jsx";
import Sites from "./sites.jsx";
import UniqueRessource from "./unique.ressources.jsx";

export const Resources = () => {

    const { section , setSection, newsStatus, siteStatus, news, sites } = RessourcesViewModel()

    return (
        <div className="flex h-full flex-col">

            <div className=" mx-3 flex items-center gap-3 text-lg font-bold"><label className="icon_btn">&#xE28C;</label><label>Ressources</label></div>
            
            <RessourceNavBar section={section} setSection={setSection} />
            
            <div className="flex-1 overflow-scroll scrollbar-none">
                { ( section === "news" ) && <RSSNews status={newsStatus} news={news} /> }
                { ( section === "sites" ) && <SitesSection status={siteStatus} data={sites} /> }
            </div>
        </div>
    )
}

const RSSNews = ({news, status}) => {


    return (
        <div className={"h-full mx-3 flex flex-col"}>
            
            <div className="flex-1 overflow-scroll scrollbar-none">
                {
                    (status === "loading") &&
                    <div>
                        <LoadingRessources/>
                        <LoadingRessources/>
                        <LoadingRessources/>
                    </div> 
                }
                {
                    (status === "loaded") &&
                    (
                        news.map(
                            data => (
                                <div key={data.link}>
                                    < UniqueRessource
                                        illustration={data.image}
                                        title={data.title || ""}
                                        description={data.description || ""}
                                        date={data.pubDate || ""}
                                        favicon={data.favicon || ""}
                                        link={data.link || ""}
                                        domainName={data.domainName || ""}
                                        source={data.source || ""} 
                                    />
                                </div>
                            )
                        )
                    )
                }
                {
                    (status === "noInternet") && <NoInternet/>
                }
            </div>
        </div>
    )

}


const SitesSection = ({status, data}) => {
    return (
        <div>
            { (status === "loading") && (
                <div>
                    <LoadingSitesRessources/>
                    <LoadingSitesRessources/>
                    <LoadingSitesRessources/>
                    <LoadingSitesRessources/>
                </div>
            ) }
            { (status === "loaded") && (
                data.map(
                    item => (
                        <div key={item.lien}>
                            <Sites
                                favicon={item.favicon}
                                name={item.design_res}
                                link={item.lien}
                                domain={item.design_domaine}
                                description={item.description_res}/>
                        </div>
                    )
                )
            )}
            { (status === "error") && <Error/> }
        </div>
    )
}