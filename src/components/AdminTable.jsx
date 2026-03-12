/**
 * AdminTable — reusable table shell for all admin data tables.
 * Renders a consistent thead (bg-gray-50, xs uppercase headers) and wraps
 * tbody rows passed as children. Outer card + overflow-x-auto stays in the
 * consuming page so each page can pair it with mobile cards or a bottom bar.
 *
 * @param {Array<{ label: string, align?: 'left' | 'right' }>} columns
 * @param {string} ariaLabel — accessible table caption
 * @param {ReactNode} children — tbody <tr> elements
 */
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
