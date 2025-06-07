import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

const OrgUserAccountModal = ({ handleAddAccountClick, addOrgUserAccounts }) => {
    const [accounts, setAccounts] = useState([
        { email: "", analysis_starting_date: "", }
    ]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (index, key, value) => {
        //create a copy
        const newAccounts = [...accounts];
        newAccounts[index][key] = value;
        setAccounts(newAccounts);
    }

    const handleRemove = (index) => {
        const newAccounts = accounts.filter((_, i) => i != index);
        setAccounts(newAccounts);
    }

    const handleAdd = () => {
        setAccounts([...accounts, { email: "", analysis_starting_date: "", }]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 

        try {
            //conver the datetime-local to utc
            const newAccounts = accounts.map(acc => ({
                email: acc.email,
                analysis_starting_date: new Date(acc.analysis_starting_date).toISOString()
            }));

            await addOrgUserAccounts({ accounts: newAccounts });
        } catch (error) {
            console.log('failed to add accounts: ', error);
        }
        finally {
            setIsLoading(false);
            handleAddAccountClick();
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/20 px-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Add Organization's User Accounts
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Header Row */}
                    <div className="grid grid-cols-12 items-center text-sm font-semibold text-gray-600 gap-4 px-1">
                        <div className="col-span-5">User Account</div>
                        <div className="col-span-5">Analysis Starting Date</div>
                        <div className="col-span-2 text-center">Action</div>
                    </div>

                    {/* Dynamic Inputs */}
                    {accounts.map((acc, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-12 items-center gap-4"
                        >
                            <input
                                type="email"
                                placeholder="Enter email"
                                value={acc.email}
                                onChange={(e) => handleChange(index, 'email', e.target.value)}
                                required
                                className="col-span-5 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                            <input
                                type="date"
                                value={acc.analysis_starting_date}
                                onChange={(e) => handleChange(index, 'analysis_starting_date', e.target.value)}
                                required
                                className="col-span-5 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                            <div className="col-span-2 flex justify-center">
                                {accounts.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(index)}
                                        className="rounded-full p-2 hover:bg-red-100"
                                        aria-label="Remove account"
                                    >
                                        <TrashIcon className="w-5 h-5 text-red-500" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Add Icon */}
                    <div className="flex justify-start">
                        <button
                            type="button"
                            onClick={handleAdd}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Add another account
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleAddAccountClick}
                            className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-orange-500 px-4 py-2 text-sm text-white shadow hover:bg-orange-600"
                        >
                            {isLoading ? 'Loading...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default OrgUserAccountModal; 