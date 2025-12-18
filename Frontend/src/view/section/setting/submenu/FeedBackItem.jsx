import React from "react";
import {UniqueFeedbackVm} from "../../../../viewmodel/section-vm/unique.feedback.vm.js";
import {useGlobalUiContext} from "../../../../context/ui.context.jsx";

export const FeedbackItem = ({ item, editor }) => {

    const { userData } = UniqueFeedbackVm( item.id_profil_org ?? item.id_profil_pers, editor );
    const { GoToProfile } = useGlobalUiContext()

    return (
        <div className="p-4 bg-white/50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 flex items-center justify-center bg-gray-500 rounded-full overflow-hidden">
                                { userData.photo_profil && <img src={userData.photo_profil} alt="pfp" className="w-full h-full" /> }
                            </div>
                            <span className="text-[12px]">de :
                                <b
                                    className="text-violet-500 cursor-pointer"
                                    onClick={ () => { GoToProfile(item.id_profil_org ?? item.id_profil_pers) } } >@{userData.nom_profil}
                                </b>
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-600">{item.contenu}</p>
                </div>
                {item.dateEnvoie && (
                    <span className="text-xs text-gray-400 ml-4 whitespace-nowrap">
                        {new Date(item.dateEnvoie).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </span>
                )}
            </div>
        </div>
    );
};