import {AlertCard} from "./components/AlertCard.jsx";
import {PersonHome} from "./user-ui/personal-ui/person.home.jsx";
import {Routes, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import {OrgHome} from "./user-ui/organisational-ui/org.home.jsx";

export const MainEntry = () => {
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