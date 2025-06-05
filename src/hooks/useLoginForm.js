import { useState } from "react";

export default function useLoginForm() {
    const [formData, setFormData] = useState({
        user_email: '',
        password: '',
    });
    return { formData, setFormData };
}