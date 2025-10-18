import  { PersonFormViewModel } from "../../../viewmodel/PersonFormViewModel.js"
import {OrderedListOfPlace} from "../../../context/SignInContext.jsx";
import { useEffect } from "react";
import { personFormValidation } from "../../../services/FormValidationServices.js";

export const PersonForm = ({CurrentPage, isButtonNextDisabled}) => {

    const { personForm,SetPersonForm, HandleInputNameChange, nameError, HandleInputFirstnameChange, firstnameError, HandleInputDateChange, dateError } = PersonFormViewModel()
    const { isAllPersonFormFulFilled } = personFormValidation()
    const Places = OrderedListOfPlace()

    useEffect(() => { if (CurrentPage) { CurrentPage('personForm') } }, [])
    useEffect(() => {
        if ( nameError.type || firstnameError.type || dateError.type ) {
            isButtonNextDisabled(true)
        } else {
            isButtonNextDisabled(!isAllPersonFormFulFilled())
        }
    });

    return (
        <div className={"text-left mx-8 md:mx-20"}>
            <h2 className={"font-bold text-[20px] md:text-2xl mb-4"}><span>Information</span> personnelles</h2>

            <div>
                <div className={"flex flex-col gap-4"}>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-[12px]"}><b>Votre nom et prénom</b></p>
                        <div className={'flex flex-col md:flex-row gap-3 md:gap-10'}>
                            <div>
                                <input
                                    type={"text"}
                                    value={personForm.name}
                                    onChange={HandleInputNameChange}
                                    className={'text_input input__shadow w-full md:w-60 h-10'} placeholder={"votre nom ici..."}/>
                                { ( nameError && nameError.type === "alert" ) && <p className="error">{nameError.message}</p> }
                                { ( nameError && nameError.type === "warning" ) && <p className="warning">{nameError.message}</p> }
                            </div>
                            <div>
                                <input
                                    type={"text"}
                                    value={personForm.firstname}
                                    onChange={HandleInputFirstnameChange}
                                    className={'text_input input__shadow w-full md:w-60 h-10'} placeholder={"votre prénom ici..."}/>
                                { ( firstnameError && firstnameError.type === "alert" ) && <p className="error">{firstnameError.message}</p> }
                                { ( firstnameError && firstnameError.type === "warning" ) && <p className="warning">{firstnameError.message}</p> }
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-[12px]"}><b>Date de naissance</b></p>
                        <div>
                            <input type={"date"}
                                   value={personForm.birth_date || ''}
                                   onChange={HandleInputDateChange}
                                   className={'text_input input__shadow w-40'}/>
                            { ( dateError  ) && <p className="error">{dateError.message}</p> }
                        </div>
                    </div>
                    <div>
                        <div className={'text-wrap flex flex-col gap-1'}>
                            <p className={"text-[12px]"}><b>Votre sexe</b></p>
                            <div className={'text-[12px] pt-2 flex gap-2'}>
                                <p><input
                                    checked={ personForm.sex === "F" }
                                    onChange={(e) => { SetPersonForm({...personForm, sex : e.target.value }) }}
                                    type={"radio"} name={'sex'}
                                    value={"F"}
                                    className={'mr-2'}/>
                                    <label>Femme</label></p>
                                <p><input
                                    checked={ personForm.sex === "M" }
                                    onChange={(e) => { SetPersonForm({...personForm, sex : e.target.value }) }}
                                    type={"radio"} name={'sex'}
                                    value={"M"}
                                    className={'mr-2'}/>
                                    <label>Homme</label></p>
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <p className={'text-[12px]'}><b>Lieu actuel</b></p>
                        <select
                            value={personForm.place}
                            onChange={(e) => { SetPersonForm({...personForm, place : e.target.value }) }}
                            className={'text_input input__shadow w-full md:w-60'}
                            id={'place'}
                            name={'place'}>
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