import api from "../config/api"


export const registerUser = async (formData) => {
    return await api.post('/api/auth/user/register/local', formData);
}

export const loginUser = async (formData) => {
    return await api.post('/api/auth/user/login/local', formData);
}

export const createGoogleAuthURL = async (type) => {
    return await api.get(`/api/auth/user/${type}/google`);
}