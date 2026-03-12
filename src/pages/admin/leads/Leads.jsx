import { useEffect, useMemo } from 'react';
import { MdPersonAdd, MdEdit } from 'react-icons/md';

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
];

const TABLE_COLS = [
  'Name',
  'Company',
  'Phone',
  'Email',
  'Location',
  'Date Added',
  'Actions',
];

// Shared Tailwind class strings — avoids repeating across every cell
const TH =
  'px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide';
const TD = 'px-5 py-3.5 text-sm text-gray-700 whitespace-nowrap';

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

  const handleEdit = (lead) => {
    // TODO: open edit lead modal or navigate to edit page
    void lead;
  };

  return (
    <div className='space-y-6 pb-8'>
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
          className='group inline-flex cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-black-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
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
          <p className='text-sm font-medium text-gray-500 mb-2'>Total Leads</p>
          <p className='text-4xl font-bold text-gray-900'>{LEADS.length}</p>
        </div>

        <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'>
          <p className='text-sm font-medium text-gray-500 mb-2'>
            New Leads This Week
          </p>
          <p className='text-4xl font-bold text-gray-900'>{thisWeek}</p>
          <p className={`mt-2 text-sm font-medium ${diffColor}`}>{diffLabel}</p>
        </div>
      </div>

      {/* Table — desktop (sm+) */}
      <div className='hidden sm:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden'>
        <table className='w-full' aria-label='Leads list'>
          <thead className='bg-gray-50 border-b border-gray-100'>
            <tr>
              {TABLE_COLS.map((col) => (
                <th key={col} scope='col' className={TH}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LEADS.map((lead) => (
              <LeadRow key={lead.id} lead={lead} onEdit={handleEdit} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards — mobile */}
      <div className='sm:hidden space-y-3' role='list' aria-label='Leads list'>
        {LEADS.map((lead) => (
          <div key={lead.id} role='listitem'>
            <LeadCard lead={lead} onEdit={handleEdit} />
          </div>
        ))}
      </div>
    </div>
  );
}
