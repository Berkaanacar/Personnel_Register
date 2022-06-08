import DataTable from 'react-data-table-component';

export default function DataList({ personalData }) {
    const columns = [
        {
            name: 'Name',
            selector: row => row.employee_name,
        },
        {
            name: 'Surname',
            selector: row => row.employee_surname,
        },
        {
            name: 'Birthday',
            selector: row => row.employee_birthday,
        },
        {
            name: 'Birthplace',
            selector: row => row.employee_birthplace,
        },
    ];


    return (
        <DataTable
            columns={columns}
            data={personalData}
        />
    );
}
