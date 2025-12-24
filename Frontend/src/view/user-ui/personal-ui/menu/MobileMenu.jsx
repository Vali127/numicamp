export const MobileMenu = ({ section, setSection }) => {
    return (
        <div className="">
            <div className="flex justify-around items-center">
                <button
                    onClick={() => setSection("feeds")}
                    className={section === "feeds" ? "menu menu-active" : "menu"}>
                    <div className="icon_btn text-2xl">&#xE0A8;</div>
                    <div className="text-[10px] font-medium">Feeds</div>
                </button>

                <button
                    onClick={() => setSection("notifications")}
                    className={section === "notifications" ? "menu menu-active" : "menu"}>
                    <div className="icon_btn text-2xl">&#xE0D0;</div>
                    <div className="text-[10px] font-medium mt-1">Notifs</div>
                </button>

                <button
                    onClick={() => setSection("resources")}
                    className={section === "resources" ? "menu menu-active" : "menu"}>
                    <div className="icon_btn text-2xl">&#xE28C;</div>
                    <div className="text-[10px] font-medium mt-1">Ressources</div>
                </button>

                <button
                    onClick={() => setSection("schools")}
                    className={section === "schools" ? "menu menu-active" : "menu"}>
                    <div className="icon_btn text-2xl">&#xE62C;</div>
                    <div className="text-[10px] font-medium mt-1">Écoles</div>
                </button>

                <button
                    onClick={() => setSection("settings")}
                    className={section === "settings" ? "menu menu-active" : "menu"}>
                    <div className="icon_btn text-2xl">&#xE434;</div>
                    <div className="text-[10px] font-medium mt-1">Réglages</div>
                </button>
            </div>
        </div>
    )
}