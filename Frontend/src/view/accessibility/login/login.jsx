import  {LoginVm} from "../../../viewmodel/login-vm/loginVm.js"
import {Link} from "react-router-dom"
import {LoginContextProvider, useLoginContext} from "../../../context/login.context.jsx"
import {useEffect} from "react";
import {LoginValidationModal} from "./login.validation.modal.jsx";
import ReCAPTCHA from "react-google-recaptcha";
import { CONFIG } from "../../../config.js";

export const Login = () => {
    return (
        <LoginContextProvider>
            <LoginContent/>
        </LoginContextProvider>
    )
}

const LoginContent = () => {
    const loginContext = useLoginContext()
    const { passwordVisibility,HandlePasswordVisibility, buttonDisabled, SetConnexionButtonActivation } = LoginVm()


    useEffect(() => { SetConnexionButtonActivation() }, [loginContext.loginData])

    //icon de masquage/demasquage du mot de passe
    const HandlePassWordView = (e) => {
        e.preventDefault() //A cause du form
        HandlePasswordVisibility()
    }

    const HandleButtonConnexion = (e) => {
        e.preventDefault()
        loginContext.setShowLogInValidationModal(true)
    }


    return (
        <div>
            
            <h2 className={'font-bold text-[20px] md:text-2xl'}>
                Bienvenue Sur <span className="span">NumiCamp</span>
            </h2>

            <div className={'flex justify-center mt-5'}>
                <form className={'md:w-[20vw] flex flex-col gap-4 md:gap-2'}>
                    <div className={'flex flex-col text-left gap-1'}>
                        <label 
                            htmlFor="name" 
                            className={'text-[11px] font-bold'}>Nom d' utilisateur
                        </label>
                        
                        <input
                            type="text"
                            id="username"
                            value={loginContext.loginData.username}
                            onChange={ (e) => loginContext.setLoginData({ ...loginContext.loginData,username: e.target.value }) }
                            placeholder="Nom d'Utilisateur..."
                            className={'input__shadow text_input w-[273px]'} />
                    </div>

                    <div className={'flex flex-col text-left gap-1'}>
                        
                        <label 
                            htmlFor="password" 
                            className={'text-[11px] font-bold'}>
                            Mot de passe
                        </label>
                        
                        <div className={'flex flex-col relative'}>
                            
                            <input
                                type={(passwordVisibility)? "text" : "password"}
                                id="password" value={loginContext.loginData.password}
                                onChange={ (e) => loginContext.setLoginData({ ...loginContext.loginData,password : e.target.value }) }
                                placeholder={"votre mot de passe..."}
                                className={'input__shadow text_input'} />
                            
                            <button 
                                id={"password_viewer"} 
                                onClick={HandlePassWordView} 
                                className={'icon_btn absolute right-1 top-1.5'} >
                            </button>
                            
                        </div>
                    </div>

                    <div className={'text-[12px] text-left'}>
                        Pas de compte ? 
                        <Link 
                            className={"underline"} 
                            to={"/signIn"}> 
                            s' inscrire
                        </Link>
                    </div>

                    <div className={'mt-10'}>
                        <button 
                            onClick={HandleButtonConnexion} 
                            type={'submit'} 
                            disabled={buttonDisabled} 
                            className={'text-slate-100 w-full btn rounded-2xl bg-slate-800'}>
                            Se connecter
                        </button>
                    </div>

                    {
                        (import.meta.env.PROD)
                        &&
                        <ReCAPTCHA
                            sitekey={CONFIG.ReCAPTCHA_SITE_KEY}
                            onChange={(token) => {loginContext.setRecaptchaToken(token)}}
                        />
                    }
                </form>
            </div>
            { loginContext.showLogInValidationModal && <LoginValidationModal/> }
        </div>
    )
}