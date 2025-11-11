import {InfoIcon} from "lucide-react";
import { OrgSuggestionViewModel } from "../../../viewmodel/main/OrgSuggestionViewModel.js";
import { OrgSuggestionListViewModel } from "../../../viewmodel/components/OrgSuggestionListViewModel.js";

const UserEmptySuggestion = () => {
    return (
        <div className={'card_empty_suggestion  grid gap-1'} >
            <InfoIcon className={"scale-90"} />
            <div>
                <b>Liste vide</b>
                <p>Pas de page disponible pour le moment</p>
            </div>
        </div>
    )
}

const UserSuggestionList = ({id, name, username, description, photo, FollowEvent, UnfollowEvent}) => {
    
    const {
        followState,
        HandleFollow,
        HandleUnfollow
    } = OrgSuggestionListViewModel(FollowEvent, UnfollowEvent)

    return (
        <div className="card_suggestion grid gap-2 mb-1">
            <div className={'grid grid-cols-4'} >
                <div className=" flex col-span-1 justify-items-start pt-1" >
                    <div className="bg-slate-900/40 h-13 w-13 rounded-lg overflow-hidden">
                        <img src={photo} alt="pfp" className="w-full h-full" />
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="flex flex-col relative h-10 justify-between" >
                        <div className="font-bold text-[16px]" >{name}</div>
                        <div className="text-[11px] text-gray-500">@{username}</div>
                    </div>
                </div>
            </div>
            <div className="text-[12px] pl-1 text-gray-400">
                {description}
            </div>
            <div className=" flex justify-end">
                {
                    ( followState == "unfollowed" ) &&
                    <button 
                        onClick={ async(e) => { await HandleFollow(e) } } 
                        id={id} 
                        className="bg-green-600 text-white rounded-lg  px-8 py-1 text-[13px] font-bold" >
                        + suivre
                    </button> 
                }
                {
                    ( followState == "followed" ) &&
                    <button 
                        onClick={ async(e) => { await HandleUnfollow(e) } } 
                        id={id} 
                        className="border border-green-600 text-green-600 rounded-lg  px-8 py-1 text-[13px] font-bold" >
                        ne plus suivre
                    </button> 
                }
                {
                    ( followState == "error" ) &&
                    <button  
                        id={id} 
                        className="bg-red-600/25 text-red-600 rounded-lg  px-8 py-1 text-[13px] font-bold" >
                        erreur
                    </button> 
                }
               
            </div>
        </div>
    )
}









export const UserOrgSuggestion = () => {
    let { 
        isEmpty,
        suggestedOrganisation,
        Follow,
        Unfollow 
    } = OrgSuggestionViewModel()
    return (
        <div>
            {
                (isEmpty) ?
                <UserEmptySuggestion/>
                :
                (
                    suggestedOrganisation.map( (data, index) => (
                        <div key={index} >
                            <UserSuggestionList
                                id={data.id_profil}
                                name={data.nom_organisation}
                                username={data.nom_profil}
                                description={data.description_profil}
                                photo={data.photo_profil}
                                FollowEvent={Follow}
                                UnfollowEvent={Unfollow} />
                        </div>
                    ) )
                )
            }
        </div>
    )
}