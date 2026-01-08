import { School } from "lucide-react";
import {UnderDev} from "../../tempComponent/UnderDev.jsx";
import SchoolHeader from "./school.header.jsx";
import {SchoolCard} from "./school.card.jsx";

export const Schools = () => {
    return (
        <div className={"h-full text-left"}>
            <SchoolHeader/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <SchoolCard/>
                <SchoolCard/>
                <SchoolCard/>
                <SchoolCard/>
            </div>
        </div>
    )
}