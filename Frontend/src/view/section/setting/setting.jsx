import SettingEntries from "./setting.entries.jsx";
import PersonalInfo from "./submenu/personal.info.jsx";
import { SettingVm } from "../../../viewmodel/section-vm/setting.vm.js";

export const Setting = () => {
    const { subSetting, setSubSetting } = SettingVm()
    return (
        <div className={"h-full px-3 py-2"}>
            <div className="flex items-center gap-3 text-2xl font-bold"><label className="icon_btn">&#xE270;</label><label>Paramètres</label></div>
            { ( subSetting === "" )  && <SettingEntries setSubSetting={setSubSetting} /> }
            { ( subSetting === "info" ) && < PersonalInfo setSubSetting={setSubSetting} /> }
        </div>
    )
}