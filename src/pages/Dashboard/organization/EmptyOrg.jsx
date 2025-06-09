const EmptyOrg = ({ setIsAddOrg }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center px-6 py-12 rounded-2xl bg-white">
            <img
                src="https://img.freepik.com/premium-vector/market-research-business-flat-style-illustration-kit_220346-303.jpg"
                alt="No records illustration"
                className="w-64 h-64 object-contain mb-6"
            />
            <p className="text-lg text-gray-700 mb-4 text-center">
                Hey! You have no organizations registered. Add one to start.
            </p>
            <button
                className="px-6 py-2 bg-orange-400 text-white rounded-xl font-medium hover:bg-orange-500 transition"
                onClick={() => setIsAddOrg(true)}
            >
                Add Organization
            </button>
        </div>
    );
}

export default EmptyOrg; 