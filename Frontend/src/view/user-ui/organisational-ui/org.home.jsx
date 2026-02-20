import { lazy, Suspense, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { OrgUiVm } from "../../../viewmodel/user-ui-vm/org.ui.vm.js"
import { GlobalUiContextProvider, useGlobalUiContext } from "../../../context/ui.context.jsx"
import { AlertCard } from "../../components/alert.card.jsx"
import { UserCard } from "../../components/account/UserCard.jsx"
import { AppHeader } from "../../components/AppHeader.jsx"
import { UserLogout } from "../../accessibility/logout/user.logout.jsx"
import { LogoutModal } from "../../accessibility/logout/logout.modal.jsx"
import OrgMenu from "./menu/org.menu.jsx"
import { OrgMobileMenu } from "./menu/org.mobile.menu.jsx"
import PostModal from "../../components/post-form/post.modal.jsx"

const Notification = lazy(() => import("../../section/notification/notification.jsx").then(m => ({ default: m.Notification })))
const Setting = lazy(() => import("../../section/setting/setting.jsx").then(m => ({ default: m.Setting })))
const Profile = lazy(() => import("../../section/profile/profile.jsx").then(m => ({ default: m.Profile })))
const SearchSection = lazy(() => import("../../section/search/search.section.jsx"))
const ApplierFeed = lazy(() => import("../../section/applier/Applierfeed.jsx").then(m => ({ default: m.ApplierFeed })))

export const OrgHome = () => {
    const { authenticated } = OrgUiVm()
    return authenticated
        ? <GlobalUiContextProvider><HomeContents /></GlobalUiContextProvider>
        : <AlertCard type="error" text="Accès interdite !! veuillez vous reconnecter" />
}

const HomeContents = () => {
    const { userInfo, postModalVisibility, setPostModalVisibility, logout, setLogout, searchContent, searched, setSearchContent, setSearched } = OrgUiVm()
    const { currentSection: section, setCurrentSection: setSection, setUserType, userProfilId } = useGlobalUiContext()

    useEffect(() => { setSection('profile') }, [])
    useEffect(() => { setUserType(userInfo.sexe !== undefined ? "personal" : "organisational") }, [userInfo])

    return (
        <div className="w-full flex relative">
            {postModalVisibility && (
                <PostModal
                    profil={userInfo.photo_profil}
                    name={userInfo.nom_organisation}
                    firstname=""
                    username={userInfo.nom_profil}
                    domains={userInfo.domains}
                    setModalVisibility={setPostModalVisibility} />
            )}
            <LeftSidebar userInfo={userInfo} section={section} setSection={setSection} logout={logout} setLogout={setLogout} setPostModalVisibility={setPostModalVisibility} />
            <MainContent section={section} setSection={setSection} userInfo={userInfo} setLogout={setLogout} userProfilId={userProfilId} searchContent={searchContent} setSearchContent={setSearchContent} searched={searched} setSearched={setSearched} />
        </div>
    )
}

const LeftSidebar = ({ userInfo, section, setSection, logout, setLogout, setPostModalVisibility }) => (
    <div className="w-[20vw] hidden md:flex h-screen sticky top-0 p-2 flex-col justify-between">
        <div className="flex flex-col gap-10">
            <UserCard profile={userInfo.photo_profil} name={userInfo.nom_organisation} firstname="" user={userInfo.nom_profil} postModalIsVisible={setPostModalVisibility} />
            <OrgMenu section={section} setSection={setSection} />
        </div>
        <div className="w-full pb-5">
            <UserLogout SetLogout={setLogout} />
            {logout && <LogoutModal Type="red" SetLogout={setLogout} />}
        </div>
    </div>
)

const MainContent = ({ section, setSection, userInfo, setLogout, userProfilId, searchContent, setSearchContent, searched, setSearched }) => (
    <div className="flex-1 md:px-0 px-2">
        <div className="bg-neutral-50 shadow-neutral-50 shadow-2xl pt-2 sticky top-0 z-20">
            <AppHeader setSection={setSection} userInfo={userInfo} searchContent={searchContent} setSearchContent={setSearchContent} searched={searched} setSearched={setSearched} />
            <div className="block md:hidden">
                <OrgMobileMenu setSection={setSection} section={section} />
            </div>
        </div>
        <Suspense fallback={null}>
            <Routes>
                <Route path="notifications" element={<Notification />} />
                <Route path="settings" element={<Setting setLogout={setLogout} />} />
                {userInfo.id_profil && <Route path="profile" element={<Profile owner={true} id={userInfo.id_profil} />} />}
                <Route path="profileVisit" element={<Profile owner={false} id={userProfilId} />} />
                <Route path="search" element={<SearchSection prompt={searchContent} refresh={searched} />} />
                <Route path="applier" element={<ApplierFeed />} />
            </Routes>
        </Suspense>
    </div>
)