import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import { SchoolFormModal } from "./SchoolFormModal.jsx";
import {useGlobalUiContext} from "../../../context/ui.context.jsx";

export const SchoolForm = ({HandleImage, resetImage, imagePreview, setSchoolData, schoolData, status, sendData, message}) => {
    const [showModal, setShowModal] = useState(false);

    const { refresh, setRefresh } = useGlobalUiContext()

    return (
        <>
            {showModal && (
                <SchoolFormModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    sendData={sendData}
                    status={status}
                    message={message}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}

            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-300/30">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Nouvel Établissement</h2>

                <div className="space-y-6">
                    {/* Nom établissement */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom de l'Établissement *
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            placeholder="École ici..."
                            value={schoolData.name}
                            onChange={ (e) => { setSchoolData({...schoolData, name: e.target.value}) } }/>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                            placeholder="Description de l'établissement..."
                            value={schoolData.description}
                            onChange={ (e) => { setSchoolData({...schoolData, description: e.target.value}) } }
                        />
                    </div>

                    {/* Province et Ville */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Province *
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                placeholder="Analamanga"
                                value={schoolData.province}
                                onChange={ (e) => { setSchoolData({...schoolData, province: e.target.value}) } }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ville *
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                placeholder="Antananarivo"
                                value={schoolData.city}
                                onChange={ (e) => { setSchoolData({...schoolData, city: e.target.value}) } }
                            />
                        </div>
                    </div>

                    {/* Quartier */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quartier
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            placeholder="Ambohipo"
                            value={schoolData.neighbourhood}
                            onChange={ (e) => { setSchoolData({...schoolData, neighbourhood: e.target.value}) } }
                        />
                    </div>

                    {/* Site web */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Site Web
                        </label>
                        <input
                            type="url"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            placeholder="https://www.exemple.com"
                            value={schoolData.site}
                            onChange={ (e) => { setSchoolData({...schoolData, site : e.target.value}) } }
                        />
                    </div>

                    {/* Photo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Photo de l'Établissement
                        </label>

                        {imagePreview ? (
                            <div className="space-y-3">
                                <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-300">
                                    <Zoom zoomMargin={40}>
                                        <img
                                            src={imagePreview}
                                            alt="Aperçu"
                                            className="w-full h-full object-cover"
                                        />
                                    </Zoom>
                                </div>
                                <button
                                    type="button"
                                    onClick={resetImage}
                                    className="flex items-center px-4 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                    Supprimer l'image
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center px-4 py-2 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                    <span className="text-sm text-gray-600">Choisir une photo</span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => { HandleImage(e) }}
                                    />
                                </label>
                                <span className="text-sm text-gray-500">Aucun fichier sélectionné</span>
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            className="px-6 py-2 text-white bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg hover:from-indigo-600 hover:to-violet-600 transition-colors"
                            onClick={() => setShowModal(true)}>
                            Créer l'Établissement
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};