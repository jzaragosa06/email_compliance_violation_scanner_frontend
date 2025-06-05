import api from "../config/api";

export const orgManageByUser = async () => {
    return await api.get('/api/users/me/orgs');
}

export const addOrg = async (data) => {
    return await api.post('/api/orgs', data);
}