import {HomeViewModel} from "../../../viewmodel/main/HomeViewModel.js";
import {AlertCard} from "../lower_components/AlertCard.jsx";
import {UserCard} from "../account/UserCard.jsx";
import {UserMenu} from "../menu/UserMenu.jsx";
import {UserLogout} from "./UserLogout.jsx";
import {LogoutModal} from "../logout/LogoutModal.jsx";
import numicamp from "../../../assets/images/numicamp.png"
import {Search} from "lucide-react";
import {UserEmptySuggestion} from "../suggestion/UserEmptySuggestion.jsx";
import {Feeds} from "../feed/Feeds.jsx";
import PostModal from "../post_form/PostModal.jsx";



const HomeContents = () => {
    const { logout, setLogout, userInfo, postModalVisibility, setPostModalVisibility } = HomeViewModel()
    return (
        <div className={" w-full h-screen flex px-3 gap-4"}>
            
            {
                postModalVisibility && 
                <PostModal
                    profil={userInfo.photo_profil}
                    name= { userInfo.nom_personne }
                    firstname= { userInfo.prenom_personne }
                    username={ userInfo.nom_profil } 
                    close={setPostModalVisibility}
                />
            }

            <div className={"relative flex flex-col w-[16%] h-auto mt-3 gap-10"} >
                <UserCard
                    profile={userInfo.photo_profil}
                    name= { userInfo.nom_personne }
                    firstname= { userInfo.prenom_personne }
                    user={ userInfo.nom_profil }
                    postModalIsVisible={setPostModalVisibility} 
                />
                <UserMenu/>
                <div className={"absolute w-full bottom-5"}>
                    <UserLogout SetLogout={setLogout}/>
                    { logout && <LogoutModal Type={"red"} SetLogout={setLogout} /> }
                </div>
            </div>


            <div className={"flex flex-col w-[60%] mt-3 h-auto gap-8 "} >
                
                <div className={"flex h-10 w-auto gap-2 mx-3 "} >
                        <img src={numicamp} alt="numicamp" />
                        <div className={"font-bold text-green-400 text-[34px]"} >Numicamp</div>
                </div>
                <div className={" overflow-scroll h-[81vh] "}>
                        <Feeds/>
                </div>

            </div>



            <div className={"flex flex-col w-[20vw] h-auto mt-3 text-left"} >
                <div className={"relative"} >
                    <input type={"text"} className={"text_input input__shadow rounded-2xl relative w-full pr-8"} placeholder={"rechercher ici ..."} />
                    <Search className={"text-gray-700 scale-90 absolute right-1 top-1"} />
                </div>
                <div className={'font-bold text-lg mt-15 mb-3'} >Suggestions</div>
                <UserEmptySuggestion/>
            </div>
        </div>
    )
}



export const Home = () => {
    const { authenticated } = HomeViewModel()
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