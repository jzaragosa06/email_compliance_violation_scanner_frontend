import LoginForm from "./LoginForm";
import { useVerifyQuery } from "../../hooks/useVerifyEmailQuery";
import { Link } from "react-router-dom";

export default function Login() {
    const verify = useVerifyQuery();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
                {/* Logo and App Name */}
                <div className="flex items-center justify-center space-x-3">
                    <img src="/brand-logo.png" alt="Brand Logo" className="w-12 h-12" />
                    <h1 className="text-2xl font-bold text-gray-800">MailSiever</h1>
                </div>

                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Login</h2>
                    <p className="text-sm text-gray-500">Enter your credentials to continue</p>
                </div>

                {/* Verification Message */}
                {verify && (
                    <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded text-center">
                        Verify your account to continue
                    </div>
                )}

                {/* Login Form */}
                <LoginForm />

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm text-gray-500">
                        <span className="bg-white px-2">or</span>
                    </div>
                </div>

                {/* Google Login Placeholder */}
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    <span className="text-sm font-medium text-gray-700">Login with Google</span>
                </button>

                {/* Register Link */}
                <div className="text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/auth/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
