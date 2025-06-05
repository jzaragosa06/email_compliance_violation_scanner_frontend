import { useState } from "react";
import AccountsTable from "./AccountsTable";
import { PlusIcon } from "@heroicons/react/16/solid";
import OrgUserAccountModal from "./OrgUserAccountModal";

const Analysis = ({ accounts, addOrgUserAccounts }) => {
    const [isAddAccount, setIsAddAccount] = useState(false);

    const handleAddAccountClick = () => {
        setIsAddAccount(!isAddAccount);
    }


    return (
        <div>
            <div className="flex w-full max-w-24 rounded-lg justify-center  items-center px-4 py-2 bg-orange-400 text-white hover:bg-orange-500" onClick={handleAddAccountClick}>
                Add
                <PlusIcon className="w-4 h-4" />
            </div>
            <AccountsTable accounts={accounts} />

            {isAddAccount && (
                <OrgUserAccountModal
                    handleAddAccountClick={handleAddAccountClick}
                    addOrgUserAccounts={addOrgUserAccounts} />
            )}
        </div>
    )
}

export default Analysis; 