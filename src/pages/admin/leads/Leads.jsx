import { useEffect, useMemo, useState } from 'react';
import { MdPersonAdd, MdEdit, MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import AdminTable from '../../../components/AdminTable';
import Pagination from '../../../components/Pagination';
import { getPageRange } from '../../../utils/helpers';

// ─── Static lead data ─────────────────────────────────────────────────────────
const LEADS = [
  {
    id: 1,
    name: 'Karim Ahmed',
    company: 'Tech Solutions Ltd',
    phone: '+880 1712-345678',
    email: 'karim@techsolutions.com',
    location: 'Dhaka',
    dateAdded: '2026-01-25',
  },
  {
    id: 2,
    name: 'Sultana Begum',
    company: 'Fashion House BD',
    phone: '+880 1823-456789',
    email: 'sultana@fashionhouse.com',
    location: 'Chittagong',
    dateAdded: '2026-01-24',
  },
  {
    id: 3,
    name: 'Hasan Mahmud',
    company: 'Green Valley Foods',
    phone: '+880 1934-567890',
    email: 'hasan@greenvalley.com',
    location: 'Sylhet',
    dateAdded: '2026-01-23',
  },
  {
    id: 4,
    name: 'Amina Khan',
    company: 'Digital Marketing Pro',
    phone: '+880 1645-678901',
    email: 'amina@digitalmarketing.com',
    location: 'Dhaka',
    dateAdded: '2026-01-22',
  },
  {
    id: 5,
    name: 'Rafiq Islam',
    company: 'Startup Hub',
    phone: '+880 1756-789012',
    email: 'rafiq@startuphub.com',
    location: 'Dhaka',
    dateAdded: '2026-01-20',
  },
  {
    id: 6,
    name: 'Nusrat Jahan',
    company: 'E-commerce Experts',
    phone: '+880 1867-890123',
    email: 'nusrat@ecommerce.com',
    location: 'Chittagong',
    dateAdded: '2026-01-19',
  },
  {
    id: 7,
    name: 'Shafiqur Rahman',
    company: 'Logistics Solutions',
    phone: '+880 1978-901234',
    email: 'shafiqur@logistics.com',
    location: 'Dhaka',
    dateAdded: '2026-01-18',
  },
  {
    id: 8,
    name: 'Farida Yasmin',
    company: 'HealthCare Plus',
    phone: '+880 1689-012345',
    email: 'farida@healthcare.com',
    location: 'Chittagong',
    dateAdded: '2026-01-17',
  },
  {
    id: 9,
    name: 'Imran Hossain',
    company: 'Real Estate Co',
    phone: '+880 1790-123456',
    email: 'imran@realestate.com',
    location: 'Dhaka',
    dateAdded: '2026-01-16',
  },
  {
    id: 10,
    name: 'Laila Sultana',
    company: 'Education Hub',
    phone: '+880 1901-234567',
    email: 'laila@educationhub.com',
    location: 'Dhaka',
    dateAdded: '2026-01-15',
  },
];

const PAGE_SIZE = 8;

const TABLE_COLS = [
  { label: 'Name' },
  { label: 'Company' },
  { label: 'Phone' },
  { label: 'Email' },
  { label: 'Location' },
  { label: 'Date Added' },
  { label: 'Actions' },
];

// TD — shared cell class for LeadRow; thead is handled by AdminTable
const TD = 'px-5 py-3.5 text-sm text-gray-700 whitespace-nowrap';

// Shared input class — avoids repeating across all edit form fields
const INPUT_CLS =
  'w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition';

const LABEL_CLS = 'block text-sm font-medium text-gray-600 mb-1.5';

// ─── Shared form shell (DRY) — used by both Add and Edit forms ───────────────
const REQUIRED_STAR = (
  <span className='text-red-500 ml-0.5' aria-hidden='true'>
    *
  </span>
);

const LeadFormShell = ({
  title,
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState(initialValues);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className='space-y-6 pb-8'>
      {/* Cancel link */}
      <button
        type='button'
        onClick={onCancel}
        className='inline-flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-150'
      >
        <MdClose className='text-base' aria-hidden='true' />
        Cancel
      </button>

      {/* Form card */}
      <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8'>
        <h1 className='text-xl font-bold text-gray-900 mb-6'>{title}</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6'>
            <div>
              <label htmlFor='lf-name' className={LABEL_CLS}>
                Name{REQUIRED_STAR}
              </label>
              <input
                id='lf-name'
                name='name'
                type='text'
                value={form.name}
                onChange={handleChange}
                autoComplete='name'
                required
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='lf-company' className={LABEL_CLS}>
                Company Name{REQUIRED_STAR}
              </label>
              <input
                id='lf-company'
                name='company'
                type='text'
                value={form.company}
                onChange={handleChange}
                autoComplete='organization'
                required
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='lf-phone' className={LABEL_CLS}>
                Phone{REQUIRED_STAR}
              </label>
              <input
                id='lf-phone'
                name='phone'
                type='tel'
                value={form.phone}
                onChange={handleChange}
                autoComplete='tel'
                required
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='lf-email' className={LABEL_CLS}>
                Email{REQUIRED_STAR}
              </label>
              <input
                id='lf-email'
                name='email'
                type='email'
                value={form.email}
                onChange={handleChange}
                autoComplete='email'
                required
                className={INPUT_CLS}
              />
            </div>

            {/* Location — half-row on sm+ */}
            <div>
              <label htmlFor='lf-location' className={LABEL_CLS}>
                Location{REQUIRED_STAR}
              </label>
              <input
                id='lf-location'
                name='location'
                type='text'
                value={form.location}
                onChange={handleChange}
                autoComplete='address-level2'
                required
                className={INPUT_CLS}
              />
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <button
              type='submit'
              className='inline-flex cursor-pointer items-center px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
            >
              {submitLabel}
            </button>
            <button
              type='button'
              onClick={onCancel}
              className='inline-flex cursor-pointer items-center px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 active:scale-[0.97]'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EMPTY_LEAD = {
  name: '',
  company: '',
  phone: '',
  email: '',
  location: '',
};

// ─── Add New Lead form ────────────────────────────────────────────────────────
const AddLeadForm = ({ onCancel }) => {
  const handleSubmit = () => {
    toast.success('Lead added successfully!');
    onCancel();
  };
  return (
    <LeadFormShell
      title='Add New Lead'
      initialValues={EMPTY_LEAD}
      submitLabel='Add Lead'
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
};

// ─── Edit Lead form ───────────────────────────────────────────────────────────
const EditLeadForm = ({ lead, onCancel }) => {
  const handleSubmit = () => {
    toast.success('Lead updated successfully!');
    onCancel();
  };
  return (
    <LeadFormShell
      title='Edit Lead'
      initialValues={{
        name: lead.name,
        company: lead.company,
        phone: lead.phone,
        email: lead.email,
        location: lead.location,
      }}
      submitLabel='Update Lead'
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
};

// ─── Mobile card ──────────────────────────────────────────────────────────────
const LeadCard = ({ lead, onEdit }) => (
  <article className='bg-white rounded-xl border border-gray-100 shadow-sm p-4'>
    <div className='flex items-start justify-between gap-2 mb-3'>
      <div>
        <p className='text-base font-semibold text-gray-900'>{lead.name}</p>
        <p className='text-sm text-gray-500'>{lead.company}</p>
      </div>
      <button
        type='button'
        onClick={() => onEdit(lead)}
        aria-label={`Edit lead: ${lead.name}`}
        className='p-1.5 rounded-lg text-orange-400 hover:bg-orange-50 transition-colors duration-150'
      >
        <MdEdit className='text-lg' aria-hidden='true' />
      </button>
    </div>

    <dl className='grid grid-cols-2 gap-y-2 gap-x-3 text-sm'>
      <div>
        <dt className='text-xs text-gray-400'>Phone</dt>
        <dd className='text-gray-700'>{lead.phone}</dd>
      </div>
      <div>
        <dt className='text-xs text-gray-400'>Location</dt>
        <dd className='text-gray-700'>{lead.location}</dd>
      </div>
      <div className='col-span-2'>
        <dt className='text-xs text-gray-400'>Email</dt>
        <dd className='text-gray-700 break-all'>{lead.email}</dd>
      </div>
      <div>
        <dt className='text-xs text-gray-400'>Date Added</dt>
        <dd className='text-gray-700'>{lead.dateAdded}</dd>
      </div>
    </dl>
  </article>
);

// ─── Desktop table row ────────────────────────────────────────────────────────
const LeadRow = ({ lead, onEdit }) => (
  <tr className='border-t border-gray-50 hover:bg-orange-50/30 transition-colors duration-150'>
    <td className={`${TD} font-medium text-gray-900`}>{lead.name}</td>
    <td className={TD}>{lead.company}</td>
    <td className={TD}>{lead.phone}</td>
    <td className={TD}>{lead.email}</td>
    <td className={TD}>{lead.location}</td>
    <td className={TD}>{lead.dateAdded}</td>
    <td className='px-5 py-3.5'>
      <button
        type='button'
        onClick={() => onEdit(lead)}
        aria-label={`Edit lead: ${lead.name}`}
        className='p-1.5 rounded-lg text-orange-400 hover:bg-orange-50 transition-colors duration-150'
      >
        <MdEdit className='text-lg' aria-hidden='true' />
      </button>
    </td>
  </tr>
);

// ─── Page component ───────────────────────────────────────────────────────────
export default function Leads() {
  useEffect(() => {
    document.title = 'Leads – Maktech Admin';
  }, []);

  // Derive this-week and last-week counts from data rather than storing derived state
  const { thisWeek, weekDiff } = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    const twoWeeksAgo = new Date(now);
    twoWeeksAgo.setDate(now.getDate() - 14);

    let thisWeekCount = 0;
    let lastWeekCount = 0;

    LEADS.forEach(({ dateAdded }) => {
      const d = new Date(dateAdded);
      if (d >= weekAgo) thisWeekCount += 1;
      else if (d >= twoWeeksAgo) lastWeekCount += 1;
    });

    return { thisWeek: thisWeekCount, weekDiff: thisWeekCount - lastWeekCount };
  }, []);

  const diffLabel =
    weekDiff >= 0
      ? `+${weekDiff} from last week`
      : `${weekDiff} from last week`;
  const diffColor = weekDiff >= 0 ? 'text-green-600' : 'text-red-500';

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(LEADS.length / PAGE_SIZE);
  const pageData = useMemo(
    () => LEADS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page],
  );
  const pageRange = useMemo(
    () => getPageRange(page, totalPages),
    [page, totalPages],
  );
  const rangeStart = (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, LEADS.length);

  const handlePage = (p) => setPage(Math.max(1, Math.min(totalPages, p)));

  const [editingLead, setEditingLead] = useState(null);
  const [addingLead, setAddingLead] = useState(false);
  const handleEdit = (lead) => setEditingLead(lead);
  const handleCancelEdit = () => setEditingLead(null);
  const handleCancelAdd = () => setAddingLead(false);

  return (
    <div className='space-y-6 pb-8'>
      {editingLead ? (
        <EditLeadForm lead={editingLead} onCancel={handleCancelEdit} />
      ) : addingLead ? (
        <AddLeadForm onCancel={handleCancelAdd} />
      ) : (
        <>
          {/* Page Header */}
          <div className='flex flex-wrap items-start justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
                Leads
              </h1>
              <p className='text-base text-gray-500 mt-1'>
                Manage your business growth pipeline
              </p>
            </div>

            <button
              type='button'
              onClick={() => setAddingLead(true)}
              className='group inline-flex cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
            >
              <MdPersonAdd
                className='text-lg shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
                aria-hidden='true'
              />
              <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
                Add New Lead
              </span>
            </button>
          </div>

          {/* Stat Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'>
              <p className='text-sm font-medium text-gray-500 mb-2'>
                Total Leads
              </p>
              <p className='text-4xl font-bold text-gray-900'>{LEADS.length}</p>
            </div>

            <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'>
              <p className='text-sm font-medium text-gray-500 mb-2'>
                New Leads This Week
              </p>
              <p className='text-4xl font-bold text-gray-900'>{thisWeek}</p>
              <p className={`mt-2 text-sm font-medium ${diffColor}`}>
                {diffLabel}
              </p>
            </div>
          </div>

          {/* Leads list — single card, mobile cards + desktop table */}
          <section
            aria-label='Leads list'
            className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'
          >
            {/* Mobile: card list */}
            <div className='sm:hidden p-4 space-y-3'>
              {pageData.map((lead) => (
                <div key={lead.id} role='listitem'>
                  <LeadCard lead={lead} onEdit={handleEdit} />
                </div>
              ))}
            </div>

            {/* Desktop: table */}
            <div className='hidden sm:block overflow-x-auto'>
              <AdminTable columns={TABLE_COLS} ariaLabel='Leads list'>
                {pageData.map((lead) => (
                  <LeadRow key={lead.id} lead={lead} onEdit={handleEdit} />
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
                  {LEADS.length}
                </span>{' '}
                leads
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
        </>
      )}
    </div>
  );
}
