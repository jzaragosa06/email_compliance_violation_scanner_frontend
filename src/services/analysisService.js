import api from "../config/api"

export const analyzeSelectedAccounts = async (org_id) => {
    return await api.get(`/api/orgs/${org_id}/user-accounts/analyze`);
}

export const analyzeAllAccounts = async (org_id) => {
    return await api.get(`/api/orgs/${org_id}/user-accounts/analyze-all-authenticated-accounts`);
}