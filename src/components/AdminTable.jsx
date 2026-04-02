const AdminTable = ({ columns, ariaLabel, children }) => (
  <table className='w-full' aria-label={ariaLabel}>
    <thead className='bg-gray-50 border-b border-gray-100'>
      <tr>
        {columns.map(({ label, align }) => (
          <th
            key={label}
            scope='col'
            className={`px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide ${
              align === 'right' ? 'text-right' : 'text-left'
            }`}
          >
            {label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

export default AdminTable;
