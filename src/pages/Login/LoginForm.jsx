import { useState } from "react";
import useLoginForm from "../../hooks/useLoginForm";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { loginUser } from "../../services/authService";


export default function LoginForm() {
    const { formData, setFormData } = useLoginForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await loginUser(formData);

            const { token } = response.data;
            localStorage.setItem('token', token);

            navigate('/dashboard?new=true');
        } catch (error) {
            setError(error?.response?.data?.message || "Registration Failed");
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <div className="flex flex-col justify-center border-gray-400 rounded-lg p-3">
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    type="email"
                    value={formData.user_email}
                    onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <Button
                    type="submit"
                    className="w-full bg-amber-600 text-white hover:bg-amber-700"
                >
                    {loading ? "Loading ..." : "Login"}

                </Button>
            </form>
        </div>
    );
}