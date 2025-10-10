import numicamp from '../../assets/images/numicamp.png'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Login} from "../components/Login.jsx"
import {SignIn} from "../components/SignIn.jsx";

export const Presentation = () => {
    return (
            <div className={'w-[60vw] h-[70vh] bg-white shadow-lg rounded-2xl relative'}>
                <div className={'absolute w-full flex items-center justify-center top-[-50px]'}>
                    <img src={numicamp} alt='numicamp' className={'w-[120px]'} />
                </div>
                <div className={'h-23'}></div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path={"/signIn/*"} element={<SignIn />} />
                    </Routes>
                </BrowserRouter>
            </div>
    )
}