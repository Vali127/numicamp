import {ResourceTab} from "./ResourceTab.jsx";
import {AdminRessourceViewModel} from "../../../viewmodel/section-vm/admin.resource.vm.js";
import {ResourceForm} from "./ResourceForm.jsx";
import {ResourceList} from "./ResourceList.jsx";

export const AdminResource = () => {

    const { currentTab, setCurrentTab, data, setData, list, deletionModal, setDeletionModal, formResult, sendData, FetchDomains, domains } = AdminRessourceViewModel()

    return (
        <div className="text-left">
            <ResourceTab currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <div>
                { (currentTab === "form") && <ResourceForm data={data} setData={setData} result={formResult} action={sendData} getDomains={FetchDomains} domains={domains} /> }
                { (currentTab === "list") && <ResourceList list={list} deletionModal={deletionModal} setDeletionModal={setDeletionModal} /> }
            </div>
        </div>
    )
}