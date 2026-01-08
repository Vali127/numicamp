import React, { useState } from 'react';
import {DeletionModal} from "./DeletionModal.jsx";


export const ResourceList = ({ list, deletionModal, setDeletionModal, Refresh }) => {
    const [selectedResource, setSelectedResource] = useState(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {list.map((resource, index) => (
                    <ResourceCard
                        key={index}
                        resource={resource}
                        setDeletionModal={setDeletionModal}
                        setSelectedResource={setSelectedResource}
                    />
                ))}
            </div>

            {deletionModal && selectedResource && (
                <DeletionModal
                    id={selectedResource.lien}
                    type={selectedResource.type}
                    modalVisibility={setDeletionModal}
                    Refresh={Refresh}
                />
            )}
        </>
    );
};

const ResourceCard = ({ resource, setDeletionModal, setSelectedResource }) => {
    const handleDelete = () => {
        setSelectedResource(resource);
        setDeletionModal(true);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300/30 hover:shadow-xl transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {resource.design_res}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            resource.type === 'news'
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'bg-violet-100 text-violet-700'
                        }`}>
                            {resource.type === 'news' ? 'News' : 'Site'}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            {resource.design_domaine}
                        </span>
                    </div>
                </div>

                {/* Trash Icon Button */}
                <button
                    onClick={handleDelete}
                    className="ml-3 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Supprimer"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {resource.description_res || 'Aucune description disponible'}
            </p>

            {/* Link */}
            <a
                href={resource.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
            <span>Visiter le lien</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
        </a>
</div>
);
};