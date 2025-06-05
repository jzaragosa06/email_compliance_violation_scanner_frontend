import api from "../config/api"

export const fetchOrgUserAccountsInOrganization = async (org_id) => {
    return await api.get(`/api/orgs/${org_id}/user-accounts`);
}

export const addOrgUserAccount = async (org_id, formData) => {
    return await api.post(`/api/orgs/${org_id}/user-accounts`, formData)
}