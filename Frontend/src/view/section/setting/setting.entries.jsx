import React from 'react';
import { User, MessageSquare, Trash2, ChevronRight, LogOut } from 'lucide-react';

const SettingEntries = ({setSubSetting, setLogout}) => {
    const options = [
        {
            id: 'info',
            icon: User,
            title: 'Informations personnelles',
            description: 'Gérez vos informations personnelles',
        },
        {
            id: 'feedback',
            icon: MessageSquare,
            title: 'Feedbacks',
            description: "Envoyez des feedbacks à l'admin pour améliorer la plateforme",
        },
        {
            id: 'logout',
            icon: LogOut,
            title: 'Déconnexion',
            description: 'Se déconnecter de votre compte',
            warning: true
        },
        {
            id: 'delete',
            icon: Trash2,
            title: 'Suppression',
            description: 'Suppression de votre compte et de vos données',
            danger: true
        }
    ];

    const handleClick = (optionId) => {
        if (optionId === 'logout') {
            setLogout(true);
        } else if (optionId !== 'delete') {
            setSubSetting(optionId);
        }
    };

    return (
        <div className="divide-y divide-gray-200">
            {options.map((option) => {
                const Icon = option.icon;
                return (
                    <button
                        key={option.id}
                        onClick={() => handleClick(option.id)}
                        className={`group w-full text-left px-4 py-4 flex items-center gap-4 
                        ${option.danger ? 'hover:bg-red-50' : option.warning ? 'hover:bg-orange-50' : 'hover:bg-gray-50'} 
                        transition-colors duration-150 active:bg-gray-100`}>

                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                            ${option.danger ? 'bg-red-100' : option.warning ? 'bg-orange-100' : 'bg-gray-100'}`}>
                            <Icon className={`w-6 h-6 ${option.danger ? 'text-red-600' : option.warning ? 'text-orange-600' : 'text-gray-700'}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold text-[15px] mb-0.5 ${option.danger ? 'text-red-600' : option.warning ? 'text-orange-600' : 'text-gray-900'}`}>
                                {option.title}
                            </h3>
                            <p className="text-[13px] text-gray-500 leading-relaxed">
                                {option.description}
                            </p>
                        </div>

                        <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                    </button>
                );
            })}
        </div>
    );
};

export default SettingEntries;