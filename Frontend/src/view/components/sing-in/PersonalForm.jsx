import  { PersonalFormViewModel } from "../../../viewmodel/PersonalFormViewModel.js"
import { OrderedListOfPlace } from "../../../context/SignInContext.jsx";

export const PersonalForm = () => {
    const { personalForm, SetName, SetFirstname, SetBirthDate, SetPlace, SetSex } = PersonalFormViewModel()
    const Places = OrderedListOfPlace()
    return (
        <div className={"text-left ml-20"}>
            <h2 className={"font-bold text-2xl mb-4"}><span>Information</span> personnelles</h2>

            <div>
                <form className={"flex flex-col gap-4"}>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-[12px]"}><b>Votre nom et prénom</b></p>
                        <div className={'flex gap-10'}>
                            <input type={"text"} value={personalForm.name} onChange={SetName} className={'text_input input__shadow w-60'} placeholder={"votre nom ici..."}/>
                            <input type={"text"} value={personalForm.first_name} onChange={SetFirstname} className={'text_input input__shadow w-50'} placeholder={"votre prénom ici..."}/>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-[12px]"}><b>Date de naissance</b></p>
                        <input type={"date"} onChange={SetBirthDate} className={'text_input input__shadow w-40'}/>
                    </div>
                    <div>
                        <div className={'text-wrap flex flex-col gap-1'}>
                            <p className={"text-[12px]"}><b>Votre sexe</b></p>
                            <div className={'text-[12px] pt-2 flex gap-2'}>
                                <p><input checked={ personalForm.sex === "female" } onChange={SetSex} type={"radio"} name={'sex'} value={"female"} className={'mr-2'}/><label>Femme</label></p>
                                <p><input checked={ personalForm.sex === "male" } onChange={SetSex} type={"radio"} name={'sex'}    value={"male"} className={'mr-2'}/><label>Homme</label></p>
                            </div>
                        </div>
                    </div>
                    <div className={"flex items-center gap-3"}>
                        <p className={'text-[12px]'}><b>Lieu actuel</b></p>
                        <select value={personalForm.place} onChange={SetPlace} className={'text_input input__shadow w-60'} id={'place'} name={'place'}>
                            {
                                Places.map(place =>
                                    (
                                        <option className={''} value={place}>
                                            {place}
                                        </option>
                                    )
                                )
                            }
                        </select>
                    </div>
                </form>
            </div>
        </div>
    )
}