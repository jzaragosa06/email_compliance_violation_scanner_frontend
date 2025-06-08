import api from "../config/api"

export const fetchOrgUserAccountsInOrganization = async (org_id) => {
    return await api.get(`/api/orgs/${org_id}/user-accounts`);
}

export const findOrgUserAccountsInOrganization = async (org_id, query) => {
    return await api.get(`/api/orgs/${org_id}/user-accounts?query=${query}`);
}

export const addOrgUserAccount = async (org_id, formData) => {
    return await api.post(`/api/orgs/${org_id}/user-accounts`, formData)
}

export const updateOrgUserAccountAnalysisStartingDate = async (org_user_account_id, formData) => {
    return await api.patch(`/api/orgs/user-accounts/${org_user_account_id}/analysis-starting-date`, formData);
}

export const updateAccountActiveStatus = async (org_user_account_id, formData) => {
    return await api.patch(`/api/orgs/user-accounts/${org_user_account_id}/update-account-status`, formData);
}

export const analyzeAccountForViolations = async (org_id, formData) => {
    return await api.post(`/api/orgs/${org_id}/user-accounts/analyze`, formData);
}

export const analyzeAllAuthenticatedAccountsForViolations = async (org_id) => {
    return await api.get(`/api/orgs/${org_id}/user-accounts/analyze-all-authenticated-accounts`);
}