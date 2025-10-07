import  {loginViewModel} from "../../viewmodel/LoginViewModel.js"
import {Link} from "react-router-dom"

export const Login = () => {
    const { passwordVisibility,HandlePasswordVisibility, loginData, GetLoginName, GetLoginPassword } = loginViewModel()

    //icon de masquage/demasquage du mot de passe
    const HandlePassWordView = (e) => {
        e.preventDefault() //A cause du form
        HandlePasswordVisibility()
    }

    return (
        <div>
            <h2 className={'font-bold text-2xl'}>
                Bienvenue Sur <span>NumiCamp</span>
            </h2>

            <div
                className={'flex justify-center mt-5'}>


                <form className={'w-[20vw] flex flex-col gap-2'}>

                    <div className={'flex flex-col text-left gap-1'}>
                        <label htmlFor="name" className={'text-[11px] font-bold'}>Nom d' utilisateur</label>
                        <input type="text" id="username" value={loginData.username} onChange={GetLoginName} placeholder="Nom d'Utilisateur..." className={'input__shadow text_input'} />
                    </div>

                    <div className={'flex flex-col text-left gap-1'}>
                        <label htmlFor="password" className={'text-[11px] font-bold'}>Mot de pass</label>
                        <div className={'flex flex-col relative'}>
                            <input type={(passwordVisibility)? "text" : "password"} id="password" value={loginData.password} onChange={GetLoginPassword} placeholder={"votre mot de passe..."}  className={'input__shadow text_input'} />
                            <button id={"password_viewer"} onClick={HandlePassWordView} className={'icon_btn absolute right-[-5px] top-[-4px]'} ></button>
                        </div>
                    </div>

                    <div className={'text-[12px] text-left'}>Pas de compte ? <Link to={"/signIn"}> s' inscrire</Link></div>

                    <div className={'mt-10'}>
                        <button type={'submit'} className={'text-slate-100 w-full btn rounded-2xl bg-slate-800'}>Se connecter</button>
                    </div>

                </form>


            </div>
        </div>
    )
}