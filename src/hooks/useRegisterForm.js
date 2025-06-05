import { useState } from "react";

export default function useRegisterForm() {
    const [formData, setFormData] = useState({
        user_email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
        country: '',
        contact_number: '',
        job_title: '',
        privacy_consent_given: false,
    });

    return { formData, setFormData }
}