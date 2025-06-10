import api from "../config/api"

export const updateSendEmail = async (management_id, formData) => {
    return await api.patch(`/api/managements/${management_id}/scheduled-job/recieve-email-report`, formData)
}

export const updateIsActive = async (management_id, formData) => {
    return await api.patch(`/api/managements/${management_id}/scheduled-job/automate-analysis`, formData);
}

export const updateScheduleExpression = async (management_id, formData) => {
    return await api.patch(`/api/managements/${management_id}/scheduled-job/schedule`, formData);
}