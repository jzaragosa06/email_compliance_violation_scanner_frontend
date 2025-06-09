import { useEffect } from "react";

const GoogleCallback = () => {

    useEffect(() => {
        // Get the token from the URL response
        const params = new URLSearchParams(window.location.search);
        const response = JSON.parse(params.get('response') || '{}');

        if (response.token) {
            // Send message to parent window
            window.opener.postMessage({
                type: 'GOOGLE_AUTH_SUCCESS',
                token: response.token
            }, window.location.origin);
        }
    }, []);

    // return (
    //     <div className="flex items-center justify-center min-h-screen">
    //         <div className="flex items-center justify-center space-x-3">
    //             <img
    //                 src="/brand-logo.png"
    //                 alt="Brand Logo"
    //                 className="w-12 h-12 object-contain"
    //             />
    //             <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
    //                 MailSiever
    //             </h1>
    //             <span>Building trust, one email at a time</span>
    //         </div>
    //         <span className="w-16 h-16 border-2 border-white border-t-transparent rounded-full animate-spin" />
    //         <p className="text-gray-600">Completing authentication...</p>
    //     </div>
    // );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="space-y-8 text-center">
                {/* Logo and Brand Section */}
                <div className="flex items-center justify-center space-x-3">
                    <img
                        src="/brand-logo.png"
                        alt="Brand Logo"
                        className="w-10 h-10 object-contain"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">
                        MailSiever
                    </h1>
                </div>

                {/* Loading Animation */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-600">Completing authentication...</p>
                </div>
            </div>
        </div>
    );
}

export default GoogleCallback; 