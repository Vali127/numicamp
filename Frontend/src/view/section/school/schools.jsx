import SchoolHeader from "./school.header.jsx";
import { SchoolList } from "./SchoolList.jsx";

export const Schools = () => {
    return (
        <div className={"h-full text-left"}>
            <SchoolHeader/>
            <div className="">
                <SchoolList isAdmin={false} />
            </div>
        </div>
    )
}