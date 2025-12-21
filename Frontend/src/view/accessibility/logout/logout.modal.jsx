import { Modal } from "../../components/modal.jsx";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export const LogoutModal = ({SetLogout}) => {
    const navigate = useNavigate();
    const HandleLogout = () => {
        navigate("/");
        localStorage.clear('token')
    }

    return (
        <Modal Type={"red"}>
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <LogOut className="w-8 h-8 text-red-600" />
                </div>
            </div>

            <div className="text-center mb-6">
                <h2 className="font-bold text-xl text-gray-900 mb-2">
                    Déconnexion
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                    Êtes-vous sûr de vouloir vous déconnecter ?
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-150 active:scale-[0.98]"
                    onClick={HandleLogout}
                >
                    Oui, se déconnecter
                </button>
                <button
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-150 active:scale-[0.98]"
                    onClick={() => { SetLogout(false) }}
                >
                    Annuler
                </button>
            </div>
        </Modal>
    )
}