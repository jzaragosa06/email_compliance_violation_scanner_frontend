import api from "../config/api"

export const fetchViolations = async (org_id, org_user_account_id) => {
    return await api.get(`/api/orgs/${org_id}/user-accounts/${org_user_account_id}/violations`)
}

export const updateViolationStatus = async (email_violation_id, formData) => {
    return await api.patch(`/api/orgs/user-accounts/violations/${email_violation_id}/update-status`, formData);
}
