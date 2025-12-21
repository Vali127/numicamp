import React from 'react';
import {FeedbackItem} from "./FeedBackItem.jsx";

// Composant pour l'état vide
const EmptyState = () => {
    return (
        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
                <p className="text-gray-500 text-lg">Liste vide</p>
                <p className="text-gray-400 text-sm mt-2">
                    Vous n'avez pas encore envoyé de Feedback
                </p>
            </div>
        </div>
    );
};

// Composant pour l'en-tête
const FeedbackHeader = () => {
    return (
        <div className="mb-6">
            <h2 className="text-md font-bold text-gray-800 mb-2 flex items-center gap-2"> <span className="icon_btn" >&#xE1A0;</span> Historiques des Feedbacks</h2>
            <p className="text-sm text-gray-500">
                Listes des feedbacks
            </p>
        </div>
    );
};

// Composant principal
export const FeedBackLists = ({ lists = [] }) => {
    const isEmpty = !lists || lists.length === 0;

    return (
        <div className="bg-neutral-100 shadow-md p-3 rounded-lg border border-gray-200">
            <FeedbackHeader />

            {isEmpty ? (
                <EmptyState />
            ) : (
                <div className="space-y-4">
                    {lists.map((item, index) => (
                        <FeedbackItem key={index} item={item} editor={ ( item.id_profil_org !== null ) ? "organisation" : "person" } />
                    ))}
                </div>
            )}
        </div>
    );
};