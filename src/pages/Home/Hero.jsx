export default function Hero() {
    return (
        <section className="w-full bg-white py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">

            {/* Left: Text Content */}
            <div className="flex-1 max-w-xl space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                    Simple Email Policy <span className="text-orange-400">Compliance Scanner</span>
                </h1>
                <h2 className="text-lg md:text-xl text-gray-600">
                    Building trust, one email at a time.
                </h2>
                <span className="text-gray-600 text-sm">
                    Protect your organization/business from email violations. Register your organization user accounts, and let
                    system analyze potential email violations. Notify in real-time when violations get detected. Get detailed reports.
                    You can customize the the email policy for your organization, and let the system detects them for you.
                </span>
                <div className="flex gap-4 mt-6">
                    <button className="px-6 py-3 bg-orange-400 text-white border rounded-xl hover:bg-orange-500 hover:text-white transition">
                        Get Started
                    </button>
                    <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-400 hover:text-white transition">
                        Learn More
                    </button>
                </div>
            </div>

            {/* Right: Image Placeholder */}
            <div className="flex flex-1 justify-center">
                <div className="hidden md:flex w-72 h-72 bg-gray-200 rounded-xl shadow-inner items-center justify-center text-gray-500">
                    {/* Replace with an actual image or illustration */}
                    Image
                </div>
            </div>
        </section>
    );
}
