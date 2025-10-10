import  { OrganisationFormViewModel } from "../../../viewmodel/OrganisationFormViewModel.js";
import { OrderedListOfPlace } from "../../../context/SignInContext.jsx";
import { useEffect } from "react";

export const OrganisationForm = ({CurrentPage}) => {

    const { organisationForm , SetName, SetCreationDate, SetPlace } = OrganisationFormViewModel()
    const Places = OrderedListOfPlace()
    useEffect(() => { if (CurrentPage) { CurrentPage('organisationForm') } }, [])

    return (
        <div className={"text-left ml-20"}>
            <h2 className={"font-bold text-2xl mb-4"}><span>Information</span> sur votre organisation</h2>

            <div>
                <form className={"flex flex-col gap-4"}>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-[12px]"}><b>Nom de votre Organisation</b></p>
                        <div className={'flex gap-10'}>
                            <input type={"text"} value={organisationForm.name} onChange={SetName} className={'text_input input__shadow w-60'} placeholder={"votre nom ici..."}/>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-[12px]"}><b>Date de creation</b></p>
                        <input type={"date"} value={organisationForm.creation_date} onChange={SetCreationDate} className={'text_input input__shadow w-40'}/>
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <p className={'text-[12px]'}><b>Lieu actuel</b></p>
                        <select value={organisationForm.place} onChange={SetPlace} className={'text_input input__shadow w-60'} id={'place'} name={'place'}>
                            {
                                Places.map((place,index) =>
                                    (
                                        <option key={index} className={''} value={place}>
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