import { useState } from "react";
import DataTable from "react-data-table-component";
import { toLocalTime } from "../../../utils/date"; 
import { Switch } from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";

const AccountsTable = ({ accounts, setSelectedAccount, updateAccountStatus }) => {
    const [clickedRowId, setClickedRowId] = useState(null);

    const handleRowClick = (row) => {
        //row = account (object in accounts)
        setSelectedAccount(row);
        setClickedRowId(row.email);
    }

    const handleToggleStatus = async (row) => {
        try {
            await updateAccountStatus(row.org_user_account_id, !row.is_active);
        } catch (error) {
            console.log(error);
        }
    }

    const conditionalRowStyles = [
        {
            when: row => row.email === clickedRowId,
            style: {
                backgroundColor: '#e0f7fa',
                color: 'black',
            }
        }
    ]

    const columns = [
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            cell: row => <div className="font-semibold">{row.email}</div>
        },
        {
            name: 'Authentication Status',
            selector: row => row.is_authenticated,
            sortable: true,
            center: true, // <-- this is key
            cell: row => (
                <div className="flex justify-center items-center w-full h-full">
                    {row.is_authenticated
                        ? <CheckCircleIcon className="text-green-400 w-5 h-5" />
                        : <XCircleIcon className="text-red-400 w-5 h-5" />
                    }
                </div>
            )
        },
        {
            name: 'Account Status',
            selector: row => row.is_active,
            sortable: true,
            cell: row => (
                <Switch
                    checked={row.is_active}
                    onChange={() => handleToggleStatus(row)}
                    className={`${row.is_active ? "bg-blue-600" : "bg-gray-200"} relative inline-flex h-6 w-11 items-center rounded-full transition`}
                >
                    <span
                        className={`${row.is_active
                            ? 'translate-x-6'
                            : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    >
                    </span>
                </Switch>
            )
        },
        {
            name: 'Last Analyzed',
            selector: row => row.last_analyzed,
            sortable: true,
            cell: row => (
                <div className="font-semibold">
                    {row.last_analyzed ? toLocalTime(row.last_analyzed) : 'Not yet analyzed'}
                </div>
            )
        }
    ];


    return (
        <div>
            <DataTable
                columns={columns}
                data={accounts}
                pagination
                selectableRows
                highlightOnHover
                onRowClicked={handleRowClick}
                conditionalRowStyles={conditionalRowStyles}
            />
        </div>
    )
}

export default AccountsTable; 