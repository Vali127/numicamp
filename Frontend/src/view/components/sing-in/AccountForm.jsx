import {Pencil, UserRound} from "lucide-react"

export const AccountForm = () => {
    return (
        <div className={"text-left mx-20"}>
            <h2 className={"text-2xl font-bold mb-5"}>Créez votre <span>Profil</span></h2>
            <div className={"flex gap-25"}>
                <div className={"flex flex-col w-30 gap-2"}>
                    <div className={"bg-gray-500 w-30 h-30 rounded-full relative flex items-center justify-center"}>
                        <UserRound className={" text-amber-50 scale-300"} />
                    </div>
                    <button className={" h-8 text-[12px] px-2 pl-1 font-bold border-2 border-slate-800 rounded-2xl flex items-center justify-center"}>
                        <Pencil className={"scale-65"}/>
                        <label>Modifier</label>
                    </button>
                </div>


                <div className={"flex flex-col gap-5"}>

                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-[12px]"}><b>Nom d' utilisateur</b></p>
                        <div className={'flex gap-10'}>
                            <input type={"text"} className={'text_input input__shadow w-60'} placeholder={"nom d' utilisateur ici..."}/>
                        </div>
                    </div>

                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-[12px]"}><b>ajouter une bio</b></p>
                        <div className={'flex gap-10'}>
                            <textarea className={'text_input resize-none input__shadow w-110 h-[80px] pr-2'} placeholder={"Qui êtes vous ? ..."}/>
                        </div>
                    </div>

                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-[12px]"}><b>Votre mail</b></p>
                        <div className={'flex gap-10'}>
                            <input type={"email"} className={'text_input input__shadow w-60'} placeholder={"nom d' utilisateur ici..."}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}