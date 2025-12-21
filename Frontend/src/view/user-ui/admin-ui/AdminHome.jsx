import {GlobalUiContextProvider, useGlobalUiContext} from "../../../context/ui.context.jsx";
import {AdminMenu} from "./AdminMenu.jsx";
import {Header} from "../../components/Header.jsx";
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {DashBoard} from "../../section/dashboard/DashBoard.jsx";
import {Feedback} from "../../section/setting/submenu/feedback.jsx";
import {Profile} from "../../section/profile/profile.jsx";


const AdminHomeContent = () => {

    const { currentSection: section, setCurrentSection: setSection, setUserType, userProfilId } = useGlobalUiContext()
    //page d accueil
    useEffect(() => { setSection("dashboard") }, [])

    return (
        <div className={"flex h-screen"} >
            <div className={"w-[20vw] h-full px-4 pt-3 gap-6 flex flex-col bg-white shadow-md"}>
                <Header/>
                <AdminMenu section={section} setSection={setSection} />
            </div>
            <div className={"flex-1 h-full pt-10 pb-3 px-5"}>
                <Routes>
                    <Route path="dashboard" element={<DashBoard/>} />
                    <Route path="feedback" element={<Feedback/>} />
                    <Route path="profileVisit" element={<Profile owner={false} id={userProfilId} />} />
                </Routes>
            </div>
        </div>
    )
}

export const AdminHome = () => {
    return (
        <GlobalUiContextProvider>
            <AdminHomeContent />
        </GlobalUiContextProvider>
    )
}