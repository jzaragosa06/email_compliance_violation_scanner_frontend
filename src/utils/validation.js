export function validateRegisterForm(formData) {
    if (!formData.user_email.includes('@')) {
        return "Email is invalid";
    }

    if (formData.password != formData.confirm_password) {
        return "Password do not match";
    }

    return "";
}