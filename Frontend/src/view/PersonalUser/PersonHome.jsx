import {PersonHomeViewModel} from "../../viewmodel/main/PersonHomeViewModel.js";
import {AlertCard} from "../components/AlertCard.jsx";
import {UserCard} from "../components/account/UserCard.jsx";
import {UserMenu} from "./menu/UserMenu.jsx";
import {UserLogout} from "../main/logout/UserLogout.jsx";
import {LogoutModal} from "../main/logout/LogoutModal.jsx";
import numicamp from "../../assets/images/numicamp.png"
import {Search} from "lucide-react";
import {UserOrgSuggestion} from "./suggestion/UserOrgSuggestion.jsx";
import {Feeds} from "./feed/Feeds.jsx";
import PostModal from "../components/postform/PostModal.jsx";



const HomeContents = () => {
    
    const { 
        logout, 
        setLogout, 
        userInfo, 
        postModalVisibility, 
        setPostModalVisibility 
    } = PersonHomeViewModel()

    return (
        <div className={" w-full h-screen flex px-5 "}>
            
            {
                postModalVisibility 
                && 
                <PostModal
                    profil={userInfo.photo_profil}
                    name= { userInfo.nom_personne }
                    firstname= { userInfo.prenom_personne }
                    username={ userInfo.nom_profil }
                    domains={userInfo.domains} 
                    setModalVisibility={setPostModalVisibility} />
            }

            <div className={"relative flex flex-col w-[16vw] h-auto mt-3 gap-10"} >
                
                <UserCard
                    profile={userInfo.photo_profil}
                    name= { userInfo.nom_personne }
                    firstname= { userInfo.prenom_personne }
                    user={ userInfo.nom_profil }
                    postModalIsVisible={setPostModalVisibility} />

                <UserMenu/>

                <div className={"absolute w-full bottom-5"}>
                    
                    <UserLogout 
                        SetLogout={setLogout} />

                    { logout && <LogoutModal Type={"red"} SetLogout={setLogout} /> }
                
                </div>
            
            </div>

            <div className={"flex flex-col w-[58vw] mt-3 h-auto gap-8"} >
                
                <div className={"flex h-10 w-auto gap-2 mx-3 "} >
                    <img src={numicamp} alt="numicamp" className="w-10" />
                    <div className={"font-bold text-green-400 text-[34px]"} >Numicamp</div>
                </div>

                <div className={" overflow-y-scroll h-[81vh] scrollbar-none"}>
                    <Feeds/>
                </div>

            </div>



            <div className={"flex flex-col w-[26vw] h-auto mt-3 text-left overflow-scroll scrollbar-none"} >
                
                <div className={"relative"} >
                    <input 
                        type={"text"} 
                        className={"text_input input__shadow rounded-2xl relative w-full pr-8"} 
                        placeholder={"rechercher ici ..."} />

                    <Search className={"text-gray-700 scale-90 absolute right-1 top-1"} />
                
                </div>
                
                <div className={'font-bold text-lg mt-15 mb-3'} >Suggestions</div>
                
                <UserOrgSuggestion/>
            
            </div>
        
        </div>
    )
}



export const PersonHome = () => {
    const { authenticated } = PersonHomeViewModel()
    return (
        <div>
            {
                authenticated ?
                    <HomeContents/>
                    :
                    <AlertCard
                        type="error"
                        text="Accès interdite !! veuillez vous reconnecter"
                    />
            }
        </div>
    )
}