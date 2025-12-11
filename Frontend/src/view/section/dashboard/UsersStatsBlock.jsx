import {UserStatsViewModel} from "../../../viewmodel/section-vm/dasboard.vm.js";


export const UsersStatsBlock = () => {

    const  {userStats, error} = UserStatsViewModel()

    return (
        <div className={"rounded"}>
            <div className="">Users</div>
                {
                    error ?
                        <div>...An error occured</div> :
                        <StatsBlock
                            user={userStats.number_of_person || 0 }
                            org={userStats.number_of_organization || 0 }
                            admin={userStats.number_of_admin || 0 }
                            user_p={userStats.percentage_of_person || 0 }
                            org_p={userStats.percentage_of_organization || 0 }
                            admin_p={userStats.percentage_of_admin || 0 }
                        />
                }
        </div>
    )
}


const StatsBlock = ({user, org, admin, user_p, org_p, admin_p}) => {
    return (
        <div className="flex gap-5">
            <div className="p-3 bg-white rounded-lg shadow-md border border-gray-300/50 min-w-45 flex flex-col justify-between min-h-22">
                <div className="flex gap-2 font-bold"><label className="icon_btn text-purple-600">&#xE4D6;</label><label>Personnes</label></div>
                <div className="flex justify-between">
                    <div className="big-title font-bold text-2xl text-indigo-500">{user}</div>
                    <div className="text-orange-500 bg-orange-400/20 w-fit py-1 px-2 rounded-full">{user_p}%</div>
                </div>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-md border border-gray-300/50 min-w-45 flex flex-col justify-between min-h-22">
                <div className="flex gap-2 font-bold"><label className="icon_btn text-purple-600">&#xE67C;</label><label>Organisations</label></div>
                <div className="flex justify-between">
                    <div className="big-title font-bold text-2xl text-indigo-500">{org}</div>
                    <div className="text-orange-500 bg-orange-400/20 w-fit py-1 px-2 rounded-full">{org_p}%</div>
                </div>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-md border border-gray-300/50 min-w-45 flex flex-col justify-between min-h-22">
                <div className="flex gap-2 font-bold"><label className="icon_btn text-purple-600">&#xEAFA;</label><label>Administrateurs</label></div>
                <div className="flex justify-between">
                    <div className="big-title font-bold text-2xl text-indigo-500">{admin}</div>
                    <div className="text-orange-500 bg-orange-400/20 w-fit py-1 px-2 rounded-full">{admin_p}%</div>
                </div>
            </div>
        </div>
    )
}