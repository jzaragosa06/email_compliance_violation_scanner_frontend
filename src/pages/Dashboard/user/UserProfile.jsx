import { ArrowLeftStartOnRectangleIcon, ChevronDownIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const UserProfile = ({ user }) => {
    const [isToggle, setIsToggle] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsToggle(!isToggle);
    }

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/auth/login');
    }

    return (
        <div className="relative">
            <div className="flex justify-center items-center px-4 py-2 space-x-3">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
                    className="w-10 h-10"
                />
                <div className="flex flex-col">
                    <h4 className="font-semibold text-sm text-gray-700">{user.first_name}</h4>
                    <p className="font-medium text-xs text-gray-500">{user.job_title ? user.job_title : 'N/A'}</p>
                </div>
                <button
                    className="p-2 rounded-full border border-gray-500 hover:bg-gray-100"
                    onClick={handleToggle}
                >
                    <ChevronDownIcon className={`w-2 h-2 transform transition-transform duration-200 ${isToggle && 'rotate-180'}`} />
                </button>
            </div>
            {isToggle && (
                <div className="absolute left-0 z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg">
                    <div className="py-2">
                        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
                            <UserCircleIcon className="w-5 h-5 mr-3 text-gray-500" />
                            Profile
                        </button>
                        <button
                            onClick={handleLogOut}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                        >
                            <ArrowLeftStartOnRectangleIcon className="w-5 h-5 mr-3 text-gray-500" />
                            Log Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfile; 