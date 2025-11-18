import {UserCard} from "../../components/account/UserCard.jsx";
import PostModal from "../../components/post-form/PostModal.jsx";
import {OrgUiVm} from "../../../viewmodel/user-ui-vm/org.ui.vm.js";


export const OrgHome = () => {

    const {
        userData,
        userDomains,
        postModalVisibility,
        setPostModalVisibility
    } = OrgUiVm()

    return (
            <div className={"w-screen h-screen flex justify-center py-5"}>

                {
                    postModalVisibility
                    &&
                    <PostModal
                        profil={userData.photo_profil}
                        name={userData.nom_organisation}
                        firstname=""
                        username={userData.nom_profil}
                        domains={userDomains}
                        setModalVisibility={setPostModalVisibility} />
                }

                <div className={"w-[23vw] px-2"} >
                    <UserCard
                        profile={userData.photo_profil}
                        name={userData.nom_organisation}
                        firstname={""}
                        user={userData.nom_profil}
                        postModalIsVisible={setPostModalVisibility}
                    />
                </div>
                <div className={"w-[50vw]"} >

                </div>
                <div className={"w-[23vw]"}>

                </div>
            </div>
    )
}