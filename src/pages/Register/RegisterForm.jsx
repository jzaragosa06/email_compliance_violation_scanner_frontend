import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import useRegisterForm from "../../hooks/useRegisterForm";
import { validateRegisterForm } from "../../utils/validation";
import { registerUser } from "../../services/authService";

export default function RegisterForm() {
    const { formData, setFormData } = useRegisterForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const errors = validateRegisterForm(formData);
        if (errors) {
            setError(errors);
            return;
        }

        setLoading(true);

        try {
            await registerUser(formData);
            navigate('/auth/login?verify=true');
        } catch (error) {
            setError(error?.response?.data?.message || "Registration Failed");
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="w-full max-w-xl bg-white rounded-2xl p-6 space-y-6">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Email"
                    type="email"
                    value={formData.user_email}
                    onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                    required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        required
                    />
                    <Input
                        label="Last Name"
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label="Country"
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                    <Input
                        label="Contact Number"
                        type="number"
                        value={formData.contact_number}
                        onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                    />
                    <Input
                        label="Job Title"
                        type="text"
                        value={formData.job_title}
                        onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                    />
                </div>

                <Input
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    value={formData.confirm_password}
                    onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                    required
                />

                <Button
                    type="submit"
                    className="w-full bg-amber-600 text-white hover:bg-amber-700 transition duration-200 py-2 rounded-xl"
                >
                    {loading ? "Loading..." : "Register"}
                </Button>
            </form>
        </div>

    );

}