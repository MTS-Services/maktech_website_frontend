import { useState, useMemo } from 'react';
import StatCard from '../../../components/StatCard';
import {
  MdEmail,
  MdOutlineEmail,
  MdScheduleSend,
  MdReply,
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';

const PAGE_SIZE = 8;

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
    value: '4',
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
    value: '6',
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
    value: '3',
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
  {
    id: 'em-006',
    client: 'Sabrina Begum',
    subject: 'Follow-up on SEO Proposal',
    datetime: '2026-01-26 09:00 AM',
    status: 'Unread',
  },
  {
    id: 'em-007',
    client: 'Imran Hossain',
    subject: 'Maintenance Contract Renewal',
    datetime: '2026-01-25 03:20 PM',
    status: 'Read',
  },
  {
    id: 'em-008',
    client: 'Lailun Nahar',
    subject: 'New Feature Request for CRM',
    datetime: '2026-01-25 01:10 PM',
    status: 'Replied',
  },
  {
    id: 'em-009',
    client: 'Tanvir Ahmed',
    subject: 'App Testing Feedback Report',
    datetime: '2026-01-24 05:40 PM',
    status: 'Unread',
  },
  {
    id: 'em-010',
    client: 'Roksana Islam',
    subject: 'Branding Package Inquiry',
    datetime: '2026-01-24 11:00 AM',
    status: 'Read',
  },
  {
    id: 'em-011',
    client: 'Mehedi Hassan',
    subject: 'Q1 Performance Review Request',
    datetime: '2026-01-23 04:15 PM',
    status: 'Replied',
  },
  {
    id: 'em-012',
    client: 'Nasrin Akter',
    subject: 'Website Redesign Consultation',
    datetime: '2026-01-23 10:45 AM',
    status: 'Read',
  },
  {
    id: 'em-013',
    client: 'Jahirul Islam',
    subject: 'API Integration Support Needed',
    datetime: '2026-01-22 02:30 PM',
    status: 'Unread',
  },
  {
    id: 'em-014',
    client: 'Shamima Khatun',
    subject: 'Social Media Campaign Brief',
    datetime: '2026-01-22 09:50 AM',
    status: 'Replied',
  },
  {
    id: 'em-015',
    client: 'Robiul Alam',
    subject: 'Monthly Report and Analytics',
    datetime: '2026-01-21 03:00 PM',
    status: 'Read',
  },
  {
    id: 'em-016',
    client: 'Moriam Begum',
    subject: 'Contract Amendment Discussion',
    datetime: '2026-01-21 11:20 AM',
    status: 'Replied',
  },
];

// Status badges — text label always present; color is not the sole indicator (WCAG 1.4.1)
const STATUS_STYLES = {
  Unread: 'bg-blue-50 text-blue-700',
  Read: 'bg-amber-50 text-amber-700',
  Replied: 'bg-green-50 text-green-700',
};

const getStatusStyle = (status) =>
  STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-600';

/*
 * Windowed page-range algorithm.
 * Always shows: first + last + ±2 around current + '…' sentinels.
 * e.g. current=5, total=20 → [1, '…', 3, 4, 5, 6, 7, '…', 20]
 * Falls back to full list when total ≤ 7 (no ellipsis needed).
 */
const getPageRange = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const left = Math.max(2, current - 2);
  const right = Math.min(total - 1, current + 2);
  const range = [1];
  if (left > 2) range.push('…');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push('…');
  range.push(total);
  return range;
};

// ─── EmailCard — mobile layout (< md) ───────────────────────────────────────
const EmailCard = ({ client, subject, datetime, status }) => {
  const isUnread = status === 'Unread';
  return (
    <div
      className={`p-4 rounded-xl border transition-shadow duration-150 hover:shadow-sm ${
        isUnread ? 'border-blue-100 bg-blue-50/40' : 'border-gray-100 bg-white'
      }`}
    >
      <div className='flex items-start justify-between gap-2 mb-2'>
        <div className='flex items-center gap-2 min-w-0'>
          <MdOutlineEmail
            className={`shrink-0 text-lg ${isUnread ? 'text-blue-500' : 'text-gray-300'}`}
            aria-hidden='true'
          />
          <span
            className={`text-base truncate ${
              isUnread
                ? 'font-semibold text-gray-900'
                : 'font-medium text-gray-700'
            }`}
          >
            {client}
          </span>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-semibold shrink-0 ${getStatusStyle(status)}`}
        >
          {status}
        </span>
      </div>
      <p
        className={`text-base pl-7 mb-1 ${
          isUnread ? 'font-semibold text-gray-800' : 'text-gray-600'
        }`}
      >
        {subject}
      </p>
      <p className='text-sm text-gray-400 pl-7'>{datetime}</p>
    </div>
  );
};

// ─── EmailRow — desktop table row (md+) ─────────────────────────────────────
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
          <MdOutlineEmail
            className={`shrink-0 text-lg ${isUnread ? 'text-blue-500' : 'text-gray-300'}`}
            aria-hidden='true'
          />
          <span
            className={`text-base ${
              isUnread
                ? 'font-semibold text-gray-900'
                : 'font-medium text-gray-700'
            }`}
          >
            {client}
          </span>
        </div>
      </td>
      <td className='py-3.5 px-5'>
        <span
          className={`text-base ${
            isUnread
              ? 'font-semibold text-gray-900'
              : 'font-normal text-gray-600'
          }`}
        >
          {subject}
        </span>
      </td>
      <td className='py-3.5 px-5'>
        <span className='text-base text-gray-400 whitespace-nowrap'>
          {datetime}
        </span>
      </td>
      <td className='py-3.5 px-5 text-right'>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
            status,
          )}`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
};

// ─── Pagination bar — reused in both top and bottom slots ───────────────────
const Pagination = ({ page, totalPages, pageRange, onPage }) => {
  if (totalPages <= 1) return null;
  return (
    <div className='flex items-center gap-1 flex-wrap'>
      <button
        type='button'
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        aria-label='Previous page'
        className='inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150'
      >
        <MdChevronLeft className='text-xl' aria-hidden='true' />
      </button>

      {pageRange.map((p, i) =>
        p === '…' ? (
          <span
            key={`ell-${i}`}
            className='w-9 h-9 inline-flex items-center justify-center text-gray-400 text-base select-none'
          >
            &hellip;
          </span>
        ) : (
          <button
            key={p}
            type='button'
            onClick={() => onPage(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
            className={`w-9 h-9 rounded-lg text-base font-semibold border transition-colors duration-150 ${
              p === page
                ? 'bg-black-bg-cta text-white border-transparent shadow-sm'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        type='button'
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        aria-label='Next page'
        className='inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150'
      >
        <MdChevronRight className='text-xl' aria-hidden='true' />
      </button>
    </div>
  );
};

// ─── Page component ──────────────────────────────────────────────────────────
export default function Emails() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(EMAILS.length / PAGE_SIZE);
  const pageData = useMemo(
    () => EMAILS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page],
  );
  const pageRange = useMemo(
    () => getPageRange(page, totalPages),
    [page, totalPages],
  );
  const rangeStart = (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, EMAILS.length);

  const handlePage = (p) => setPage(Math.max(1, Math.min(totalPages, p)));

  return (
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

      {/* Stat Strip */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
        {STAT_CARDS.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Email Table Card */}
      <section
        aria-label='Email inbox'
        className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'
      >
        {/* Mobile: card list (< md) */}
        <div className='md:hidden p-4 space-y-3'>
          {pageData.map((email) => (
            <EmailCard key={email.id} {...email} />
          ))}
        </div>

        {/* Desktop: table (md+) */}
        <div className='hidden md:block overflow-x-auto'>
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
                  className='py-3.5 px-5 text-left text-sm font-semibold text-gray-400 uppercase tracking-wide'
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
              {pageData.map((email) => (
                <EmailRow key={email.id} {...email} />
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Bottom bar: page counter + pagination ── */}
        <div className='flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t border-gray-100'>
          <p className='text-sm text-gray-400 shrink-0'>
            Page <span className='font-semibold text-gray-700'>{page}</span> of{' '}
            <span className='font-semibold text-gray-700'>{totalPages}</span>
          </p>
          <nav aria-label='Pagination bottom'>
            <Pagination
              page={page}
              totalPages={totalPages}
              pageRange={pageRange}
              onPage={handlePage}
            />
          </nav>
        </div>
      </section>
    </div>
  );
}
