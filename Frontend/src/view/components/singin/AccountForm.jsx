import {Pencil, Trash} from "lucide-react"

import {AccountFormViewModel} from "../../../viewmodel/signin/AccountFormViewModel.js";
import {useSignInContext} from "../../../context/SignInContext.jsx";
import {useEffect} from "react";
import {accountFormValidation} from "../../../services/FormValidationServices.js";

export const AccountForm = ({CurrentPage, isButtonNextDisabled}) => {

    const { accountForm, SetAccountForm } = useSignInContext()
    const { HandleImage, resetImage, imageError, emailError, usernameError, HandleInputUsernameChange, HandleInputEmailChange, isUploading } = AccountFormViewModel()
    const { isAllAccountFormFulFilled } = accountFormValidation()

    useEffect(() => { if (CurrentPage) { CurrentPage('accountForm') } }, [])

    useEffect(() => {
        if ( usernameError.type != null || emailError.type != null || imageError != null ) {
            isButtonNextDisabled(true)
        } else {
            isButtonNextDisabled(!isAllAccountFormFulFilled())
        }
    })

    return (
        <div className={"text-left mx-8 md:mx-20"}>
            <h2 className={" text-[20px] md:text-2xl font-bold mb-5"}>Créez votre <span>Profil</span></h2>
            <div className={"flex flex-col md:flex-row gap-5 md:gap-25"}>
                <div className={"flex md:flex-col md:w-30 gap-5 md:gap-2"}>
                    <div className={"bg-gray-200 border-2 border-gray-300  w-25 h-25 md:w-30 md:h-30 rounded-full relative flex items-center justify-center overflow-hidden"}>
                        <input 
                            id="imageInput" 
                            type="file" 
                            accept="image/*"
                            onChange={HandleImage} 
                            className="hidden"
                        />
                        { accountForm.image && <img src={URL.createObjectURL(accountForm.image)} alt="image" className="w-full h-full object-cover" /> }
                        { !accountForm.image && !isUploading && <h2 className="text-gray-400 text-xs">Photo</h2> }
                        { isUploading && <h2 className="text-blue-500 text-xs">Upload...</h2> }
                    </div>
                    <div className={"flex items-end gap-2"}>
                        <button 
                            onClick={() => document.getElementById('imageInput').click()}
                            className={" h-8 text-[12px] px-2 pl-1 font-bold border-2 border-slate-800 rounded-2xl flex items-center justify-center cursor-pointer"}
                        >
                            <Pencil className={"scale-65"}/>
                            <label className="cursor-pointer">Modifier</label>
                        </button>
                        <button onClick={resetImage}>
                            <Trash className={"scale-90 mb-1 text-red-500"}/>
                        </button>
                    </div>
                    {imageError && (
                        <div className="text-red-500 text-xs mt-1 max-w-30 text-center">
                            {imageError}
                        </div>
                    )}
                </div>

                <div className={"flex flex-col gap-5"}>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-[12px]"}><b>Nom d' utilisateur</b></p>
                        <div className={'flex gap-10'}>
                            <div className={"w-full"}>
                                <input
                                    type={"text"}
                                    className={'text_input input__shadow w-full md:w-60'}
                                    placeholder={"nom d' utilisateur ici..."}
                                    value={accountForm.username}
                                    onChange={HandleInputUsernameChange}
                                />
                                { ( usernameError && usernameError.type === "alert" ) && <p className="error">{usernameError.message}</p> }
                                { ( usernameError && usernameError.type === "warning" ) && <p className="warning">{usernameError.message}</p> }
                            </div>
                        </div>
                    </div>

                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-[12px]"}><b>ajouter une bio</b></p>
                        <div className={'flex gap-10'}>
                            <textarea 
                                className={'text_input resize-none input__shadow w-full md:w-110 h-[80px] pr-2'}
                                placeholder={"Qui êtes vous ? ..."}
                                value={accountForm.bio}
                                onChange={(e) => SetAccountForm({...accountForm, bio: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-[12px]"}><b>Votre mail</b></p>
                        <div className={'flex gap-10'}>
                            <div className={"w-full"}>
                                <input
                                    type={"email"}
                                    className={'text_input input__shadow w-full md:w-60'}
                                    placeholder={"votre email ici..."}
                                    value={accountForm.mail}
                                    onChange={HandleInputEmailChange}
                                />
                                { ( emailError && emailError.type === "alert" ) && <p className="error">{emailError.message}</p> }
                                { ( emailError && emailError.type === "warning" ) && <p className="warning">{emailError.message}</p> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}