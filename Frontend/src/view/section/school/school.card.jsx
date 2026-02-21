import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export const SchoolCard = ({ school, isAdmin = false, setElement = null, setShowDeletionModal }) => {
    const {
        code_etab = 'N/A',
        site_etablissement = 'inconnu',
        nom_etab = 'École sans nom',
        description_etab = 'Aucune description disponible',
        province = 'inconnu',
        ville = 'inconnu',
        quartier = 'inconnu',
        photo_etab = null
    } = school || {};

    const handleDelete = () => {
        setElement({ id: code_etab, name: nom_etab });
        setShowDeletionModal(true);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image */}
            <div className="h-48 bg-gradient-to-br from-indigo-500 to-violet-500 relative">
                {photo_etab ? (
                    <img
                        loading="lazy" 
                        src={photo_etab}
                        alt={nom_etab}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-20 h-20 text-white opacity-50" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                        </svg>
                    </div>
                )}

                {/* Admin Actions */}
                {isAdmin && (
                    <div className="absolute top-3 right-3 flex gap-2">
                        <button
                            className="backdrop-blur-md bg-white/30 hover:bg-white/50 p-2 rounded-lg shadow-md transition-all hover:scale-110"
                            onClick={() => console.log('Edit', school)}
                        >
                            <Pencil size={18} className="text-indigo-600" />
                        </button>
                        <button
                            className="backdrop-blur-md bg-white/30 hover:bg-white/50 p-2 rounded-lg shadow-md transition-all hover:scale-110"
                            onClick={handleDelete}
                        >
                            <Trash2 size={18} className="text-red-600" />
                        </button>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{nom_etab}</h3>
                    <a href={site_etablissement} className="text-sm text-indigo-600 font-medium">{site_etablissement}</a>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {description_etab}
                </p>

                {/* Location */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-violet-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-medium">{ville}</span>
                        {province && <span className="ml-1">- {province}</span>}
                    </div>
                    {quartier && (
                        <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
                            </svg>
                            <span>Quartier: {quartier}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};