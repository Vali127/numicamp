import {SearchIcon} from "lucide-react";
import {UsersViewModel} from "../../../viewmodel/section-vm/users.vm.js";
import { User, Building2, CheckCircle, XCircle, Clock, Ban, Trash2 } from 'lucide-react';
import {DeleteModal} from "./DeleteModal.jsx";
import {BlockModal} from "./BlockModal.jsx";
import {useEffect, useState} from "react";
import {useGlobalUiContext} from "../../../context/ui.context.jsx";

export const Users = () => {
    const { refresh } = useGlobalUiContext()
    const { FetchUserList, userList, listStatus, setShowBlockageModal, setShowDeletionModal, showBlockageModal, showDeletionModal } = UsersViewModel()

    useEffect(() => { FetchUserList() }, [refresh])

    return (
        <div className="flex flex-col gap-5">
            <Header/>
            <Table
                list={userList}
                status={listStatus}
                deleteModal={showDeletionModal}
                blockModal={showBlockageModal}
                showBlockModal={setShowBlockageModal}
                showDeleteModal={setShowDeletionModal} />
        </div>
    )
}


const Header = () => {
    return (
        <div className="pl-4 text-left flex justify-between items-center sticky top-0 z-10 bg-neutral-50 pt-5 pb-2 shadow-lg shadow-neutral-50" >
            <div>
                <div className="text-xl font-bold big-title" >Gestion des urilisateurs</div>
                <p className="font-light" >Interface de gestion de chaque utilisateur du plateformes numicamp</p>
            </div>
            <div>
                <SearchInput/>
            </div>
        </div>
    )
}

const SearchInput = () => {
    return (
        <div className="relative w-fit" >
            <form>
                <input
                type="text"
                className="text_input input__shadow w-[23vw] relative pr-9"/>
                <SearchIcon className="absolute top-1.5 right-2" />
            </form>
        </div>
    )
}

const Table = ({ list = [] , showBlockModal, showDeleteModal, deleteModal, blockModal}) => {

    const [selectedUser, setSelectedUser] = useState(null);

    const getProfileType = (item) => { return item.nom_organisation ? 'Organisation' : 'Personne'; };

    const statusConfig = {
        'normal': { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'Normal' },
        'restreint': { color: 'bg-yellow-100 text-yellow-700', icon: Clock, label: 'Restreint' },
        'bloque': { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'Bloqué' }
    };

    const typeConfig = {
        'Organisation': { color: 'bg-blue-100 text-blue-700', icon: Building2 },
        'Personne': { color: 'bg-purple-100 text-purple-700', icon: User }
    };

    return (
        <div className="w-full text-left bg-gray-50 min-h-screen">
            <div className="max-w-7xl bg-white rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 ">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Profil</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Nom</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Prénom</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Nom utilisateur</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                Aucun profil à afficher
                            </td>
                        </tr>
                    ) : (
                        list.map((item, index) => {
                            const type = getProfileType(item);
                            const status = statusConfig[item.etat_profil] || statusConfig['normal'];
                            const typeInfo = typeConfig[type];
                            const StatusIcon = status.icon;
                            const TypeIcon = typeInfo.icon;

                            return (
                                <tr key={item.id_profil || index} className="hover:bg-gray-50">
                                    <td className="px-6 py-1">
                                        <img
                                            src={item.photo_profil || '/api/placeholder/40/40'}
                                            alt={item.nom_profil}
                                            className="w-10 h-10 rounded-full object-cover"
                                            onError={(e) => e.target.src = '/api/placeholder/40/40'}
                                        />
                                    </td>
                                    <td className="px-6 py-1 text-sm font-medium text-gray-900">
                                        {item.nom_organisation || item.nom_personne || '-'}
                                    </td>
                                    <td className="px-6 py-1 text-sm text-gray-700">
                                        {item.prenom_personne || '-'}
                                    </td>
                                    <td className="px-6 py-1">
                                        <div className="text-sm font-medium text-gray-900">{item.nom_profil}</div>
                                        <div className="text-xs text-gray-500">{item.mail}</div>
                                    </td>
                                    <td className="px-6 py-1">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${typeInfo.color}`}>
                                            <TypeIcon className="w-3 h-3" /> {type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-1">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${status.color}`}>
                                            <StatusIcon className="w-3 h-3" /> {status.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-1">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedUser(item);
                                                    showBlockModal(true);
                                                }}
                                                className="p-2 hover:bg-yellow-50 rounded transition-colors">
                                                <Ban className="w-4 h-4 text-yellow-600" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedUser(item);
                                                    showDeleteModal(true);
                                                }}
                                                className="p-2 hover:bg-red-50 rounded transition-colors">
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>

            {deleteModal && selectedUser && (
                <DeleteModal
                    user={selectedUser.nom_profil}
                    userId={selectedUser.id_profil}
                    modalVisibility={showDeleteModal}
                />
            )}
            {blockModal && selectedUser && (
                <BlockModal
                    user={selectedUser.nom_profil}
                    userId={selectedUser.id_profil}
                    isBlocked={selectedUser.etat_profil === "bloque"}
                    modalVisibility={showBlockModal}
                />
            )}
        </div>
    );
};