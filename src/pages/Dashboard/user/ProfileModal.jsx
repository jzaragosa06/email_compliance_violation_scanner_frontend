import {
    XMarkIcon,
    BriefcaseIcon,
    GlobeAltIcon,
    PhoneIcon,
    CheckCircleIcon,
    CalendarIcon,
} from "@heroicons/react/24/outline";
import { toLocalTime } from "../../../utils/date";

const ProfileModal = ({ user, setIsProfile }) => {
    const handleClose = () => {
        setIsProfile(false);
    };

    const InfoItem = ({ icon: Icon, label, value }) => (
        <div className="flex items-start space-x-2">
            <Icon className="w-5 h-5 mt-1 text-gray-400" />
            <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-sm text-gray-500">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition"
                >
                    <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>

                {/* Profile Header */}
                <div className="flex items-center space-x-4">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-UpYd8X5-k7LnC0viaTntL83eb-QILB08DA&s"
                        alt="Profile"
                        className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            {user.first_name} {user.last_name}
                        </h3>
                        <p className="text-sm text-gray-500">{user.user_email}</p>
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InfoItem icon={BriefcaseIcon} label="Job Title" value={user.job_title} />
                    <InfoItem icon={GlobeAltIcon} label="Country" value={user.country} />
                    <InfoItem icon={PhoneIcon} label="Contact" value={user.contact_number} />
                    <InfoItem
                        icon={CheckCircleIcon}
                        label="Verified"
                        value={user.is_verified ? "Yes" : "No"}
                    />
                    <div className="sm:col-span-2">
                        <InfoItem
                            icon={CalendarIcon}
                            label="Joined"
                            value={toLocalTime(user.created_at)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
