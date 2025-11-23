
import React from 'react'
import AccountIndex from '../../components/account/account.index'

const UserTab = ({users}) => {
    console.log("USERS : ", users)
  return (
    <div className='my-2 p-3' >
        {
            users.map(
                user => (
                    <div key={user.id_profil}>
                        <AccountIndex
                            name={user.nom_personne}
                            firstname={user.prenom_personne}
                            username={user.nom_profil}
                            profile={user.photo_profil}
                            description={user.descript}
                            type="person"
                        />
                    </div>
                )
            )
        }
    </div>
  )
}

export default UserTab