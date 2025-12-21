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
            <div className="flex items-center gap-4 py-6 border-b border-gray-200">
                <button
                    onClick={() => {setSubSetting("")}}
                    className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"
                    aria-label="Retour"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
                </button>

                <div className="flex flex-col">
                    <h1 className=" !text-[18px] font-semibold text-gray-900 tracking-tight">
                        { header[subsetting].title }
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        { header[subsetting].description }
                    </p>
                </div>
            </div>
        </div>
    )
}