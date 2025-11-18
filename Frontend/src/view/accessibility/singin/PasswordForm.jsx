import {PasswordFormVm} from "../../../viewmodel/registration-vm/password.form.vm.js";
import { useEffect } from "react"


export const PasswordForm = ({CurrentPage, isButtonNextDisabled}) => {

    const { error, CheckPasswordValidity, passwordError, HandleInputPassword, accountForm, passwordVisibility1, passwordVisibility2, HandlePasswordVisibility1, HandlePasswordVisibility2 } = PasswordFormVm()

    useEffect(() => { if (CurrentPage) { CurrentPage('passwordForm') } }, [])
    useEffect( () => {
        if ( error.type !== "success" || accountForm.password === "" ) {
            isButtonNextDisabled(true)
        } else { isButtonNextDisabled(false) }
    } )

    return (
        <div className={" text-left mx-8 md:mx-20"}>
            <p className={"font-bold text-[20px] md:text-2xl"}>Choisissez un <span>mot de passe</span></p>
            <p className={"text-[12px] mb-5"}>Veuillez choisir une mot de passe fiable et fort pour votre compte</p>

            <div className={"flex flex-col gap-2 mb-5"}>
                <b className={"text-[12px]"}>Votre mot de passe</b>
                <div className={'flex flex-col relative w-full md:w-60'} >
                    <input
                        type={(passwordVisibility1) ? "text" : "password"}
                        value={accountForm.password}
                        onChange={HandleInputPassword}
                        className={"input__shadow text_input"} />
                    { ( passwordError && passwordError.type === "warning" ) && <p className="warning">{passwordError.message}</p> }
                    <button id={"password_viewer1"} onClick={HandlePasswordVisibility1} className={'icon_btn absolute right-1 top-1.5'} ></button>
                </div>
            </div>
            <div className={"flex flex-col gap-2"}>
                <b className={"text-[12px]"}>Retapez votre mot de passe</b>
                <div className={'flex flex-col relative w-full md:w-60'}>
                    <input
                        type={(passwordVisibility2) ? "text" : "password"}
                        className={"input__shadow text_input"}
                        onChange={CheckPasswordValidity}
                    />
                    { ( error.type === "alert") && <p className={"text-[12px] text-red-500"}>{error.message}</p> }
                    { (error.type === "warning") && <p className={"text-[12px] text-yellow-400"}>{error.message}</p> }
                    
                    <button 
                        id={"password_viewer2"} 
                        onClick={HandlePasswordVisibility2} 
                        className={'icon_btn absolute right-1 top-1.5'} >    
                    </button>
                
                </div>
            
            </div>
        
        </div>
    )
}