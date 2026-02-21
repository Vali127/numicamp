import { Routes, Route } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";

const PersonHome = lazy(() => import("./user-ui/personal-ui/person.home.jsx").then(m => ({ default: m.PersonHome })));
const OrgHome = lazy(() => import("./user-ui/organisational-ui/org.home.jsx").then(m => ({ default: m.OrgHome })));
const AdminHome = lazy(() => import("./user-ui/admin-ui/AdminHome.jsx").then(m => ({ default: m.AdminHome })));

export const MainEntry = () => {
    const [usage, setUsage] = useState(null);

    useEffect(() => {
        setUsage(localStorage.getItem("usage"));
    }, []);

    return (
        <div className="w-screen h-screen">
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {usage === "personal" && (<Route path="/*" element={<PersonHome />} />)}
                    {usage === "organisational" && (<Route path="/*" element={<OrgHome />} />)}
                    {usage === "admin" && (<Route path="/*" element={<AdminHome />} />)}
                </Routes>
            </Suspense>
        </div>
    );
};