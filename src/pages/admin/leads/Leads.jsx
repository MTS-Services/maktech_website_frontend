import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  MdPersonAdd,
  MdEdit,
  MdClose,
  MdCalendarToday,
  MdSearch,
  MdVisibility,
  MdDelete,
  MdCheckCircle,
  MdAccessTime,
  MdRefresh,
  MdPublic,
  MdEmail,
  MdPhone,
  MdLocationOn,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import AdminTable from '../../../components/AdminTable';
import Pagination from '../../../components/Pagination';
import StatCard from '../../../components/StatCard';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import { getPageRange } from '../../../utils/helpers';
import apiClient from '../../../services/apiClient';
import { formatMeetingDisplay, getLocationFromTimezone } from '../../../utils/timezoneHelper';

const PAGE_SIZE = 8;

const TABLE_COLS = [
  { label: 'Client / Company' },
  { label: 'Contact Info' },
  { label: 'Service & Budget' },
  { label: 'Meeting Schedule' },
  { label: 'Status' },
  { label: 'Actions', align: 'right' },
];

const TD = 'px-5 py-3.5 text-sm text-gray-700 whitespace-nowrap';
const INPUT_CLS =
  'w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition';
const LABEL_CLS = 'block text-sm font-medium text-gray-600 mb-1.5';

const STATUS_BADGES = {
  NEW: { label: 'New Inquiry', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  CONTACTED: { label: 'Contacted', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  IN_PROGRESS: { label: 'In Discussion', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  CONVERTED: { label: 'Converted', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  LOST: { label: 'Lost', bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' },
};

// ─── Lead Form (Add & Edit) ──────────────────────────────────────────────────
const LeadFormShell = ({ title, initialValues, submitLabel, onSubmit, onCancel, isSubmitting }) => {
  const [form, setForm] = useState(initialValues);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className='space-y-6 pb-8 animate-in fade-in duration-200'>
      <button
        type='button'
        onClick={onCancel}
        className='inline-flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-150'
      >
        <MdClose className='text-base' aria-hidden='true' />
        Cancel
      </button>

      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8'>
        <h1 className='text-xl font-bold text-gray-900 mb-6'>{title}</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6'>
            <div>
              <label htmlFor='lf-fullName' className={LABEL_CLS}>
                Full Name <span className='text-red-500'>*</span>
              </label>
              <input
                id='lf-fullName'
                name='fullName'
                type='text'
                value={form.fullName || ''}
                onChange={handleChange}
                required
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='lf-companyName' className={LABEL_CLS}>
                Company Name
              </label>
              <input
                id='lf-companyName'
                name='companyName'
                type='text'
                value={form.companyName || ''}
                onChange={handleChange}
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='lf-email' className={LABEL_CLS}>
                Email <span className='text-red-500'>*</span>
              </label>
              <input
                id='lf-email'
                name='email'
                type='email'
                value={form.email || ''}
                onChange={handleChange}
                required
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='lf-phone' className={LABEL_CLS}>
                Phone / WhatsApp
              </label>
              <input
                id='lf-phone'
                name='phone'
                type='tel'
                value={form.phone || ''}
                onChange={handleChange}
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='lf-service' className={LABEL_CLS}>
                Service
              </label>
              <input
                id='lf-service'
                name='service'
                type='text'
                placeholder='e.g. MERN Stack, UI/UX'
                value={form.service || ''}
                onChange={handleChange}
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='lf-budget' className={LABEL_CLS}>
                Budget ($ USD)
              </label>
              <input
                id='lf-budget'
                name='budget'
                type='number'
                value={form.budget || ''}
                onChange={handleChange}
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='lf-location' className={LABEL_CLS}>
                Location / Country
              </label>
              <input
                id='lf-location'
                name='location'
                type='text'
                value={form.location || ''}
                onChange={handleChange}
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='lf-status' className={LABEL_CLS}>
                Lead Status
              </label>
              <select
                id='lf-status'
                name='status'
                value={form.status || 'NEW'}
                onChange={handleChange}
                className={INPUT_CLS}
              >
                <option value='NEW'>New Inquiry</option>
                <option value='CONTACTED'>Contacted</option>
                <option value='IN_PROGRESS'>In Discussion</option>
                <option value='CONVERTED'>Converted</option>
                <option value='LOST'>Lost</option>
              </select>
            </div>

            <div className='sm:col-span-2'>
              <label htmlFor='lf-message' className={LABEL_CLS}>
                Message / Client Inquiry
              </label>
              <textarea
                id='lf-message'
                name='message'
                rows='3'
                value={form.message || ''}
                onChange={handleChange}
                className={`${INPUT_CLS} resize-none`}
              />
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='inline-flex cursor-pointer items-center px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] transition-all duration-200 active:scale-[0.97]'
            >
              {isSubmitting ? 'Saving...' : submitLabel}
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

// ─── Lead Details Modal ───────────────────────────────────────────────────────
const LeadDetailsModal = ({ lead, onClose, onStatusChange }) => {
  if (!lead) return null;
  const meeting = formatMeetingDisplay(lead.meetingDate, lead.timezone);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150'>
      <div className='bg-white rounded-2xl border border-gray-100 shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-5'>
        {/* Header */}
        <div className='flex items-start justify-between border-b border-gray-100 pb-4'>
          <div>
            <div className='flex items-center gap-2'>
              <h2 className='text-xl font-bold text-gray-900'>{lead.fullName}</h2>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                  STATUS_BADGES[lead.status]?.bg || 'bg-gray-100'
                } ${STATUS_BADGES[lead.status]?.text || 'text-gray-700'} ${
                  STATUS_BADGES[lead.status]?.border || 'border-gray-200'
                }`}
              >
                {STATUS_BADGES[lead.status]?.label || lead.status}
              </span>
            </div>
            <p className='text-xs text-gray-400 mt-1'>
              Inquiry ID: <span className='font-mono font-medium'>{lead.id}</span> &bull; Submitted{' '}
              {new Date(lead.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition'
          >
            <MdClose className='text-xl' />
          </button>
        </div>

        {/* Meeting Schedule Box (Prominently Highlighted) */}
        {meeting ? (
          <div className='p-4 rounded-xl bg-orange-50/70 border border-orange-200/80 space-y-2'>
            <div className='flex items-center gap-2 text-xs font-bold text-[#ff6533] uppercase tracking-wider'>
              <MdCalendarToday className='text-sm' />
              <span>Scheduled Meeting Appointment</span>
            </div>
            <div className='space-y-1 pt-1'>
              <p className='text-sm text-gray-900 font-bold flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-emerald-500 animate-ping' />
                <span>Bangladesh Time: {meeting.bstFormatted}</span>
              </p>
              {meeting.clientFormatted && (
                <p className='text-xs text-gray-600 pl-4'>
                  Client Local Time: <strong className='text-gray-800'>{meeting.clientFormatted}</strong>
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className='p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-500 flex items-center gap-2'>
            <MdCalendarToday className='text-gray-400' />
            <span>No meeting was scheduled with this inquiry.</span>
          </div>
        )}

        {/* Client & Inquiry Info */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm'>
          <div className='p-3 rounded-xl bg-gray-50 border border-gray-100'>
            <p className='text-gray-400 text-xs font-semibold'>Company</p>
            <p className='font-bold text-gray-800 mt-0.5'>{lead.companyName || '—'}</p>
          </div>

          <div className='p-3 rounded-xl bg-gray-50 border border-gray-100'>
            <p className='text-gray-400 text-xs font-semibold flex items-center gap-1'>
              <MdLocationOn className='text-xs text-gray-400' />
              Location
            </p>
            <p className='font-bold text-gray-800 mt-0.5'>
              {lead.location || (lead.timezone ? getLocationFromTimezone(lead.timezone) : null) || '—'}
            </p>
          </div>

          <div className='p-3 rounded-xl bg-gray-50 border border-gray-100'>
            <p className='text-gray-400 text-xs font-semibold'>Email</p>
            <a
              href={`mailto:${lead.email}`}
              className='font-bold text-[#ff6533] hover:underline mt-0.5 block truncate'
            >
              {lead.email}
            </a>
          </div>

          <div className='p-3 rounded-xl bg-gray-50 border border-gray-100'>
            <p className='text-gray-400 text-xs font-semibold'>Phone / WhatsApp</p>
            <p className='font-bold text-gray-800 mt-0.5'>{lead.phone || '—'}</p>
          </div>

          <div className='p-3 rounded-xl bg-gray-50 border border-gray-100'>
            <p className='text-gray-400 text-xs font-semibold'>Service Requested</p>
            <p className='font-bold text-gray-800 mt-0.5'>{lead.service || 'General Inquiry'}</p>
          </div>

          <div className='p-3 rounded-xl bg-gray-50 border border-gray-100'>
            <p className='text-gray-400 text-xs font-semibold'>Budget</p>
            <p className='font-bold text-gray-800 mt-0.5'>
              {lead.budget ? `$${lead.budget.toLocaleString()}` : 'Not specified'}
            </p>
          </div>
        </div>

        {/* Message */}
        <div>
          <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5'>
            Client Message
          </p>
          <div className='p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs sm:text-sm text-gray-700 whitespace-pre-wrap leading-relaxed'>
            {lead.message || '(No message content)'}
          </div>
        </div>

        {/* Quick Status Update */}
        <div className='pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100'>
          <div className='flex items-center gap-2'>
            <span className='text-xs font-semibold text-gray-500'>Update Status:</span>
            <select
              value={lead.status}
              onChange={(e) => onStatusChange(lead.id, e.target.value)}
              className='px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold bg-white outline-none cursor-pointer hover:border-gray-300'
            >
              <option value='NEW'>New Inquiry</option>
              <option value='CONTACTED'>Contacted</option>
              <option value='IN_PROGRESS'>In Discussion</option>
              <option value='CONVERTED'>Converted</option>
              <option value='LOST'>Lost</option>
            </select>
          </div>

          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Admin Leads Page Component ─────────────────────────────────────────
export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [meta, setMeta] = useState(null);
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeadsThisWeek: 0,
    statusCounts: {},
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [meetingFilter, setMeetingFilter] = useState('ALL'); // ALL, ONLY_MEETINGS

  // Modal states
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingLead, setEditingLead] = useState(null);
  const [addingLead, setAddingLead] = useState(false);
  const [deletingLead, setDeletingLead] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Inquiries & Meetings – Maktech Admin';
  }, []);

  // Fetch Leads List
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', PAGE_SIZE);
      if (statusFilter !== 'ALL') params.append('status', statusFilter);
      if (searchTerm.trim()) params.append('searchTerm', searchTerm.trim());

      const res = await apiClient.get(`/api/v1/leads?${params.toString()}`);
      if (res.data?.success) {
        setLeads(res.data.data || []);
        setMeta(res.data.meta);
      }
    } catch (err) {
      console.warn('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, searchTerm]);

  // Fetch Lead Stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await apiClient.get('/api/v1/leads/stats');
      if (res.data?.success && res.data.data) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.warn('Failed to fetch lead stats:', err);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Client-side filter for meeting only if chosen
  const filteredLeads = useMemo(() => {
    if (meetingFilter === 'ONLY_MEETINGS') {
      return leads.filter((l) => Boolean(l.meetingDate));
    }
    return leads;
  }, [leads, meetingFilter]);

  // Count of scheduled meetings
  const scheduledMeetingsCount = useMemo(() => {
    return leads.filter((l) => Boolean(l.meetingDate)).length;
  }, [leads]);

  // Status Change Handler
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await apiClient.patch(`/api/v1/leads/${id}`, { status: newStatus });
      if (res.data?.success) {
        toast.success(`Status updated to ${newStatus}`);
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        if (selectedLead?.id === id) {
          setSelectedLead((prev) => ({ ...prev, status: newStatus }));
        }
        fetchStats();
      }
    } catch (err) {
      toast.error('Failed to update lead status');
    }
  };

  // Delete Lead Handler
  const handleDeleteConfirm = async () => {
    if (!deletingLead) return;
    try {
      const res = await apiClient.delete(`/api/v1/leads/${deletingLead.id}`);
      if (res.data?.success) {
        toast.success('Lead inquiry deleted successfully');
        setDeletingLead(null);
        fetchLeads();
        fetchStats();
      }
    } catch (err) {
      toast.error('Failed to delete lead inquiry');
    }
  };

  // Add Lead Handler
  const handleAddSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const res = await apiClient.post('/api/v1/leads', formData);
      if (res.data?.success) {
        toast.success('Lead added successfully!');
        setAddingLead(false);
        fetchLeads();
        fetchStats();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add lead');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit Lead Handler
  const handleEditSubmit = async (formData) => {
    if (!editingLead) return;
    setIsSubmitting(true);
    try {
      const res = await apiClient.patch(`/api/v1/leads/${editingLead.id}`, formData);
      if (res.data?.success) {
        toast.success('Lead updated successfully!');
        setEditingLead(null);
        fetchLeads();
        fetchStats();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update lead');
    } finally {
      setIsSubmitting(false);
    }
  };

  const statCardsData = [
    {
      Icon: MdEmail,
      accentColor: '#ff6533',
      iconBg: 'bg-orange-50',
      iconColor: 'text-[#ff6533]',
      badge: 'All Time',
      badgeBg: 'bg-orange-50',
      badgeColor: 'text-orange-700',
      label: 'Total Inquiries',
      value: (stats.totalLeads ?? leads.length).toString(),
      loading,
    },
    {
      Icon: MdCalendarToday,
      accentColor: '#16a34a',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      badge: 'Consultations',
      badgeBg: 'bg-emerald-50',
      badgeColor: 'text-emerald-700',
      label: 'Scheduled Meetings',
      value: `${scheduledMeetingsCount} Booked`,
      loading,
    },
    {
      Icon: MdPersonAdd,
      accentColor: '#2563eb',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      badge: 'This Week',
      badgeBg: 'bg-blue-50',
      badgeColor: 'text-blue-700',
      label: 'New This Week',
      value: (stats.newLeadsThisWeek ?? 0).toString(),
      loading,
    },
    {
      Icon: MdCheckCircle,
      accentColor: '#9333ea',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      badge: 'Converted',
      badgeBg: 'bg-purple-50',
      badgeColor: 'text-purple-700',
      label: 'Converted Clients',
      value: (stats.statusCounts?.CONVERTED ?? 0).toString(),
      loading,
    },
  ];

  return (
    <div className='space-y-6 pb-8'>
      {editingLead ? (
        <LeadFormShell
          title={`Edit Lead: ${editingLead.fullName}`}
          initialValues={{
            ...editingLead,
            location: editingLead.location || (editingLead.timezone ? getLocationFromTimezone(editingLead.timezone) : ''),
          }}
          submitLabel='Save Changes'
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingLead(null)}
          isSubmitting={isSubmitting}
        />
      ) : addingLead ? (
        <LeadFormShell
          title='Add New Lead Inquiry'
          initialValues={{
            fullName: '',
            companyName: '',
            email: '',
            phone: '',
            service: '',
            budget: '',
            location: '',
            status: 'NEW',
            message: '',
          }}
          submitLabel='Create Lead'
          onSubmit={handleAddSubmit}
          onCancel={() => setAddingLead(false)}
          isSubmitting={isSubmitting}
        />
      ) : (
        <>
          {/* Page Header */}
          <div className='flex flex-wrap items-start justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
                Leads &amp; Meeting Bookings
              </h1>
              <p className='text-sm sm:text-base text-gray-500 mt-1'>
                Monitor incoming website inquiries and client scheduled consultation meetings
              </p>
            </div>

            <div className='flex items-center gap-2.5'>
              <button
                type='button'
                onClick={() => {
                  fetchLeads();
                  fetchStats();
                  toast.info('Refreshed leads data');
                }}
                title='Refresh'
                className='p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-[#ff6533] shadow-2xs transition cursor-pointer'
              >
                <MdRefresh className='text-lg' />
              </button>
              <button
                type='button'
                onClick={() => setAddingLead(true)}
                className='inline-flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-xl hover:bg-[#e5501a] shadow-2xs transition-all duration-200 active:scale-[0.97]'
              >
                <MdPersonAdd className='text-lg shrink-0' />
                <span>Add New Lead</span>
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
            {statCardsData.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
          </div>

          {/* Filter Bar */}
          <div className='flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-2xs'>
            {/* Search */}
            <div className='flex items-center gap-2 flex-1 min-w-[240px] px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-200/60'>
              <MdSearch className='text-gray-400 text-lg shrink-0' />
              <input
                type='text'
                placeholder='Search by client name, email, company...'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className='w-full text-xs sm:text-sm bg-transparent outline-none text-gray-800 placeholder:text-gray-400'
              />
            </div>

            {/* Filter controls */}
            <div className='flex items-center gap-2 flex-wrap'>
              <div className='flex items-center gap-1.5'>
                <span className='text-xs font-semibold text-gray-500 hidden sm:inline'>Filter:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className='px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 outline-none cursor-pointer hover:border-gray-300 transition'
                >
                  <option value='ALL'>All Statuses</option>
                  <option value='NEW'>New Inquiries</option>
                  <option value='CONTACTED'>Contacted</option>
                  <option value='IN_PROGRESS'>In Discussion</option>
                  <option value='CONVERTED'>Converted</option>
                  <option value='LOST'>Lost</option>
                </select>
              </div>

              {/* Toggle: Meetings Only */}
              <button
                type='button'
                onClick={() => setMeetingFilter((prev) => (prev === 'ALL' ? 'ONLY_MEETINGS' : 'ALL'))}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer border ${
                  meetingFilter === 'ONLY_MEETINGS'
                    ? 'bg-orange-50 border-orange-300 text-[#ff6533]'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900'
                }`}
              >
                <MdCalendarToday className='text-sm' />
                <span>Booked Meetings Only</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <section className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
            {loading ? (
              <div className='p-12 flex flex-col items-center justify-center gap-3'>
                <div className='w-8 h-8 border-2 border-[#ff6533] border-t-transparent rounded-full animate-spin' />
                <p className='text-xs font-semibold text-gray-400'>Loading leads and meeting schedules...</p>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className='p-12 text-center text-gray-400'>
                <MdCalendarToday className='text-4xl text-gray-300 mx-auto mb-2' />
                <p className='text-sm font-semibold text-gray-700'>No leads found</p>
                <p className='text-xs text-gray-400 mt-0.5'>
                  {meetingFilter === 'ONLY_MEETINGS'
                    ? 'No scheduled meetings found matching your filter'
                    : 'No contact form submissions found'}
                </p>
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <AdminTable columns={TABLE_COLS} ariaLabel='Leads and bookings table'>
                  {filteredLeads.map((lead) => {
                    const meeting = formatMeetingDisplay(lead.meetingDate, lead.timezone);
                    const statusConfig = STATUS_BADGES[lead.status] || STATUS_BADGES.NEW;
                    const resolvedLocation = lead.location || (lead.timezone ? getLocationFromTimezone(lead.timezone) : null);

                    return (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className='border-b border-gray-50 hover:bg-orange-50/20 transition-colors duration-150 cursor-pointer group'
                      >
                        {/* Name & Company */}
                        <td className='py-4 px-5'>
                          <div className='flex items-center gap-3'>
                            <div className='w-9 h-9 rounded-xl bg-orange-100 text-[#ff6533] flex items-center justify-center font-bold text-xs uppercase shrink-0'>
                              {lead.fullName.slice(0, 2)}
                            </div>
                            <div className='min-w-0'>
                              <p className='text-sm font-bold text-gray-900 group-hover:text-[#ff6533] transition-colors truncate'>
                                {lead.fullName}
                              </p>
                              <div className='flex items-center gap-1.5 text-[11px] text-gray-400 truncate'>
                                <span>{lead.companyName || 'Individual Client'}</span>
                                {resolvedLocation && (
                                  <>
                                    <span>•</span>
                                    <span className='inline-flex items-center gap-0.5 text-gray-600 font-medium'>
                                      <MdLocationOn className='text-[11px] text-[#ff6533]' />
                                      {resolvedLocation}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Contact Info */}
                        <td className='py-4 px-5 whitespace-nowrap text-xs text-gray-600'>
                          <p className='font-semibold text-gray-800'>{lead.email}</p>
                          <p className='text-gray-400 mt-0.5'>{lead.phone || 'No phone provided'}</p>
                        </td>

                        {/* Service & Budget */}
                        <td className='py-4 px-5 whitespace-nowrap text-xs'>
                          <p className='font-semibold text-gray-800'>{lead.service || 'General Consultation'}</p>
                          <p className='text-gray-400 mt-0.5'>
                            {lead.budget ? `$${lead.budget.toLocaleString()}` : 'Flexible budget'}
                          </p>
                        </td>

                        {/* Meeting Schedule — Central & Highlighted */}
                        <td className='py-4 px-5 whitespace-nowrap'>
                          {meeting ? (
                            <div className='inline-flex flex-col gap-1 items-start'>
                              <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-orange-50 text-[#ff6533] border border-orange-200'>
                                <MdCalendarToday className='text-xs' />
                                <span>{meeting.bstFormatted}</span>
                              </span>
                              {meeting.clientFormatted && (
                                <span className='text-[11px] text-gray-500 pl-0.5'>
                                  Client Time: {meeting.clientFormatted}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className='text-xs text-gray-400 italic flex items-center gap-1'>
                              <MdAccessTime className='text-xs' />
                              <span>No meeting booked</span>
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className='py-4 px-5 whitespace-nowrap'>
                          <span
                            className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                          >
                            {statusConfig.label}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className='py-4 px-5 text-right whitespace-nowrap'>
                          <div className='flex items-center justify-end gap-1.5'>
                            <button
                              type='button'
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedLead(lead);
                              }}
                              title='View Details'
                              className='p-1.5 rounded-lg text-gray-500 hover:text-[#ff6533] hover:bg-orange-50 transition cursor-pointer'
                            >
                              <MdVisibility className='text-base' />
                            </button>
                            <button
                              type='button'
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingLead(lead);
                              }}
                              title='Edit Lead'
                              className='p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer'
                            >
                              <MdEdit className='text-base' />
                            </button>
                            <button
                              type='button'
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeletingLead(lead);
                              }}
                              title='Delete'
                              className='p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition cursor-pointer'
                            >
                              <MdDelete className='text-base' />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </AdminTable>
              </div>
            )}

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div
                className={`flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 transition-opacity ${
                  loading ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <p className='text-xs text-gray-500'>
                  Showing{' '}
                  <span className='font-bold text-gray-700'>
                    {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, meta.total)}
                  </span>{' '}
                  of <span className='font-bold text-gray-700'>{meta.total}</span> leads
                </p>
                <Pagination
                  page={page}
                  totalPages={meta.totalPages}
                  pageRange={getPageRange(page, meta.totalPages)}
                  onPage={(p) => setPage(p)}
                />
              </div>
            )}
          </section>
        </>
      )}

      {/* Details Modal */}
      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingLead && (
        <ConfirmDeleteModal
          isOpen={Boolean(deletingLead)}
          onClose={() => setDeletingLead(null)}
          onConfirm={handleDeleteConfirm}
          title='Delete Lead Inquiry'
          message={`Are you sure you want to delete the lead inquiry from "${deletingLead.fullName}"? This action cannot be undone.`}
        />
      )}
    </div>
  );
}
