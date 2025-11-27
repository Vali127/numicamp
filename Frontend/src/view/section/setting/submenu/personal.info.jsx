
import React from 'react'

const PersonalInfo = () => {
  console.log("Personal Info Component Rendered");
  return (
    <div>
        <Header />
    </div>
  )
}

export default PersonalInfo





const Header = () => {
    return (
        <div>
            <div className='font-bold text-3xl'>hi</div>
        </div>
    )
}