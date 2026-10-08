import { useEffect, useMemo, useState } from 'react';
import { MdPersonAdd, MdEdit, MdClose, MdDelete, MdKeyboardArrowDown, MdRemoveRedEye, MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import AdminTable from '../../../components/AdminTable';
import Pagination from '../../../components/Pagination';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import { getPageRange } from '../../../utils/helpers';
import apiClient from '../../../services/apiClient';


const displayValue = (val) => {
  if (val === null || val === undefined || val === '') {
    return <span className="text-gray-400 text-xs italic">No value found</span>;
  }
  return val;
};

const PAGE_SIZE = 8;

const TABLE_COLS = [
  { label: 'Name' },
  { label: 'Company' },
  { label: 'Phone' },
  { label: 'Email' },
  { label: 'Location' },
  { label: 'Date Added' },
  { label: 'Source' },
  { label: 'Status' },
  { label: 'Actions' },
];

const TD = 'px-5 py-3.5 text-sm text-gray-700 whitespace-nowrap';

const INPUT_CLS =
  'w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition';
const LABEL_CLS = 'block text-sm font-medium text-gray-600 mb-1.5';
const REQUIRED_STAR = (
  <span className='text-red-500 ml-0.5' aria-hidden='true'>*</span>
);

const STATUS_STYLES = {
  NEW: 'bg-blue-50 text-blue-700',
  CONTACTED: 'bg-purple-50 text-purple-700',
  IN_PROGRESS: 'bg-amber-50 text-amber-700',
  CONVERTED: 'bg-green-50 text-green-700',
  LOST: 'bg-red-50 text-red-700',
};

const getStatusStyle = (status) => STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-600';

const StatusDropdown = ({ status, onChange }) => (
  <div className="relative inline-block text-left">
    <select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      className={`inline-flex items-center pl-3 pr-7 py-1.5 rounded-full text-xs font-semibold cursor-pointer appearance-none outline-none border-none transition-shadow hover:shadow-sm ${getStatusStyle(status)}`}
      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
    >
      <option value="NEW" className="bg-white text-gray-900 font-medium">NEW</option>
      <option value="CONTACTED" className="bg-white text-gray-900 font-medium">CONTACTED</option>
      <option value="IN_PROGRESS" className="bg-white text-gray-900 font-medium">IN PROGRESS</option>
      <option value="CONVERTED" className="bg-white text-gray-900 font-medium">CONVERTED</option>
      <option value="LOST" className="bg-white text-gray-900 font-medium">LOST</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
      <MdKeyboardArrowDown className="text-sm opacity-60" />
    </div>
  </div>
);

const LeadFormShell = ({ title, initialValues, submitLabel, onSubmit, onCancel }) => {
  const [form, setForm] = useState(initialValues);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className='space-y-6 pb-8'>
      <button
        type='button'
        onClick={onCancel}
        className='inline-flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-150'
      >
        <MdClose className='text-base' aria-hidden='true' />
        Cancel
      </button>

      <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8'>
        <h1 className='text-xl font-bold text-gray-900 mb-6'>{title}</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6'>
            <div>
              <label htmlFor='lf-name' className={LABEL_CLS}>Name{REQUIRED_STAR}</label>
              <input id='lf-name' name='fullName' type='text' value={form.fullName} onChange={handleChange} required className={INPUT_CLS} />
            </div>
            <div>
              <label htmlFor='lf-company' className={LABEL_CLS}>Company Name{REQUIRED_STAR}</label>
              <input id='lf-company' name='companyName' type='text' value={form.companyName} onChange={handleChange} required className={INPUT_CLS} />
            </div>
            <div>
              <label htmlFor='lf-phone' className={LABEL_CLS}>Phone{REQUIRED_STAR}</label>
              <input id='lf-phone' name='phone' type='tel' value={form.phone} onChange={handleChange} required className={INPUT_CLS} />
            </div>
            <div>
              <label htmlFor='lf-email' className={LABEL_CLS}>Email{REQUIRED_STAR}</label>
              <input id='lf-email' name='email' type='email' value={form.email} onChange={handleChange} required className={INPUT_CLS} />
            </div>
            <div>
              <label htmlFor='lf-location' className={LABEL_CLS}>Location{REQUIRED_STAR}</label>
              <input id='lf-location' name='location' type='text' value={form.location} onChange={handleChange} required className={INPUT_CLS} />
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <button type='submit' className='inline-flex cursor-pointer items-center px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'>{submitLabel}</button>
            <button type='button' onClick={onCancel} className='inline-flex cursor-pointer items-center px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 active:scale-[0.97]'>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EMPTY_LEAD = { fullName: '', companyName: '', phone: '', email: '', location: '' };

const AddLeadForm = ({ onCancel, onSuccess }) => {
  return (
    <LeadFormShell title='Add New Lead' initialValues={EMPTY_LEAD} submitLabel='Add Lead' onSubmit={onSuccess} onCancel={onCancel} />
  );
};

const EditLeadForm = ({ lead, onCancel, onSave }) => {
  return (
    <LeadFormShell
      title='Edit Lead'
      initialValues={{ fullName: lead.fullName, companyName: lead.companyName, phone: lead.phone, email: lead.email, location: lead.location }}
      submitLabel='Update Lead'
      onSubmit={(form) => onSave({ ...lead, ...form })}
      onCancel={onCancel}
    />
  );
};

const LeadCard = ({ lead, onView, onEdit, onDelete, onStatusChange }) => (
  <article className='bg-white rounded-xl border border-gray-100 shadow-sm p-4'>
    <div className='flex items-start justify-between gap-2 mb-3'>
      <div>
        <p className='text-base font-semibold text-gray-900'>{displayValue(lead.fullName)}</p>
        <p className='text-sm text-gray-500'>{displayValue(lead.companyName)}</p>
      </div>
      <div className='flex items-center gap-1'>
        <button type='button' onClick={() => onView(lead)} aria-label='View lead' className='cursor-pointer p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors duration-150'>
          <MdRemoveRedEye className='text-lg' />
        </button>
        <button type='button' onClick={() => onEdit(lead)} aria-label='Edit lead' className='cursor-pointer p-1.5 rounded-lg text-orange-400 hover:bg-orange-50 transition-colors duration-150'>
          <MdEdit className='text-lg' />
        </button>
        <button type='button' onClick={() => onDelete(lead)} aria-label='Delete lead' className='cursor-pointer p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-150'>
          <MdDelete className='text-lg' />
        </button>
      </div>
    </div>
    <dl className='grid grid-cols-2 gap-y-2 gap-x-3 text-sm'>
      <div><dt className='text-xs text-gray-400'>Phone</dt><dd className='text-gray-700'>{displayValue(lead.phone)}</dd></div>
      <div><dt className='text-xs text-gray-400'>Location</dt><dd className='text-gray-700'>{displayValue(lead.location)}</dd></div>
      <div className='col-span-2'><dt className='text-xs text-gray-400'>Email</dt><dd className='text-gray-700 break-all'>{displayValue(lead.email)}</dd></div>
      <div>
        <dt className='text-xs text-gray-400 mb-0.5'>Source</dt>
        <dd className='text-gray-700'>{displayValue(lead.source)}</dd>
      </div>
      <div>
        <dt className='text-xs text-gray-400 mb-0.5'>Date Added</dt>
        <dd className='text-gray-700'>{new Date(lead.createdAt).toLocaleDateString()}</dd>
      </div>
      <div className='col-span-2'>
        <dt className='text-xs text-gray-400 mb-0.5'>Status</dt>
        <dd><StatusDropdown status={lead.status} onChange={(val) => onStatusChange(lead.id, val)} /></dd>
      </div>
    </dl>
  </article>
);

const LeadRow = ({ lead, onView, onEdit, onDelete, onStatusChange }) => (
  <tr className='border-t border-gray-50 hover:bg-orange-50/30 transition-colors duration-150'>
    <td className={`${TD} font-medium text-gray-900`}>{displayValue(lead.fullName)}</td>
    <td className={TD}>{displayValue(lead.companyName)}</td>
    <td className={TD}>{displayValue(lead.phone)}</td>
    <td className={TD}>{displayValue(lead.email)}</td>
    <td className={TD}>{displayValue(lead.location)}</td>
    <td className={TD}>{new Date(lead.createdAt).toLocaleDateString()}</td>
    <td className={TD}>
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
        {displayValue(lead.source)}
      </span>
    </td>
    <td className='px-5 py-3.5'>
      <StatusDropdown status={lead.status} onChange={(val) => onStatusChange(lead.id, val)} />
    </td>
    <td className='px-5 py-3.5'>
      <div className='flex items-center gap-1'>
        <button type='button' onClick={() => onView(lead)} aria-label='View lead' className='cursor-pointer p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors duration-150'><MdRemoveRedEye className='text-lg' /></button>
        <button type='button' onClick={() => onEdit(lead)} aria-label='Edit lead' className='cursor-pointer p-1.5 rounded-lg text-orange-400 hover:bg-orange-50 transition-colors duration-150'><MdEdit className='text-lg' /></button>
        <button type='button' onClick={() => onDelete(lead)} aria-label='Delete lead' className='cursor-pointer p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-150'><MdDelete className='text-lg' /></button>
      </div>
    </td>
  </tr>
);


const LeadDetail = ({ lead, onBack }) => (
  <div className='space-y-6 pb-8'>
    <button
      type='button'
      onClick={onBack}
      className='inline-flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-150 group'
    >
      <MdArrowBack
        className='text-base group-hover:-translate-x-0.5 transition-transform duration-150'
        aria-hidden='true'
      />
      Back to Leads
    </button>

    <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8'>
      <div className='flex items-start justify-between gap-4 mb-6'>
        <div>
          <h1 className='text-xl font-bold text-gray-900'>
            {displayValue(lead.fullName)}
          </h1>
          <p className='text-sm text-gray-500 mt-0.5'>{displayValue(lead.companyName)}</p>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shrink-0 ${getStatusStyle(lead.status)}`}
        >
          {lead.status}
        </span>
      </div>

      <dl className='divide-y divide-gray-100'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 py-5 first:pt-0'>
          <div>
            <dt className='text-sm text-gray-400 mb-1'>Phone</dt>
            <dd className='text-base text-gray-800 font-medium'>{displayValue(lead.phone)}</dd>
          </div>
          <div>
            <dt className='text-sm text-gray-400 mb-1'>Email</dt>
            <dd className='text-base text-gray-800 font-medium'>{displayValue(lead.email)}</dd>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 py-5'>
          <div>
            <dt className='text-sm text-gray-400 mb-1'>Location</dt>
            <dd className='text-base text-gray-800 font-medium'>{displayValue(lead.location)}</dd>
          </div>
          <div>
            <dt className='text-sm text-gray-400 mb-1'>Source</dt>
            <dd className='text-base text-gray-800 font-medium'>{displayValue(lead.source)}</dd>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 py-5'>
          <div>
            <dt className='text-sm text-gray-400 mb-1'>Service</dt>
            <dd className='text-base text-gray-800 font-medium'>{displayValue(lead.service)}</dd>
          </div>
          <div>
            <dt className='text-sm text-gray-400 mb-1'>Budget</dt>
            <dd className='text-base text-gray-800 font-medium'>{displayValue(lead.budget)}</dd>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 py-5'>
          <div>
            <dt className='text-sm text-gray-400 mb-1'>Industry</dt>
            <dd className='text-base text-gray-800 font-medium'>{displayValue(lead.industry)}</dd>
          </div>
          <div>
            <dt className='text-sm text-gray-400 mb-1'>Meeting Date</dt>
            <dd className='text-base text-gray-800 font-medium'>
              {lead.meetingDate ? new Date(lead.meetingDate).toLocaleString() : <span className="text-gray-400 text-xs italic">No value found</span>}
            </dd>
          </div>
        </div>
        
        <div className='py-5'>
          <dt className='text-sm text-gray-400 mb-1'>Message</dt>
          <dd className='text-base text-gray-800 whitespace-pre-wrap'>{displayValue(lead.message)}</dd>
        </div>
      </dl>
    </div>
  </div>
);

export default function Leads() {

  useEffect(() => { document.title = 'Leads – Maktech Admin'; }, []);

  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ totalLeads: 0, newLeadsThisWeek: 0, newLeadsLastWeek: 0, statusCounts: {} });
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/api/v1/leads?page=${page}&limit=${PAGE_SIZE}&searchTerm=`);
      if (res.data.success) {
        setLeads(res.data.data);
        setTotalPages(res.data.meta.totalPages || 1);
        setTotalCount(res.data.meta.total || 0);
      }
    } catch (err) {
      console.error("Failed to fetch leads", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await apiClient.get('/api/v1/leads/stats');
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch leads stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [page]);

  const pageRange = useMemo(() => getPageRange(page, totalPages), [page, totalPages]);
  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, totalCount);
  const handlePage = (p) => setPage(Math.max(1, Math.min(totalPages, p)));

  const [viewingLead, setViewingLead] = useState(null);
  const [editingLead, setEditingLead] = useState(null);
  const [addingLead, setAddingLead] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleView = (lead) => setViewingLead(lead);
  const handleEdit = (lead) => setEditingLead(lead);
  const handleCancelEdit = () => setEditingLead(null);
  const handleCancelAdd = () => setAddingLead(false);

  const handleCreateLead = async (form) => {
    try {
      const res = await apiClient.post('/api/v1/leads', form);
      if (res.data.success) {
        toast.success('Lead created successfully!');
        setAddingLead(false);
        fetchLeads();
        fetchStats();
      }
    } catch (err) {
      toast.error('Failed to create lead');
    }
  };

  const handleSaveEdit = async (updated) => {
    try {
      const res = await apiClient.put(`/api/v1/leads/${updated.id}`, {
        fullName: updated.fullName,
        companyName: updated.companyName,
        email: updated.email,
        phone: updated.phone,
        location: updated.location
      });
      if (res.data.success) {
        toast.success('Lead updated successfully!');
        setEditingLead(null);
        fetchLeads();
        fetchStats();
      }
    } catch (err) {
      toast.error('Failed to update lead');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await apiClient.patch(`/api/v1/leads/${id}`, { status: newStatus });
      if (res.data.success) {
        toast.success('Lead status updated!');
        fetchLeads();
        fetchStats();
      }
    } catch (err) {
      toast.error('Failed to update lead status');
    }
  };

  const handleDelete = (lead) => setDeleteTarget(lead);
  const confirmDelete = async () => {
    try {
      const res = await apiClient.delete(`/api/v1/leads/${deleteTarget.id}`);
      if (res.data.success) {
        toast.success('Lead deleted successfully!');
        setDeleteTarget(null);
        fetchLeads();
        fetchStats();
      }
    } catch (err) {
      toast.error('Failed to delete lead');
    }
  };

  const weekDiff = (stats.newLeadsThisWeek || 0) - (stats.newLeadsLastWeek || 0);
  const diffLabel = weekDiff >= 0 ? `+${weekDiff} from last week` : `${weekDiff} from last week`;
  const diffColor = weekDiff >= 0 ? 'text-green-600' : 'text-red-500';

  return (
    <div className='space-y-6 pb-8'>
      {viewingLead ? (
        <LeadDetail lead={viewingLead} onBack={() => setViewingLead(null)} />
      ) : editingLead ? (
        <EditLeadForm lead={editingLead} onCancel={handleCancelEdit} onSave={handleSaveEdit} />
      ) : addingLead ? (
        <AddLeadForm onCancel={handleCancelAdd} onSuccess={handleCreateLead} />
      ) : (
        <>
          <div className='flex flex-wrap items-start justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>Leads</h1>
              <p className='text-base text-gray-500 mt-1'>Manage your business growth pipeline</p>
            </div>
            <button type='button' onClick={() => setAddingLead(true)} className='group inline-flex cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] transition-all duration-200 active:scale-[0.97]'>
              <MdPersonAdd className='text-lg shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1' aria-hidden='true' />
              <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>Add New Lead</span>
            </button>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'>
              <p className='text-sm font-medium text-gray-500 mb-2'>Total Leads</p>
              <p className='text-4xl font-bold text-gray-900'>{stats.totalLeads}</p>
            </div>
            <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'>
              <p className='text-sm font-medium text-gray-500 mb-2'>New Leads This Week</p>
              <p className='text-4xl font-bold text-gray-900'>{stats.newLeadsThisWeek}</p>
              <p className={`mt-2 text-sm font-medium ${diffColor}`}>{diffLabel}</p>
            </div>
          </div>

          <section className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative'>
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-orange-bg-cta border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className='sm:hidden p-4 space-y-3'>
              {leads.map((lead) => (
                <div key={lead.id} role='listitem'>
                  <LeadCard lead={lead} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onStatusChange={handleStatusChange} />
                </div>
              ))}
              {leads.length === 0 && !loading && <div className="text-center py-8 text-gray-500">No leads found.</div>}
            </div>

            <div className='hidden sm:block overflow-x-auto'>
              <AdminTable columns={TABLE_COLS} ariaLabel='Leads list'>
                {leads.map((lead) => (
                  <LeadRow key={lead.id} lead={lead} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onStatusChange={handleStatusChange} />
                ))}
                {leads.length === 0 && !loading && <tr><td colSpan={TABLE_COLS.length} className="text-center py-8 text-gray-500">No leads found.</td></tr>}
              </AdminTable>
            </div>

            <div className='flex flex-col items-center gap-3 px-5 py-4 border-t border-gray-100 sm:flex-row sm:items-center sm:justify-between'>
              <p className='text-sm text-gray-400 shrink-0'>
                Showing <span className='font-semibold text-gray-700'>{rangeStart} to {rangeEnd}</span> of <span className='font-semibold text-gray-700'>{totalCount}</span> leads
              </p>
              <nav aria-label='Pagination'>
                <Pagination page={page} totalPages={totalPages} pageRange={pageRange} onPage={handlePage} />
              </nav>
            </div>
          </section>
        </>
      )}
      
      {deleteTarget && (
        <ConfirmDeleteModal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          itemName={`lead "${deleteTarget.fullName}"`}
        />
      )}
    </div>
  );
}
