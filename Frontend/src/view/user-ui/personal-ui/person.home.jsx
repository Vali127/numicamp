import {useEffect} from "react";
import {PersonUiVm} from "../../../viewmodel/user-ui-vm/person.ui.vm.js";
import {AlertCard} from "../../components/alert.card.jsx";
import {UserCard} from "../../components/account/UserCard.jsx";
import {UserMenu} from "./menu/user.menu.jsx";
import {UserLogout} from "../../accessibility/logout/user.logout.jsx";
import {LogoutModal} from "../../accessibility/logout/logout.modal.jsx";
import numicamp from "../../../assets/images/numicamp.png"
import {Search} from "lucide-react";
import {OrgSuggestion} from "./suggestion/org.suggestion.jsx";
import {Feeds} from "../../section/feed/feeds.jsx";
import PostModal from "../../components/post-form/post.modal.jsx";
import {Notification} from "../../section/notification/notification.jsx";
import {Resources} from "../../section/ressources/resources.jsx";
import {Schools} from "../../section/school/schools.jsx";
import {Setting} from "../../section/setting/setting.jsx";
import {Profile} from "../../section/profile/profile.jsx";
import SearchSection from "../../section/search/search.section.jsx";
import { GlobalUiContextProvider, useGlobalUiContext } from "../../../context/ui.context.jsx";


const HomeContents = () => {
    
    const { 
        logout, 
        setLogout,
        userInfo, 
        postModalVisibility, 
        setPostModalVisibility,
        searchContent,
        setSearchContent,
        searched,
        setSearched 
    } = PersonUiVm()

    const { currentSection: section, setCurrentSection: setSection, setUserType } = useGlobalUiContext()

    // vider les bar de recherche quand on change de section
    useEffect( () => {
        if (section !== 'search') {
            setSearchContent("")
            setSearched(false)
        }
    }, [section, setSearchContent, setSearched])

    // Info dont on a besoin dans le contexte
    useEffect( () => { 
        if( userInfo.sexe ) { 
        setUserType( (userInfo.sexe) ? "personal" : "organisational" ) 
    } }, [userInfo] )

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
                    setSection={setSection}
                    profile={userInfo.photo_profil}
                    name= {userInfo.nom_personne}
                    firstname= {userInfo.prenom_personne}
                    user={userInfo.nom_profil}
                    postModalIsVisible={setPostModalVisibility} />

                <UserMenu
                    section={section}
                    setSection={setSection}
                />

                <div className={"absolute w-full bottom-5"}>
                    
                    <UserLogout 
                        SetLogout={setLogout} />

                    { logout && <LogoutModal Type={"red"} SetLogout={setLogout} /> }
                
                </div>
            
            </div>

            <div className={"flex flex-col w-[58vw] mt-3 h-auto gap-8"} >
                
                <div className={"flex h-10 w-auto gap-2 mx-3 "} >
                    <img src={numicamp} alt="numicamp" className="w-10" />
                    <div className={"font-bold text-green-500 text-[34px] big-title"} >Numicamp</div>
                </div>

                <div className={"h-[85vh]"}>
                    { (section === "feeds") && <Feeds /> }
                    { (section === "notifications") && <Notification/> }
                    { (section === "resources") && <Resources /> }
                    { (section === "schools") && <Schools/> }
                    { (section === "settings") && <Setting/> }
                    { (section === "profile") && <Profile owner={true} id={userInfo.id_profil} /> }
                    { (section === "search" && <SearchSection prompt={searchContent} refresh ={searched} />) }
                </div>

            </div>



            <div className={"flex flex-col w-[26vw] h-auto mt-3 text-left overflow-scroll scrollbar-none"} >
                
                <div className={"relative p-2"} >
                    <form>
                        <input
                            value={searchContent}
                            onChange={(e) => {setSearchContent(e.target.value)}} 
                            type={"text"} 
                            className={"text_input input__shadow rounded-2xl relative w-full pr-8"} 
                            placeholder={"rechercher ici ..."} />

                        <button 
                            type={"submit"}
                            onClick={(e) => {e.preventDefault();( searchContent !== "" ) && setSection("search"); setSearched(!searched) }}>
                            <Search  
                                className={"text-gray-700 scale-90 absolute right-3 top-3"} />
                        </button>
                    </form>
                
                </div>
                
                <div className={'font-bold text-lg mt-15 mb-3'} >Suggestions</div>
                
                <OrgSuggestion/>
            
            </div>
        
        </div>
    )
}



export const PersonHome = () => {
    const { authenticated } = PersonUiVm()
    return (
        <div>
            {
                authenticated ?
                    <GlobalUiContextProvider>
                        <HomeContents/>
                    </GlobalUiContextProvider>
                    :
                    <AlertCard
                        type="error"
                        text="Accès interdite !! veuillez vous reconnecter"
                    />
            }
        </div>
    )
}