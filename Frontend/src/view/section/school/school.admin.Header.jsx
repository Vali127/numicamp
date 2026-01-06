import React from 'react'

export const SchoolAdminHeader = ({currentTab, setCurrentTab}) => {
  return (
    <div className='bg-neutral-50 sticky top-0 z-5 py-2'>
        <div>
            <h2 className='big-title text-2xl text-indigo-500' >Établissements</h2>
            <p>Gestion des etablissments</p>
        </div>
        <div className="flex gap-2 py-2">
            <button
                className={ (currentTab === "inscription") ? "tab-active" : "tab" }
                onClick={() => { setCurrentTab("inscription") }} >
                inscription
            </button>
            <button
                className={ (currentTab === "list") ? "tab-active" : "tab" }
                onClick={() => { setCurrentTab("list") }} >
                liste
            </button>
        </div>
    </div>
  )
}
