import { useEffect, useState } from "react";
import { addOrgUserAccount, fetchOrgUserAccountsInOrganization } from "../services/orgUserAccountService"

export const useOrgUserAccount = (org) => {
    const [accounts, setAccounts] = useState([]);
    const [isAccountsLoading, setIsAccountsLoading] = useState(true);
    const [isAddAccountLoading, setIsAddAccountLoading] = useState(true);

    const addOrgUserAccounts = async (formData) => {
        setIsAddAccountLoading(true);
        try {
            const response = await addOrgUserAccount(org.org_id, formData);
            console.log('new org user account response: ', response);

            const newAccounts = response.data.accounts.map(acc => ({
                org_user_account_id: acc.org_user_account.org_user_account_id,
                email: acc.org_user_account.email,
                created_at: acc.org_user_account.created_at,
                email_account_auth_id: acc.email_account_auth.email_account_auth_id,
                email_account_status_id: acc.email_account_status.email_account_status_id,
                is_authenticated: acc.email_account_status.is_authenticated,
                is_active: acc.email_account_status.is_active,
                analysis_log_id: acc.email_analysis_log.analysis_log_id,
                analysis_starting_date: acc.email_analysis_log.analysis_starting_date,
                last_analyzed: acc.email_analysis_log.last_analyzed,
            }));

            console.log('cleaned account: ', newAccounts);

            //how we update the accounts is incorrect. 
            // setAccounts([...accounts, account]);
            setAccounts((prev) => [...prev, ...newAccounts])
        } catch (error) {
            console.log('Failed to add new accounts', error.message);
        }
        finally {
            setIsAddAccountLoading(false);
        }
    }

    useEffect(() => {
        if (!org) return;

        setIsAccountsLoading(true);
        const fetchOrgUserAccounts = async () => {
            try {
                const response = await fetchOrgUserAccountsInOrganization(org.org_id);
                console.log('accounts response', response);

                const accounts = response.data.accounts.map(acc => ({
                    org_user_account_id: acc.org_user_account_id,
                    email: acc.email,
                    created_at: acc.created_at,
                    email_account_auth_id: acc.EmailAccountAuth.email_account_auth_id,
                    email_account_status_id: acc.EmailAccountStatus.email_account_status_id,
                    is_authenticated: acc.EmailAccountStatus.is_authenticated,
                    is_active: acc.EmailAccountStatus.is_active,
                    analysis_log_id: acc.EmailAnalysisLog.analysis_log_id,
                    analysis_starting_date: acc.EmailAnalysisLog.analysis_starting_date,
                    last_analyzed: acc.EmailAnalysisLog.last_analyzed,
                }));


                setAccounts(accounts);
            } catch (error) {
                console.log('failed to fetch org user accounts', error);

            }
            finally {
                setIsAccountsLoading(false);
            }
        }

        fetchOrgUserAccounts();
    }, [org]);



    return {
        accounts,
        setAccounts,
        isAccountsLoading,
        setIsAccountsLoading,
        addOrgUserAccounts,
        isAddAccountLoading,
        setIsAddAccountLoading

    }
}