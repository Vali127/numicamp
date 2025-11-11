import {AlertCard} from "../components/AlertCard.jsx";
import {PersonHome} from "../PersonalUser/PersonHome.jsx";
import {Routes, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import {OrgHome} from "../OrganisationalUser/OrgHome.jsx";

export const MainApp = () => {
    const [ usage, setUsage ] = useState( )
    useEffect( () =>{ setUsage(localStorage.getItem('usage')) }, [])
    return (
        <div className={" w-screen h-screen"} >
            <Routes>
                { usage === "personal" && <Route index element={<PersonHome />}/> }
                { usage === "organisational" && <Route index element={<OrgHome />}/> }
            </Routes>
        </div>
    )
}