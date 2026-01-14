import {useEffect} from "react";
import {UserCard} from "../../components/account/UserCard.jsx";
import PostModal from "../../components/post-form/post.modal.jsx";
import {OrgUiVm} from "../../../viewmodel/user-ui-vm/org.ui.vm.js";
import OrgMenu from "./menu/org.menu.jsx";
import {Profile} from "../../section/profile/profile.jsx";
import {GlobalUiContextProvider, useGlobalUiContext} from "../../../context/ui.context.jsx";
import {AlertCard} from "../../components/alert.card.jsx";
import {Setting} from "../../section/setting/setting.jsx";
import {OrgMobileMenu} from "./menu/org.mobile.menu.jsx";
import {UserLogout} from "../../accessibility/logout/user.logout.jsx";
import {LogoutModal} from "../../accessibility/logout/logout.modal.jsx";
import {AppHeader} from "../../components/AppHeader.jsx";
import {Route, Routes} from "react-router-dom";
import {Notification} from "../../section/notification/notification.jsx";
import SearchSection from "../../section/search/search.section.jsx";
import {ApplierFeed} from "../../section/applier/Applierfeed.jsx";


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

const HomeContents = () => {
    //VIEWMODEL
    const {userInfo, postModalVisibility, setPostModalVisibility, logout, setLogout, searchContent, searched, setSearchContent, setSearched} = OrgUiVm()
    //CONTEXT
    const { currentSection : section, setCurrentSection : setSection, setUserType, userProfilId } = useGlobalUiContext()
    //initiation de la section par défaut
    useEffect(()=> {setSection('profile')}, [])
    // Info dont on a besoin dans le contexte
    useEffect( () => { setUserType( (userInfo.sexe !== undefined ) ? "personal" : "organisational" ) }, [userInfo] )

    return (
        <div className="w-full flex relative" >
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

            <LeftSidebar
                userInfo={userInfo}
                section={section}
                setSection={setSection}
                logout={logout}
                setLogout={setLogout}
                setPostModalVisibility={setPostModalVisibility}
            />

            <MainContent
                section={section}
                setSection={setSection}
                userInfo={userInfo}
                setLogout={setLogout}
                userProfilId={userProfilId}
                searchContent={searchContent}
                setSearchContent={setSearchContent}
                searched={searched}
                setSearched={setSearched}
            />

        </div>
    )
}


const LeftSidebar = ({userInfo, section, setSection, logout, setLogout, setPostModalVisibility}) => {
    return (
        <div className="w-[20vw] hidden md:flex h-screen sticky top-0 p-2 flex-col justify-between">
            <div className="flex flex-col gap-10">
                <UserCard
                    profile={userInfo.photo_profil}
                    name={userInfo.nom_organisation}
                    firstname={""}
                    user={userInfo.nom_profil}
                    postModalIsVisible={setPostModalVisibility}
                />
                <OrgMenu section={section}  setSection={setSection} />
            </div>
            <div className="w-full pb-5">
                <UserLogout SetLogout={setLogout} />
                {logout && <LogoutModal Type="red" SetLogout={setLogout} />}
            </div>
        </div>
    )
}

const MainContent = ({
                         section,
                         setSection,
                         userInfo,
                         setLogout,
                         userProfilId,
                         searchContent,
                         setSearchContent,
                         searched,
                         setSearched,
                     }) => (

    <div className="flex-1 md:px-0 px-2">
        <div className="bg-neutral-50 shadow-neutral-50 shadow-2xl pt-2 sticky top-0 z-20">
            <AppHeader
                setSection={setSection}
                userInfo={userInfo}
                searchContent={searchContent}
                setSearchContent={setSearchContent}
                searched={searched}
                setSearched={setSearched} />
            <div className="block md:hidden">
                <OrgMobileMenu setSection={setSection} section={section} />
            </div>
        </div>

        <div>
            <Routes>
                <Route path="notifications" element={<Notification />} />
                <Route path="settings" element={<Setting setLogout={setLogout} />} />
                { userInfo.id_profil && <Route path="profile" element={<Profile owner={true} id={userInfo.id_profil}/>}/>}
                <Route path="profileVisit" element={<Profile owner={false} id={userProfilId} />} />
                <Route path="search" element={<SearchSection prompt={searchContent} refresh={searched} />} />
                <Route path="applier" element={<ApplierFeed/>} />
            </Routes>
        </div>
    </div>
);

/*
* <div className={"w-screen h-screen flex justify-center py-5"}>



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
        </div>*/