import DataTable from "react-data-table-component";


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
                {row.last_analyzed ? new Date(row.last_analyzed).toLocaleString() : 'Not yet analyzed'}
            </div>
        )
    }
];

const AccountsTable = ({ accounts }) => {
    return (
        <div>
            <DataTable
                columns={columns}
                data={accounts}
                pagination
                selectableRows
                highlightOnHover

            />
        </div>
    )
}

export default AccountsTable; 