import { ArrowLeft } from 'lucide-react';

export const SubSettingHeader = ({setSubSetting, subsetting}) => {

    const header = {
        "personal_info" : {
            title : "Informations personnelles",
            description : "Modifiez vos informations de profil"
        },
        "feedback" : {
            title : "Feedback",
            description : "Notifiez les administrateurs de vos problèmes ou de vos idées d' améliorations",
        }
    }

    return (
        <div className="relative">
            <div className="flex items-center gap-3 sm:gap-4 py-4 sm:py-6 border-b border-gray-200 px-2 sm:px-0">
                <button
                    onClick={() => {setSubSetting("")}}
                    className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
                    aria-label="Retour"
                >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-gray-900" />
                </button>

                <div className="flex flex-col min-w-0 flex-1">
                    <div className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight break-words">
                        { header[subsetting].title }
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5 break-words">
                        { header[subsetting].description }
                    </p>
                </div>
            </div>
        </div>
    )
}