import {UserCard} from "../../components/account/UserCard.jsx";
import PostModal from "../../components/post-form/PostModal.jsx";
import {OrgUiVm} from "../../../viewmodel/user-ui-vm/org.ui.vm.js";
import OrgMenu from "./menu/org.menu.jsx";
import {Profile} from "../../section/profile/Profile.jsx";


export const OrgHome = () => {

    const {
        userData,
        userDomains,
        postModalVisibility,
        setPostModalVisibility,
        section,
        setSection
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

                <div className={"w-[23vw] px-2 flex flex-col gap-10"} >
                    <UserCard
                        profile={userData.photo_profil}
                        name={userData.nom_organisation}
                        firstname={""}
                        user={userData.nom_profil}
                        postModalIsVisible={setPostModalVisibility}
                    />
                    <OrgMenu
                        section={section}
                        setSection={setSection}
                    />
                </div>

                <div className={"w-[50vw]"} >
                    { (userData.id_profil) && (section === "profile") && <Profile id={userData.id_profil} /> }
                </div>
                
                <div className={"w-[23vw]"}>

                </div>
            </div>
    )
}