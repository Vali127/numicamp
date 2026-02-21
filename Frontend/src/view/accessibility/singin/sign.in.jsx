import { lazy, Suspense } from "react"
import { Routes, Route, Link } from "react-router-dom"
import { SignInContextProvider, useSignInContext } from "../../../context/register.context.jsx"
import { Sign_inFormVm } from "../../../viewmodel/registration-vm/sign_in.form.vm.js"
import { SignInValidationModal } from "./sign.in.validation.modal.jsx"

const Usage = lazy(() => import("./usage.jsx").then(m => ({ default: m.Usage })))
const PersonForm = lazy(() => import("./person.form.jsx").then(m => ({ default: m.PersonForm })))
const OrganisationForm = lazy(() => import("./organisation.form.jsx").then(m => ({ default: m.OrganisationForm })))
const AccountForm = lazy(() => import("./account.form.jsx").then(m => ({ default: m.AccountForm })))
const DomainForm = lazy(() => import("./domain.form.jsx").then(m => ({ default: m.DomainForm })))
const PasswordForm = lazy(() => import("./password.form.jsx").then(m => ({ default: m.PasswordForm })))

const SignInContent = () => {
    const { showSignInValidationModal } = useSignInContext()
    const { currentForm, setCurrentForm, buttonDisabled, setButtonDisabled, ManageButtonNext, ManageButtonPrev } = Sign_inFormVm()

    return (
        <div>
            <Suspense fallback={null}>
                <Routes>
                    <Route index element={<Usage CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} />} />
                    <Route path="personForm" element={<PersonForm CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} />} />
                    <Route path="organisationForm" element={<OrganisationForm CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} />} />
                    <Route path="accountForm" element={<AccountForm CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} />} />
                    <Route path="domainForm" element={<DomainForm CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} />} />
                    <Route path="passwordForm" element={<PasswordForm CurrentPage={setCurrentForm} isButtonNextDisabled={setButtonDisabled} />} />
                </Routes>
            </Suspense>
            <button id="nextButton" disabled={buttonDisabled} onClick={ManageButtonNext} className="btn absolute right-5 bottom-5">Suivant</button>
            {currentForm !== "usageForm" && <button id="prevButton" onClick={ManageButtonPrev} className="btn absolute left-5 bottom-5">Retour</button>}
            {currentForm === "usageForm" && <Link to="/" className="font-bold text-[12px] md:text-[14px] absolute left-5 bottom-5">Vous avez déjà un compte ?</Link>}
            {showSignInValidationModal && <SignInValidationModal />}
        </div>
    )
}

export const SignIn = () => (
    <SignInContextProvider>
        <SignInContent />
    </SignInContextProvider>
)