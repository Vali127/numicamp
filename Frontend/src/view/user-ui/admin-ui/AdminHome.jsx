import {GlobalUiContextProvider, useGlobalUiContext} from "../../../context/ui.context.jsx";
import {AdminMenu} from "./AdminMenu.jsx";
import {Header} from "../../components/Header.jsx";
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {DashBoard} from "../../section/dashboard/DashBoard.jsx";
import {Feedback} from "../../section/setting/submenu/feedback.jsx";
import {Profile} from "../../section/profile/profile.jsx";
import {Setting} from "../../section/setting/setting.jsx";
import {AdminHomeViewModel} from "../../../viewmodel/user-ui-vm/admin.ui.vm.js";
import {AlertCard} from "../../components/alert.card.jsx";
import {LogoutModal} from "../../accessibility/logout/logout.modal.jsx";
import {Users} from "../../section/users/Users.jsx";
import AdminSchoolSection from "../../section/school/admin.school.section.jsx";
import {AdminResource} from "../../section/ressources/AdminResource.jsx";


export const AdminHome = () => {
    const { authenticated } = AdminHomeViewModel()
    return (
        <div>
            {
                (authenticated) ?
                    <GlobalUiContextProvider>
                        <AdminHomeContent />
                    </GlobalUiContextProvider> :
                    <AlertCard
                        type="error"
                        text="Acces interdite ! veuillez vous reconnecter"/>

            }
        </div>
    )
}

const AdminHomeContent = () => {

    const { currentSection: section, setCurrentSection: setSection, userProfilId } = useGlobalUiContext()
    const { userInfo, setLogout, logout } = AdminHomeViewModel()

    //page d accueil
    useEffect(() => { setSection("dashboard") }, [])

    return (
        <div className="w-full h-screen overflow-scroll flex relative " >
            <LeftNavbar
                section={section}
                setSection={setSection}/>
            <MainContent
                userProfilId={userProfilId}
                setLogout={setLogout}
                userInfo={userInfo} />
            {logout && <LogoutModal Type="red" SetLogout={setLogout} />}
        </div>
    )
}

const LeftNavbar = ({section, setSection}) => {
    return (
        <div className="bg-white md:bg-neutral-50 md:shadow-neutral-50 shadow-lg w-[15vw] md:w-[20vw] flex h-screen sticky z-50 top-0 p-2 flex-col">
            <Header/>
            <div className="md:hidden w-full border-b border-b-gray-300 py-3" ></div>
            <AdminMenu section={section} setSection={setSection} />
        </div>
    )
}

const MainContent = ({userProfilId, setLogout}) => {
    return (
        <div className="flex-1 px-2 pt-5">
            <Routes>
                <Route path="dashboard" element={<DashBoard/>} />
                <Route path="feedback" element={<Feedback/>} />
                <Route path="schoolAdmin" element={<AdminSchoolSection/>} />
                <Route path="resourceAdmin" element={<AdminResource/>} />
                <Route path="profileVisit" element={<Profile owner={false} id={userProfilId} />} />
                <Route path="settings" element={<Setting setLogout={setLogout} />} />
                <Route path="users" element={<Users/>} />
            </Routes>
        </div>
    )
}
