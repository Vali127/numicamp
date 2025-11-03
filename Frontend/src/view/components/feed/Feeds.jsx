import {Newspaper} from "lucide-react";
import {UserEmptyFeeds} from "./UserEmptyFeeds.jsx";

export const Feeds = () => {
    return (
        <div 
            className={"w-full grid gap-3 text-left px-3"} >
            
            <div 
                className={"font-bold text-lg flex gap-2 "} >
                <Newspaper/>
                <label>Actualités</label>
            </div>

            <div 
                className={ "h-auto"} >
                <UserEmptyFeeds/>
            </div>
            
        </div>
    )
}