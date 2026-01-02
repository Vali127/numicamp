import React from 'react'

const OrgMenu = ({section, setSection}) => {
  return (
    <div className={"flex flex-col gap-0 border-b border-b-neutral-400/30"} >

        <button
            onClick={ () => setSection('profile') }
            className={( section === 'profile' ) ? " menu menu-active" : "menu" } >
          <div className="icon_btn text-lg">&#xE4C2;</div> 
          <div>Profil</div> 
        </button>

        <button
          className={ "menu" } >
          <div className="icon_btn text-lg">&#xE0CE;</div> 
          <div>Notifications</div> 
        </button>

        <button
          className={ "menu" } >
          <div className="icon_btn text-lg">&#xEAA6;</div> 
          <div>Dashboard</div> 
        </button>

        <button
            onClick={ () => setSection('settings') }
            className={( section === 'settings' ) ? " menu menu-active" : "menu" }>
          <div className="icon_btn text-lg">&#xE434;</div> 
          <div>Paramètres</div> 
        </button>

    </div>
  )
}

export default OrgMenu