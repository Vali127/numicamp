import React from 'react'
import { SchoolAdminHeader } from './school.admin.Header'
import { SchoolForm } from './school.form'
import {AdminSchoolViewModel} from "../../../viewmodel/section-vm/admin.school.section.vm.js";
import {SchoolList} from "./SchoolList.jsx";

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
            { (currentTab === "list") && <SchoolList/> }
        </div>
    </div>
  )
}

export default AdminSchoolSection