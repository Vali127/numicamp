import {UnderDev} from "../../tempComponent/UnderDev.jsx";
import SettingEntries from "./setting.entries.jsx";

export const Setting = () => {
    return (
        <div className={"h-full px-3 py-2"}>
            <div className="flex items-center gap-3 text-2xl font-bold mb-4"><label className="icon_btn">&#xE270;</label><label>Paramètres</label></div>
            <SettingEntries/>
        </div>
    )
}