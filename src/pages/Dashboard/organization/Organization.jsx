import { useState } from "react";
import { toLocalTime } from "../../../utils/date";
import {
    CheckCircleIcon,
    XCircleIcon,
    PencilSquareIcon,
    ClockIcon,
    EnvelopeIcon,
    UsersIcon,
    ExclamationTriangleIcon
} from "@heroicons/react/16/solid";
import { Switch } from "@headlessui/react";
import { mapExpressionToLabel, scheduleExpressions, } from "../../../utils/jobs";

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

const Organization = ({ org, updateRecieveEmail, updateAutomateAnalysis, updateSchedule }) => {
    const [isEditJob, setIsEditJob] = useState(false);
    const [schedExpression, setSchedExpression] = useState(org.scheduled_expression);

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

    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Org Info Card */}
            <div className="p-4 border border-gray-200 rounded-2xl shadow-sm bg-white flex flex-col gap-4">
                <div className="flex gap-4">
                    <img src={org.org_logo} className="w-20 h-20 object-contain rounded-lg" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{org.org_name}</h3>
                        <p className="text-sm text-gray-500">{org.org_email}</p>
                    </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Domain:</span> {org.org_domain}</p>
                    <p><span className="font-medium">Phone:</span> {org.org_phone}</p>
                    <p><span className="font-medium">Employees:</span> {org.org_employee_count}</p>
                    <p><span className="font-medium">Updated:</span> {toLocalTime(org.updated_at)}</p>
                </div>
                <p className="text-sm text-gray-500">{org.org_description}</p>
            </div>

            {/* Stats Summary Card */}
            {/* <div className="p-4 border border-gray-200 rounded-2xl shadow-sm bg-white">
                <div className="flex justify-around">
                    <StatCard icon={UsersIcon} label="Total Accounts" value={100} />
                    <StatCard icon={ExclamationTriangleIcon} label="Total Violations" value={100} />
                    <StatCard icon={EnvelopeIcon} label="Emails Analyzed" value={100} />
                </div>
            </div> */}

            {/* Schedule & $Email report &  History Card */}
            <div className="p-4 border border-gray-200 rounded-2xl shadow-sm bg-white space-y-4">
                <h3>Analysis Controls</h3>
                {/* Schedule */}
                <div className="flex ">
                    <div className="flex">
                        <p>Send Email Reports</p>
                        <Switch
                            checked={org.send_email}
                            onChange={handleSendEmailChange}
                            className={`${org.send_email ? "bg-blue-600" : "bg-gray-200"} relative inline-flex h-6 w-11 items-center rounded-full transition`}
                        >
                            <span
                                className={`${org.send_email
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            >
                            </span>
                        </Switch>
                    </div>
                    <div className="flex">
                        Automated Analysis
                        <Switch
                            checked={org.is_active}
                            onChange={handleIsActiveChange}
                            className={`${org.is_active ? "bg-blue-600" : "bg-gray-200"} relative inline-flex h-6 w-11 items-center rounded-full transition`}
                        >
                            <span
                                className={`${org.is_active
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            >
                            </span>
                        </Switch>
                    </div>
                </div>

                {org.is_active &&
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h4 className="text-md font-semibold text-gray-800">Analysis Schedule</h4>
                                <p className="text-xs text-gray-500">Automated email analysis frequency</p>
                            </div>
                            {!isEditJob && (
                                <button onClick={() => setIsEditJob(true)}>
                                    <PencilSquareIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                                </button>
                            )}
                        </div>

                        {isEditJob ? (
                            <div className="flex items-center gap-2 mt-2">
                                <select
                                    value={schedExpression}
                                    onChange={(e) => setSchedExpression(e.target.value)}
                                    className="text-sm border-gray-300 rounded-md p-1"
                                >
                                    {scheduleExpressions.map((exp, idx) => (
                                        <option key={idx} value={exp.expression}>{exp.label}</option>
                                    ))}
                                </select>
                                <button onClick={handleScheduleExpressionChange}>
                                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                </button>
                                <button onClick={() => setIsEditJob(false)}>
                                    <XCircleIcon className="w-5 h-5 text-red-500" />
                                </button>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-600 mt-1">{mapExpressionToLabel(org.scheduled_expression)}</p>
                        )}
                    </div>
                }

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
