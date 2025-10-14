import  { OrganisationFormViewModel } from "../../../viewmodel/OrganisationFormViewModel.js";
import {OrderedListOfPlace} from "../../../context/SignInContext.jsx";
import { useEffect } from "react";
import {organisationFormValidation} from "../../../services/FormValidationServices.jsx";

export const OrganisationForm = ({CurrentPage, isButtonNextDisabled}) => {


    const { isAllOrganisationFormFulFilled } = organisationFormValidation()
    const  { nameError, organisationForm, SetOrganisationForm, HandleInputNameChange } = OrganisationFormViewModel()
    const Places = OrderedListOfPlace()

    useEffect(() => { if (CurrentPage) { CurrentPage('organisationForm') } }, [])
    useEffect(() => {
        if ( nameError.type != null ) {
            isButtonNextDisabled(true)
        } else {
            isButtonNextDisabled(!isAllOrganisationFormFulFilled())
        }
    })

    return (
        <div className={"text-left mx-8 md:mx-20"}>
            <h2 className={"font-bold text-[20px] md:text-2xl mb-4"}><span>Information</span> sur votre organisation</h2>

            <div>
                <div className={"flex flex-col gap-4"}>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-[12px]"}><b>Nom de votre Organisation</b></p>
                        <div className={'flex gap-10'}>
                                <div>
                                    <input
                                        type={"text"}
                                        value={organisationForm.name}
                                        onChange={HandleInputNameChange}
                                        className={'text_input input__shadow w-60'}
                                        placeholder={"votre nom ici..."}/>
                                    { ( nameError && nameError.type === "alert" ) && <p className="error">{nameError.message}</p> }
                                    { ( nameError && nameError.type === "warning" ) && <p className="warning">{nameError.message}</p> }
                                </div>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-[12px]"}><b>Date de creation</b></p>
                        <input
                            type={"date"}
                            value={organisationForm.creation_date}
            onChange={(e) => { SetOrganisationForm({...organisationForm, creation_date: e.target.value}) }}
                            className={'text_input input__shadow w-40'}/>
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <p className={'text-[12px]'}><b>Lieu actuel</b></p>
                        <select
                            value={organisationForm.place}
            onChange={(e) => { SetOrganisationForm({...organisationForm, place: e.target.value}) }}
                            className={'text_input input__shadow w-60'}
                            id={'place'} name={'place'}>
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
                </div>
            </div>
        </div>
    )
}