import { useOrganization } from "../../hooks/useOrganization";
import { useUser } from "../../hooks/useUser";
import { useOrgUserAccount } from "../../hooks/userOrgUserAccount";
import OrganizationSelector from "./OrganizationSelector";
import { Tabs } from "./Tabs";
import Analysis from "./analysis/Analysis";
import OrganizationFormModal from "./organization/OrganizationFormModal";
import { useEffect, useState } from "react";
import UserProfile from "./user/UserProfile";

const Dashboard = () => {
    const {
        organizations,
        setOrganizations,
        selectedOrg,
        setSelectedOrg,
        loading,
        setLoading,
        error,
        setError,
        addOrganization
    } = useOrganization();


    const {
        accounts,
        setAccounts,
        isAccountsLoading,
        setIsAccountsLoading,
        addOrgUserAccounts,
        isAddAccountLoading,
        setIsAddAccountLoading } = useOrgUserAccount(selectedOrg);

    const { user, setUser, isLoadingUser, } = useUser();

    const [activeTab, setActiveTab] = useState('analysis');
    const [isAddOrg, setIsAddOrg] = useState(false);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'analysis':
                return <Analysis
                    accounts={accounts}
                    addOrgUserAccounts={addOrgUserAccounts}
                />;
            case 'organization':
                return <></>;
            case 'policy':
                return <></>;
            case 'integration':
                return <></>;
        }
    }



    if (loading) {
        return <div>loading organizations</div>
    }

    if (error) {
        return <div>error: {error}</div>
    }

    if (!organizations.length) {
        return (
            <div>
                <h2>No organizations found</h2>
                <button onClick={() => setIsAddOrg(true)}>Add Organization</button>
                {isAddOrg && (
                    <OrganizationFormModal
                        isAddOrg={isAddOrg}
                        setIsAddOrg={setIsAddOrg}
                        addOrganization={addOrganization}
                    />
                )}
            </div>
        );
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

            <div className="flex">
                <OrganizationSelector
                    organizations={organizations}
                    selectedOrg={selectedOrg}
                    setSelectedOrg={setSelectedOrg}
                    setIsAddOrg={setIsAddOrg}
                />
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            </div>
            {/* content */}
            {renderTabContent()}
            {isAddOrg && <OrganizationFormModal isAddOrg={isAddOrg} setIsAddOrg={setIsAddOrg} addOrganization={addOrganization} />}
        </div>
    )
}

export default Dashboard;