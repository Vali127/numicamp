import {InfoIcon} from "lucide-react";

export const UserEmptySuggestion = () => {
    return (
        <div className={'card_empty_suggestion  grid gap-1'} >
            <InfoIcon className={"scale-90"} />
            <div>
                <b>Liste vide</b>
                <p>Pas de page disponible pour le moment</p>
            </div>
        </div>
    )
}