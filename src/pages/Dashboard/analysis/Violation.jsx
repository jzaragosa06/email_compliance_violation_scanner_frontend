import { useState } from "react";
import { toLocalTime } from "../../../utils/Date";
import { Switch } from '@headlessui/react'
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";


const Violation = ({ account, violations, updateConfirmedViolationStatus, setSelectedAccount, updateAnalysisStartDate }) => {
    const violationsCount = violations.length;
    const confirmedViolationsCount = violations.filter(v => v.is_confirmed_violation).length;

    const handleChangedConfirmedViolationStatus = async (email_violation_id, current_is_confirmed_violation) => {
        const new_is_confirmed_violation = !current_is_confirmed_violation;
        try {
            await updateConfirmedViolationStatus(email_violation_id, new_is_confirmed_violation);
            //then change the value of the account
            setSelectedAccount({ ...account, is_confirmed_violation: new_is_confirmed_violation })
        } catch (error) {
            alert('failed to update status', error);
        }
    }

    const [isUpdateDate, setIsUpdateDate] = useState(false);

    const handleSubmitUpdateDate = async (e) => {
        e.preventDefault();
        try {
            const utcStartDate = new Date(account.analysis_starting_date).toISOString();
            await updateAnalysisStartDate(account.org_user_account_id, utcStartDate);

            //go back to readonly vesion. 
            setIsUpdateDate(false);
        } catch (error) {
            alert(error);
        }
    }


    return (
        <div className="flex flex-col w-full px-3 py-2">
            <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col text-sm space-y-1">
                    <p className="font-semibold">{account.email}</p>
                    <p className="text-xs font-light">Added: {toLocalTime(account.created_at)}</p>

                    {isUpdateDate ? (
                        <div className="space-y-1">
                            <p className="text-xs font-light">Analysis Starting Date:</p>
                            <form onSubmit={handleSubmitUpdateDate} className="flex items-center gap-2">
                                <input
                                    type="date"
                                    value={account.analysis_starting_date}
                                    onChange={(e) => setSelectedAccount({ ...account, analysis_starting_date: e.target.value })}
                                    className="text-xs border border-gray-300 rounded px-2 py-1"
                                />
                                <button type="submit" className="p-1 rounded hover:bg-gray-300">
                                    <CheckIcon className="w-4 h-4 text-gray-700" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsUpdateDate(false)}
                                    className="p-1 rounded hover:bg-gray-300"
                                >
                                    <XMarkIcon className="w-4 h-4 text-gray-700" />
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-xs text-gray-700">
                            <p className="font-light">
                                Analysis started on: {toLocalTime(account.analysis_starting_date)}
                            </p>
                            <button
                                onClick={() => setIsUpdateDate(true)}
                                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>

                <button className="px-4 py-2 text-sm text-white font-semibold bg-orange-400 rounded-lg hover:bg-orange-500">
                    Analyze
                </button>
            </div>

            <div className="flex space-x-3">
                <div className="flex flex-col justify-center items-center px-8 py-4 space-y-2">
                    <div className="flex text-sm w-12 h-12 items-center justify-center font-semibold bg-orange-400 text-white rounded-full">
                        {violationsCount}
                    </div>
                    <div className="text-xs text-center font-light text-gray-500 min-h-[1.5rem]">
                        Total Violations
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center px-8 py-4 space-y-2">
                    <div className="flex text-sm w-12 h-12 items-center justify-center font-semibold bg-orange-400 text-white rounded-full">
                        {confirmedViolationsCount}
                    </div>
                    <div className="text-xs text-center font-light text-gray-500 min-h-[1.5rem]">
                        Confirmed Violations
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center px-8 py-4 space-y-2">
                    <div className="flex text-sm w-12 h-12 items-center justify-center font-semibold bg-orange-400 text-white rounded-full">
                        100
                    </div>
                    <div className="text-xs font-light text-center text-gray-500 min-h-[1.5rem]">
                        Emails Analyzed
                    </div>
                </div>
            </div>

            <div className="flex flex-col space-y-4">
                <div className="text-sm font-semibold">Violations</div>
                {violations.map((violation, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row justify-between items-start rounded-2xl border border-gray-200 bg-white shadow-sm p-4 space-y-4 md:space-y-0"
                    >
                        {/* Left Side Content */}
                        <div className="flex flex-col space-y-2 w-full">
                            <div className="text-sm font-semibold break-words">
                                {violation.email_subject}
                            </div>
                            <div className="text-xs text-gray-500">
                                Analyzed on: {toLocalTime(violation.created_at)}
                            </div>
                            {violation.evidence_tag.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {violation.evidence_tag.map((tag, ind) => (
                                        <span
                                            key={ind}
                                            className="px-3 py-1 text-xs rounded-lg bg-gray-200"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Side Confirm Switch */}
                        <div className="flex flex-col items-end min-w-[140px] ml-auto">
                            <Switch
                                checked={violation.is_confirmed_violation}
                                onClick={() =>
                                    handleChangedConfirmedViolationStatus(
                                        violation.email_violation_id,
                                        violation.is_confirmed_violation
                                    )
                                }
                                className={`${violation.is_confirmed_violation ? "bg-blue-600" : "bg-gray-200"
                                    } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                            >
                                <span
                                    className={`${violation.is_confirmed_violation
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                />
                            </Switch>
                            <span className="text-xs mt-1 text-gray-600 text-center">
                                Confirm Violation
                            </span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Violation;
