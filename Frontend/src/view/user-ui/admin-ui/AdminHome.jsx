import { lazy, Suspense, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { GlobalUiContextProvider, useGlobalUiContext } from "../../../context/ui.context.jsx"
import { AdminHomeViewModel } from "../../../viewmodel/user-ui-vm/admin.ui.vm.js"
import { AdminMenu } from "./AdminMenu.jsx"
import { Header } from "../../components/Header.jsx"
import { AlertCard } from "../../components/alert.card.jsx"
import { LogoutModal } from "../../accessibility/logout/logout.modal.jsx"

const DashBoard = lazy(() => import("../../section/dashboard/DashBoard.jsx").then(m => ({ default: m.DashBoard })))
const Feedback = lazy(() => import("../../section/setting/submenu/feedback.jsx").then(m => ({ default: m.Feedback })))
const Profile = lazy(() => import("../../section/profile/profile.jsx").then(m => ({ default: m.Profile })))
const Setting = lazy(() => import("../../section/setting/setting.jsx").then(m => ({ default: m.Setting })))
const Users = lazy(() => import("../../section/users/Users.jsx").then(m => ({ default: m.Users })))
const AdminSchoolSection = lazy(() => import("../../section/school/admin.school.section.jsx"))
const AdminResource = lazy(() => import("../../section/ressources/AdminResource.jsx").then(m => ({ default: m.AdminResource })))

export const AdminHome = () => {
    const { authenticated } = AdminHomeViewModel()
    return authenticated
        ? <GlobalUiContextProvider><AdminHomeContent /></GlobalUiContextProvider>
        : <AlertCard type="error" text="Acces interdite ! veuillez vous reconnecter" />
}

const AdminHomeContent = () => {
    const { currentSection: section, setCurrentSection: setSection, userProfilId } = useGlobalUiContext()
    const { userInfo, logout, setLogout } = AdminHomeViewModel()

    useEffect(() => { setSection("dashboard") }, [])

    return (
        <div className="w-full h-screen overflow-scroll flex relative">
            <LeftNavbar section={section} setSection={setSection} />
            <MainContent userProfilId={userProfilId} setLogout={setLogout} userInfo={userInfo} />
            {logout && <LogoutModal Type="red" SetLogout={setLogout} />}
        </div>
    )
}

const LeftNavbar = ({ section, setSection }) => (
    <div className="bg-white md:bg-neutral-50 md:shadow-neutral-50 shadow-lg w-[15vw] md:w-[20vw] flex h-screen sticky z-50 top-0 p-2 flex-col">
        <Header />
        <div className="md:hidden w-full border-b border-b-gray-300 py-3" />
        <AdminMenu section={section} setSection={setSection} />
    </div>
)

const MainContent = ({ userProfilId, setLogout }) => (
    <div className="flex-1 px-2">
        <Suspense fallback={null}>
            <Routes>
                <Route path="dashboard" element={<DashBoard />} />
                <Route path="feedback" element={<Feedback />} />
                <Route path="schoolAdmin" element={<AdminSchoolSection />} />
                <Route path="resourceAdmin" element={<AdminResource />} />
                <Route path="profileVisit" element={<Profile owner={false} id={userProfilId} />} />
                <Route path="settings" element={<Setting setLogout={setLogout} />} />
                <Route path="users" element={<Users />} />
            </Routes>
        </Suspense>
    </div>
)