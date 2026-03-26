import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MdAdd,
  MdRemoveRedEye,
  MdEdit,
  MdDelete,
  MdArrowBack,
  MdCheck,
  MdKeyboardArrowDown,
  MdUploadFile,
  MdMoreVert,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import AdminTable from '../../../components/AdminTable';
import Pagination from '../../../components/Pagination';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import { getPageRange } from '../../../utils/helpers';

// ─── Static marketplace order data ───────────────────────────────────────────
const INITIAL_ORDERS = [
  {
    id: 1,
    orderId: '#MP1',
    department: 'Laravel',
    projectName: 'E-commerce Store Setup',
    clientName: 'John Carter',
    date: '2026-01-10',
    account: 'Fiverr Pro',
    salesStatus: 'Won',
    leadingPerson: 'Kamrul H.',
    deliveryLastDate: '2026-04-10',
    sheetLink: 'https://docs.google.com/spreadsheets',
    orderedBy: 'John Carter',
    tableLeader: 'Rafi A.',
    salesComment: 'Upsell potential',
    meetingSchedule: '2026-01-12 10:00 AM',
    orderAmount: '$80,000',
    afterFiverr: '$72,000',
    bonus: '$5,000',
    afterBounce: '$70,000',
    total: '$75,000',
    opsStatus: 'Pending',
    assignTeam: 'Development Team A',
  },
  {
    id: 2,
    orderId: '#MP2',
    department: 'Graphics',
    projectName: 'Logo & Brand Kit',
    clientName: 'Maria Garcia',
    date: '2026-01-18',
    account: 'Fiverr',
    salesStatus: 'Negotiating',
    leadingPerson: 'Sadia K.',
    deliveryLastDate: '2026-04-15',
    sheetLink: 'https://docs.google.com/spreadsheets',
    orderedBy: 'Maria Garcia',
    tableLeader: 'Tanvir M.',
    salesComment: 'Repeat client',
    meetingSchedule: '2026-01-19 3:00 PM',
    orderAmount: '$25,000',
    afterFiverr: '$22,500',
    bonus: '$2,000',
    afterBounce: '$21,000',
    total: '$23,000',
    opsStatus: 'In Progress',
    assignTeam: 'Design Team D',
  },
  {
    id: 3,
    orderId: '#MP3',
    department: 'Marketing',
    projectName: 'SEO Audit & Strategy',
    clientName: 'David Kim',
    date: '2026-01-22',
    account: 'Upwork',
    salesStatus: 'Won',
    leadingPerson: 'Nafis R.',
    deliveryLastDate: '2026-03-20',
    sheetLink: 'https://docs.google.com/spreadsheets',
    orderedBy: 'David Kim',
    tableLeader: 'Kamrul H.',
    salesComment: 'Long-term contract',
    meetingSchedule: '2026-01-24 11:00 AM',
    orderAmount: '$40,000',
    afterFiverr: '$36,000',
    bonus: '$3,000',
    afterBounce: '$35,000',
    total: '$38,000',
    opsStatus: 'Completed',
    assignTeam: 'SEO & Analytics Team',
  },
];

const PAGE_SIZE = 8;

const TABLE_COLS = [
  { label: 'Department' },
  { label: 'Order ID' },
  { label: 'Date' },
  { label: 'Account' },
  { label: 'Project Name' },
  { label: 'Client Name' },
  { label: 'Sales Status' },
  { label: 'OPS Status' },
  { label: 'Team' },
  { label: 'Delivery Last Date' },
  { label: 'Countdown' },
  { label: 'Sheet Link' },
  { label: 'Total Amount' },
  { label: 'Actions' },
];

const STATUS_STYLES = {
  'In Progress': 'bg-blue-50 text-blue-700',
  Completed: 'bg-green-50 text-green-700',
  Pending: 'bg-amber-50 text-amber-700',
  Cancelled: 'bg-red-50 text-red-600',
};
const getStatusStyle = (s) => STATUS_STYLES[s] ?? 'bg-gray-100 text-gray-600';

const SALES_STATUS_STYLES = {
  Won: 'bg-green-50 text-green-700',
  Negotiating: 'bg-blue-50 text-blue-700',
  Lead: 'bg-purple-50 text-purple-700',
  Lost: 'bg-red-50 text-red-600',
  'On Hold': 'bg-amber-50 text-amber-700',
};
const getSalesStatusStyle = (s) =>
  SALES_STATUS_STYLES[s] ?? 'bg-gray-100 text-gray-600';

const OPS_STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
const SALES_STATUS_OPTIONS = ['Lead', 'Negotiating', 'Won', 'Lost', 'On Hold'];

const DEPARTMENT_OPTIONS = [
  'UI/UX',
  'Graphics',
  'Laravel',
  'Flutter',
  'MERN',
  'WordPress',
  'Marketing',
  'Shopify',
  'Wix',
  'SEO',
];

const getCountdown = (deliveryDate) => {
  if (!deliveryDate) return { text: '—', cls: 'text-gray-400' };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const delivery = new Date(deliveryDate);
  delivery.setHours(0, 0, 0, 0);
  const diff = Math.ceil((delivery - today) / (1000 * 60 * 60 * 24));
  if (diff < 0)
    return {
      text: `${Math.abs(diff)}d overdue`,
      cls: 'text-red-500 font-semibold',
    };
  if (diff === 0)
    return { text: 'Due today', cls: 'text-amber-500 font-semibold' };
  if (diff <= 3)
    return { text: `${diff}d left`, cls: 'text-amber-500 font-medium' };
  return { text: `${diff}d left`, cls: 'text-green-600 font-medium' };
};

const TEAM_OPTIONS = [
  'UI/UX',
  'Graphics',
  'Laravel',
  'Flutter',
  'Mern',
  'WordPress',
  'Marketing',
  'Shopify',
  'Wix',
];

const TD = 'px-5 py-3.5 text-sm text-gray-700 whitespace-nowrap';

const INPUT_CLS =
  'w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition';

const LABEL_CLS = 'block text-sm font-medium text-gray-600 mb-1.5';

const REQUIRED_STAR = (
  <span className='text-red-500 ml-0.5' aria-hidden='true'>
    *
  </span>
);

const EMPTY_FORM = {
  department: '',
  projectName: '',
  clientName: '',
  orderId: '',
  date: '',
  account: '',
  salesStatus: 'Lead',
  leadingPerson: '',
  deliveryLastDate: '',
  sheetLink: '',
  orderedBy: '',
  tableLeader: '',
  salesComment: '',
  meetingSchedule: '',
  orderAmount: '',
  afterFiverr: '',
  bonus: '',
  afterBounce: '',
  total: '',
  opsStatus: 'Pending',
  assignTeam: '',
};

// ─── Shared Select wrapper ────────────────────────────────────────────────────
const SelectField = ({ id, name, value, onChange, options, required }) => (
  <div className='relative'>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`${INPUT_CLS} appearance-none pr-10 cursor-pointer`}
    >
      {!required && <option value=''>-- None --</option>}
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    <MdKeyboardArrowDown
      className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400'
      aria-hidden='true'
    />
  </div>
);

// ─── Order Form (shared by Create & Edit) ─────────────────────────────────────
const OrderForm = ({ initial, title, submitLabel, onSubmit, onCancel }) => {
  const [form, setForm] = useState(initial);

  useEffect(() => {
    document
      .querySelector('[data-lenis-prevent]')
      ?.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

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
        className='inline-flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-150 group'
      >
        <MdArrowBack
          className='text-base group-hover:-translate-x-0.5 transition-transform duration-150'
          aria-hidden='true'
        />
        Back to Marketplace Orders
      </button>

      <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8'>
        <h1 className='text-xl font-bold text-gray-900 mb-6'>{title}</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4'>
            {/* Department */}
            <div>
              <label htmlFor='mp-department' className={LABEL_CLS}>
                Department
              </label>
              <SelectField
                id='mp-department'
                name='department'
                value={form.department}
                onChange={handleChange}
                options={DEPARTMENT_OPTIONS}
                required={false}
              />
            </div>

            {/* Project Name */}
            <div>
              <label htmlFor='mp-projectName' className={LABEL_CLS}>
                Project Name{REQUIRED_STAR}
              </label>
              <input
                id='mp-projectName'
                name='projectName'
                type='text'
                value={form.projectName}
                onChange={handleChange}
                autoComplete='off'
                required
                className={INPUT_CLS}
              />
            </div>

            {/* Client Name */}
            <div>
              <label htmlFor='mp-clientName' className={LABEL_CLS}>
                Client Name
              </label>
              <input
                id='mp-clientName'
                name='clientName'
                type='text'
                value={form.clientName}
                onChange={handleChange}
                autoComplete='name'
                className={INPUT_CLS}
              />
            </div>

            {/* Order ID */}
            <div>
              <label htmlFor='mp-orderId' className={LABEL_CLS}>
                Order ID
              </label>
              <input
                id='mp-orderId'
                name='orderId'
                type='text'
                value={form.orderId}
                onChange={handleChange}
                autoComplete='off'
                className={INPUT_CLS}
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor='mp-date' className={LABEL_CLS}>
                Date
              </label>
              <input
                id='mp-date'
                name='date'
                type='date'
                value={form.date}
                onChange={handleChange}
                className={INPUT_CLS}
              />
            </div>

            {/* Account */}
            <div>
              <label htmlFor='mp-account' className={LABEL_CLS}>
                Account
              </label>
              <input
                id='mp-account'
                name='account'
                type='text'
                value={form.account}
                onChange={handleChange}
                autoComplete='off'
                className={INPUT_CLS}
              />
            </div>

            {/* Leading Person */}
            <div>
              <label htmlFor='mp-leadingPerson' className={LABEL_CLS}>
                Leading Person
              </label>
              <input
                id='mp-leadingPerson'
                name='leadingPerson'
                type='text'
                value={form.leadingPerson}
                onChange={handleChange}
                autoComplete='off'
                className={INPUT_CLS}
              />
            </div>

            {/* Delivery Last Date */}
            <div>
              <label htmlFor='mp-deliveryLastDate' className={LABEL_CLS}>
                Delivery Last Date
              </label>
              <input
                id='mp-deliveryLastDate'
                name='deliveryLastDate'
                type='date'
                value={form.deliveryLastDate}
                onChange={handleChange}
                className={INPUT_CLS}
              />
            </div>

            {/* Sheet Link */}
            <div>
              <label htmlFor='mp-sheetLink' className={LABEL_CLS}>
                Sheet Link
              </label>
              <input
                id='mp-sheetLink'
                name='sheetLink'
                type='url'
                value={form.sheetLink}
                onChange={handleChange}
                autoComplete='off'
                className={INPUT_CLS}
              />
            </div>

            {/* Ordered By */}
            <div>
              <label htmlFor='mp-orderedBy' className={LABEL_CLS}>
                Ordered By
              </label>
              <input
                id='mp-orderedBy'
                name='orderedBy'
                type='text'
                value={form.orderedBy}
                onChange={handleChange}
                autoComplete='off'
                className={INPUT_CLS}
              />
            </div>

            {/* Table Leader */}
            <div>
              <label htmlFor='mp-tableLeader' className={LABEL_CLS}>
                Table Leader
              </label>
              <input
                id='mp-tableLeader'
                name='tableLeader'
                type='text'
                value={form.tableLeader}
                onChange={handleChange}
                autoComplete='off'
                className={INPUT_CLS}
              />
            </div>

            {/* Sales Comment */}
            <div>
              <label htmlFor='mp-salesComment' className={LABEL_CLS}>
                Sales Comment
              </label>
              <input
                id='mp-salesComment'
                name='salesComment'
                type='text'
                value={form.salesComment}
                onChange={handleChange}
                autoComplete='off'
                className={INPUT_CLS}
              />
            </div>

            {/* Meeting Schedule */}
            <div>
              <label htmlFor='mp-meetingSchedule' className={LABEL_CLS}>
                Meeting Schedule
              </label>
              <input
                id='mp-meetingSchedule'
                name='meetingSchedule'
                type='text'
                value={form.meetingSchedule}
                onChange={handleChange}
                autoComplete='off'
                placeholder='e.g. 2026-01-20 10:00 AM'
                className={INPUT_CLS}
              />
            </div>

            {/* Order Amount */}
            <div>
              <label htmlFor='mp-orderAmount' className={LABEL_CLS}>
                Order Amount
              </label>
              <input
                id='mp-orderAmount'
                name='orderAmount'
                type='text'
                value={form.orderAmount}
                onChange={handleChange}
                autoComplete='off'
                className={INPUT_CLS}
              />
            </div>

            {/* After Fiverr */}
            <div>
              <label htmlFor='mp-afterFiverr' className={LABEL_CLS}>
                After Fiverr
              </label>
              <input
                id='mp-afterFiverr'
                name='afterFiverr'
                type='text'
                value={form.afterFiverr}
                onChange={handleChange}
                autoComplete='off'
                className={INPUT_CLS}
              />
            </div>

            {/* Bonus */}
            <div>
              <label htmlFor='mp-bonus' className={LABEL_CLS}>
                Bonus
              </label>
              <input
                id='mp-bonus'
                name='bonus'
                type='text'
                value={form.bonus}
                onChange={handleChange}
                autoComplete='off'
                className={INPUT_CLS}
              />
            </div>

            {/* After Bounce */}
            <div>
              <label htmlFor='mp-afterBounce' className={LABEL_CLS}>
                After Bounce
              </label>
              <input
                id='mp-afterBounce'
                name='afterBounce'
                type='text'
                value={form.afterBounce}
                onChange={handleChange}
                autoComplete='off'
                className={INPUT_CLS}
              />
            </div>

            {/* Total */}
            <div>
              <label htmlFor='mp-total' className={LABEL_CLS}>
                Total
              </label>
              <input
                id='mp-total'
                name='total'
                type='text'
                value={form.total}
                onChange={handleChange}
                autoComplete='off'
                className={INPUT_CLS}
              />
            </div>

            {/* Sales Status */}
            <div>
              <label htmlFor='mp-salesStatus' className={LABEL_CLS}>
                Sales Status
              </label>
              <SelectField
                id='mp-salesStatus'
                name='salesStatus'
                value={form.salesStatus}
                onChange={handleChange}
                options={SALES_STATUS_OPTIONS}
                required
              />
            </div>

            {/* OPS Status */}
            <div>
              <label htmlFor='mp-opsStatus' className={LABEL_CLS}>
                OPS Status
              </label>
              <SelectField
                id='mp-opsStatus'
                name='opsStatus'
                value={form.opsStatus}
                onChange={handleChange}
                options={OPS_STATUS_OPTIONS}
                required
              />
            </div>

            {/* Assign Team — full row */}
            <div className='sm:col-span-2'>
              <label htmlFor='mp-assignTeam' className={LABEL_CLS}>
                Assign Team
              </label>
              <SelectField
                id='mp-assignTeam'
                name='assignTeam'
                value={form.assignTeam}
                onChange={handleChange}
                options={TEAM_OPTIONS}
                required={false}
              />
            </div>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap'>
            <button
              type='submit'
              className='group inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
            >
              <MdCheck
                className='text-base shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
                aria-hidden='true'
              />
              <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
                {submitLabel}
              </span>
            </button>
            <button
              type='button'
              onClick={onCancel}
              className='w-full sm:w-auto inline-flex cursor-pointer items-center justify-center px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 active:scale-[0.97]'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Order Detail View ────────────────────────────────────────────────────────
const OrderDetail = ({ order, onBack }) => {
  useEffect(() => {
    document
      .querySelector('[data-lenis-prevent]')
      ?.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
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
        Back to Marketplace Orders
      </button>

      <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8'>
        <div className='flex items-start justify-between gap-4 mb-6'>
          <div>
            <h1 className='text-xl font-bold text-gray-900'>
              {order.projectName}
            </h1>
            <p className='text-sm text-gray-500 mt-0.5'>
              {order.orderId} · {order.account}
            </p>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shrink-0 ${getStatusStyle(order.opsStatus)}`}
          >
            {order.opsStatus}
          </span>
        </div>

        <dl className='divide-y divide-gray-100'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 py-5 first:pt-0'>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>Client Name</dt>
              <dd className='text-base text-gray-800 font-medium'>
                {order.clientName}
              </dd>
            </div>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>Ordered By</dt>
              <dd className='text-base text-gray-800 font-medium'>
                {order.orderedBy}
              </dd>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 py-5'>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>Date</dt>
              <dd className='text-base text-gray-800 font-medium'>
                {order.date}
              </dd>
            </div>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>Delivery Last Date</dt>
              <dd className='text-base text-gray-800 font-medium'>
                {order.deliveryLastDate}
              </dd>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 py-5'>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>Account</dt>
              <dd className='text-base text-gray-800 font-medium'>
                {order.account}
              </dd>
            </div>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>Leading Person</dt>
              <dd className='text-base text-gray-800 font-medium'>
                {order.leadingPerson}
              </dd>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 py-5'>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>Table Leader</dt>
              <dd className='text-base text-gray-800 font-medium'>
                {order.tableLeader}
              </dd>
            </div>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>Assign Team</dt>
              <dd className='text-base text-gray-800 font-medium'>
                {order.assignTeam || '—'}
              </dd>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 py-5'>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>Sales Comment</dt>
              <dd className='text-base text-gray-800'>
                {order.salesComment || '—'}
              </dd>
            </div>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>Meeting Schedule</dt>
              <dd className='text-base text-gray-800'>
                {order.meetingSchedule || '—'}
              </dd>
            </div>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4 py-5'>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>Order Amount</dt>
              <dd className='text-base text-gray-800 font-semibold'>
                {order.orderAmount}
              </dd>
            </div>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>After Fiverr</dt>
              <dd className='text-base text-gray-800 font-medium'>
                {order.afterFiverr}
              </dd>
            </div>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>Bonus</dt>
              <dd className='text-base text-gray-800 font-medium'>
                {order.bonus}
              </dd>
            </div>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>After Bounce</dt>
              <dd className='text-base text-gray-800 font-medium'>
                {order.afterBounce}
              </dd>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 py-5'>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>Total</dt>
              <dd className='text-lg text-gray-900 font-bold'>{order.total}</dd>
            </div>
            {order.sheetLink && (
              <div>
                <dt className='text-sm text-gray-400 mb-1'>Sheet Link</dt>
                <dd>
                  <a
                    href={order.sheetLink}
                    target='_blank'
                    rel='noreferrer noopener'
                    className='text-sm text-blue-500 hover:underline break-all'
                  >
                    Open Sheet
                  </a>
                </dd>
              </div>
            )}
          </div>
        </dl>
      </div>
    </div>
  );
};

// ─── Kebab action menu ───────────────────────────────────────────────────────
const DROPDOWN_W = 144; // px — matches w-36
const DROPDOWN_H = 120; // px — approx height of the 3-item menu

const ActionMenu = ({ order, onView, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, openUp: false });
  const btnRef = useRef(null);

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUp = spaceBelow < DROPDOWN_H + 8;
      setPos({
        top: openUp ? rect.top - DROPDOWN_H - 4 : rect.bottom + 4,
        left: rect.right - DROPDOWN_W,
        openUp,
      });
    }
    setOpen((v) => !v);
  };

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (
        btnRef.current &&
        !btnRef.current.closest('[data-action-menu]')?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const onScroll = () => setOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('scroll', onScroll, true);
    };
  }, [open]);

  return (
    <div data-action-menu className='inline-flex'>
      <button
        ref={btnRef}
        type='button'
        onClick={handleToggle}
        aria-label='Actions'
        aria-haspopup='true'
        aria-expanded={open}
        className='p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150'
      >
        <MdMoreVert className='text-xl' aria-hidden='true' />
      </button>

      {open &&
        typeof document !== 'undefined' &&
        (() => {
          const el = (
            <div
              role='menu'
              style={{
                position: 'fixed',
                top: pos.top,
                left: pos.left,
                width: DROPDOWN_W,
                zIndex: 9999,
              }}
              className='rounded-xl border border-gray-100 bg-white shadow-xl ring-1 ring-black/5 py-1'
            >
              <button
                type='button'
                role='menuitem'
                onClick={() => {
                  setOpen(false);
                  onView(order);
                }}
                className='flex w-full items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-100'
              >
                <MdRemoveRedEye
                  className='text-base shrink-0 text-orange-400'
                  aria-hidden='true'
                />
                View
              </button>
              <button
                type='button'
                role='menuitem'
                onClick={() => {
                  setOpen(false);
                  onEdit(order);
                }}
                className='flex w-full items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-100'
              >
                <MdEdit
                  className='text-base shrink-0 text-blue-400'
                  aria-hidden='true'
                />
                Edit
              </button>
              <div className='my-1 border-t border-gray-100' />
              <button
                type='button'
                role='menuitem'
                onClick={() => {
                  setOpen(false);
                  onDelete(order.id);
                }}
                className='flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors duration-100'
              >
                <MdDelete className='text-base shrink-0' aria-hidden='true' />
                Delete
              </button>
            </div>
          );

          // Render into document.body via a portal-like approach using a hidden container
          // Since we can't import createPortal here, we inline-render fixed-positioned element
          // which escapes any overflow:hidden ancestor naturally when position:fixed is used.
          return el;
        })()}
    </div>
  );
};

// ─── Mobile card ──────────────────────────────────────────────────────────────
const OrderCard = ({ order, onView, onEdit, onDelete }) => {
  const countdown = getCountdown(order.deliveryLastDate);
  return (
    <article className='bg-white rounded-xl border border-gray-100 shadow-sm p-4'>
      {/* Header: Order ID + Actions */}
      <div className='flex items-center justify-between gap-2 mb-4'>
        <p className='text-sm font-bold text-gray-900'>{order.orderId}</p>
        <ActionMenu
          order={order}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      <dl className='grid grid-cols-2 gap-x-4 gap-y-3 text-sm'>
        {/* 1 Department */}
        <div>
          <dt className='text-xs text-gray-400 mb-0.5'>Department</dt>
          <dd className='text-gray-700'>{order.department || '—'}</dd>
        </div>

        {/* 2 Date */}
        <div>
          <dt className='text-xs text-gray-400 mb-0.5'>Date</dt>
          <dd className='text-gray-700'>{order.date}</dd>
        </div>

        {/* 3 Account */}
        <div>
          <dt className='text-xs text-gray-400 mb-0.5'>Account</dt>
          <dd className='text-gray-700'>{order.account}</dd>
        </div>

        {/* 4 Project Name — full width */}
        <div className='col-span-2'>
          <dt className='text-xs text-gray-400 mb-0.5'>Project Name</dt>
          <dd className='text-gray-900 font-semibold leading-snug'>
            {order.projectName}
          </dd>
        </div>

        {/* 5 Client Name */}
        <div className='col-span-2'>
          <dt className='text-xs text-gray-400 mb-0.5'>Client Name</dt>
          <dd className='text-gray-700 font-medium'>{order.clientName}</dd>
        </div>

        {/* 6 Sales Status */}
        <div>
          <dt className='text-xs text-gray-400 mb-0.5'>Sales Status</dt>
          <dd>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${getSalesStatusStyle(order.salesStatus)}`}
            >
              {order.salesStatus || '—'}
            </span>
          </dd>
        </div>

        {/* 7 OPS Status */}
        <div>
          <dt className='text-xs text-gray-400 mb-0.5'>OPS Status</dt>
          <dd>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusStyle(order.opsStatus)}`}
            >
              {order.opsStatus}
            </span>
          </dd>
        </div>

        {/* 8 Team */}
        <div className='col-span-2'>
          <dt className='text-xs text-gray-400 mb-0.5'>Team</dt>
          <dd className='text-gray-700'>{order.assignTeam || '—'}</dd>
        </div>

        {/* 9 Delivery Last Date */}
        <div>
          <dt className='text-xs text-gray-400 mb-0.5'>Delivery Last Date</dt>
          <dd className='text-gray-700'>{order.deliveryLastDate}</dd>
        </div>

        {/* 10 Countdown */}
        <div>
          <dt className='text-xs text-gray-400 mb-0.5'>Countdown</dt>
          <dd className={`font-semibold ${countdown.cls}`}>{countdown.text}</dd>
        </div>

        {/* 11 Sheet Link */}
        <div>
          <dt className='text-xs text-gray-400 mb-0.5'>Sheet Link</dt>
          <dd>
            {order.sheetLink ? (
              <a
                href={order.sheetLink}
                target='_blank'
                rel='noreferrer noopener'
                className='text-blue-500 hover:underline text-xs'
              >
                Open Sheet
              </a>
            ) : (
              '—'
            )}
          </dd>
        </div>

        {/* 12 Total Amount */}
        <div>
          <dt className='text-xs text-gray-400 mb-0.5'>Total Amount</dt>
          <dd className='text-gray-900 font-bold'>{order.total}</dd>
        </div>
      </dl>
    </article>
  );
};

// ─── Desktop table row ────────────────────────────────────────────────────────
const OrderRow = ({ order, onView, onEdit, onDelete }) => {
  const countdown = getCountdown(order.deliveryLastDate);
  return (
    <tr className='border-t border-gray-50 hover:bg-orange-50/30 transition-colors duration-150'>
      <td className={TD}>{order.department || '—'}</td>
      <td className={`${TD} font-medium text-gray-900`}>{order.orderId}</td>
      <td className={TD}>{order.date}</td>
      <td className={TD}>{order.account}</td>
      <td className={TD}>{order.projectName}</td>
      <td className={TD}>{order.clientName}</td>
      <td className='px-5 py-3.5'>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getSalesStatusStyle(order.salesStatus)}`}
        >
          {order.salesStatus || '—'}
        </span>
      </td>
      <td className='px-5 py-3.5'>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.opsStatus)}`}
        >
          {order.opsStatus}
        </span>
      </td>
      <td className={TD}>{order.assignTeam || '—'}</td>
      <td className={TD}>{order.deliveryLastDate}</td>
      <td className={`px-5 py-3.5 text-sm whitespace-nowrap ${countdown.cls}`}>
        {countdown.text}
      </td>
      <td className='px-5 py-3.5'>
        {order.sheetLink ? (
          <a
            href={order.sheetLink}
            target='_blank'
            rel='noreferrer noopener'
            className='text-sm text-blue-500 hover:underline whitespace-nowrap'
          >
            Open Sheet
          </a>
        ) : (
          <span className='text-sm text-gray-400'>—</span>
        )}
      </td>
      <td className={`${TD} font-medium`}>{order.total}</td>
      <td className='px-5 py-3.5'>
        <ActionMenu
          order={order}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
};

// ─── Page component ───────────────────────────────────────────────────────────
export default function MarketplaceOrders() {
  useEffect(() => {
    document.title = 'Marketplace Orders – Maktech Admin';
  }, []);

  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(orders.length / PAGE_SIZE);
  const pageData = useMemo(
    () => orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [orders, page],
  );
  const pageRange = useMemo(
    () => getPageRange(page, totalPages),
    [page, totalPages],
  );
  const rangeStart = (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, orders.length);
  const handlePage = (p) => setPage(Math.max(1, Math.min(totalPages, p)));

  const { inProgress, completed } = useMemo(
    () => ({
      inProgress: orders.filter((o) => o.opsStatus === 'In Progress').length,
      completed: orders.filter((o) => o.opsStatus === 'Completed').length,
    }),
    [orders],
  );

  const [viewingOrder, setViewingOrder] = useState(null);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const nextId = useRef(orders.length + 1);
  const csvInputRef = useRef(null);

  const handleCreate = (form) => {
    const newOrder = {
      ...form,
      id: nextId.current++,
      orderId: `#MP${nextId.current}`,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCreatingOrder(false);
    toast.success('Marketplace order created!');
  };

  const handleEdit = (form) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === editingOrder.id ? { ...o, ...form } : o)),
    );
    setEditingOrder(null);
    toast.success('Order updated successfully!');
  };

  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDelete = (id) => {
    const order = orders.find((o) => o.id === id);
    if (order) setDeleteTarget(order);
  };

  const confirmDelete = () => {
    setOrders((prev) => prev.filter((o) => o.id !== deleteTarget.id));
    setDeleteTarget(null);
    toast.success('Order deleted.');
  };

  const handleCsvUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // TODO: parse CSV and merge into orders state via API
    toast.info(`CSV "${file.name}" uploaded — wiring to API pending.`);
    e.target.value = '';
  };

  if (viewingOrder)
    return (
      <OrderDetail order={viewingOrder} onBack={() => setViewingOrder(null)} />
    );

  if (creatingOrder)
    return (
      <OrderForm
        initial={EMPTY_FORM}
        title='Add New Project'
        submitLabel='Create Project'
        onSubmit={handleCreate}
        onCancel={() => setCreatingOrder(false)}
      />
    );

  if (editingOrder)
    return (
      <OrderForm
        initial={editingOrder}
        title='Edit Project'
        submitLabel='Save Changes'
        onSubmit={handleEdit}
        onCancel={() => setEditingOrder(null)}
      />
    );

  return (
    <>
      <div className='space-y-6 pb-8'>
        {/* Page Header */}
        <div className='flex flex-wrap items-start justify-between gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
              Marketplace Orders
            </h1>
            <p className='text-base text-gray-500 mt-1'>
              Fiverr &amp; marketplace client management
            </p>
          </div>

          <div className='flex items-center gap-3 flex-wrap'>
            {/* CSV Upload */}
            <input
              ref={csvInputRef}
              type='file'
              accept='.csv'
              className='hidden'
              onChange={handleCsvUpload}
              aria-label='Upload CSV'
            />
            <button
              type='button'
              onClick={() => csvInputRef.current?.click()}
              className='group inline-flex cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 active:scale-[0.97]'
            >
              <MdUploadFile
                className='text-lg shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5'
                aria-hidden='true'
              />
              <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
                Upload CSV
              </span>
            </button>

            {/* Add New Project */}
            <button
              type='button'
              onClick={() => setCreatingOrder(true)}
              className='group inline-flex cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
            >
              <MdAdd
                className='text-lg shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
                aria-hidden='true'
              />
              <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
                Add New Project
              </span>
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
          {[
            { label: 'Total Orders', value: orders.length },
            { label: 'In Progress', value: inProgress },
            { label: 'Completed', value: completed },
          ].map(({ label, value }) => (
            <div
              key={label}
              className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'
            >
              <p className='text-sm font-medium text-gray-500 mb-2'>{label}</p>
              <p className='text-4xl font-bold text-gray-900'>{value}</p>
            </div>
          ))}
        </div>

        {/* Orders list */}
        <section
          aria-label='Marketplace orders list'
          className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'
        >
          {/* Mobile */}
          <div className='sm:hidden p-4 space-y-3'>
            {pageData.map((order) => (
              <div key={order.id} role='listitem'>
                <OrderCard
                  order={order}
                  onView={setViewingOrder}
                  onEdit={setEditingOrder}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>

          {/* Desktop */}
          <div className='hidden sm:block overflow-x-auto'>
            <AdminTable
              columns={TABLE_COLS}
              ariaLabel='Marketplace orders list'
            >
              {pageData.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onView={setViewingOrder}
                  onEdit={setEditingOrder}
                  onDelete={handleDelete}
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
                {orders.length}
              </span>{' '}
              orders
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
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <ConfirmDeleteModal
          title='Delete Order?'
          description={`${deleteTarget.orderId} — ${deleteTarget.projectName}`}
          hint='This action is permanent and cannot be undone.'
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
