import { EllipsisVertical } from "lucide-react";

export const UserUniqueComment = ({profil,owner, name, firstname, username, id, value, duration, GoToProfile}) => {
    return (
        <div id={id} className={" flex flex-col gap-2 mb-2 bg-neutral-300/20 border border-neutral-200/50 p-2 rounded-md"}>
            <div className={"flex gap-2"}>
                <div className='w-10 h-10 bg-gray-500 rounded-full overflow-hidden flex items-center justify-center' >
                    <img src={profil} alt={"pfp"} className={"h-full w-full"} />
                </div>
                <div className={"flex-1 flex-col"} >
                    <div className={"flex gap-2 items-center"}>
                        <div className={"font-bold text-lg"} >{name} {firstname}</div>
                        <div onClick={() => { GoToProfile(owner) }} className={"text-green-500 text-[12px] font-bold cursor-pointer"} >[ @{username} ]</div>
                    </div>
                    <div className={"text-[13px] text-gray-500"}>{duration}</div>
                </div>
                <div className={"h-10 w-10 flex justify-around items-center"}>
                </div>
                        <EllipsisVertical/>
            </div>

            <div className={"flex gap-2"} >
                <div className={" w-full text-justify text-[14px] ml-4 pl-6 pt-2 bg-neutral-300/30 rounded-lg pb-2 pr-3"}>
                    {value}
                </div>
            </div>

        </div>
    )
}