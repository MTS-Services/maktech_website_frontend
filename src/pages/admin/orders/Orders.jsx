import { useEffect, useMemo, useState } from 'react';
import {
  MdAdd,
  MdRemoveRedEye,
  MdArrowBack,
  MdOpenInNew,
  MdKeyboardArrowDown,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import AdminTable from '../../../components/AdminTable';
import Pagination from '../../../components/Pagination';
import { getPageRange } from '../../../utils/helpers';

// ─── Static order data ────────────────────────────────────────────────────────
const ORDERS = [
  {
    id: 1,
    orderId: '#1',
    client: 'Ahmed Khan',
    service: 'Website Development',
    startDate: '2026-01-15',
    deliveryDate: '2026-02-15',
    price: '৳85,000',
    status: 'In progress',
    assignedTeam: 'Development Team A',
    notes: 'E-commerce website with payment gateway integration',
  },
  {
    id: 2,
    orderId: '#2',
    client: 'Fatima Rahman',
    service: 'Digital Marketing',
    startDate: '2026-01-20',
    deliveryDate: '2026-02-20',
    price: '৳45,000',
    status: 'In progress',
    assignedTeam: 'Marketing Team B',
    notes: 'Focus on social media channels and email campaigns',
  },
  {
    id: 3,
    orderId: '#3',
    client: 'Shakib Hasan',
    service: 'Mobile App Development',
    startDate: '2025-12-01',
    deliveryDate: '2026-01-15',
    price: '৳1,50,000',
    status: 'Completed',
    assignedTeam: 'Mobile Dev Team C',
    notes: 'Cross-platform app for iOS and Android with offline support',
  },
  {
    id: 4,
    orderId: '#4',
    client: 'Nusrat Jahan',
    service: 'SEO Optimization',
    startDate: '2026-01-25',
    deliveryDate: '2026-03-25',
    price: '৳35,000',
    status: 'Pending',
    assignedTeam: 'SEO & Analytics Team',
    notes: 'Improve organic rankings for top 20 target keywords',
  },
  {
    id: 5,
    orderId: '#5',
    client: 'Rahim Uddin',
    service: 'E-commerce Development',
    startDate: '2026-02-01',
    deliveryDate: '2026-04-01',
    price: '৳1,20,000',
    status: 'Pending',
    assignedTeam: 'Development Team A',
    notes: 'Multi-vendor marketplace with Stripe and bKash integration',
  },
  {
    id: 6,
    orderId: '#6',
    client: 'Sabrina Begum',
    service: 'Brand Identity Design',
    startDate: '2026-01-10',
    deliveryDate: '2026-02-10',
    price: '৳25,000',
    status: 'Completed',
    assignedTeam: 'Design Team D',
    notes: 'Logo, brand guidelines, business card, and stationery kit',
  },
  {
    id: 7,
    orderId: '#7',
    client: 'Imran Hossain',
    service: 'Content Management System',
    startDate: '2026-02-05',
    deliveryDate: '2026-04-05',
    price: '৳70,000',
    status: 'In progress',
    assignedTeam: 'Development Team B',
    notes: 'Headless CMS with custom admin panel and role-based access',
  },
  {
    id: 8,
    orderId: '#8',
    client: 'Lailun Nahar',
    service: 'Social Media Campaign',
    startDate: '2026-02-10',
    deliveryDate: '2026-03-10',
    price: '৳18,000',
    status: 'Pending',
    assignedTeam: 'Marketing Team A',
    notes: '60-day campaign targeting Facebook and Instagram audiences',
  },
  {
    id: 9,
    orderId: '#9',
    client: 'Tanvir Ahmed',
    service: 'Mobile App Development',
    startDate: '2026-01-05',
    deliveryDate: '2026-03-05',
    price: '৳95,000',
    status: 'In progress',
    assignedTeam: 'Mobile Dev Team C',
    notes: 'Fintech app with biometric authentication and transaction history',
  },
  {
    id: 10,
    orderId: '#10',
    client: 'Roksana Islam',
    service: 'Website Redesign',
    startDate: '2025-11-15',
    deliveryDate: '2026-01-15',
    price: '৳55,000',
    status: 'Completed',
    assignedTeam: 'Development Team A',
    notes:
      'Full redesign with modern UI/UX and Lighthouse performance optimization',
  },
];

const PAGE_SIZE = 8;

const ORDER_COLS = [
  { label: 'Order ID' },
  { label: 'Client' },
  { label: 'Service' },
  { label: 'Start Date' },
  { label: 'Delivery Date' },
  { label: 'Price' },
  { label: 'Status' },
  { label: 'Actions' },
];

// Status badge styles — text label present so color is not the sole indicator (WCAG 1.4.1)
const STATUS_STYLES = {
  'In progress': 'bg-blue-50 text-blue-700',
  Completed: 'bg-green-50 text-green-700',
  Pending: 'bg-amber-50 text-amber-700',
};

const getStatusStyle = (status) =>
  STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-600';

const TD = 'px-5 py-3.5 text-sm text-gray-700 whitespace-nowrap';

// Shared input / select / textarea class for the create-order form
const INPUT_CLS =
  'w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition';

const LABEL_CLS = 'block text-sm font-medium text-gray-600 mb-1.5';

const REQUIRED_STAR = (
  <span className='text-red-500 ml-0.5' aria-hidden='true'>
    *
  </span>
);

// Drives both the <select> options and the static ORDERS assignedTeam values
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

// ─── Order Detail View ────────────────────────────────────────────────────────
const OrderDetail = ({ order, onBack }) => (
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
      Back to Orders
    </button>

    <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8'>
      {/* Header: order number + service subtitle + status badge */}
      <div className='flex items-start justify-between gap-4 mb-6'>
        <div>
          <h1 className='text-xl font-bold text-gray-900'>
            Order {order.orderId}
          </h1>
          <p className='text-sm text-gray-500 mt-0.5'>{order.service}</p>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shrink-0 ${getStatusStyle(order.status)}`}
        >
          {order.status}
        </span>
      </div>

      {/* Field groups — divide-y creates the visual row separators */}
      <dl className='divide-y divide-gray-100'>
        {/* Row 1: Client Name + Service Name */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 py-5 first:pt-0'>
          <div>
            <dt className='text-sm text-gray-400 mb-1'>Client Name</dt>
            <dd className='text-base text-gray-800 font-medium'>
              {order.client}
            </dd>
          </div>
          <div>
            <dt className='text-sm text-gray-400 mb-1'>Service Name</dt>
            <dd className='text-base text-gray-800 font-medium'>
              {order.service}
            </dd>
          </div>
        </div>

        {/* Row 2: Start Date + Delivery Date */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 py-5'>
          <div>
            <dt className='text-sm text-gray-400 mb-1'>Start Date</dt>
            <dd className='text-base text-gray-800 font-medium'>
              {order.startDate}
            </dd>
          </div>
          <div>
            <dt className='text-sm text-gray-400 mb-1'>Delivery Date</dt>
            <dd className='text-base text-gray-800 font-medium'>
              {order.deliveryDate}
            </dd>
          </div>
        </div>

        {/* Row 3: Price + Assigned Team + Project Notes share one group (no divider between them) */}
        <div className='py-5 space-y-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4'>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>Price</dt>
              <dd className='text-base text-gray-800 font-semibold'>
                {order.price}
              </dd>
            </div>
            <div>
              <dt className='text-sm text-gray-400 mb-1'>Assigned Team</dt>
              <dd className='text-base text-gray-800 font-medium'>
                {order.assignedTeam}
              </dd>
            </div>
          </div>
          <div>
            <dt className='text-sm text-gray-400 mb-1'>Project Notes</dt>
            <dd className='text-base text-gray-800'>{order.notes}</dd>
          </div>
        </div>
      </dl>

      {/* Get Payment Link — external action */}
      <div className='pt-2'>
        <button
          type='button'
          className='group inline-flex cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
        >
          <MdOpenInNew
            className='text-base shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
            aria-hidden='true'
          />
          <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
            Get Payment Link
          </span>
        </button>
      </div>
    </div>
  </div>
);

// ─── Create Order Form ────────────────────────────────────────────────────────
const CreateOrderForm = ({ onCancel }) => {
  const [form, setForm] = useState({
    client: '',
    service: '',
    startDate: '',
    deliveryDate: '',
    price: '',
    assignedTeam: '',
    notes: '',
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to create order API
    toast.success('Order created & payment link generated!');
    onCancel();
  };

  return (
    <div className='space-y-6 pb-8'>
      {/* Back nav — consistent with OrderDetail pattern */}
      <button
        type='button'
        onClick={onCancel}
        className='inline-flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-150 group'
      >
        <MdArrowBack
          className='text-base group-hover:-translate-x-0.5 transition-transform duration-150'
          aria-hidden='true'
        />
        Back to Orders
      </button>

      <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8'>
        <h1 className='text-xl font-bold text-gray-900 mb-6'>
          Create New Order
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          {/* 2-col grid: Client Name | Service Name | Start Date | Delivery Date | Price | Assigned Team */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4'>
            <div>
              <label htmlFor='co-client' className={LABEL_CLS}>
                Client Name{REQUIRED_STAR}
              </label>
              <input
                id='co-client'
                name='client'
                type='text'
                value={form.client}
                onChange={handleChange}
                autoComplete='name'
                required
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='co-service' className={LABEL_CLS}>
                Service Name{REQUIRED_STAR}
              </label>
              <input
                id='co-service'
                name='service'
                type='text'
                value={form.service}
                onChange={handleChange}
                autoComplete='off'
                required
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='co-start' className={LABEL_CLS}>
                Start Date{REQUIRED_STAR}
              </label>
              <input
                id='co-start'
                name='startDate'
                type='date'
                value={form.startDate}
                onChange={handleChange}
                required
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='co-delivery' className={LABEL_CLS}>
                Delivery Date{REQUIRED_STAR}
              </label>
              <input
                id='co-delivery'
                name='deliveryDate'
                type='date'
                value={form.deliveryDate}
                onChange={handleChange}
                required
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='co-price' className={LABEL_CLS}>
                Price ($){REQUIRED_STAR}
              </label>
              <input
                id='co-price'
                name='price'
                type='text'
                value={form.price}
                onChange={handleChange}
                autoComplete='off'
                required
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='co-team' className={LABEL_CLS}>
                Assigned Team{REQUIRED_STAR}
              </label>
              {/* Wrapper gives us a react-icon chevron while keeping native <select> a11y */}
              <div className='relative'>
                <select
                  id='co-team'
                  name='assignedTeam'
                  value={form.assignedTeam}
                  onChange={handleChange}
                  required
                  className={`${INPUT_CLS} appearance-none pr-10 cursor-pointer`}
                >
                  <option value='' disabled>
                    Select a team
                  </option>
                  {TEAM_OPTIONS.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
                <MdKeyboardArrowDown
                  className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400'
                  aria-hidden='true'
                />
              </div>
            </div>
          </div>

          {/* Project Notes — full-width, optional */}
          <div className='mb-6'>
            <label htmlFor='co-notes' className={LABEL_CLS}>
              Project Notes
            </label>
            <textarea
              id='co-notes'
              name='notes'
              value={form.notes}
              onChange={handleChange}
              rows={4}
              autoComplete='off'
              className={`${INPUT_CLS} resize-none`}
            />
          </div>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap'>
            <button
              type='submit'
              className='group inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
            >
              <MdOpenInNew
                className='text-base shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
                aria-hidden='true'
              />
              <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
                Create Order &amp; Generate Payment Link
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

// ─── Mobile order card ────────────────────────────────────────────────────────
const OrderCard = ({ order, onView }) => (
  <article className='bg-white rounded-xl border border-gray-100 shadow-sm p-4'>
    <div className='flex items-start justify-between gap-2 mb-3'>
      <div>
        <p className='text-base font-semibold text-gray-900'>
          {order.orderId} — {order.client}
        </p>
        <p className='text-sm text-gray-500'>{order.service}</p>
      </div>
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${getStatusStyle(order.status)}`}
      >
        {order.status}
      </span>
    </div>

    <dl className='grid grid-cols-2 gap-y-2 gap-x-3 text-sm mb-3'>
      <div>
        <dt className='text-xs text-gray-400'>Start Date</dt>
        <dd className='text-gray-700'>{order.startDate}</dd>
      </div>
      <div>
        <dt className='text-xs text-gray-400'>Delivery Date</dt>
        <dd className='text-gray-700'>{order.deliveryDate}</dd>
      </div>
      <div>
        <dt className='text-xs text-gray-400'>Price</dt>
        <dd className='text-gray-700 font-medium'>{order.price}</dd>
      </div>
    </dl>

    <button
      type='button'
      onClick={() => onView(order)}
      aria-label={`View order ${order.orderId}`}
      className='p-1.5 rounded-lg text-orange-400 hover:bg-orange-50 transition-colors duration-150'
    >
      <MdRemoveRedEye className='text-lg' aria-hidden='true' />
    </button>
  </article>
);

// ─── Desktop table row ────────────────────────────────────────────────────────
const OrderRow = ({ order, onView }) => (
  <tr className='border-t border-gray-50 hover:bg-orange-50/30 transition-colors duration-150'>
    <td className={`${TD} font-medium text-gray-900`}>{order.orderId}</td>
    <td className={TD}>{order.client}</td>
    <td className={TD}>{order.service}</td>
    <td className={TD}>{order.startDate}</td>
    <td className={TD}>{order.deliveryDate}</td>
    <td className={`${TD} font-medium`}>{order.price}</td>
    <td className='px-5 py-3.5'>
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}
      >
        {order.status}
      </span>
    </td>
    <td className='px-5 py-3.5'>
      <button
        type='button'
        onClick={() => onView(order)}
        aria-label={`View order ${order.orderId}`}
        className='p-1.5 rounded-lg text-orange-400 hover:bg-orange-50 transition-colors duration-150'
      >
        <MdRemoveRedEye className='text-lg' aria-hidden='true' />
      </button>
    </td>
  </tr>
);

// ─── Page component ───────────────────────────────────────────────────────────
export default function Orders() {
  useEffect(() => {
    document.title = 'Orders – Maktech Admin';
  }, []);

  // Derive stat counts from data — never store derived state
  const { inProgress, completed } = useMemo(
    () => ({
      inProgress: ORDERS.filter((o) => o.status === 'In progress').length,
      completed: ORDERS.filter((o) => o.status === 'Completed').length,
    }),
    [],
  );

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(ORDERS.length / PAGE_SIZE);
  const pageData = useMemo(
    () => ORDERS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page],
  );
  const pageRange = useMemo(
    () => getPageRange(page, totalPages),
    [page, totalPages],
  );
  const rangeStart = (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, ORDERS.length);
  const handlePage = (p) => setPage(Math.max(1, Math.min(totalPages, p)));

  const [viewingOrder, setViewingOrder] = useState(null);
  const [creatingOrder, setCreatingOrder] = useState(false);

  if (viewingOrder)
    return (
      <OrderDetail order={viewingOrder} onBack={() => setViewingOrder(null)} />
    );

  if (creatingOrder)
    return <CreateOrderForm onCancel={() => setCreatingOrder(false)} />;

  return (
    <div className='space-y-6 pb-8'>
      {/* Page Header */}
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
            Orders
          </h1>
          <p className='text-base text-gray-500 mt-1'>
            Project &amp; revenue management
          </p>
        </div>

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
            Create New Order
          </span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
        {[
          { label: 'Total Orders', value: ORDERS.length },
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

      {/* Orders list — single card */}
      <section
        aria-label='Orders list'
        className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'
      >
        {/* Mobile: card list */}
        <div className='sm:hidden p-4 space-y-3'>
          {pageData.map((order) => (
            <div key={order.id} role='listitem'>
              <OrderCard order={order} onView={setViewingOrder} />
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className='hidden sm:block overflow-x-auto'>
          <AdminTable columns={ORDER_COLS} ariaLabel='Orders list'>
            {pageData.map((order) => (
              <OrderRow key={order.id} order={order} onView={setViewingOrder} />
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
            <span className='font-semibold text-gray-700'>{ORDERS.length}</span>{' '}
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
  );
}
