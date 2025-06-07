import { useEffect, useState } from "react"
import { addOrg, orgManageByUser } from "../services/orgService";

//these are orgnization manage by user
export const useOrganization = () => {
    const [organizations, setOrganizations] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [error, setError] = useState(null);

    const fetchOrganizations = async () => {

        try {
            const response = await orgManageByUser();
            const orgs = response.data.orgs.map(org => ({
                management_id: org.management_id,
                user_id: org.user_id,
                org_id: org.org_id,
                org_domain: org.Org.org_domain,
                org_name: org.Org.OrgInfo.org_name,
            }));

            setOrganizations(orgs);
            setSelectedOrg(orgs[0]);
        } catch (error) {
            console.error("Error fetching orgs:", error);
            setError(error.message);
        }

    }

    const addOrganization = async (data) => {
        //data (object): org_domain, org_email, org_name (org_phone
        //org_description, org_employee_count, org_logo)
        try {
            const response = await addOrg(data);

            const org = {
                management_id: response.data.management.management_id,
                user_id: response.data.management.user_id,
                org_id: response.data.org.org_id,
                org_name: response.data.orgInfo.org_name,
                org_domain: response.data.org.org_domain
            };

            setOrganizations((prev) => [...prev, org]);
            setSelectedOrg(org);

        } catch (error) {
            setError(error.message);
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
    }
}