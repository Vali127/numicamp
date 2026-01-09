import {schoolListVm} from "../../../viewmodel/section-vm/admin.school.section.vm.js";
import {useEffect} from "react";
import {SchoolCard} from "./school.card.jsx";
import {ThreeDots} from "react-loader-spinner";
import {AlertCircle} from "lucide-react";



export const SchoolList = () => {
    const { list, status, FetchSchool } = schoolListVm()

    useEffect(() => {
        FetchSchool()
    }, []);

    return (
        <>
            {status === 'loading' && <LoadingState />}
            {status === 'error' && <ErrorState />}
            {status === 'success' && <SchoolListContent list={list} />}
        </>
    )
}

const LoadingState = () => (
    <div className="flex items-center justify-center min-h-[400px]">
        <ThreeDots
            height="80"
            width="80"
            color="#4F46E5"
            ariaLabel="loading"
        />
    </div>
)

const ErrorState = () => (
    <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-red-600">
            <AlertCircle size={64} />
            <p className="text-lg font-medium">Erreur lors du chargement des écoles</p>
        </div>
    </div>
)

const SchoolListContent = ({ list }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2" >
        {list.map((school) => (
            <SchoolCard
                key={school.id}
                school={school}
                isAdmin={true}
            />
        ))}
    </div>
)
