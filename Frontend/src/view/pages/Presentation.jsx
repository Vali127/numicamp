import numicamp from '../../assets/images/numicamp.png'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Login} from "../components/login/Login.jsx"
import {SignIn} from "../components/singin/SignIn.jsx";


export const Presentation = () => {

    return (
            <div className={'w-[90vw] md:w-[60vw] h-[75vh] md:h-[80vh] bg-white shadow-lg rounded-2xl relative'}>
                <div className={'absolute w-full flex items-center justify-center top-[-35px] md:top-[-50px]'}>
                    <img src={numicamp} alt='numicamp' className={'w-[80px] md:w-[120px]'} />
                </div>
                <div className={' h-15 md:h-23'}></div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path={"/signIn/*"} element={<SignIn />} />
                    </Routes>
                </BrowserRouter>
            </div>
    )
}