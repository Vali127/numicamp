import React from 'react'
import { SchoolAdminHeader } from './school.admin.Header'
import { SchoolForm } from './school.form'
import {AdminSchoolViewModel} from "../../../viewmodel/section-vm/admin.school.section.vm.js";

const AdminSchoolSection = () => {
    const {
        currentTab,
        setCurrentTab,
        HandleImage,
        imagePreview,
        resetImage,
        schoolData,
        setSchoolData,
        status,
        sendData,
        message
    } = AdminSchoolViewModel()
  return (
    <div className='text-left'>
        <SchoolAdminHeader currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div className=''>
            { (currentTab === "inscription") &&
                <SchoolForm
                    status={status}
                    message={message}
                    sendData={sendData}
                    schoolData={schoolData}
                    setSchoolData={setSchoolData}
                    HandleImage={HandleImage}
                    imagePreview={imagePreview}
                    resetImage={resetImage}/>}
            { (currentTab === "list") && <div className=''>Hello</div>}
        </div>
    </div>
  )
}

export default AdminSchoolSection