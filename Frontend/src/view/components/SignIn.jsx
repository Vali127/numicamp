import{ Routes, Route } from "react-router-dom";
import  { SignInContextProvider } from "../../context/SignInContext.jsx";
import {Usage} from "./sing-in/Usage.jsx";
import {PersonalForm} from "./sing-in/PersonalForm.jsx";
import {SignInViewModel} from "../../viewmodel/SignInViewModel.js";

const SignInContent = () => {
    const { setCurrentForm, ManageButtonNext } = SignInViewModel()

    return (
        <div>
            <Routes>
                <Route index element={<Usage CurrentPage={setCurrentForm} />} />
                <Route path="personalForm" element={<PersonalForm CurrentPage={setCurrentForm} />} />
            </Routes>
            <button id={"nextButton"} onClick={ManageButtonNext} className={"text-amber-50 absolute right-5 bottom-5 "} >Suivant</button>
        </div>
    )
}

export const SignIn = () => {
    return (
        <SignInContextProvider>
            <SignInContent />
        </SignInContextProvider>
    )
}
