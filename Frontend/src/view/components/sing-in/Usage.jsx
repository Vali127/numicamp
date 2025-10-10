import {UsageViewModel} from "../../../viewmodel/UsageViewModel.js";
import {useEffect} from "react";

export const Usage = ({CurrentPage}) => {

    const { HandleTypeOfUsage, typeOfUsage } = UsageViewModel()
    useEffect(() => { if (CurrentPage) { CurrentPage('usageForm') } }, []) // Éviter re-render à chaque changement de CurrentPage

    return (
        <div className={'mx-20 text-left flex flex-col gap-10'}>
            <div className={'relative text-wrap'}>
                <h2 className={'font-bold text-2xl'}>Bienvenue sur  <span>NumiCamp</span></h2>
                <p className={'text-[12px]'}>plateforme dédié à une orientation des jeunes dans le domaine du numérique et pour la visibilité des entreprises .</p>
            </div>
            <div className={'text-wrap'}>
                <p><b>C' est pour quelle utilisation ?</b></p>
                <form className={'text-[12px] pt-2 flex flex-col gap-2'}>
                    <p><input type={"radio"} checked={ typeOfUsage === "personal" } onChange={HandleTypeOfUsage} name={'typeOfUsage'} value={"personal"} className={'mr-2'}/><label>Pour moi</label></p>
                    <p><input type={"radio"} checked={ typeOfUsage === "organisational" } onChange={HandleTypeOfUsage} name={'typeOfUsage'}    value={"organisational"} className={'mr-2'}/><label>Pour mon organisation</label></p>
                </form>
            </div>
        </div>
    )
}