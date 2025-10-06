import numicamp from '../../assets/images/numicamp.png'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Login} from "../components/Login.jsx"
import {Usage} from "../components/sing-in/Usage.jsx"
import {SignInContextProvider} from "../../context/SignInContext.jsx"
import {PersonalForm} from "../components/sing-in/PersonalForm.jsx"

export const Presentation = () => {
    return (
        <SignInContextProvider>
            <div className={'w-[60vw] h-[70vh] bg-white shadow-lg rounded-2xl relative'}>
                <div className={'absolute w-full flex items-center justify-center top-[-50px]'}>
                    <img src={numicamp} alt='numicamp' className={'w-[120px]'} />
                </div>
                <div className={'h-23'}></div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/Usage" element={<Usage />} />
                        <Route path={"/personalForm"} element={<PersonalForm />} />
                    </Routes>
                </BrowserRouter>
                <button id={"nextFormular"} className={'absolute bottom-5 right-5 btn text-slate-100'}>Suivant</button>
            </div>
        </SignInContextProvider>
    )
}