import { RessourcesViewModel } from "../../../viewmodel/section-vm/ressources.vm.js";
import {UnderDev} from "../../tempComponent/UnderDev.jsx";
import LoadingRessources from "./loading.ressources.jsx";
import UniqueRessource from "./unique.ressources.jsx";

export const Resources = () => {

    const { status, news } = RessourcesViewModel()

    return (
        <div className={"h-full mx-3 flex flex-col"}>
            <div className="flex items-center gap-3 text-2xl font-bold mb-4"><label className="icon_btn">&#xE28C;</label><label>Ressources</label></div>
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
            </div>
        </div>
    )
}