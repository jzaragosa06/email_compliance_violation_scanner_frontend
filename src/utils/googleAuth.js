import { createGoogleAuthURL } from "../services/authService";

export const handleGoogleAuth = async (type, navigate) => {
    try {
        const response = await createGoogleAuthURL(type);
        const { authUrl } = response.data;

        //open a window for google auth
        const popup = window.open(authUrl, '_blank', 'width=500,height=600');


        // Add window message listener
        const handleMessage = (event) => {
            // Verify origin for security
            if (event.origin !== window.location.origin) return;

            if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
                // Store the token
                localStorage.setItem('token', event.data.token);
                // Close popup
                popup?.close();
                // Navigate to dashboard
                type === 'register' ? navigate('/dashboard?new=true') : navigate('/dashboard');

                // Remove listener
                window.removeEventListener('message', handleMessage);
            }
        };

        window.addEventListener('message', handleMessage);

    } catch (error) {
        console.log(error);

    }
}