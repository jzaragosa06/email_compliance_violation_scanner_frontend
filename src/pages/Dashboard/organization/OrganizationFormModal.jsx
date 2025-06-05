import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useOrgForm } from "../../../hooks/useOrgForm";


const OrganizationFormModal = ({ isAddOrg, setIsAddOrg, addOrganization }) => {
    const { formData, setFormData } = useOrgForm();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            addOrganization(formData);
        } catch (error) {
            setError(error.message);
        }
        finally {
            setIsLoading(false);
            setIsAddOrg(!isAddOrg);
        }
    }

    const handleCancel = () => {
        setIsAddOrg(!isAddOrg);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/20 px-4">
            {/* Modal content */}
            <div className="w-full max-w-2xl space-y-4 rounded-xl bg-white px-8 py-6 shadow-2xl">
                <h2 className="text-xl font-semibold text-gray-800">Add New Organization</h2>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-3">
                        <Input
                            label="Organization Domain"
                            type="text"
                            value={formData.org_domain}
                            onChange={(e) => setFormData({ ...formData, org_domain: e.target.value })}
                            required
                        />
                        <Input
                            label="Organization Name"
                            type="text"
                            value={formData.org_name}
                            onChange={(e) => setFormData({ ...formData, org_name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex gap-3">
                        <Input
                            label="Organization Email"
                            type="email"
                            value={formData.org_email}
                            onChange={(e) => setFormData({ ...formData, org_email: e.target.value })}
                            required
                        />
                        <Input
                            label="Organization Contact Number"
                            type="number"
                            value={formData.org_phone}
                            onChange={(e) => setFormData({ ...formData, org_phone: e.target.value })}
                        />
                        <Input
                            label="Organization Employee Count"
                            type="number"
                            value={formData.org_employee_count}
                            onChange={(e) => setFormData({ ...formData, org_employee_count: e.target.value })}
                        />
                    </div>
                    <Input
                        label="Organization Description"
                        type="text"
                        value={formData.org_description}
                        onChange={(e) => setFormData({ ...formData, org_description: e.target.value })}
                    />
                    <Input
                        label="Organization Logo"
                        type="text"
                        value={formData.org_logo}
                        onChange={(e) => setFormData({ ...formData, org_logo: e.target.value })}
                    />

                    <div className="flex justify-end gap-3 pt-4">


                        <button
                            type="button"
                            onClick={handleCancel}
                            className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-orange-400 px-4 py-2 text-sm text-white hover:bg-orange-500"
                        >
                            {isLoading ? "Loading..." : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default OrganizationFormModal; 