import api from "../config/api";

export const orgManageByUser = async () => {
    return await api.get('/api/users/me/orgs');
}

export const addOrg = async (formData) => {
    return await api.post('/api/orgs', formData);
}

export const updateOrgInfos = async (org_id, formData) => {
    return await api.patch(`/api/orgs/${org_id}`, formData)
}