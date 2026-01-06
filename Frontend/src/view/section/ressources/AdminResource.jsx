import {ResourceTab} from "./ResourceTab.jsx";
import {AdminRessourceViewModel} from "../../../viewmodel/section-vm/admin.resource.vm.js";
import {ResourceForm} from "./ResourceForm.jsx";
import {ResourceList} from "./ResourceList.jsx";

export const AdminResource = () => {

    const { currentTab, setCurrentTab, data, setData, message, status, list } = AdminRessourceViewModel()

    return (
        <div className="text-left">
            <ResourceTab currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <div>
                { (currentTab === "form") && <ResourceForm data={data} setData={setData} status={status} message={message} /> }
                { (currentTab === "list") && <ResourceList list={list}/> }
            </div>
        </div>
    )
}