import { ChevronDownIcon, PlusIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

const OrganizationSelector = ({ organizations, selectedOrg, setSelectedOrg, setIsAddOrg }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    }

    const handleAddOrg = () => {
        setIsExpanded(!isExpanded);
        setIsAddOrg(true);
    }

    useEffect(() => {
        console.log('organizations', organizations);
    })

    return (
        <div className="relative w-full max-w-3xs py-2">
            {/* Main Container */}
            <div className="relative ">
                {/* Floating Label */}
                <span className="absolute -top-3 left-4 bg-white px-1 text-xs text-gray-600">
                    Organization
                </span>

                <div className="flex items-center justify-between rounded-xl bg-white px-6 py-2 border border-gray-500 transition">
                    <h3 className="text-sm font-semibold text-gray-800">
                        {selectedOrg.org_name}
                    </h3>
                    <button
                        onClick={handleClick}
                        className="rounded-full hover:bg-gray-100 transition"
                    >
                        <ChevronDownIcon
                            className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''
                                }`}
                        />
                    </button>
                </div>
            </div>


            {/* Dropdown Panel */}
            {isExpanded && (
                <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                    {/* Organization List */}
                    <div className="space-y-2 mb-4">
                        <h4 className="text-sm font-medium text-gray-700">Organizations</h4>
                        {organizations.map((organization) => (
                            <div
                                key={organization.org_id}
                                onClick={() => {
                                    setSelectedOrg(organization);
                                    setIsExpanded(false);
                                }}
                                className="cursor-pointer rounded-lg border border-gray-100 p-3 transition hover:bg-gray-50"
                            >
                                <p className="font-medium text-gray-800">{organization.org_name}</p>
                                <span className="text-sm text-gray-500">{organization.org_domain}</span>
                            </div>
                        ))}
                    </div>

                    {/* Add Organization Button */}
                    <button
                        onClick={handleAddOrg}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-400 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-500"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Add Organization
                    </button>
                </div>
            )}
        </div>
    );

};



export default OrganizationSelector; 
