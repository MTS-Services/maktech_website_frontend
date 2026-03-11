import StatCard from '../../../components/StatCard';
import {
  MdEmail,
  MdOutlineEmail,
  MdScheduleSend,
  MdReply,
  MdAdd,
} from 'react-icons/md';

const STAT_CARDS = [
  {
    Icon: MdEmail,
    accentColor: '#2563eb',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    badge: 'Inbox',
    badgeBg: 'bg-blue-50',
    badgeColor: 'text-blue-700',
    label: 'Unread Emails',
    value: '2',
  },
  {
    Icon: MdScheduleSend,
    accentColor: '#16a34a',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    badge: 'Today',
    badgeBg: 'bg-green-50',
    badgeColor: 'text-green-700',
    label: 'Emails Today',
    value: '2',
  },
  {
    Icon: MdReply,
    accentColor: '#d97706',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    badge: 'Pending',
    badgeBg: 'bg-amber-50',
    badgeColor: 'text-amber-700',
    label: 'Waiting for Reply',
    value: '1',
  },
];

const EMAILS = [
  {
    id: 'em-001',
    client: 'Ahmed Khan',
    subject: 'Website Development Project Update',
    datetime: '2026-01-28 10:30 AM',
    status: 'Unread',
  },
  {
    id: 'em-002',
    client: 'Fatima Rahman',
    subject: 'Regarding Digital Marketing Package',
    datetime: '2026-01-28 09:15 AM',
    status: 'Unread',
  },
  {
    id: 'em-003',
    client: 'Shakib Hasan',
    subject: 'Thank you for the excellent service',
    datetime: '2026-01-27 04:45 PM',
    status: 'Replied',
  },
  {
    id: 'em-004',
    client: 'Nusrat Jahan',
    subject: 'Invoice Payment Confirmation',
    datetime: '2026-01-27 02:20 PM',
    status: 'Read',
  },
  {
    id: 'em-005',
    client: 'Rahim Uddin',
    subject: 'Quote Request for E-commerce Website',
    datetime: '2026-01-26 11:30 AM',
    status: 'Replied',
  },
];

// Status is purely visual — text label always present so color isn't the sole indicator (WCAG 1.4.1)
const STATUS_STYLES = {
  Unread: 'bg-blue-50 text-blue-700',
  Read: 'bg-amber-50 text-amber-700',
  Replied: 'bg-green-50 text-green-700',
};

const getStatusStyle = (status) =>
  STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-600';

const EmailRow = ({ client, subject, datetime, status }) => {
  const isUnread = status === 'Unread';
  return (
    <tr
      className={`border-b border-gray-50 transition-colors duration-150 hover:bg-gray-50/60 ${
        isUnread ? 'bg-blue-50/30' : ''
      }`}
    >
      <td className='py-3.5 px-5'>
        <div className='flex items-center gap-2.5'>
          {/* Unread indicator dot — communicates state alongside text badge (no color-only reliance) */}
          <MdOutlineEmail
            className={`shrink-0 text-lg ${isUnread ? 'text-blue-500' : 'text-gray-300'}`}
            aria-hidden='true'
          />
          <span
            className={`text-base ${isUnread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}
          >
            {client}
          </span>
        </div>
      </td>
      <td className='py-3.5 px-5'>
        <span
          className={`text-base ${isUnread ? 'font-semibold text-gray-900' : 'font-normal text-gray-600'}`}
        >
          {subject}
        </span>
      </td>
      <td className='py-3.5 px-5 hidden sm:table-cell'>
        <span className='text-base text-gray-400 whitespace-nowrap'>
          {datetime}
        </span>
      </td>
      <td className='py-3.5 px-5 text-right'>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-semibold ${getStatusStyle(status)}`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
};

const Emails = () => (
  <div className='space-y-6 pb-8'>
    {/* Page Header */}
    <div className='flex flex-wrap items-start justify-between gap-4'>
      <div>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
          Emails
        </h1>
        <p className='text-base text-gray-500 mt-1'>
          Manage all client communications
        </p>
      </div>
      <button
        type='button'
        className='flex cursor-pointer items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-black-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
      >
        <MdAdd className='text-lg' aria-hidden='true' />
        Compose Email
      </button>
    </div>

    {/* Stat Strip — reuses shared StatCard */}
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
      {STAT_CARDS.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>

    {/* Email Table */}
    <section
      aria-label='Email inbox'
      className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'
    >
      <div className='overflow-x-auto'>
        <table className='w-full' aria-label='Client emails'>
          <thead>
            <tr className='border-b border-gray-100'>
              <th
                scope='col'
                className='py-3.5 px-5 text-left text-sm font-semibold text-gray-400 uppercase tracking-wide'
              >
                Client Name
              </th>
              <th
                scope='col'
                className='py-3.5 px-5 text-left text-sm font-semibold text-gray-400 uppercase tracking-wide'
              >
                Subject
              </th>
              <th
                scope='col'
                className='py-3.5 px-5 text-left text-sm font-semibold text-gray-400 uppercase tracking-wide hidden sm:table-cell'
              >
                Date &amp; Time
              </th>
              <th
                scope='col'
                className='py-3.5 px-5 text-right text-sm font-semibold text-gray-400 uppercase tracking-wide'
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {EMAILS.map((email) => (
              <EmailRow key={email.id} {...email} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </div>
);

export default Emails;
