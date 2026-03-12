import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../../components/StatCard';
import AdminTable from '../../../components/AdminTable';
import Pagination from '../../../components/Pagination';
import { getPageRange } from '../../../utils/helpers';
import {
  MdEmail,
  MdOutlineEmail,
  MdScheduleSend,
  MdReply,
  MdAdd,
  MdArrowBack,
  MdSend,
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
    email: 'ahmed.khan@example.com',
    subject: 'Website Development Project Update',
    datetime: '2026-01-28 10:30 AM',
    status: 'Unread',
    body: 'Hello Maktech, I wanted to check on the progress of our website development project. Could you please provide an update on the timeline? Looking forward to hearing from you soon.',
  },
  {
    id: 'em-002',
    client: 'Fatima Rahman',
    email: 'fatima.rahman@example.com',
    subject: 'Regarding Digital Marketing Package',
    datetime: '2026-01-28 09:15 AM',
    status: 'Unread',
    body: 'Hi team, I am interested in your digital marketing package. Could you share the pricing details and what services are included? I would love to schedule a call to discuss further.',
  },
  {
    id: 'em-003',
    client: 'Shakib Hasan',
    email: 'shakib.hasan@example.com',
    subject: 'Thank you for the excellent service',
    datetime: '2026-01-27 04:45 PM',
    status: 'Replied',
    body: 'Dear Maktech team, I just wanted to take a moment to thank you for the outstanding service you provided. The project was delivered on time and exceeded our expectations. We look forward to working with you again.',
  },
  {
    id: 'em-004',
    client: 'Nusrat Jahan',
    email: 'nusrat.jahan@example.com',
    subject: 'Invoice Payment Confirmation',
    datetime: '2026-01-27 02:20 PM',
    status: 'Read',
    body: 'Hello, I am writing to confirm that the payment for invoice #INV-2026-047 has been processed successfully. Please find the transaction reference attached. Let me know if you need anything else.',
  },
  {
    id: 'em-005',
    client: 'Rahim Uddin',
    email: 'rahim.uddin@example.com',
    subject: 'Quote Request for E-commerce Website',
    datetime: '2026-01-26 11:30 AM',
    status: 'Replied',
    body: 'Hi, we are planning to launch an e-commerce website for our clothing brand. Could you provide a quote for developing a full-featured store with payment integration, product management, and mobile responsiveness?',
  },
  {
    id: 'em-006',
    client: 'Sabrina Begum',
    email: 'sabrina.begum@example.com',
    subject: 'Follow-up on SEO Proposal',
    datetime: '2026-01-26 09:00 AM',
    status: 'Unread',
    body: 'Hello, I sent a request last week regarding your SEO services for our business. I have not received a response yet. Could you please follow up on the proposal and let me know the next steps?',
  },
  {
    id: 'em-007',
    client: 'Imran Hossain',
    email: 'imran.hossain@example.com',
    subject: 'Maintenance Contract Renewal',
    datetime: '2026-01-25 03:20 PM',
    status: 'Read',
    body: 'Dear Maktech, our current maintenance contract is expiring next month. We would like to renew it for another year. Please send over the updated contract terms and pricing so we can review and sign.',
  },
  {
    id: 'em-008',
    client: 'Lailun Nahar',
    email: 'lailun.nahar@example.com',
    subject: 'New Feature Request for CRM',
    datetime: '2026-01-25 01:10 PM',
    status: 'Replied',
    body: 'Hi, we would like to request a few new features for the CRM system you built for us. Specifically, we need bulk email export, a reminder system, and custom report generation. Please advise on the timeline and cost.',
  },
  {
    id: 'em-009',
    client: 'Tanvir Ahmed',
    email: 'tanvir.ahmed@example.com',
    subject: 'App Testing Feedback Report',
    datetime: '2026-01-24 05:40 PM',
    status: 'Unread',
    body: 'Hello team, I have completed the testing phase of the mobile application. Please find the detailed feedback report attached. There are a few critical bugs that need to be addressed before the launch.',
  },
  {
    id: 'em-010',
    client: 'Roksana Islam',
    email: 'roksana.islam@example.com',
    subject: 'Branding Package Inquiry',
    datetime: '2026-01-24 11:00 AM',
    status: 'Read',
    body: 'Hi Maktech, we are a startup looking for a complete branding package including logo design, brand guidelines, business cards, and social media assets. Can you share your portfolio and pricing?',
  },
  {
    id: 'em-011',
    client: 'Mehedi Hassan',
    email: 'mehedi.hassan@example.com',
    subject: 'Q1 Performance Review Request',
    datetime: '2026-01-23 04:15 PM',
    status: 'Replied',
    body: 'Dear team, as per our quarterly review schedule, I would like to request the Q1 performance report for our digital campaigns. Please include traffic data, conversion rates, and ROI analysis.',
  },
  {
    id: 'em-012',
    client: 'Nasrin Akter',
    email: 'nasrin.akter@example.com',
    subject: 'Website Redesign Consultation',
    datetime: '2026-01-23 10:45 AM',
    status: 'Read',
    body: 'Hello, our company website is outdated and we are looking for a complete redesign. We want a modern, professional look with improved UX and faster load times. Can we schedule a consultation call this week?',
  },
  {
    id: 'em-013',
    client: 'Jahirul Islam',
    email: 'jahirul.islam@example.com',
    subject: 'API Integration Support Needed',
    datetime: '2026-01-22 02:30 PM',
    status: 'Unread',
    body: 'Hi, we need help integrating a third-party payment gateway and a logistics API into our existing platform. Could your team provide support for this? Please let us know your availability and estimated timeline.',
  },
  {
    id: 'em-014',
    client: 'Shamima Khatun',
    email: 'shamima.khatun@example.com',
    subject: 'Social Media Campaign Brief',
    datetime: '2026-01-22 09:50 AM',
    status: 'Replied',
    body: 'Dear Maktech, I have prepared the campaign brief for our upcoming Eid promotion. Please review the attached document and let me know if you need any clarifications before we proceed with content creation.',
  },
  {
    id: 'em-015',
    client: 'Robiul Alam',
    email: 'robiul.alam@example.com',
    subject: 'Monthly Report and Analytics',
    datetime: '2026-01-21 03:00 PM',
    status: 'Read',
    body: 'Hello, I am following up on the monthly analytics report for January. Could you please share the updated report including website traffic, social media engagement, and lead generation metrics?',
  },
  {
    id: 'em-016',
    client: 'Moriam Begum',
    email: 'moriam.begum@example.com',
    subject: 'Contract Amendment Discussion',
    datetime: '2026-01-21 11:20 AM',
    status: 'Replied',
    body: 'Hi, we would like to discuss a few amendments to our existing service contract. Specifically regarding the scope of work and deliverable timelines for the upcoming quarter. Please let us know when you are available.',
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

// "2026-01-28 10:30 AM" → "2026-01-28 at 10:30 AM"
const formatDetailDate = (dt) => {
  const idx = dt.indexOf(' ');
  return idx === -1 ? dt : `${dt.slice(0, idx)} at ${dt.slice(idx + 1)}`;
};

const EMAIL_COLS = [
  { label: 'Client Name' },
  { label: 'Subject' },
  { label: 'Date & Time' },
  { label: 'Status', align: 'right' },
];

// ─── Reply Form ─────────────────────────────────────────────────────────────
const ReplyForm = ({ email, onBack }) => (
  <div className='space-y-6'>
    {/* Back link */}
    <button
      type='button'
      onClick={onBack}
      className='inline-flex cursor-pointer items-center gap-1.5 text-base text-gray-500 hover:text-gray-800 transition-colors duration-150 group'
    >
      <MdArrowBack
        className='text-lg group-hover:-translate-x-0.5 transition-transform duration-150'
        aria-hidden='true'
      />
      Back to Inbox
    </button>

    <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8'>
      <h2 className='text-xl font-bold text-gray-900 mb-6'>Reply to Email</h2>

      <div className='space-y-4'>
        {/* To */}
        <div>
          <label
            htmlFor='reply-to'
            className='block text-sm text-gray-500 mb-1.5'
          >
            To:
          </label>
          <input
            id='reply-to'
            type='email'
            defaultValue={email.email}
            className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition'
          />
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor='reply-subject'
            className='block text-sm text-gray-500 mb-1.5'
          >
            Subject:
          </label>
          <input
            id='reply-subject'
            type='text'
            defaultValue={`Re: ${email.subject}`}
            className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition'
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor='reply-message'
            className='block text-sm text-gray-500 mb-1.5'
          >
            Message:
          </label>
          <textarea
            id='reply-message'
            rows={7}
            placeholder='Type your message here...'
            className='w-full px-4 py-3 rounded-lg border border-gray-200 text-base text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition'
          />
        </div>

        {/* Send */}
        <button
          type='button'
          className='group inline-flex cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
        >
          <MdSend
            className='text-lg shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
            aria-hidden='true'
          />
          <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
            Send Email
          </span>
        </button>
      </div>
    </div>
  </div>
);

// ─── Email Detail View ───────────────────────────────────────────────────────
const EmailDetail = ({ email, onBack }) => {
  const [showReply, setShowReply] = useState(false);

  if (showReply) return <ReplyForm email={email} onBack={onBack} />;

  return (
    <div>
      {/* Back link */}
      <button
        type='button'
        onClick={onBack}
        className='inline-flex cursor-pointer items-center gap-1.5 text-base text-gray-500 hover:text-gray-800 transition-colors duration-150 mb-6 group'
      >
        <MdArrowBack
          className='text-lg group-hover:-translate-x-0.5 transition-transform duration-150'
          aria-hidden='true'
        />
        Back to Inbox
      </button>

      {/* Email card */}
      <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8'>
        {/* Header row: subject + status badge */}
        <div className='flex items-start justify-between gap-4 mb-3'>
          <h2 className='text-xl sm:text-2xl font-bold text-gray-900 leading-snug'>
            {email.subject}
          </h2>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shrink-0 ${getStatusStyle(email.status)}`}
          >
            {email.status}
          </span>
        </div>

        {/* Meta: From · email · datetime */}
        <p className='text-sm text-gray-400 mb-6'>
          <span className='text-gray-500'>From:</span>{' '}
          <span className='font-medium text-gray-700'>{email.client}</span>
          <span className='mx-2 text-gray-300'>&bull;</span>
          {email.email}
          <span className='mx-2 text-gray-300'>&bull;</span>
          {formatDetailDate(email.datetime)}
        </p>

        {/* Divider */}
        <hr className='border-gray-100 mb-6' />

        {/* Body */}
        <p className='text-base text-gray-600 leading-relaxed mb-8'>
          {email.body}
        </p>

        {/* Reply button */}
        <button
          type='button'
          onClick={() => setShowReply(true)}
          className='group inline-flex cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
        >
          <MdReply
            className='text-lg shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
            aria-hidden='true'
          />
          <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
            Reply
          </span>
        </button>
      </div>
    </div>
  );
};

// ─── EmailCard — mobile layout (< md) ───────────────────────────────────────
const EmailCard = ({ email, onSelect }) => {
  const { client, subject, datetime, status } = email;
  const isUnread = status === 'Unread';
  return (
    <button
      type='button'
      onClick={() => onSelect(email)}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-150 hover:shadow-sm active:scale-[0.99] ${
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
    </button>
  );
};

// ─── EmailRow — desktop table row (md+) ─────────────────────────────────────
const EmailRow = ({ email, onSelect }) => {
  const { client, subject, datetime, status } = email;
  const isUnread = status === 'Unread';
  return (
    <tr
      onClick={() => onSelect(email)}
      className={`border-b border-gray-50 transition-colors duration-150 cursor-pointer hover:bg-orange-50/40 ${
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
            className={`text-sm ${
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
          className={`text-sm ${
            isUnread
              ? 'font-semibold text-gray-900'
              : 'font-normal text-gray-600'
          }`}
        >
          {subject}
        </span>
      </td>
      <td className='py-3.5 px-5'>
        <span className='text-sm text-gray-400 whitespace-nowrap'>
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

// ─── Page component ──────────────────────────────────────────────────────────
export default function Emails() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedEmail, setSelected] = useState(null);

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
  const handleSelect = (email) => setSelected(email);
  const handleBack = () => setSelected(null);

  useEffect(() => {
    document.title = 'Emails – Maktech Admin';
  }, []);

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
          onClick={() => navigate('/admin/compose')}
          className='group inline-flex cursor-pointer items-center gap-1.5 overflow-hidden px-4 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
        >
          <MdAdd
            className='text-lg shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
            aria-hidden='true'
          />
          <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
            Compose Email
          </span>
        </button>
      </div>

      {/* Stat Strip */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
        {STAT_CARDS.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* ── Detail view or Inbox ── */}
      {selectedEmail ? (
        <EmailDetail email={selectedEmail} onBack={handleBack} />
      ) : (
        <section
          aria-label='Email inbox'
          className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'
        >
          {/* Mobile: card list (< md) */}
          <div className='md:hidden p-4 space-y-3'>
            {pageData.map((email) => (
              <EmailCard key={email.id} email={email} onSelect={handleSelect} />
            ))}
          </div>

          {/* Desktop: table (md+) */}
          <div className='hidden md:block overflow-x-auto'>
            <AdminTable columns={EMAIL_COLS} ariaLabel='Client emails'>
              {pageData.map((email) => (
                <EmailRow
                  key={email.id}
                  email={email}
                  onSelect={handleSelect}
                />
              ))}
            </AdminTable>
          </div>

          {/* Bottom bar */}
          <div className='flex flex-col items-center gap-3 px-5 py-4 border-t border-gray-100 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-sm text-gray-400 shrink-0'>
              Showing{' '}
              <span className='font-semibold text-gray-700'>
                {rangeStart} to {rangeEnd}
              </span>{' '}
              of{' '}
              <span className='font-semibold text-gray-700'>
                {EMAILS.length}
              </span>{' '}
              emails
            </p>
            <nav aria-label='Pagination'>
              <Pagination
                page={page}
                totalPages={totalPages}
                pageRange={pageRange}
                onPage={handlePage}
              />
            </nav>
          </div>
        </section>
      )}
    </div>
  );
}
