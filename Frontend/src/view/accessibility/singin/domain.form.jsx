import {useEffect} from "react";
import {ITDomain, useSignInContext} from "../../../context/register.context.jsx";
import { HandleItemSelection } from "../../../utils/ui.js";

export const DomainForm = ({CurrentPage, isButtonNextDisabled}) => {
    const { domain, setDomain } = useSignInContext()

    const HandleSelection = (e)=>{
        
        HandleItemSelection(
            e,
            "selection_btn_selected",
            () =>  setDomain([...domain, e.target.value]),
            () => setDomain(domain.filter( domain => domain !== e.target.value ))
        )
    }

    useEffect(() => { if (CurrentPage) { CurrentPage('domainForm') } }, [])
    useEffect( () => { ( domain.length >= 1 ) ? isButtonNextDisabled(false) : isButtonNextDisabled(true)  }, [domain] )

    const data = ITDomain()

    return (
        <div className={"text-left mx-8 md:mx-20"}>
            <h2 className={" text-[20px] md:text-2xl font-bold mb-5"}>Quelles<span className="span"> domaines</span> vous interresses ?</h2>
            <div className={"flex gap-4 flex-wrap overflow-scroll h-90 md:h-auto"}>
                {
                    data.map((domain, index) => (
                        <button
                            className={"selection_btn"}
                            onClick={HandleSelection}
                            value={domain}
                            key={index} >
                            {domain}</button>
                    ))
                }
            </div>
        </div>
    )
}