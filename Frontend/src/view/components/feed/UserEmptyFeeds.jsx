import {LucideAccessibility, LucideActivity, LucideAntenna, RefreshCcw} from "lucide-react";

export const UserEmptyFeeds = () => {
    return (
        <div className={ "empty_feeds text-wrap"} >
            <div>
                <LucideActivity/>
                <p> <b className={"text-2xl"} > Aucune publication </b> </p>
                <p className={"mt-5"} >
                    Aucune publication n' est disponible pour vous pour l' instant.
                    <br/>Veuillez recharger la page.
                </p>
            </div>
            <div className={"flex w-full justify-center mt-10"} >
                <button className={"bg-green-500 flex gap-2 text-white px-10 py-2 rounded-lg"} >
                    <RefreshCcw className={"scale-70"} />
                    Recharger</button>
            </div>
        </div>
    )
}