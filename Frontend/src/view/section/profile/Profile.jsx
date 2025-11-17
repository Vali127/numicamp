import {userProfileViewModel} from "../../../viewmodel/main-vm/user.profile.vm.js";

export const Profile = ({owner, id}) => {

    userProfileViewModel(owner, id)

    return (
        <div>
            <h2>owner : {owner}</h2>
            <h2>user_id : {id}</h2>
        </div>
    )
}