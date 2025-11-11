import {Routes, Route, Link} from "react-router-dom";
import  { SignInContextProvider } from "../../../context/SignInContext.jsx";
import {Usage} from "./Usage.jsx";
import {PersonForm} from "./PersonForm.jsx";
import {SignInViewModel} from "../../../viewmodel/signin/SignInViewModel.js";
import {OrganisationForm} from "./OrganisationForm.jsx";
import {AccountForm} from "./AccountForm.jsx";
import {PasswordForm} from "./PasswordForm.jsx";
import {SignInValidationModal} from "./SignInValidationModal.jsx";
import {useSignInContext} from "../../../context/SignInContext.jsx";
import {DomainForm} from "./DomainForm.jsx";

const SignInContent = () => {

    const signInContext = useSignInContext()
    const { currentForm, setCurrentForm, buttonDisabled, setButtonDisabled, ManageButtonNext, ManageButtonPrev } = SignInViewModel()

    return (
        <div>
                <Routes>
                    <Route index element={<Usage CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} /> } />
                    <Route path="personForm" element={<PersonForm CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} /> } />
                    <Route path="organisationForm" element={<OrganisationForm CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} /> } />
                    <Route path="accountForm" element={<AccountForm CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} />}  />
                    <Route path="domainForm" element={<DomainForm CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} /> } />
                    <Route path="passwordForm" element={<PasswordForm CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} />}/>
                </Routes>
                <button id={"nextButton"} disabled={buttonDisabled} onClick={ManageButtonNext} className={"btn absolute right-5 bottom-5 "} >Suivant</button>
                { ( currentForm !== "usageForm" ) && <button id={"prevButton"} onClick={ManageButtonPrev} className={"btn absolute left-5 bottom-5 "} >Retour</button> }
                { ( currentForm === "usageForm" ) && <Link to={"/"} className={"font-bold text-[12px] md:text-[14px] absolute left-5 bottom-5 "} >Vous avez déjà un compte ?</Link> }
                { signInContext.showSignInValidationModal && <SignInValidationModal/> }
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
