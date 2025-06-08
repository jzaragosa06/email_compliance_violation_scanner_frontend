import { useEffect, useState } from "react";
import { addOrgUserAccount, analyzeAccountForViolations, analyzeAllAuthenticatedAccountsForViolations, fetchOrgUserAccountsInOrganization, findOrgUserAccountsInOrganization, updateAccountActiveStatus, updateOrgUserAccountAnalysisStartingDate } from "../services/orgUserAccountService"
import { fetchViolations, updateViolationStatus } from "../services/violationsService";

export const useOrgUserAccount = (org) => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [violations, setViolations] = useState([]); 

    const addOrgUserAccounts = async (formData) => {
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
    }

    const updateConfirmedViolationStatus = async (email_violation_id, is_confirmed_violation) => {

        try {
            const response = await updateViolationStatus(email_violation_id, { is_confirmed_violation: is_confirmed_violation });
            console.log('update violation response: ', response);
        } catch (error) {
            console.log(error);
            throw error;

        }

        return;
    }

    const updateAnalysisStartDate = async (org_user_account_id, analysis_starting_date) => {
        try {
            const response = await updateOrgUserAccountAnalysisStartingDate(org_user_account_id, { analysis_starting_date: analysis_starting_date });
            console.log('update start date', response);

            //update the state of the acccounts
            setAccounts((prev) => prev.map(acc => acc.org_user_account_id === org_user_account_id ? { ...acc, analysis_starting_date: analysis_starting_date } : acc))

            //update the selectedAccounts
            setSelectedAccount((prev) => ({ ...prev, analysis_starting_date: analysis_starting_date }))

            return;
        } catch (error) {
            console.log(error);
            throw error
        }

    }

    const updateAccountStatus = async (org_user_account_id, is_active) => {
        try {
            const response = await updateAccountActiveStatus(org_user_account_id, { is_active });
            console.log('update status response: ', response);

            // Corrected map usage
            setAccounts(prev =>
                prev.map(acc =>
                    acc.org_user_account_id === org_user_account_id
                        ? { ...acc, is_active }
                        : acc
                )
            );

            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const analyzeAccount = async (email) => {
        try {
            const response = await analyzeAccountForViolations(org.org_id, { emails: [email] });

            console.log('new violations', response);

            //update the contents of violation by making another api call
            if (selectedAccount && selectedAccount.email == email) {
                const violationResponse = await fetchViolations(selectedAccount.org_id, selectedAccount.org_user_account_id);
                //clean it and store it. 
                setViolations(violationResponse.data.violations.map((v) => ({
                    email_violation_id: v.email_violation_id,
                    is_confirmed_violation: v.is_confirmed_violation,
                    reviewed_at: v.reviewed_at,
                    note: v.note,
                    created_at: v.created_at,
                    email_subject: v.ViolationEvidence.email_subject,
                    evidence_tag: v.ViolationEvidence.evidence_tag.map(tag => tag.replace('_', ' ').toLowerCase()),
                })));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const analyzeAllAccount = async () => {
        try {
            const response = await analyzeAllAuthenticatedAccountsForViolations(org.org_id);
            console.log('analyze all account', response);

            //make another api call to fetch violations
            //this is the case when there is a selected account 
            //and there is a panel on the right. 
            //we need to update it. 
            if (selectedAccount) {
                const violationResponse = await fetchViolations(selectedAccount.org_id, selectedAccount.org_user_account_id);
                //clean it and store it. 
                setViolations(violationResponse.data.violations.map((v) => ({
                    email_violation_id: v.email_violation_id,
                    is_confirmed_violation: v.is_confirmed_violation,
                    reviewed_at: v.reviewed_at,
                    note: v.note,
                    created_at: v.created_at,
                    email_subject: v.ViolationEvidence.email_subject,
                    evidence_tag: v.ViolationEvidence.evidence_tag.map(tag => tag.replace('_', ' ').toLowerCase()),
                })));
            }

            //we can just extract the number of identified violations. 
            return {
                processedAccount: response.data.result.processedOrgUserAccountCount,
                errorsCount: response.data.result.errorsCount,
                violationsCount: response.data.result.violationsCount,
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const searchAccount = async (query) => {
        const response = await findOrgUserAccountsInOrganization(org.org_id, query);
        console.log('searched accounts response', response);

        const accounts = response.data.accounts.map(acc => ({
            org_user_account_id: acc.org_user_account_id,
            org_id: acc.org_id,
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
    }

    useEffect(() => {
        if (!selectedAccount) return;

        //fetch the violation for that account
        const fetchAccountViolations = async () => {
            console.log('selected ccounts: ', selectedAccount);

            const response = await fetchViolations(selectedAccount.org_id, selectedAccount.org_user_account_id);
            //clean it and store it. 

            console.log('selected account violations response', response);


            setViolations(response.data.violations.map((v) => ({
                email_violation_id: v.email_violation_id,
                is_confirmed_violation: v.is_confirmed_violation,
                reviewed_at: v.reviewed_at,
                note: v.note,
                created_at: v.created_at,
                email_subject: v.ViolationEvidence.email_subject,
                evidence_tag: v.ViolationEvidence.evidence_tag.map(tag => tag.replace('_', ' ').toLowerCase()),
            })));

        }

        fetchAccountViolations();

    }, [selectedAccount]); 

    useEffect(() => {
        if (!org) return;

        const fetchOrgUserAccounts = async () => {
            try {
                const response = await fetchOrgUserAccountsInOrganization(org.org_id);
                console.log('accounts response', response);

                const accounts = response.data.accounts.map(acc => ({
                    org_user_account_id: acc.org_user_account_id,
                    org_id: acc.org_id, 
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
        }

        fetchOrgUserAccounts();
    }, [org]);

    return {
        accounts,
        setAccounts,
        addOrgUserAccounts,
        selectedAccount,
        setSelectedAccount,
        violations,
        setViolations,
        updateConfirmedViolationStatus,
        updateAnalysisStartDate,
        updateAccountStatus,
        analyzeAccount,
        analyzeAllAccount, 
        searchAccount, 
    }
}