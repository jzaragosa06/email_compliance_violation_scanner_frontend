import {
    XMarkIcon,
} from "@heroicons/react/24/outline";


const AnalysisResultModal = ({ result, setShowResultModal }) => {
    const handleClose = () => {
        setShowResultModal(false);
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-lg border border-gray-100">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-5 right-5 rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition"
                    aria-label="Close"
                >
                    <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>

                <div className="flex flex-col space-y-8 items-center">
                    <h3 className="text-xl font-semibold text-gray-900">Result of Analysis</h3>

                    <div className="w-full space-y-6">
                        {/* Item */}
                        <div className="flex items-center gap-6">
                            <div className="flex w-14 h-14 items-center justify-center rounded-full bg-gradient-to-tr from-orange-400 to-orange-500 text-white font-bold text-lg shadow-md">
                                {result.processedAccount}
                            </div>
                            <p className="text-gray-700 text-base font-medium">
                                Total Authenticated Accounts Processed
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex w-14 h-14 items-center justify-center rounded-full bg-gradient-to-tr from-orange-400 to-orange-500 text-white font-bold text-lg shadow-md">
                                {result.errorsCount}
                            </div>
                            <p className="text-gray-700 text-base font-medium">
                                Total Number of Errors during Analysis
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex w-14 h-14 items-center justify-center rounded-full bg-gradient-to-tr from-orange-400 to-orange-500 text-white font-bold text-lg shadow-md">
                                {result.violationsCount}
                            </div>
                            <p className="text-gray-700 text-base font-medium">
                                Total Number of Violations Detected
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleClose}
                        className="max-w-xs px-8 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
                    >
                        Close
                    </button>
                </div>
            </div>

        </div>
    );
};

const StatCard = ({ value, label }) => {
    return (
        <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 shadow-sm hover:shadow-md transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                {value}
            </div>
            <div className="text-left text-sm text-gray-700">{label}</div>
        </div>
    );
}

export default AnalysisResultModal;
