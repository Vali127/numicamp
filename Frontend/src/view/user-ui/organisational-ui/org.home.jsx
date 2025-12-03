import {useEffect} from "react";
import {UserCard} from "../../components/account/UserCard.jsx";
import PostModal from "../../components/post-form/post.modal.jsx";
import {OrgUiVm} from "../../../viewmodel/user-ui-vm/org.ui.vm.js";
import OrgMenu from "./menu/org.menu.jsx";
import {Profile} from "../../section/profile/profile.jsx";
import {GlobalUiContextProvider, useGlobalUiContext} from "../../../context/ui.context.jsx";
import {AlertCard} from "../../components/alert.card.jsx";
import numicamp from "../../../assets/images/numicamp.png";
import {Setting} from "../../section/setting/setting.jsx";


const HomeContents = () => {
    //VIEWMODEL
    const {
        userInfo,
        postModalVisibility,
        setPostModalVisibility,
    } = OrgUiVm()
    //CONTEXT
    const { currentSection : section, setCurrentSection : setSection, setUserType } = useGlobalUiContext()

    //initiation de la section par défaut
    useEffect(()=> {setSection('profil')}, [])
    // Info dont on a besoin dans le contexte
    useEffect( () => { setUserType( (userInfo.sexe !== undefined ) ? "personal" : "organisational" ) }, [userInfo] )

    return (
            <div className={"w-screen h-screen flex justify-center py-5"}>

                {
                    postModalVisibility
                    &&
                    <PostModal
                        profil={userInfo.photo_profil}
                        name={userInfo.nom_organisation}
                        firstname=""
                        username={userInfo.nom_profil}
                        domains={userInfo.domains}
                        setModalVisibility={setPostModalVisibility} />
                }

                <div className={"w-[23vw] px-2 flex flex-col gap-10"} >
                    <UserCard
                        profile={userInfo.photo_profil}
                        name={userInfo.nom_organisation}
                        firstname={""}
                        user={userInfo.nom_profil}
                        postModalIsVisible={setPostModalVisibility}
                    />
                    <OrgMenu
                        section={section}
                        setSection={setSection}
                    />
                </div>



                <div className={"w-[50vw] flex flex-col gap-8"} >
                    <div className={"flex h-10 w-auto gap-2 mx-3 "} >
                        <img src={numicamp} alt="numicamp" className="w-10" />
                        <div className={"font-bold text-green-500 text-[34px] big-title"} >Numicamp</div>
                    </div>
                    <div className={"h-[85vh]"}>
                        { (userInfo.id_profil) && (section === "profil") && <Profile id={userInfo.id_profil} /> }
                        { (section === "settings") && <Setting/> }
                    </div>

                </div>
                
                <div className={"w-[23vw]"}>

                </div>
            </div>
    )
}


export  const OrgHome = () => {
    const { authenticated } = OrgUiVm()
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
                        text="Accès interdite !! veuillez vous reconnecter"/>
            }
        </div>
    )
}