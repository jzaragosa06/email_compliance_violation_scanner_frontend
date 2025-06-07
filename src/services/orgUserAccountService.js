import api from "../config/api"

export const fetchOrgUserAccountsInOrganization = async (org_id) => {
    return await api.get(`/api/orgs/${org_id}/user-accounts`);
}

export const addOrgUserAccount = async (org_id, formData) => {
    return await api.post(`/api/orgs/${org_id}/user-accounts`, formData)
}

export const updateOrgUserAccountAnalysisStartingDate = async (org_user_account_id, formData) => {
    return await api.patch(`/api/orgs/user-accounts/${org_user_account_id}/analysis-starting-date`, formData);
}