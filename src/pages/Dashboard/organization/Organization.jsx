import { useState } from "react";
import { toLocalTime } from "../../../utils/date";
import {
    CheckCircleIcon,
    XCircleIcon,
    PencilSquareIcon,
    ClockIcon,
    EnvelopeIcon,
    UsersIcon,
    ExclamationTriangleIcon,
    PencilIcon,
    GlobeAltIcon,
    PhoneIcon,
    UserGroupIcon
} from "@heroicons/react/16/solid";
import { Switch } from "@headlessui/react";
import { mapExpressionToLabel, scheduleExpressions, } from "../../../utils/jobs";
import { CalendarIcon } from "flowbite-react";

const history = [
    {
        id: 1,
        date_analyzed: new Date().toISOString(),
        accountsCount: 10,
        emailsCount: 10,
        violationsCount: 10,
    },
    {
        id: 2,
        date_analyzed: new Date().toISOString(),
        accountsCount: 10,
        emailsCount: 10,
        violationsCount: 10,
    }
];

const StatCard = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col items-center px-4">
        <div className="w-14 h-14 flex items-center justify-center bg-orange-400 text-white rounded-full">
            <Icon className="w-6 h-6" />
        </div>
        <span className="mt-1 text-sm font-medium text-gray-700">{value}</span>
        <span className="text-xs text-gray-500">{label}</span>
    </div>
);

const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start space-x-2">
        <Icon className="w-5 h-5 mt-1 text-gray-400" />
        <div>
            <p className="text-sm font-medium text-gray-800">{label}</p>
            <p className="text-sm text-gray-500">{value}</p>
        </div>
    </div>
);

const Organization = ({ org,
    updateRecieveEmail,
    updateAutomateAnalysis,
    updateSchedule,
    updateOrgInfo }) => {
    const [isEditJob, setIsEditJob] = useState(false);
    const [schedExpression, setSchedExpression] = useState(org.scheduled_expression);
    const [isEditOrgInfo, setIsEditOrgInfo] = useState(false);
    const [orgInfoUpdateValues, setOrgInfoUpdateValues] = useState({
        org_name: org.org_name,
        org_email: org.org_email,
        org_phone: org.org_phone,
        org_description: org.org_description,
        org_employee_count: org.org_employee_count,
        org_logo: org.org_logo,
    });


    const handleSendEmailChange = () => {
        updateRecieveEmail(!org.send_email);
    }

    const handleIsActiveChange = () => {
        updateAutomateAnalysis(!org.is_active);
    }

    const handleScheduleExpressionChange = () => {
        updateSchedule(schedExpression);
        setIsEditJob(false);
    }

    const handleUpdateOrgInfo = (e) => {
        e.preventDefault();

        updateOrgInfo(orgInfoUpdateValues);
        setIsEditOrgInfo(false);
    }

    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Org Info Card */}
            <div className="p-6 border border-gray-200 rounded-2xl shadow-sm bg-white">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Organization Information</h2>
                    {!isEditOrgInfo && (
                        <button
                            onClick={() => setIsEditOrgInfo(true)}
                            className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors"
                        >
                            <PencilIcon className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {isEditOrgInfo ? (
                    <form onSubmit={handleUpdateOrgInfo} className="space-y-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img
                                        src={orgInfoUpdateValues.org_logo}
                                        className="w-16 h-16 object-contain rounded-lg border border-gray-200"
                                        alt="Organization logo"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                                    <input
                                        type="text"
                                        value={orgInfoUpdateValues.org_logo}
                                        onChange={(e) => setOrgInfoUpdateValues({ ...orgInfoUpdateValues, org_logo: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                                <input
                                    type="text"
                                    value={orgInfoUpdateValues.org_name}
                                    onChange={(e) => setOrgInfoUpdateValues({ ...orgInfoUpdateValues, org_name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={orgInfoUpdateValues.org_email}
                                    onChange={(e) => setOrgInfoUpdateValues({ ...orgInfoUpdateValues, org_email: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    value={orgInfoUpdateValues.org_phone}
                                    onChange={(e) => setOrgInfoUpdateValues({ ...orgInfoUpdateValues, org_phone: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Employees</label>
                                <input
                                    type="number"
                                    value={orgInfoUpdateValues.org_employee_count}
                                    onChange={(e) => setOrgInfoUpdateValues({ ...orgInfoUpdateValues, org_employee_count: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={orgInfoUpdateValues.org_description}
                                    onChange={(e) => setOrgInfoUpdateValues({ ...orgInfoUpdateValues, org_description: e.target.value })}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsEditOrgInfo(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <img
                                src={org.org_logo}
                                className="w-16 h-16 object-contain rounded-lg border border-gray-200"
                                alt="Organization logo"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{org.org_name}</h3>
                                <p className="text-sm text-gray-500">{org.org_email}</p>
                            </div>
                        </div>

                            <div className="grid grid-cols-2 gap-4">
                                <InfoItem icon={GlobeAltIcon} label="Domain" value={org.org_domain} />
                                <InfoItem icon={PhoneIcon} label="Phone" value={org.org_phone} />
                                <InfoItem icon={UserGroupIcon} label="Employees" value={org.org_employee_count} />
                                <InfoItem icon={CalendarIcon} label="Last Updatd" value={toLocalTime(org.updated_at)} />
                            </div>


                        {org.org_description && (
                            <div className="pt-2">
                                <p className="text-sm text-gray-600">{org.org_description}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Stats Summary Card */}
            <div className="p-4 border border-gray-200 rounded-2xl shadow-sm bg-white">
                <div className="flex justify-around">
                    <StatCard icon={UsersIcon} label="Total Accounts" value={100} />
                    <StatCard icon={ExclamationTriangleIcon} label="Total Violations" value={100} />
                    <StatCard icon={EnvelopeIcon} label="Emails Analyzed" value={100} />
                </div>
            </div>

            {/* Schedule & $Email report &  History Card */}
            <div className="p-4 border border-gray-200 rounded-2xl shadow-sm bg-white space-y-4">
                <h2 className="text-xl font-bold text-gray-800">Analysis Controls</h2>

                {/* Toggle Controls */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-medium text-gray-700">Send Email Reports</h4>
                            <p className="text-xs text-gray-500">Receive violation reports via email</p>
                        </div>
                        <Switch
                            checked={org.send_email}
                            onChange={handleSendEmailChange}
                            className={`${org.send_email ? "bg-orange-500" : "bg-gray-200"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                        >
                            <span
                                className={`${org.send_email ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                            />
                        </Switch>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-medium text-gray-700">Automated Analysis</h4>
                            <p className="text-xs text-gray-500">Enable periodic email analysis</p>
                        </div>
                        <Switch
                            checked={org.is_active}
                            onChange={handleIsActiveChange}
                            className={`${org.is_active ? "bg-orange-500" : "bg-gray-200"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                        >
                            <span
                                className={`${org.is_active ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                            />
                        </Switch>
                    </div>
                </div>

                {/* Schedule */}
                {org.is_active && (
                    <div className="pt-2">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h4 className="text-sm font-medium text-gray-700">Analysis Schedule</h4>
                                <p className="text-xs text-gray-500">Automated email analysis frequency</p>
                            </div>
                            {!isEditJob && (
                                <button
                                    onClick={() => setIsEditJob(true)}
                                    className="p-1 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors"
                                >
                                    <PencilSquareIcon className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {isEditJob ? (
                            <div className="flex items-center gap-2">
                                <select
                                    value={schedExpression}
                                    onChange={(e) => setSchedExpression(e.target.value)}
                                    className="flex-1 text-sm border-gray-300 rounded-md p-2 border focus:ring-orange-500 focus:border-orange-500"
                                >
                                    {scheduleExpressions.map((exp, idx) => (
                                        <option key={idx} value={exp.expression}>{exp.label}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={handleScheduleExpressionChange}
                                    className="p-1 text-green-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                                >
                                    <CheckCircleIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setIsEditJob(false)}
                                    className="p-1 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                >
                                    <XCircleIcon className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                                <div className="px-3 py-2 bg-gray-50 rounded-md text-sm text-gray-700">
                                    {mapExpressionToLabel(org.scheduled_expression)}
                                </div>
                        )}
                    </div>
                )}

                {/* History */}
                <div>
                    <h4 className="text-md font-semibold text-gray-800 mb-2">History</h4>
                    <div className="divide-y text-sm text-gray-600">
                        {history.map((h) => (
                            <div key={h.id} className="py-2 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <ClockIcon className="w-4 h-4 text-gray-400" />
                                    <span>{toLocalTime(h.date_analyzed)}</span>
                                </div>
                                <div className="flex gap-3 text-xs text-gray-500">
                                    <span>Accounts: {h.accountsCount}</span>
                                    <span>Emails: {h.emailsCount}</span>
                                    <span>Violations: {h.violationsCount}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Organization;


