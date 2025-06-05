import { Link } from "react-router-dom"
export default function NavBar() {

    return (
        <nav className="w-full flex items-center justify-between p-8 bg-white">
            {/* logo and branding */}
            <div className="text-2xl font-extrabold text-orange-400 ">
                MailSiever
            </div>

            {/* navigation links */}
            <div className="hidden md:flex gap-6 tex-gray-700 font-medium">
                <Link to="/" className="hover:text-orange-400 transition">Home</Link>
                <a href="#service" className="hover:text-orange-400 transition">Service</a>
                <a href="#about" className="hover:text-orange-400">About</a>
            </div>

            {/* Auth Links */}
            <div className="hidden md:flex gap-4 text-sm font-semibold">
                <Link
                    to="/auth/login"
                    className="px-4 py-2 border rounded-lg hover:bg-gray-400 hover:text-white hover:border-white transition"
                >
                    Login
                </Link>
                <Link
                    to="/auth/register"
                    className="px-4 py-2 bg-orange-400 rounded-lg border text-white hover:bg-orange-500 hover:text-white hover:border-orange-500 transition"
                >
                    Register
                </Link>
            </div>
        </nav>
    )
}


