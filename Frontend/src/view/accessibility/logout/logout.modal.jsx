import { Modal } from "../../components/modal.jsx";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { LogoutModel } from "../../../model/logout.model.js";
import {useQueryClient} from "@tanstack/react-query";

export const LogoutModal = ({SetLogout}) => {
    const navigate = useNavigate();
    const MODEL = LogoutModel()
    const queryClient = useQueryClient();

    const HandleLogout = async () => {
        await MODEL.logout()
        localStorage.clear()
        queryClient.clear()
        navigate("/");
    }

    return (
        <Modal Type={"red"}>
            <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <LogOut className="w-7 h-7 sm:w-8 sm:h-8 text-red-600" />
                </div>
            </div>

            <div className="text-center mb-4 sm:mb-6 px-2">
                <h2 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
                    Déconnexion
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Êtes-vous sûr de vouloir vous déconnecter ?
                </p>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
                <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors duration-150 active:scale-[0.98] text-sm sm:text-base"
                    onClick={HandleLogout}
                >
                    Oui, se déconnecter
                </button>
                <button
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors duration-150 active:scale-[0.98] text-sm sm:text-base"
                    onClick={() => { SetLogout(false) }}
                >
                    Annuler
                </button>
            </div>
        </Modal>
    )
}