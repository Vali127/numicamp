import { useGlobalUiContext } from '../../../../context/ui.context.jsx'
import { InfoSettingVm } from '../../../../viewmodel/section-vm/info.setting.vm'
import {OrderedListOfPlace} from "../../../../context/register.context.jsx";
import {Spinning} from "../../../components/spinning.jsx";
import {Edit} from "lucide-react";
import Loading from "../../../components/loading.jsx"
import {SubSettingHeader} from "./SubSettingHeader.jsx";

const PersonalInfo = ({setSubSetting}) => {

    const { userType } = useGlobalUiContext()
    const { userData, setUserData, loaded, status, UpdateNewAccountData, ManageFileUploading } = InfoSettingVm()

    return (
        <div className='text-left h-[92%] flex flex-col'>
            <SubSettingHeader setSubSetting={setSubSetting} subsetting="personal_info" />
            <div className='flex-1 overflow-y-auto'>
                {
                    (loaded) ?
                        ( (userType === "organisational") ? <OrganisationForm data={userData} uploadFile={ManageFileUploading} update={UpdateNewAccountData} status={status} modify={setUserData}/> : <PersonalForm data={userData} uploadFile={ManageFileUploading} update={UpdateNewAccountData} status={status} modify={setUserData}/> ) :
                        <Loading/>
                }
            </div>
        </div>
    )
}

export default PersonalInfo



const PersonalForm = ({data,modify,status, update, uploadFile}) => {
    return (
        <div className='max-w-4xl mx-auto py-3 sm:py-4 md:py-6 space-y-2'>

            {/* Profile Picture Card */}
            <div className='bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-neutral-200'>
                <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6'>
                    <div className='relative group'>
                        <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-4 ring-indigo-100'>
                            <img src={data.photo_profil} alt="pfp" className='w-full h-full object-cover' />
                        </div>
                        <button
                            onClick={() => {document.getElementById("imageInput").click()}}
                            className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <Edit className='w-5 h-5 sm:w-6 sm:h-6'/>
                        </button>
                        <input
                            id='imageInput'
                            onChange={uploadFile}
                            type="file"
                            accept="image/*"
                            className="hidden"/>
                    </div>

                    <div className='flex-1 w-full space-y-3 sm:space-y-4'>
                        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 w-full'>
                            <div className='flex-1'>
                                <label className='block text-sm font-semibold text-neutral-700 mb-1.5'>
                                    Nom <span className="text-xs font-bold text-violet-600">@{data.nom_profil}</span>
                                </label>
                                <input
                                    value={data.nom_personne}
                                    onChange={(e) => { modify({...data, nom_personne : e.target.value}) }}
                                    type="text"
                                    className='w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm sm:text-base' />
                            </div>

                            <div className='flex-1'>
                                <label className='block text-sm font-semibold text-neutral-700 mb-1.5'>Prénom</label>
                                <input
                                    value={data.prenom_personne}
                                    onChange={(e) => { modify({...data, prenom_personne : e.target.value}) }}
                                    type="text"
                                    className='w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm sm:text-base' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gender & Birth Date Card */}
            <div className='bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-neutral-200'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                    <div>
                        <label className='block text-sm font-semibold text-neutral-700 mb-2'>Genre</label>
                        <div className='flex gap-4 sm:gap-6'>
                            <label className='flex items-center gap-2 cursor-pointer group'>
                                <input
                                    type="radio"
                                    checked={(data.sexe) === "F"}
                                    value="F"
                                    onChange={(e) => { (data.sexe === "M") && modify({...data, sexe : e.target.value }) }}
                                    name='gender'
                                    className='w-4 h-4 text-indigo-600 focus:ring-indigo-500' />
                                <span className='text-sm sm:text-base text-neutral-700 group-hover:text-indigo-600 transition-colors'>Féminin</span>
                            </label>
                            <label className='flex items-center gap-2 cursor-pointer group'>
                                <input
                                    type="radio"
                                    checked={(data.sexe) === "M"}
                                    value="M"
                                    onChange={(e) => { (data.sexe === "F") && modify({...data, sexe : e.target.value }) }}
                                    name='gender'
                                    className='w-4 h-4 text-indigo-600 focus:ring-indigo-500' />
                                <span className='text-sm sm:text-base text-neutral-700 group-hover:text-indigo-600 transition-colors'>Masculin</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-neutral-700 mb-1.5'>Date de naissance</label>
                        <input
                            type="date"
                            value={data.datenais}
                            onChange={(e) => { modify({...data, datenais : e.target.value }) }}
                            className='w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm sm:text-base' />
                    </div>
                </div>
            </div>

            {/* Email Card */}
            <div className='bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-neutral-200'>
                <label className='block text-sm font-semibold text-neutral-700 mb-1.5'>Email</label>
                <input
                    value={data.mail}
                    onChange={(e) => { modify({...data, mail : e.target.value}) }}
                    type="email"
                    className='w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm sm:text-base' />
            </div>

            {/* Description Card */}
            <div className='bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-neutral-200'>
                <label className='block text-sm font-semibold text-neutral-700 mb-1.5'>Description</label>
                <textarea
                    value={data.description_profil}
                    onChange={(e) => { modify({...data, description_profil : e.target.value}) }}
                    className='w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none text-sm sm:text-base'
                    rows="4" />
            </div>

            {/* Location Card */}
            <div className='bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-neutral-200'>
                <label className='block text-sm font-semibold text-neutral-700 mb-1.5'>Localisation</label>
                <select
                    value={data.localisation}
                    onChange={(e) => { modify({...data, localisation : e.target.value }) }}
                    className='w-full sm:w-auto px-3 py-2 rounded-lg border border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm sm:text-base'
                    id='place'
                    name='place'>
                    {OrderedListOfPlace.map((place,index) => (
                        <option key={index} value={place}>{place}</option>
                    ))}
                </select>
            </div>

            {/* Action Button */}
            <div className='flex justify-start pt-2'>
                {status === "fetching" && (
                    <button className='bg-indigo-500 text-white px-4 sm:px-6 py-2 sm:py-2.5 font-semibold rounded-lg flex gap-2 items-center text-sm sm:text-base shadow-md'>
                        <Spinning size={5}/>Chargement...
                    </button>
                )}
                {status === "fetched" && (
                    <button className='bg-purple-950 text-white px-4 sm:px-6 py-2 sm:py-2.5 font-semibold rounded-lg flex gap-2 items-center text-sm sm:text-base shadow-md' disabled>
                        Modifié
                    </button>
                )}
                {status === "normal" && (
                    <button
                        onClick={async () => { await update() }}
                        className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 font-semibold rounded-lg flex gap-2 items-center text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-95'>
                        Confirmer
                    </button>
                )}
            </div>

        </div>
    )
}



const OrganisationForm = ({data,modify,status, update, uploadFile}) => {
    const  places = OrderedListOfPlace()

    return (
        <div className='max-w-4xl mx-auto py-3 sm:py-4 md:py-6 space-y-2'>

            {/* Profile Picture Card */}
            <div className='bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-neutral-200'>
                <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6'>
                    <div className='relative group'>
                        <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-4 ring-green-100'>
                            <img src={data.photo_profil} alt="pfp" className='w-full h-full object-cover' />
                        </div>
                        <button
                            onClick={() => {document.getElementById("imageInput").click()}}
                            className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <Edit className='w-5 h-5 sm:w-6 sm:h-6'/>
                        </button>
                        <input
                            id='imageInput'
                            onChange={uploadFile}
                            type="file"
                            accept="image/*"
                            className="hidden"/>
                    </div>

                    <div className='flex-1 w-full'>
                        <label className='block text-sm font-semibold text-neutral-700 mb-1.5'>
                            Nom de l'organisation <span className="text-xs font-bold text-green-500">@{data.nom_profil}</span>
                        </label>
                        <input
                            value={data.nom_organisation}
                            onChange={(e) => { modify({...data, nom_organisation : e.target.value}) }}
                            type="text"
                            className='w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm sm:text-base' />
                    </div>
                </div>
            </div>

            {/* Creation Date Card */}
            <div className='bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-neutral-200'>
                <label className='block text-sm font-semibold text-neutral-700 mb-1.5'>Date de création</label>
                <input
                    value={data.date_creation}
                    onChange={(e) => { modify({...data, date_creation: e.target.value }) }}
                    type="date"
                    className='w-full sm:w-auto px-3 py-2 rounded-lg border border-neutral-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm sm:text-base' />
            </div>

            {/* Email Card */}
            <div className='bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-neutral-200'>
                <label className='block text-sm font-semibold text-neutral-700 mb-1.5'>Email</label>
                <input
                    value={data.mail}
                    onChange={(e) => { modify({...data, mail : e.target.value }) }}
                    type="email"
                    className='w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm sm:text-base' />
            </div>

            {/* Description Card */}
            <div className='bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-neutral-200'>
                <label className='block text-sm font-semibold text-neutral-700 mb-1.5'>Description</label>
                <textarea
                    value={data.description_profil}
                    onChange={(e) => { modify({...data, description_profil : e.target.value }) }}
                    className='w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none text-sm sm:text-base'
                    rows="4" />
            </div>

            {/* Location Card */}
            <div className='bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-neutral-200'>
                <label className='block text-sm font-semibold text-neutral-700 mb-1.5'>Localisation</label>
                <select
                    value={data.localisation}
                    onChange={(e) => { modify({...data, localisation : e.target.value }) }}
                    className='w-full sm:w-auto px-3 py-2 rounded-lg border border-neutral-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm sm:text-base'
                    id='place'
                    name='place'>
                    {places.map((place,index) => (
                        <option key={index} value={place}>{place}</option>
                    ))}
                </select>
            </div>

            {/* Action Button */}
            <div className='flex justify-start pt-2'>
                {status === "fetching" && (
                    <button className='bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 font-semibold rounded-lg flex gap-2 items-center text-sm sm:text-base shadow-md'>
                        <Spinning size={5}/>Chargement...
                    </button>
                )}
                {status === "fetched" && (
                    <button className='bg-purple-950 text-white px-4 sm:px-6 py-2 sm:py-2.5 font-semibold rounded-lg flex gap-2 items-center text-sm sm:text-base shadow-md' disabled>
                        Modifié
                    </button>
                )}
                {status === "normal" && (
                    <button
                        onClick={async () => { await update() }}
                        className='bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 font-semibold rounded-lg flex gap-2 items-center text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-95'>
                        Confirmer
                    </button>
                )}
            </div>

        </div>
    )
}