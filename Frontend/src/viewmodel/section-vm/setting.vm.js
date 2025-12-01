import { useState } from "react";

export const SettingVm = () => {

    const [subSetting, setSubSetting] = useState("")

    return {
        subSetting,
        setSubSetting
    }

}