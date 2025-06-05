import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

export default function Register() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-lg bg-white border border-gray-200 p-8 rounded-2xl shadow-xl space-y-6">
                {/* Logo and App Name */}
                <div className="flex items-center justify-center space-x-3">
                    <img
                        src="/brand-logo.png"
                        alt="Brand Logo"
                        className="w-12 h-12 object-contain"
                    />
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                        MailSiever
                    </h1>
                </div>

                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Create your account</h2>
                    <p className="mt-1 text-sm text-gray-500">Fill in the form below to get started</p>
                </div>

                {/* Form */}
                <RegisterForm />

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm text-gray-500">
                        <span className="bg-white px-4">or continue with</span>
                    </div>
                </div>

                {/* Google Login */}
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200">
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-gray-700">Sign up with Google</span>
                </button>

                {/* Login Link */}
                <p className="text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="text-blue-600 hover:underline font-medium">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
