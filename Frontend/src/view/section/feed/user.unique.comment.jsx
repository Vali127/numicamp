import { EllipsisVertical } from "lucide-react";

export const UserUniqueComment = ({profil,owner, name, firstname, username, id, value, duration, GoToProfile}) => {
    return (
        <div id={id} className="flex flex-col gap-2 mb-1 bg-neutral-300/20 border border-neutral-200/50 p-2 sm:p-3 rounded-md">
            <div className="flex gap-2">
                <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gray-500 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0'>
                    <img src={profil} alt="pfp" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 flex-col min-w-0">
                    <div className="flex gap-1 sm:gap-2 items-center flex-wrap">
                        <div className="font-bold text-sm sm:text-base md:text-lg break-words">{name} {firstname}</div>
                        <div onClick={() => { GoToProfile(owner) }} className="text-violet-500 text-[11px] sm:text-[12px] font-bold cursor-pointer whitespace-nowrap">[ @{username} ]</div>
                    </div>
                    <div className="text-[11px] sm:text-[13px] text-gray-500">{duration}</div>
                </div>
                <div className="h-8 w-8 sm:h-10 sm:w-10 flex justify-center items-center flex-shrink-0">
                    <EllipsisVertical className="w-4 h-4 sm:w-5 sm:h-5"/>
                </div>
            </div>

            <div className="flex gap-2">
                <div className="w-full text-justify text-xs sm:text-[13px] md:text-[14px] ml-2 sm:ml-4 pl-3 sm:pl-6 pt-2 bg-neutral-300/30 rounded-lg pb-2 pr-2 sm:pr-3 break-words">
                    {value}
                </div>
            </div>

        </div>
    )
}