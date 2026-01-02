
export const OrgMobileMenu = ({section, setSection}) => {
    return (
        <div className={" md:hidden flex gap-10"} >

            <button
                onClick={() => setSection("profile")}
                className={( section === "profile" ) ? " menu menu-active" : "menu" } >
                <div className="icon_btn text-lg">&#xE4C2;</div>
                <div>Profile</div>
            </button>

            <button
                onClick={() => setSection("notifications")}
                className={( section === "notifications" ) ? " menu menu-active" : "menu" } >
                <div className="icon_btn text-lg">&#xE0D0;</div>
                <div>Notifications</div>
            </button>

            <button
                onClick={() => setSection("settings")}
                className={( section === "settings" ) ? " menu menu-active" : "menu" } >
                <div className="icon_btn text-lg">&#xE434;</div>
                <div>Paramètres</div>
            </button>

        </div>
    )
}