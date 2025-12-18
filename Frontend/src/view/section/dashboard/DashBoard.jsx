import {UsersStatsBlock} from "./UsersStatsBlock.jsx";
import {DomainCharts} from "./DomainCharts.jsx";
import {PostCharts} from "./PostCharts.jsx";

export const DashBoard = () => {
    return (
        <div className={"text-left h-full flex flex-col"}>
            <DashBoardHeader/>
            <div className="mt-6 flex-1 overflow-scroll scrollbar-none">
                <UsersStatsBlock/>
                <PostCharts/>
                <DomainCharts/>
            </div>
        </div>
    )
}



const DashBoardHeader = () => {
    return (
        <div className="flex gap-2 big-title items-center text-lg"><label className={"icon_btn font-bold"}>&#xEAA6;</label><h2>Dashboard</h2></div>
    )
}