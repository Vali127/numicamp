import {PersonalFormViewModel} from "../viewmodel/PersonalFormViewModel.js";


export  const FormValidationServices = {
    usageForm : {
        isAllUsageFormFulFilled : (usageForm) => { return ( usageForm === '' ) ? false : true },
        ValidationErrorMessage : () => { return alert("Une Erreur s' est produite !") }
    },

}