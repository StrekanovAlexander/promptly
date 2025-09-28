import { toast } from "react-hot-toast";
import { Mail, Edit3 } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import Spinner from "../../components/icons/Spinner.jsx";


export default function AccountPage() {
    const { user } = useAuth();

    function handleEdit() {
        toast.error("This functionality is still under development.");
    }

    if (!user) {
        return (
            <div className="my-8">
                <Spinner />;
            </div>
        )
    }    
    
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Account</h1>
            <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <Mail className="text-gray-500" size={20} />
                    <span className="text-gray-800">{user.email}</span>
                </div>

                <div className="pt-2">
                    <button
                        onClick={handleEdit} 
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition">
                        <Edit3 size={18} />
                        Edit data
                    </button>
                </div>
            </div>
        </div>
    )
}
