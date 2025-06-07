import { useState } from "react";
import AccountsTable from "./AccountsTable";
import { PlusIcon } from "@heroicons/react/16/solid";
import OrgUserAccountModal from "./OrgUserAccountModal";
import Metrics from "./Metrics";
import Violation from "./Violation";

const Analysis = ({
    accounts,
    addOrgUserAccounts,
    selectedAccount,
    setSelectedAccount,
    violations,
    updateConfirmedViolationStatus,
    updateAnalysisStartDate
}) => {
    const [isAddAccount, setIsAddAccount] = useState(false);


    const handleAddAccountClick = () => {
        setIsAddAccount(!isAddAccount);
    }

    return (
        <div className="flex flex-col mt-3 space-y-3">
            <div className="flex justify-start gap-3 items-center">
                {/* Add Button */}
                <div
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-orange-400 text-white hover:bg-orange-500 cursor-pointer"
                    onClick={handleAddAccountClick}
                >
                    <p className="text-sm">Add</p>
                    <PlusIcon className="w-4 h-4" />
                </div>

                {/* Search Input with orange label */}
                <div className="flex w-full max-w-sm overflow-hidden rounded-lg border border-gray-300">
                    {/* Orange label on the left */}
                    <div className="bg-orange-400 text-white px-4 py-2 flex items-center justify-center">
                        <span className="text-sm font-medium">Search</span>
                    </div>

                    {/* Input field on the right */}
                    <input
                        type="text"
                        className="flex-1 px-3 py-2 text-sm focus:outline-none"
                        placeholder="Type to search..."
                    />
                </div>
            </div>

            <div className="flex w-full gap-3">
                <div className="w-full border border-gray-300 rounded-lg">
                    <AccountsTable accounts={accounts} setSelectedAccount={setSelectedAccount} />
                </div>
                <div className="hidden md:flex w-1/2 border border-gray-300 rounded-lg">
                    {/* do a conditional rendering. show a basic metrics if no account is selected */}
                    {!selectedAccount ?
                        <Metrics /> :
                        <Violation
                            account={selectedAccount}
                            setSelectedAccount={setSelectedAccount}
                            violations={violations}
                            updateConfirmedViolationStatus={updateConfirmedViolationStatus}
                            updateAnalysisStartDate={updateAnalysisStartDate}
                        />}
                </div>
            </div>
            {isAddAccount && (
                <OrgUserAccountModal
                    handleAddAccountClick={handleAddAccountClick}
                    addOrgUserAccounts={addOrgUserAccounts} />
            )}
        </div>
    )
}

export default Analysis; 