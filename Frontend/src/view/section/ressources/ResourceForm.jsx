import React, {useEffect} from 'react';
import {FormModal} from "./FormModal.jsx";

export const ResourceForm = ({data, setData, action = null, result, domains, getDomains}) => {

    const [formModalVisibility, setFormModalVisibility] = React.useState(false);

    useEffect(() => { getDomains() }, []);

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-300/30">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nouvelle Ressource</h2>

            <div className="space-y-6">
                {/* Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type *
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="type"
                                value="news"
                                checked={data.type === 'news'}
                                onChange={(e) => setData({...data, type: e.target.value})}
                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">News</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="type"
                                value="site"
                                checked={data.type === 'site'}
                                onChange={(e) => setData({...data, type: e.target.value})}
                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Site</span>
                        </label>
                    </div>
                </div>

                {/* Lien */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lien *
                    </label>
                    <input
                        type="url"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        placeholder="https://exemple.com"
                        value={data.link}
                        onChange={(e) => setData({...data, link: e.target.value})}
                    />
                </div>

                {/* Nom (design_res) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        placeholder="Nom de la ressource"
                        value={data.name}
                        onChange={(e) => setData({...data, name: e.target.value})}
                    />
                </div>

                {/* Domaine */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Domaine *
                    </label>
                    <select
                        className="w-fit px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        value={data.domain || ''}
                        onChange={(e) => setData({...data, domain: e.target.value})}
                    >
                        <option value="">Sélectionner un domaine</option>
                        {domains && domains.map((domain) => (
                            <option key={domain.id_domaine} value={domain.id_domaine}>
                                {domain.design_domaine}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                        placeholder="Description de la ressource..."
                        value={data.description}
                        onChange={(e) => setData({...data, description: e.target.value})}
                    />
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
                        onClick={ () => {setFormModalVisibility(true)} }
                    >
                        Créer la Ressource
                    </button>
                </div>
            </div>
            { (formModalVisibility) && <FormModal result={result} action={action} modalVisibility={setFormModalVisibility} /> }
        </div>
    );
};