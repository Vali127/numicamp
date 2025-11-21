import {Construction} from "lucide-react";

export const UnderDev = ({name}) => {
    return (
        <div className={"w-full h-full bg-amber-500 flex flex-col justify-center"}>
            <div className={"flex items-center justify-center"} >
                <Construction size={80} color="orange" className={"bg-slate-800 rounded-full p-3"} />
            </div>
            <div className={"font-bold text-lg"}>MESSAGE</div>
            <div className={"text-sm"}>The page {name} is still under development</div>
        </div>
    )
}