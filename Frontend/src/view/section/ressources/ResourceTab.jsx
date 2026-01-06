export const ResourceTab = ({currentTab, setCurrentTab}) => {
    return (
        <div className="flex flex-col gap-3 py-3">
            <div>
                <h2 className="font-bold text-2xl text-indigo-500 big-title" >Gestion des resources</h2>
                <p className="text-light text-sm" >Zone administrative pour la gestion des resources de l' application</p>
            </div>
            <div className="flex gap-2 pb-1">
                <button
                    className={(currentTab === "form") ? "tab-active" : "tab"}
                    onClick={() => setCurrentTab("form")} >
                    Form
                </button>
                <button
                    className={(currentTab === "list") ? "tab-active" : "tab"}
                    onClick={() => setCurrentTab("list")}>
                    liste
                </button>
            </div>
        </div>
    )
}