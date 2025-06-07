import { useState } from "react";
import DataTable from "react-data-table-component";
import { toLocalTime } from "../../../utils/date"; 

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
        cell: row => (
            <div className="font-semibold">
                {row.is_authenticated ? 'Authenticated' : 'Not Authenticated'}
            </div>
        )
    },
    {
        name: 'Account Status',
        selector: row => row.is_active,
        sortable: true,
        cell: row => (
            <div className="font-semibold">
                {row.is_active ? 'Active' : 'Inactive'}
            </div>
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




const AccountsTable = ({ accounts, setSelectedAccount }) => {
    const [clickedRowId, setClickedRowId] = useState(null);

    const handleRowClick = (row) => {
        //row = account (object in accounts)
        setSelectedAccount(row);
        setClickedRowId(row.email);
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