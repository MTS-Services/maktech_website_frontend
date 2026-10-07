import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MdAdd,
  MdRemoveRedEye,
  MdEdit,
  MdDelete,
  MdCheck,
  MdArrowBack,
  MdOpenInNew,
  MdKeyboardArrowDown,
  MdMoreVert,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import apiClient from '../../../services/apiClient';
import AdminTable from '../../../components/AdminTable';
import Pagination from '../../../components/Pagination';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import { getPageRange } from '../../../utils/helpers';

// ─── Static order data ────────────────────────────────────────────────────────
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

// ─── Kebab action menu ────────────────────────────────────────────────────────

const StatusDropdown = ({ status, onChange }) => (
  <div className="relative inline-block text-left">
    <select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      className={`inline-flex items-center pl-3 pr-7 py-1.5 rounded-full text-xs font-semibold cursor-pointer appearance-none outline-none border-none transition-shadow hover:shadow-sm ${getStatusStyle(status)}`}
      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
    >
      <option value="PENDING" className="bg-white text-gray-900 font-medium">PENDING</option>
      <option value="IN_PROGRESS" className="bg-white text-gray-900 font-medium">IN PROGRESS</option>
      <option value="COMPLETED" className="bg-white text-gray-900 font-medium">COMPLETED</option>
      <option value="CANCELLED" className="bg-white text-gray-900 font-medium">CANCELLED</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
      <MdKeyboardArrowDown className="text-sm opacity-60" />
    </div>
  </div>
);

const DROPDOWN_W = 144;
const DROPDOWN_H = 120;

const ActionMenu = ({ order, onView, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, openUp: false });
  const btnRef = useRef(null);
  const menuId = useRef(`order-menu-${order.orderId}`);

  const handleToggle = () => {
    if (!open) {
      // Close every other open ActionMenu before opening this one
      window.dispatchEvent(
        new CustomEvent('orders:close-menus', {
          detail: { except: menuId.current },
        }),
      );
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const openUp = spaceBelow < DROPDOWN_H + 8;
        setPos({
          top: openUp ? rect.top - DROPDOWN_H - 4 : rect.bottom + 4,
          left: Math.min(
            rect.right - DROPDOWN_W,
            window.innerWidth - DROPDOWN_W - 8,
          ),
          openUp,
        });
      }
    }
    setOpen((v) => !v);
  };

  // Listen for close-all events from sibling menus
  useEffect(() => {
    const handleCloseOthers = (e) => {
      if (e.detail.except !== menuId.current) setOpen(false);
    };
    window.addEventListener('orders:close-menus', handleCloseOthers);
    return () =>
      window.removeEventListener('orders:close-menus', handleCloseOthers);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener('scroll', close, true);
    window.addEventListener('click', close);
    return () => {
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('click', close);
    };
  }, [open]);

  return (
    <div className='relative inline-block'>
      <button
        ref={btnRef}
        type='button'
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
        aria-label='Order actions'
        aria-haspopup='true'
        aria-expanded={open}
        className='p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-orange-50/40 transition-colors duration-150'
      >
        <MdMoreVert className='text-xl' />
      </button>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            width: DROPDOWN_W,
            zIndex: 9999,
          }}
          className='bg-white rounded-xl shadow-lg border border-gray-100 py-1 overflow-hidden'
        >
          <button
            type='button'
            onClick={() => {
              setOpen(false);
              onView(order);
            }}
            className='w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-gray-700 hover:bg-orange-50/40 hover:text-gray-900 transition-colors duration-150'
          >
            <MdRemoveRedEye className='text-base shrink-0 text-orange-400' />
            View
          </button>
          <button
            type='button'
            onClick={() => {
              setOpen(false);
              onEdit(order);
            }}
            className='w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-gray-700 hover:bg-orange-50/40 hover:text-gray-900 transition-colors duration-150'
          >
            <MdEdit className='text-base shrink-0 text-blue-400' />
            Edit
          </button>
          <div className='border-t border-gray-100 my-1' />
          <button
            type='button'
            onClick={() => {
              setOpen(false);
              onDelete(order.id);
            }}
            className='w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors duration-150'
          >
            <MdDelete className='text-base shrink-0' />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

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
const CreateOrderForm = ({ onCancel, onSuccess }) => {
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
      onSuccess(form);
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
const OrderCard = ({ order, onView, onEdit, onDelete, onStatusChange }) => (
  <article className='bg-white rounded-xl border border-gray-100 shadow-sm p-4'>
    {/* Card header: Order ID + ActionMenu */}
    <div className='flex items-center justify-between gap-2 mb-2'>
      <p className='text-sm font-bold text-gray-900'>{order.orderId}</p>
      <ActionMenu
        order={order}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>

    {/* All table fields in 2-column grid */}
    <dl className='grid grid-cols-2 gap-x-3 gap-y-3 text-sm'>
      {/* Client — full width */}
      <div className='col-span-2'>
        <dt className='text-xs text-gray-400 mb-0.5'>Client</dt>
        <dd className='text-gray-900 font-semibold leading-snug'>
          {order.client}
        </dd>
      </div>

      {/* Service — full width */}
      <div className='col-span-2'>
        <dt className='text-xs text-gray-400 mb-0.5'>Service</dt>
        <dd className='text-gray-700 font-medium'>{order.service}</dd>
      </div>

      {/* Start Date */}
      <div>
        <dt className='text-xs text-gray-400 mb-0.5'>Start Date</dt>
        <dd className='text-gray-700'>{order.startDate}</dd>
      </div>

      {/* Delivery Date */}
      <div>
        <dt className='text-xs text-gray-400 mb-0.5'>Delivery Date</dt>
        <dd className='text-gray-700'>{order.deliveryDate}</dd>
      </div>

      {/* Price */}
      <div>
        <dt className='text-xs text-gray-400 mb-0.5'>Price</dt>
        <dd className='text-gray-900 font-bold'>{order.price}</dd>
      </div>

      {/* Status */}
      <div>
        <dt className='text-xs text-gray-400 mb-0.5'>Status</dt>
          <dd>
            <StatusDropdown status={order.status} onChange={(val) => onStatusChange(order.id, val)} />
          </dd>
      </div>
    </dl>
  </article>
);

// ─── Desktop table row ────────────────────────────────────────────────────────
const OrderRow = ({ order, onView, onEdit, onDelete, onStatusChange }) => (
  <tr className='border-t border-gray-50 hover:bg-orange-50/30 transition-colors duration-150'>
    <td className={`${TD} font-medium text-gray-900`}>{order.orderId}</td>
    <td className={TD}>{order.client}</td>
    <td className={TD}>{order.service}</td>
    <td className={TD}>{order.startDate}</td>
    <td className={TD}>{order.deliveryDate}</td>
    <td className={`${TD} font-medium`}>{order.price}</td>
      <td className='px-5 py-3.5'>
        <StatusDropdown status={order.status} onChange={(val) => onStatusChange(order.id, val)} />
      </td>
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

// ─── Edit order form ──────────────────────────────────────────────────────────
const EditOrderForm = ({ order, onCancel, onSave }) => {
  const [form, setForm] = useState({
    client: order.client ?? '',
    service: order.service ?? '',
    startDate: order.startDate ?? '',
    deliveryDate: order.deliveryDate ?? '',
    price: order.price ?? '',
    assignedTeam: order.assignedTeam ?? '',
    notes: order.notes ?? '',
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...order, ...form });
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
        Back to Orders
      </button>

      <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8'>
        <h1 className='text-xl font-bold text-gray-900 mb-6'>
          Edit Order <span className='text-orange-bg-cta'>{order.orderId}</span>
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4'>
            <div>
              <label htmlFor='eo-client' className={LABEL_CLS}>
                Client Name{REQUIRED_STAR}
              </label>
              <input
                id='eo-client'
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
              <label htmlFor='eo-service' className={LABEL_CLS}>
                Service Name{REQUIRED_STAR}
              </label>
              <input
                id='eo-service'
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
              <label htmlFor='eo-start' className={LABEL_CLS}>
                Start Date{REQUIRED_STAR}
              </label>
              <input
                id='eo-start'
                name='startDate'
                type='date'
                value={form.startDate}
                onChange={handleChange}
                required
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='eo-delivery' className={LABEL_CLS}>
                Delivery Date{REQUIRED_STAR}
              </label>
              <input
                id='eo-delivery'
                name='deliveryDate'
                type='date'
                value={form.deliveryDate}
                onChange={handleChange}
                required
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label htmlFor='eo-price' className={LABEL_CLS}>
                Price ($){REQUIRED_STAR}
              </label>
              <input
                id='eo-price'
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
              <label htmlFor='eo-team' className={LABEL_CLS}>
                Assigned Team{REQUIRED_STAR}
              </label>
              <div className='relative'>
                <select
                  id='eo-team'
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

          <div className='mb-6'>
            <label htmlFor='eo-notes' className={LABEL_CLS}>
              Project Notes
            </label>
            <textarea
              id='eo-notes'
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
              <MdCheck
                className='text-base shrink-0 transition-transform duration-300 ease-out group-hover:scale-110'
                aria-hidden='true'
              />
              <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
                Save Changes
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

// ─── Page component ───────────────────────────────────────────────────────────
export default function Orders() {
  useEffect(() => {
    document.title = 'Orders - Maktech Admin';
  }, []);

  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, inProgress: 0, delivered: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);

  // Pagination meta from API
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/api/v1/orders?page=${page}&limit=${PAGE_SIZE}`);
      if (response.data.success) {
        setOrders(response.data.data);
        setTotalPages(response.data.meta.totalPages);
        setTotalCount(response.data.meta.total);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await apiClient.get('/api/v1/orders/stats');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const pageRange = useMemo(() => getPageRange(page, totalPages), [page, totalPages]);
  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, totalCount);
  const handlePage = (p) => setPage(Math.max(1, Math.min(totalPages, p)));

  const [viewingOrder, setViewingOrder] = useState(null);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDelete = (id) => {
    const order = orders.find((o) => o.id === id);
    if (order) setDeleteTarget(order);
  };

  const confirmDelete = async () => {
    try {
      await apiClient.delete(`/api/v1/orders/${deleteTarget.id}`);
      toast.success('Order deleted.');
      setDeleteTarget(null);
      fetchOrders();
      fetchStats();
    } catch (err) {
      toast.error('Failed to delete order');
    }
  };

  const handleSaveEdit = async (updated) => {
    try {
      const response = await apiClient.patch(`/api/v1/orders/${updated.id}`, updated);
      if (response.data.success) {
        toast.success('Order updated successfully!');
        setEditingOrder(null);
        fetchOrders();
        fetchStats();
      }
    } catch (err) {
      toast.error('Failed to update order');
    }
  };
  
  const handleCreateOrder = async (form) => {
    try {
      const response = await apiClient.post('/api/v1/orders', form);
      if (response.data.success) {
        toast.success('Order created & payment link generated!');
        setCreatingOrder(false);
        fetchOrders();
        fetchStats();
      }
    } catch (err) {
      toast.error('Failed to create order');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await apiClient.patch(`/api/v1/orders/${id}`, { status: newStatus });
      if (response.data.success) {
        toast.success('Order status updated!');
        fetchOrders();
        fetchStats();
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  if (viewingOrder)
    return (
      <OrderDetail order={viewingOrder} onBack={() => setViewingOrder(null)} />
    );

  if (creatingOrder)
    return <CreateOrderForm onCancel={() => setCreatingOrder(false)} onSuccess={handleCreateOrder} />;

  if (editingOrder)
    return (
      <EditOrderForm
        order={editingOrder}
        onCancel={() => setEditingOrder(null)}
        onSave={handleSaveEdit}
      />
    );

  return (
    <>
      <div className='space-y-6 pb-8'>
        {/* Page Header */}
        <div className='flex flex-wrap items-start justify-between gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
              Orders
            </h1>
            <p className='text-base text-gray-500 mt-1'>
              Project & revenue management
            </p>
          </div>

          <button
            type='button'
            onClick={() => setCreatingOrder(true)}
            className='group inline-flex cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] transition-all duration-200 active:scale-[0.97]'
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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {[
            { label: 'Total Orders', value: stats.totalOrders },
            { label: 'In Progress', value: stats.inProgress },
            { label: 'Delivered', value: stats.delivered },
            {
              label: 'Total Revenue',
              value: `$${stats.totalRevenue.toLocaleString('en-US')}`,
            },
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
          aria-label='Orders list'
          className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative'
        >
          {loading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-orange-bg-cta border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <div className='sm:hidden p-4 space-y-3'>
            {orders.map((order) => (
              <div key={order.id} role='listitem'>
                <OrderCard
                  order={order}
                  onView={setViewingOrder}
                  onEdit={setEditingOrder}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              </div>
            ))}
            {orders.length === 0 && !loading && (
              <div className="text-center py-8 text-gray-500">No orders found.</div>
            )}
          </div>

          <div className='hidden sm:block overflow-x-auto'>
            <AdminTable columns={ORDER_COLS} ariaLabel='Orders list'>
              {orders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onView={setViewingOrder}
                  onEdit={setEditingOrder}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
              {orders.length === 0 && !loading && (
                <tr>
                  <td colSpan={ORDER_COLS.length} className="text-center py-8 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </AdminTable>
          </div>

          <div className='flex flex-col items-center gap-3 px-5 py-4 border-t border-gray-100 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-sm text-gray-400 shrink-0'>
              Showing{' '}
              <span className='font-semibold text-gray-700'>
                {rangeStart} to {rangeEnd}
              </span>{' '}
              of{' '}
              <span className='font-semibold text-gray-700'>
                {totalCount}
              </span>{' '}
              orders
            </p>
            {totalPages > 1 && (
              <nav aria-label='Pagination'>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  pageRange={pageRange}
                  onPage={handlePage}
                />
              </nav>
            )}
          </div>
        </section>
      </div>

      {deleteTarget && (
        <ConfirmDeleteModal
          title='Delete Order?'
          description={`${deleteTarget.orderId || 'Order'} - ${deleteTarget.client}`}
          hint='This action is permanent and cannot be undone.'
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}