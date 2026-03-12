import { useEffect, useMemo, useState } from 'react';
import { MdAdd, MdRemoveRedEye, MdClose, MdArrowBack } from 'react-icons/md';
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
    price: '$85,000',
    status: 'In progress',
  },
  {
    id: 2,
    orderId: '#2',
    client: 'Fatima Rahman',
    service: 'Digital Marketing',
    startDate: '2026-01-20',
    deliveryDate: '2026-02-20',
    price: '$45,000',
    status: 'In progress',
  },
  {
    id: 3,
    orderId: '#3',
    client: 'Shakib Hasan',
    service: 'Mobile App Development',
    startDate: '2025-12-01',
    deliveryDate: '2026-01-15',
    price: '$150,000',
    status: 'Completed',
  },
  {
    id: 4,
    orderId: '#4',
    client: 'Nusrat Jahan',
    service: 'SEO Optimization',
    startDate: '2026-01-25',
    deliveryDate: '2026-03-25',
    price: '$35,000',
    status: 'Pending',
  },
  {
    id: 5,
    orderId: '#5',
    client: 'Rahim Uddin',
    service: 'E-commerce Development',
    startDate: '2026-02-01',
    deliveryDate: '2026-04-01',
    price: '$120,000',
    status: 'Pending',
  },
  {
    id: 6,
    orderId: '#6',
    client: 'Sabrina Begum',
    service: 'Brand Identity Design',
    startDate: '2026-01-10',
    deliveryDate: '2026-02-10',
    price: '$25,000',
    status: 'Completed',
  },
  {
    id: 7,
    orderId: '#7',
    client: 'Imran Hossain',
    service: 'Content Management System',
    startDate: '2026-02-05',
    deliveryDate: '2026-04-05',
    price: '$70,000',
    status: 'In progress',
  },
  {
    id: 8,
    orderId: '#8',
    client: 'Lailun Nahar',
    service: 'Social Media Campaign',
    startDate: '2026-02-10',
    deliveryDate: '2026-03-10',
    price: '$18,000',
    status: 'Pending',
  },
  {
    id: 9,
    orderId: '#9',
    client: 'Tanvir Ahmed',
    service: 'Mobile App Development',
    startDate: '2026-01-05',
    deliveryDate: '2026-03-05',
    price: '$95,000',
    status: 'In progress',
  },
  {
    id: 10,
    orderId: '#10',
    client: 'Roksana Islam',
    service: 'Website Redesign',
    startDate: '2025-11-15',
    deliveryDate: '2026-01-15',
    price: '$55,000',
    status: 'Completed',
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

// Shared input class for the create-order form
const INPUT_CLS =
  'w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition';

const LABEL_CLS = 'block text-sm font-medium text-gray-600 mb-1.5';

const REQUIRED_STAR = (
  <span className='text-red-500 ml-0.5' aria-hidden='true'>
    *
  </span>
);

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
      <div className='flex items-start justify-between gap-4 mb-6'>
        <h1 className='text-xl font-bold text-gray-900'>
          Order {order.orderId}
        </h1>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shrink-0 ${getStatusStyle(order.status)}`}
        >
          {order.status}
        </span>
      </div>

      <dl className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4'>
        {[
          { label: 'Client', value: order.client },
          { label: 'Service', value: order.service },
          { label: 'Start Date', value: order.startDate },
          { label: 'Delivery Date', value: order.deliveryDate },
          { label: 'Price', value: order.price },
        ].map(({ label, value }) => (
          <div key={label} className='border-b border-gray-50 pb-4'>
            <dt className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-1'>
              {label}
            </dt>
            <dd className='text-base text-gray-800 font-medium'>{value}</dd>
          </div>
        ))}
      </dl>
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
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to create order API
    toast.success('Order created successfully!');
    onCancel();
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
        <h1 className='text-xl font-bold text-gray-900 mb-6'>
          Create New Order
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6'>
            <div>
              <label htmlFor='co-client' className={LABEL_CLS}>
                Client{REQUIRED_STAR}
              </label>
              <input
                id='co-client'
                name='client'
                type='text'
                value={form.client}
                onChange={handleChange}
                autoComplete='off'
                required
                placeholder='Client name'
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='co-service' className={LABEL_CLS}>
                Service{REQUIRED_STAR}
              </label>
              <input
                id='co-service'
                name='service'
                type='text'
                value={form.service}
                onChange={handleChange}
                autoComplete='off'
                required
                placeholder='e.g. Website Development'
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
                Price{REQUIRED_STAR}
              </label>
              <input
                id='co-price'
                name='price'
                type='text'
                value={form.price}
                onChange={handleChange}
                autoComplete='off'
                required
                placeholder='e.g. $85,000'
                className={INPUT_CLS}
              />
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <button
              type='submit'
              className='inline-flex cursor-pointer items-center px-5 py-2.5 text-sm font-semibold text-white bg-black-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
            >
              Create Order
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
          className='group inline-flex cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-black-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
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
