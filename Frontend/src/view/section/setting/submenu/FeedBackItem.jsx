import React from "react";
import {UniqueFeedbackVm} from "../../../../viewmodel/section-vm/unique.feedback.vm.js";
import {useGlobalUiContext} from "../../../../context/ui.context.jsx";

export const FeedbackItem = ({ item, editor }) => {

    const { userData } = UniqueFeedbackVm( item.id_profil_org ?? item.id_profil_pers, editor );
    const { GoToProfile } = useGlobalUiContext()

    return (
        <div className="p-3 sm:p-4 bg-white/50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
                <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-gray-500 rounded-full overflow-hidden flex-shrink-0">
                                { userData.photo_profil && <img src={userData.photo_profil} alt="pfp" className="w-full h-full object-cover" /> }
                            </div>
                            <span className="text-[11px] sm:text-[12px]">de :
                                <b
                                    className="text-violet-500 cursor-pointer break-all"
                                    onClick={ () => { GoToProfile(item.id_profil_org ?? item.id_profil_pers) } } > @{userData.nom_profil}
                                </b>
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-600 text-[12px] sm:text-base font-light break-words">{item.contenu}</p>
                </div>
                {item.dateEnvoie && (
                    <span className="text-[10px] sm:text-xs text-gray-400 sm:ml-4 whitespace-nowrap self-end sm:self-start">
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