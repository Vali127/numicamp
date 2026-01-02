import { UserStatsViewModel } from "../../../viewmodel/section-vm/dasboard.vm.js";

export function UsersStatsBlock() {
    const { userStats, error } = UserStatsViewModel();

    return (
        <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-md md:text-xl font-semibold text-gray-800">Statistiques utilisateurs</h2>
                <span className="text-xs md:text-sm text-gray-500">Vue d'ensemble</span>
            </div>

            {error ? (
                <div className="p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">Une erreur est survenue</p>
                </div>
            ) : (
                <StatsBlock
                    user={userStats.number_of_person || 0}
                    org={userStats.number_of_organization || 0}
                    admin={userStats.number_of_admin || 0}
                    user_p={userStats.percentage_of_person || 0}
                    org_p={userStats.percentage_of_organization || 0}
                    admin_p={userStats.percentage_of_admin || 0}
                />
            )}
        </div>
    );
}

const StatsBlock = ({ user, org, admin, user_p, org_p, admin_p }) => {
    const stats = [
        {
            icon: "&#xE4D6;",
            label: "Personnes",
            value: user,
            percentage: user_p
        },
        {
            icon: "&#xE67C;",
            label: "Organisations",
            value: org,
            percentage: org_p
        },
        {
            icon: "&#xEAFA;",
            label: "Administrateurs",
            value: admin,
            percentage: admin_p
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="relative overflow-hidden bg-white rounded-lg md:rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-3 md:p-4"
                >
                    <div className="flex items-start justify-between mb-2 md:mb-1">
                        <span
                            className="icon_btn text-purple-600 text-xl md:text-2xl"
                            dangerouslySetInnerHTML={{ __html: stat.icon }}
                        />
                        <div className="text-purple-600 bg-purple-400/20 px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-semibold">
                            {stat.percentage}%
                        </div>
                    </div>

                    <div className="space-y-0.5 md:space-y-1">
                        <p className="text-xs md:text-sm font-medium text-gray-600">{stat.label}</p>
                        <div className="text-2xl md:text-4xl font-bold text-indigo-500">
                            {stat.value}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};