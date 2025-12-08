

import React from 'react'
import AccountIndex from '../../components/account/account.index'
import NotFound from './not.found.jsx'
import {useGlobalUiContext} from "../../../context/ui.context.jsx"

const OrgTab = ({organisations}) => {

    const {GoToProfile} = useGlobalUiContext()

  return (
    <div className='my-2 p-3'>
        {
            (organisations.length > 0 ) ? 
            
            organisations.map(
                org => (
                    <div key={org.id_profil}>
                        <AccountIndex
                            name={org.nom_organisation}
                            username={org.nom_profil}
                            profile={org.photo_profil}
                            description={org.description_profil}
                            id={org.id_profil}
                            type="organisation"
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

export default OrgTab