import { useState } from "react"


export const useOrgForm = () => {
    const [formData, setFormData] = useState({
        org_domain: '',
        org_email: '',
        org_name: '',
        org_phone: '',
        org_description: '',
        org_employee_count: null,
        org_logo: '',
    });

    return { formData, setFormData };
}