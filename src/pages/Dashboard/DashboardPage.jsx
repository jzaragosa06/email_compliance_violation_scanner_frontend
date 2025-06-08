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

const Dashboard = () => {
    const {
        organizations,
        setOrganizations,
        selectedOrg,
        setSelectedOrg,
        error,
        setError,
        addOrganization
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
                return <></>;
            case 'policy':
                return <></>;
            case 'integration':
                return <></>;
        }
    }

    if (error) {
        return <div>error: {error}</div>
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
                : (
                    <div className="w-full flex flex-col items-center justify-center px-6 py-12 rounded-2xl bg-white">
                        <img
                            src="https://img.freepik.com/premium-vector/market-research-business-flat-style-illustration-kit_220346-303.jpg"
                            alt="No records illustration"
                            className="w-64 h-64 object-contain mb-6"
                        />
                        <p className="text-lg text-gray-700 mb-4 text-center">
                            Hey! You have no organizations registered. Add one to start.
                        </p>
                        <button
                            className="px-6 py-2 bg-orange-400 text-white rounded-xl font-medium hover:bg-orange-500 transition"
                            onClick={() => setIsAddOrg(true)}
                        >
                            Add Organization
                        </button>
                    </div>

                )
            }
            {isAddOrg && <OrganizationFormModal isAddOrg={isAddOrg} setIsAddOrg={setIsAddOrg} addOrganization={addOrganization} />}

        </div>
    )
}

export default Dashboard;