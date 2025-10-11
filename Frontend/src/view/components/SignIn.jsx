import{ Routes, Route } from "react-router-dom";
import  { SignInContextProvider } from "../../context/SignInContext.jsx";
import {Usage} from "./sing-in/Usage.jsx";
import {PersonForm} from "./sing-in/PersonForm.jsx";
import {SignInViewModel} from "../../viewmodel/SignInViewModel.js";
import {OrganisationForm} from "./sing-in/OrganisationForm.jsx";
import {AccountForm} from "./sing-in/AccountForm.jsx";
import {PasswordForm} from "./sing-in/PasswordForm.jsx";

const SignInContent = () => {
    const { currentForm, setCurrentForm, buttonDisabled, setButtonDisabled, ManageButtonNext, ManageButtonPrev } = SignInViewModel()

    return (
        <div>
            <Routes>
                <Route index element={<Usage CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} /> } />
                <Route path="personForm" element={<PersonForm CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} /> } />
                <Route path="organisationForm" element={<OrganisationForm CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} /> } />
                <Route path="accountForm" element={<AccountForm CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} />}  />
                <Route path="passwordForm" element={<PasswordForm CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} />}/>
            </Routes>
            <button id={"nextButton"} disabled={buttonDisabled} onClick={ManageButtonNext} className={"btn absolute right-5 bottom-5 "} >Suivant</button>
            { ( currentForm !== "usageForm" ) && <button id={"prevButton"} onClick={ManageButtonPrev} className={"btn absolute left-5 bottom-5 "} >Retour</button> }
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
