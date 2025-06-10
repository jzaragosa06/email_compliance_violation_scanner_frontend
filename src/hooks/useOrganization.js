import { useEffect, useState } from "react"
import { addOrg, orgManageByUser, updateOrgInfos } from "../services/orgService";
import { updateIsActive, updateScheduleExpression, updateSendEmail } from "../services/managementService";

//these are orgnization manage by user
export const useOrganization = () => {
    const [organizations, setOrganizations] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [error, setError] = useState(null);

    const updateRecieveEmail = async (send_email) => {
        try {
            const response = await updateSendEmail(selectedOrg.management_id, { send_email });
            console.log('updated recieve email', response);

            //update first the organizations
            setOrganizations((orgs) => orgs.map(org =>
                org.management_id === selectedOrg.management_id
                    ? { ...org, send_email }
                    : org
            ));

            //then update the send_email
            setSelectedOrg((prev) => ({ ...prev, send_email: send_email }));
            return;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to update recieve email");
        }
    }

    const updateAutomateAnalysis = async (is_active) => {
        try {

            const response = await updateIsActive(selectedOrg.management_id, { is_active });
            console.log('updated isactive email', response);

            //update the organiztions first
            setOrganizations(orgs => orgs.map(org =>
                org.management_id === selectedOrg.management_id
                    ? { ...org, is_active }
                    : org
            ));

            //then update teh is_active
            setSelectedOrg((prev) => ({ ...prev, is_active: is_active }));
            return;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to update recieve email");
        }
    }

    const updateSchedule = async (scheduled_expression) => {
        try {
            const response = await updateScheduleExpression(selectedOrg.management_id, { scheduled_expression });
            console.log('updated schedule email', response);

            //update the organizations
            setOrganizations(orgs => orgs.map(org =>
                org.management_id == selectedOrg.management_id
                    ? { ...org, scheduled_expression }
                    : org
            ));

            //then update the schedule expression
            setSelectedOrg((prev) => ({ ...prev, scheduled_expression: scheduled_expression }));
        } catch (error) {
            console.log(error);
            throw new Error("Failed to update recieve email");
        }
    }

    const fetchOrganizations = async () => {
        try {
            const response = await orgManageByUser();
            console.log('organizations ----', response);

            const orgs = response.data.orgs.map(org => ({
                management_id: org.management_id,
                user_id: org.user_id,
                org_id: org.org_id,
                org_domain: org.Org.org_domain,
                org_name: org.Org.OrgInfo.org_name,
                created_at: org.Org.created_at,
                org_email: org.Org.OrgInfo.org_email,
                org_phone: org.Org.OrgInfo.org_phone,
                org_description: org.Org.OrgInfo.org_description,
                org_employee_count: org.Org.OrgInfo.org_employee_count,
                org_logo: org.Org.OrgInfo.org_logo,
                updated_at: org.Org.OrgInfo.updated_at,
                is_active: org.ScheduledJob.is_active,
                send_email: org.ScheduledJob.send_email,
                scheduled_expression: org.ScheduledJob.scheduled_expression, 
            }));

            setOrganizations(orgs);
            setSelectedOrg(orgs[0]);
        } catch (error) {
            console.error("Error fetching orgs:", error);
            setError(error.message);
        }

    }

    const addOrganization = async (data) => {
        try {
            const response = await addOrg(data);

            console.log('add org', response);

            const org = {
                management_id: response.data.management.management_id,
                user_id: response.data.management.user_id,
                org_id: response.data.org.org_id,
                org_name: response.data.orgInfo.org_name,
                org_domain: response.data.org.org_domain,
                created_at: response.data.org.created_at,
                org_email: response.data.orgInfo.org_email,
                org_phone: response.data.orgInfo.org_phone,
                org_description: response.data.orgInfo.org_description,
                org_employee_count: response.data.orgInfo.org_employee_count,
                org_logo: response.data.orgInfo.org_logo,
                updated_at: response.data.orgInfo.updated_at,
                is_active: response.data.scheduledJob.is_active,
                send_email: response.data.scheduledJob.send_email,
                scheduled_expression: response.data.scheduledJob.scheduled_expression, 
            };

            setOrganizations((prev) => [...prev, org]);
            setSelectedOrg(org);

        } catch (error) {
            setError(error.message);
        }
    }

    const updateOrgInfo = async (data) => {
        try {
            console.log('data', data);

            const response = await updateOrgInfos(selectedOrg.org_id, data);
            console.log('update orginfo response', response);

            //update organizations
            setOrganizations((orgs => orgs.map(org =>
                org.org_id === selectedOrg.org_id
                    ? { ...org, org_name: data.org_name, org_email: data.org_email, org_phone: data.org_phone, org_description: data.org_description, org_employee_count: data.org_employee_count, org_logo: data.org_logo }
                    : org
            )));

            //update selected_org
            setSelectedOrg((prev) => ({ ...prev, org_name: data.org_name, org_email: data.org_email, org_phone: data.org_phone, org_description: data.org_description, org_employee_count: data.org_employee_count, org_logo: data.org_logo }))
            return;
        } catch (error) {
            console.log(error);
            console.log(error.message);


        }
    }

    useEffect(() => {
        fetchOrganizations();
    }, []);

    return {
        organizations,
        setOrganizations,
        selectedOrg,
        setSelectedOrg,
        error,
        setError,
        addOrganization,
        updateRecieveEmail,
        updateAutomateAnalysis,
        updateSchedule, 
        updateOrgInfo
    }
}