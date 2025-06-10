import { useOrganization } from "../../hooks/useOrganization";
import { useUser } from "../../hooks/useUser";
import { useOrgUserAccount } from "../../hooks/userOrgUserAccount";
import OrganizationSelector from "./OrganizationSelector";
import { Tabs } from "./Tabs";
import Analysis from "./analysis/Analysis";
import OrganizationFormModal from "./organization/OrganizationFormModal";
import { useEffect, useState } from "react";
import UserProfile from "./user/UserProfile";
import ProfileModal from "./user/ProfileModal";
import SystemError from "./SystemError";
import EmptyOrg from "./organization/EmptyOrg";
import Organization from "./organization/Organization";

const Dashboard = () => {
    const {
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
    } = useOrganization();


    const {
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
    } = useOrgUserAccount(selectedOrg);

    const { user, setUser, } = useUser();

    const [activeTab, setActiveTab] = useState('analysis');
    const [isAddOrg, setIsAddOrg] = useState(false);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'analysis':
                return <Analysis
                    accounts={accounts}
                    addOrgUserAccounts={addOrgUserAccounts}
                    selectedAccount={selectedAccount}
                    setSelectedAccount={setSelectedAccount}
                    violations={violations}
                    updateConfirmedViolationStatus={updateConfirmedViolationStatus}
                    updateAnalysisStartDate={updateAnalysisStartDate}
                    updateAccountStatus={updateAccountStatus}
                    analyzeAccount={analyzeAccount}
                    analyzeAllAccount={analyzeAllAccount}
                    searchAccount={searchAccount}
                />;
            case 'organization':
                return <Organization
                    org={selectedOrg}
                    updateRecieveEmail={updateRecieveEmail}
                    updateAutomateAnalysis={updateAutomateAnalysis}
                    updateSchedule={updateSchedule}
                    updateOrgInfo={updateOrgInfo}
                />;
            case 'policy':
                return <></>;
            case 'integration':
                return <></>;
        }
    }

    if (error) {
        return <SystemError />
    }

    return (
        <div className="flex flex-col min-h-screen px-8 py-2">
            <div className="flex items-center justify-between px-4 py-2" >
                <div className="flex items-center justify-center">
                    <img
                        src="/public/brand-logo.png"
                        className="w-16 h-16"
                    />
                    <h3 className="text-2xl font-extrabold text-orange-400"> MailSiever</h3>
                </div>
                {user && (
                    <UserProfile user={user} />

                )}
            </div>

            {organizations.length > 0
                ? (
                    <>
                        <div className="flex">
                            <OrganizationSelector
                                organizations={organizations}
                                selectedOrg={selectedOrg}
                                setSelectedOrg={setSelectedOrg}
                                setIsAddOrg={setIsAddOrg}
                            />
                            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                        </div>

                        {renderTabContent()}
                    </>
                )
                : <EmptyOrg setIsAddOrg={setIsAddOrg} />
            }
            {isAddOrg && <OrganizationFormModal isAddOrg={isAddOrg} setIsAddOrg={setIsAddOrg} addOrganization={addOrganization} />}

        </div>
    )
}

export default Dashboard;