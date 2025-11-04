import {AlertCard} from "../components/lower_components/AlertCard.jsx";
import {Home} from "../components/main/Home.jsx";
import {Routes, Route} from "react-router-dom";

export const MainApp = () => {
    return (
        <div className={" w-[94vw] h-screen"} >
            <Routes>
                <Route index element={<Home/>} />
            </Routes>
        </div>
    )
}