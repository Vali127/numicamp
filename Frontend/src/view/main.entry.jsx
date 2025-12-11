import {AlertCard} from "./components/alert.card.jsx";
import {PersonHome} from "./user-ui/personal-ui/person.home.jsx";
import {Routes, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import {OrgHome} from "./user-ui/organisational-ui/org.home.jsx";
import {AdminHome} from "./user-ui/admin-ui/AdminHome.jsx";

export const MainEntry = () => {
    const [ usage, setUsage ] = useState( )
    useEffect( () =>{ setUsage(localStorage.getItem('usage')) }, [])
    return (
        <div className={" w-screen h-screen"} >
            <Routes>
                { usage === "personal" && <Route path="/*" element={<PersonHome />}/> }
                { usage === "organisational" && <Route path="/*" element={<OrgHome />}/> }
                { usage === "admin" && <Route path="/*" element={<AdminHome />}/> }
            </Routes>
        </div>
    )
}