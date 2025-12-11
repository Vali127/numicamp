import { InfoIcon, Plus, Check } from "lucide-react";
import { OrgSuggestionVm } from "../../../../viewmodel/section-vm/org.suggestion.vm.js";
import { UniqueOrgSuggestionVm } from "../../../../viewmodel/section-vm/unique.org.suggestion.vm.js";
import { useGlobalUiContext } from "../../../../context/ui.context.jsx";

const UserEmptySuggestion = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-gray-50">
            <InfoIcon className="w-5 h-5 text-gray-400 mb-2" />
            <p className="text-sm font-medium text-gray-900">Liste vide</p>
            <p className="text-xs text-gray-500">Aucune page disponible</p>
        </div>
    )
}

const UserSuggestionList = ({id, name, username, description, photo, FollowEvent, UnfollowEvent}) => {
    
    const {
        followState,
        HandleFollow,
        HandleUnfollow,
    } = UniqueOrgSuggestionVm(FollowEvent, UnfollowEvent)

    const { GoToProfile } = useGlobalUiContext()

    return (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-white border border-gray-200 shadow-md hover:border-gray-300 transition-colors duration-200">
            {/* Photo */}
            <div 
                onClick={() => GoToProfile(id)} 
                className="flex-shrink-0 cursor-pointer"
            >
                <img 
                    src={photo} 
                    alt={name} 
                    className="w-12 h-12 rounded-full object-cover"
                />
            </div>

            {/* Contenu */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                            {name}
                        </h3>
                        <button 
                            onClick={() => GoToProfile(id)} 
                            className="text-xs text-gray-500 hover:text-gray-700"
                        >
                            @{username}
                        </button>
                    </div>

                    {/* Bouton */}
                    {followState === "unfollowed" && (
                        <button 
                            onClick={async (e) => await HandleFollow(e)} 
                            id={id} 
                            className="flex-shrink-0 px-4 py-1.5 rounded-sm bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center gap-1.5"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Suivre
                        </button>
                    )}
                    
                    {followState === "followed" && (
                        <button 
                            onClick={async (e) => await HandleUnfollow(e)} 
                            id={id} 
                            className="flex-shrink-0 px-4 py-1.5 rounded-lg border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center gap-1.5"
                        >
                            <Check className="w-3.5 h-3.5" />
                            Suivi
                        </button>
                    )}
                    
                    {followState === "error" && (
                        <button  
                            id={id} 
                            className="flex-shrink-0 px-4 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium"
                        >
                            Erreur
                        </button>
                    )}
                </div>

                {/* Description */}
                {description && (
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1.5">
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}

export const OrgSuggestion = () => {
    let { 
        isEmpty,
        suggestedOrganisation,
        Follow,
        Unfollow 
    } = OrgSuggestionVm()
    
    return (
        <div className="space-y-2">
            {isEmpty ? (
                <UserEmptySuggestion />
            ) : (
                suggestedOrganisation.map((data, index) => (
                    <UserSuggestionList
                        key={data.id_profil || index}
                        id={data.id_profil}
                        name={data.nom_organisation}
                        username={data.nom_profil}
                        description={data.description_profil}
                        photo={data.photo_profil}
                        FollowEvent={Follow}
                        UnfollowEvent={Unfollow}
                    />
                ))
            )}
        </div>
    )
}