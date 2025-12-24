import SettingEntries from "./setting.entries.jsx";
import PersonalInfo from "./submenu/personal.info.jsx";
import { SettingVm } from "../../../viewmodel/section-vm/setting.vm.js";
import {Feedback} from "./submenu/feedback.jsx";

export const Setting = ({setLogout}) => {
    const { subSetting, setSubSetting } = SettingVm()
    return (
        <div className={"h-full md:px-3 pt-2"}>
            <div className="flex flex-1 items-center gap-3 text-2xl font-bold"><label className="icon_btn">&#xE270;</label><label>Paramètres</label></div>
            { ( subSetting === "" )  && <SettingEntries setSubSetting={setSubSetting} setLogout={setLogout} /> }
            { ( subSetting === "info" ) && < PersonalInfo setSubSetting={setSubSetting} /> }
            { ( subSetting === "feedback" ) && <Feedback setSubSetting={setSubSetting} /> }
        </div>
    )
}