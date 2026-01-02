
export const AdminMenu = ({section, setSection}) => {

    return (
        <div className={"flex flex-col gap-0 border-b border-b-neutral-400/30"} >

            <button
                onClick={() => setSection("dashboard")}
                className={( section === "dashboard" ) ? " menu menu-active" : "menu" } >
                <div className="icon_btn text-lg">&#xEAA6;</div>
                <div className="hidden md:block" >DashBoard</div>
            </button>

            <button
                onClick={() => setSection("users")}
                className={( section === "users" ) ? " menu menu-active" : "menu" } >
                <div className="icon_btn text-lg">&#xE4C2;</div>
                <div className="hidden md:block" >utilisateurs</div>
            </button>

            <button
                onClick={() => setSection("feedback")}
                className={( section === "feedback" ) ? " menu menu-active" : "menu" } >
                <div className="icon_btn text-lg">&#xEC1E;</div>
                <div className="hidden md:block" >FeedBacks</div>
            </button>

            <button
                onClick={() => setSection("resources")}
                className={( section === "resources" ) ? " menu menu-active" : "menu" } >
                <div className="icon_btn text-lg">&#xE28C;</div>
                <div className="hidden md:block" >Ressources</div>
            </button>

            <button
                onClick={() => setSection("schools")}
                className={( section === "schools" ) ? " menu menu-active" : "menu" } >
                <div className="icon_btn text-lg">&#xE62C;</div>
                <div className="hidden md:block" >Établissements</div>
            </button>

            <button
                onClick={() => setSection("settings")}
                className={( section === "settings" ) ? " menu menu-active" : "menu" } >
                <div className="icon_btn text-lg">&#xE434;</div>
                <div className="hidden md:block" >Paramètres</div>
            </button>

        </div>
    )
}