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
            <div className='flex-1 overflow-scroll scrollbar-none'>
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
    const  places = OrderedListOfPlace()
    return (
        <div className='bg-neutral-100 rounded-lg my-3 p-2 md:p-3 flex flex-col gap-2 border border-neutral-300/20'>

            <div className='flex flex-col md:flex-row bg-neutral-300/5 p-2 rounded-lg border border-neutral-300/60 gap-3'>
                <div className='relative bg-gray-300 w-15 h-15 overflow-hidden flex items-center justify-center rounded-full mx-auto md:mx-0'>
                    <img src={data.photo_profil} alt="pfp" className='w-15 h-15' />
                    <button
                        onClick={() => {document.getElementById("imageInput").click()}}
                        className={"absolute w-15 h-15 bg-black/25 rounded-full flex justify-around items-center text-white/80 opacity-0 hover:opacity-100 "}><Edit/></button>
                    <input
                        id='imageInput'
                        onChange={uploadFile}
                        type={"file"}
                        accept="image/*"
                        className={"absolute w-15 h-15 rounded-full hidden"}/>
                </div>
                <div className='flex flex-col md:flex-row justify-around flex-1 gap-3'>

                    <div className='flex flex-col flex-1'>
                        <label className='font-bold text-sm md:text-base'>Nom  <label className={"text-xs md:text-[13px] font-bold text-violet-600"}>[ @{data.nom_profil} ]</label></label>
                        <input
                            value={data.nom_personne}
                            onChange={(e) => { modify({...data, nom_personne : e.target.value}) }}
                            type="text"
                            className='modif-input' />
                    </div>

                    <div className='flex flex-col flex-1'>
                        <label className='font-bold text-sm md:text-base'>Prénom</label>
                        <input
                            value={data.prenom_personne}
                            onChange={(e) => { modify({...data, prenom_personne : e.target.value}) }}
                            type="text"
                            className='modif-input' />
                    </div>

                </div>

            </div>

            <div className='flex flex-col md:flex-row justify-between px-2 md:px-3 bg-neutral-300/25 p-2 rounded-lg border border-neutral-300/60 gap-3'>
                <div className='flex flex-col'>
                    <label className='font-bold text-sm md:text-base'>votre genre</label>
                    <div className='flex gap-3'>
                        <div>
                            <input
                                type="radio"
                                checked={ (data.sexe) === "F" }
                                value={"F"}
                                onChange={ (e) => { (data.sexe === "M") && modify({...data, sexe : e.target.value }) } }
                                name='gender'
                                className='modif-input mr-2' /><label className='text-sm md:text-base'>Féminin</label></div>
                        <div>
                            <input
                                type="radio"
                                checked={ (data.sexe) === "M" }
                                value={"M"}
                                onChange={ (e) => { (data.sexe === "F") && modify({...data, sexe : e.target.value }) } }
                                name='gender' className='modif-input mr-2' /><label className='text-sm md:text-base'>Masculin</label></div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label className='font-bold text-sm md:text-base'>votre date de naissance</label>
                    <input
                        type="date"
                        value={data.datenais}
                        onChange={(e) => { modify({...data, datenais : e.target.value }) }}
                        className='modif-input w-full md:w-60' />
                </div>
            </div>


            <div className='flex bg-neutral-300/25 p-2 rounded-lg border border-neutral-300/60'>

                <div className='flex flex-1 gap-5'>
                    <div className='flex flex-col flex-1'>
                        <label className='font-bold text-sm md:text-base'>votre mail</label>
                        <input
                            value={data.mail}
                            onChange={(e) => { modify({...data, mail : e.target.value}) }}
                            type="mail"
                            className='modif-input w-full md:w-80' />
                    </div>
                </div>

            </div>

            <div className='flex bg-neutral-300/25 p-2 rounded-lg border border-neutral-300/60'>

                <div className='flex w-full'>
                    <div className='flex flex-col w-full'>
                        <label className='font-bold text-sm md:text-base'>description</label>
                        <textarea
                            value={data.description_profil}
                            onChange={(e) => { modify({...data, description_profil : e.target.value}) }}
                            className='modif-input w-full h-20 resize-none text-xs md:text-[14px]' />
                    </div>
                </div>

            </div>

            <div className='flex flex-col bg-neutral-300/25 p-2 rounded-lg border border-neutral-300/60'>
                <label className={"font-bold text-sm md:text-base"}>Localisation</label>
                <select
                    value={data.localisation}
                    onChange={(e) => { modify({...data, localisation : e.target.value }) }}
                    className={'modif-input w-full md:w-60'}
                    id={'place'}
                    name={'place'}>
                    {
                        places.map((place,index) =>
                            (
                                <option key={index} className={''} value={place}>
                                    {place}
                                </option>
                            )
                        )
                    }
                </select>
            </div>


            <div>
                { (status === "fetching") && <button className='bg-indigo-500 text-white px-3 py-1 font-bold rounded-md flex gap-2 md:gap-3 items-center text-sm md:text-base'><Spinning size={5}/>Chargement...</button>}
                { (status === "fetched") && <button className='bg-purple-950 text-white px-3 py-1 font-bold rounded-md flex gap-2 md:gap-3 items-center text-sm md:text-base' disabled>Modifié</button>}
                { (status === "normal") && <button onClick={async () => { await update() }} className='bg-indigo-600 text-white px-3 py-1 font-bold rounded-md flex gap-2 md:gap-3 items-center text-sm md:text-base'>Confirmer</button>}
            </div>

        </div>
    )
}



const OrganisationForm = ({data,modify,status, update, uploadFile}) => {

    const  places = OrderedListOfPlace()

    return (
        <div className='bg-neutral-100 rounded-lg my-3 p-2 md:p-3 flex flex-col gap-2 border border-neutral-300/20'>

            <div className='flex flex-col md:flex-row bg-neutral-300/5 p-2 rounded-lg border border-neutral-300/60 gap-3'>

                <div className='relative bg-gray-300 w-15 h-15 overflow-hidden flex items-center justify-center rounded-full mx-auto md:mx-0'>
                    <img src={data.photo_profil} alt="pfp" className='w-15 h-15' />
                    <button
                        onClick={() => {document.getElementById("imageInput").click()}}
                        className={"absolute w-15 h-15 bg-black/25 rounded-full flex justify-around items-center text-white/80 opacity-0 hover:opacity-100 "}><EditIcon/></button>
                    <input
                        id='imageInput'
                        onChange={uploadFile}
                        type={"file"}
                        accept="image/*"
                        className={"absolute w-15 h-15 rounded-full hidden"}/>
                </div>

                <div className='flex justify-start md:pl-5 flex-1'>

                    <div className='flex flex-col flex-1'>
                        <label className='font-bold text-sm md:text-base'>Nom de l'organisation <label className={"text-xs md:text-[13px] font-bold text-green-500"}>[ @{data.nom_profil} ]</label></label>
                        <input
                            value={data.nom_organisation}
                            onChange={(e) => { modify({...data, nom_organisation : e.target.value}) }}
                            type="text" className='modif-input' />
                    </div>

                </div>

            </div>

            <div className='flex justify-between px-2 md:px-3 bg-neutral-300/25 p-2 rounded-lg border border-neutral-300/60'>
                <div className='flex flex-col flex-1'>
                    <label className='font-bold text-sm md:text-base'>Date de creation</label>
                    <input
                        value={data.date_creation}
                        onChange={ (e) => { modify({...data, date_creation: e.target.value }) } }
                        type="date" className='modif-input w-full md:w-60' />
                </div>
            </div>


            <div className='flex bg-neutral-300/25 p-2 rounded-lg border border-neutral-300/60'>

                <div className='flex flex-1 gap-5'>
                    <div className='flex flex-col flex-1'>
                        <label className='font-bold text-sm md:text-base'>votre mail</label>
                        <input
                            value={data.mail}
                            onChange={(e) => { modify({...data, mail : e.target.value }) }}
                            type="mail"
                            className='modif-input w-full md:w-80' />
                    </div>
                </div>

            </div>

            <div className='flex bg-neutral-300/25 p-2 rounded-lg border border-neutral-300/60'>

                <div className='flex w-full'>
                    <div className='flex flex-col w-full'>
                        <label className='font-bold text-sm md:text-base'>description</label>
                        <textarea
                            value={data.description_profil}
                            onChange={(e) => { modify({...data, description_profil : e.target.value }) }}
                            type="mail"
                            className='modif-input w-full h-20 resize-none text-xs md:text-[14px]' />
                    </div>
                </div>

            </div>

            <div className='flex flex-col bg-neutral-300/25 p-2 rounded-lg border border-neutral-300/60'>
                <label className={"font-bold text-sm md:text-base"}>Localisation</label>
                <select
                    value={data.localisation}
                    onChange={(e) => { modify({...data, localisation : e.target.value }) }}
                    className={'modif-input w-full md:w-60'}
                    id={'place'}
                    name={'place'}>
                    {
                        places.map((place,index) =>
                            (
                                <option key={index} className={''} value={place}>
                                    {place}
                                </option>
                            )
                        )
                    }
                </select>
            </div>

            <div>
                { (status === "fetching") && <button className='bg-green-600 text-white px-3 py-1 font-bold rounded-md flex gap-2 md:gap-3 items-center text-sm md:text-base'><Spinning size={5}/>Chargement...</button>}
                { (status === "fetched") && <button className='bg-purple-950 text-white px-3 py-1 font-bold rounded-md flex gap-2 md:gap-3 items-center text-sm md:text-base' disabled>Modifié</button>}
                { (status === "normal") && <button onClick={async () => { await update() }} className='bg-green-600 text-white px-3 py-1 font-bold rounded-md flex gap-2 md:gap-3 items-center text-sm md:text-base'>Confirmer</button>}
            </div>

        </div>
    )
}