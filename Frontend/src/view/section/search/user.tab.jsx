
import React from 'react'
import AccountIndex from '../../components/account/account.index'
import NotFound from './not.found'
import { useGlobalUiContext } from '../../../context/ui.context'

const UserTab = ({users}) => {

    const {GoToProfile} = useGlobalUiContext()

  return (
    <div className='my-2' >
        {
            ( users.length > 0 ) ?
            users.map(
                user => (
                    <div key={user.id_profil}>
                        <AccountIndex
                            id={user.id_profil}
                            name={user.nom_personne}
                            firstname={user.prenom_personne}
                            username={user.nom_profil}
                            profile={user.photo_profil}
                            description={user.descript}
                            type="person"
                            GoToProfile={GoToProfile}
                        />
                    </div>
                )
            )
            :
            <NotFound/>
        }
    </div>
  )
}

export default UserTab