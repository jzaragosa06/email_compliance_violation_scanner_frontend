import api from "../config/api"

export const fetchUser = async () => {
    return await api.get('/api/users/me');
}

export const updateUser = async () => {
    
}