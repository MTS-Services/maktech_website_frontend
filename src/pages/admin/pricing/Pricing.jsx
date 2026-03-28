import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MdAdd,
  MdEdit,
  MdArrowBack,
  MdCheck,
  MdKeyboardArrowDown,
  MdBolt,
  MdStarOutline,
  MdShieldMoon,
  MdLanguage,
  MdAutorenew,
  MdPersonOutline,
  MdRocketLaunch,
  MdTrendingUp,
} from 'react-icons/md';
import { toast } from 'react-toastify';

// ─── Static package data ──────────────────────────────────────────────────────
const PACKAGES = [
  {
    id: 1,
    name: 'Starter',
    tagline: 'Perfect for small businesses and startups',
    service: 'UI/UX Design',
    price: 25000,
    period: '/month',
    popular: false,
    features: [
      'Basic Website Design',
      'Mobile Responsive',
      'Up to 5 Pages',
      '1 Month Support',
      'Basic SEO Setup',
    ],
  },
  {
    id: 2,
    name: 'Professional',
    tagline: 'Best for growing businesses',
    service: 'MERN STACK Development',
    price: 50000,
    period: '/month',
    popular: true,
    features: [
      'Custom Website Design',
      'Mobile & Tablet Responsive',
      'Up to 15 Pages',
      '3 Months Support',
      'Advanced SEO',
      'Social Media Integration',
      'Contact Forms',
    ],
  },
  {
    id: 3,
    name: 'Enterprise',
    tagline: 'For large organizations',
    service: 'eCommerce Development',
    price: 100000,
    period: '/month',
    popular: false,
    features: [
      'Premium Custom Design',
      'Unlimited Pages',
      'E-commerce Integration',
      '12 Months Support',
      'Advanced SEO & Analytics',
      'Custom Features',
      'Dedicated Account Manager',
      'Priority Support',
    ],
  },
];

const BILLING_PERIODS = [
  { value: '/month', label: 'Per month' },
  { value: '/year', label: 'Per year' },
  { value: '/project', label: 'Per project' },
  { value: '/hour', label: 'Per hour' },
];

const SERVICES = [
  'MERN STACK Development',
  'UI/UX Design',
  'Flutter App Development',
  'eCommerce Development',
  'Digital Marketing',
  'Laravel Development',
];

// Comma-format price with $ prefix: 25000 → "$25,000"
const formatPrice = (n) => `$${Number(n).toLocaleString('en-US')}`;

// Cycling feature icons — different icon per line index
const FEATURE_ICONS = [
  MdCheck,
  MdBolt,
  MdStarOutline,
  MdShieldMoon,
  MdLanguage,
  MdAutorenew,
  MdPersonOutline,
  MdRocketLaunch,
  MdTrendingUp,
];

// ─── Shared field styles ──────────────────────────────────────────────────────
const LABEL_CLS = 'block text-sm font-medium text-gray-600 mb-1.5';
const INPUT_CLS =
  'w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition';
const REQUIRED_STAR = (
  <span className='text-red-500 ml-0.5' aria-hidden='true'>
    *
  </span>
);

// ─── Pricing card ─────────────────────────────────────────────────────────────
const PricingCard = ({ pkg, onEdit }) => (
  <article
    className={`relative flex flex-col bg-white rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
      pkg.popular
        ? 'border-2 border-orange-bg-cta shadow-[0_8px_32px_rgba(255,101,51,0.18)]'
        : 'border border-gray-100 shadow-sm hover:shadow-md'
    }`}
  >
    {/* Most Popular badge */}
    {pkg.popular && (
      <div className='absolute -top-4.5 left-1/2 -translate-x-1/2 z-10'>
        <span className='inline-flex items-center gap-1.5 bg-orange-bg-cta text-white text-xs font-bold px-5 py-2 rounded-full whitespace-nowrap tracking-widest uppercase shadow-[0_4px_12px_rgba(255,101,51,0.38)]'>
          <MdRocketLaunch className='text-sm shrink-0' aria-hidden='true' />
          Most Popular
        </span>
      </div>
    )}

    {/* Header */}
    <div
      className={`px-6 pt-10 pb-6 rounded-t-2xl ${
        pkg.popular ? 'bg-linear-to-br from-orange-50 via-white to-white' : ''
      }`}
    >
      <h2 className='text-xl font-bold text-gray-900 mb-2'>{pkg.name}</h2>
      {pkg.service && (
        <span
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
            pkg.popular
              ? 'bg-orange-bg-cta text-white'
              : 'bg-orange-50 text-orange-bg-cta border border-orange-100'
          }`}
        >
          {pkg.service}
        </span>
      )}
      <p className='text-sm text-gray-500 leading-relaxed'>{pkg.tagline}</p>
    </div>

    {/* Price */}
    <div className='px-6 py-5 border-t border-gray-100'>
      <div className='flex items-end gap-1.5'>
        <span className='text-4xl font-bold tracking-tight text-gray-900 leading-none'>
          {formatPrice(pkg.price)}
        </span>
      </div>
    </div>

    {/* Features */}
    <div className='px-6 pb-6 flex-1'>
      <ul role='list' className='space-y-3 border-t border-gray-100 pt-5'>
        {pkg.features.map((feature, i) => {
          const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
          return (
            <li
              key={i}
              className='flex items-center gap-3 text-sm text-gray-600'
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  pkg.popular
                    ? 'bg-orange-50 text-orange-bg-cta'
                    : 'bg-gray-50 text-gray-400'
                }`}
              >
                <Icon className='text-xs' aria-hidden='true' />
              </span>
              {feature}
            </li>
          );
        })}
      </ul>
    </div>

    {/* Edit CTA */}
    <div className='px-6 pb-6'>
      <button
        type='button'
        onClick={() => onEdit(pkg)}
        aria-label={`Edit ${pkg.name} package`}
        className={`group w-full inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
          pkg.popular
            ? 'bg-orange-bg-cta text-white shadow-[0_4px_14px_rgba(255,101,51,0.3)] hover:bg-[#e5501a] hover:shadow-[0_6px_20px_rgba(255,101,51,0.45)]'
            : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
        }`}
      >
        <MdEdit
          className='text-base shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
          aria-hidden='true'
        />
        <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
          Edit Package
        </span>
      </button>
    </div>
  </article>
);

// ─── Service custom dropdown (image 2 style) ────────────────────────────────
const ServiceDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const select = (service) => {
    onChange({ target: { name: 'service', value: service } });
    setOpen(false);
  };

  return (
    <div ref={ref} className='relative'>
      <button
        type='button'
        onClick={() => setOpen((prev) => !prev)}
        className={`${INPUT_CLS} flex items-center justify-between text-left ${value ? 'text-gray-700' : 'text-gray-300'}`}
      >
        <span>{value || 'Select a service'}</span>
        <MdKeyboardArrowDown
          className={`text-xl text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden='true'
        />
      </button>
      {open && (
        <ul
          role='listbox'
          className='absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden'
        >
          {SERVICES.map((s) => (
            <li key={s} role='option' aria-selected={s === value}>
              <button
                type='button'
                onClick={() => select(s)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                  s === value
                    ? 'text-orange-bg-cta font-medium bg-orange-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ─── Shared form shell (DRY) ──────────────────────────────────────────────────
const PackageFormShell = ({
  heading,
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState(initialValues);

  const handleChange = ({ target: { name, value, type, checked } }) =>
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className='space-y-6 pb-8'>
      {/* Back nav */}
      <button
        type='button'
        onClick={onCancel}
        className='inline-flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-150 group'
      >
        <MdArrowBack
          className='text-base group-hover:-translate-x-0.5 transition-transform duration-150'
          aria-hidden='true'
        />
        Back to Pricing
      </button>

      <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8'>
        <h1 className='text-xl font-bold text-gray-900 mb-6'>{heading}</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className='space-y-4 mb-6'>
            {/* Row 1: Package Name | Price */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label htmlFor='pf-name' className={LABEL_CLS}>
                  Package Name{REQUIRED_STAR}
                </label>
                <input
                  id='pf-name'
                  name='name'
                  type='text'
                  value={form.name}
                  onChange={handleChange}
                  autoComplete='off'
                  placeholder='e.g., Starter, Professional'
                  required
                  className={INPUT_CLS}
                />
              </div>
              <div>
                <label htmlFor='pf-price' className={LABEL_CLS}>
                  Price ($){REQUIRED_STAR}
                </label>
                <input
                  id='pf-price'
                  name='price'
                  type='number'
                  min='0'
                  step='1'
                  value={form.price}
                  onChange={handleChange}
                  required
                  className={INPUT_CLS}
                />
              </div>
            </div>

            {/* Row 2: Service dropdown | Billing Period */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className={LABEL_CLS}>Service{REQUIRED_STAR}</label>
                <ServiceDropdown value={form.service} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor='pf-period' className={LABEL_CLS}>
                  Billing Period{REQUIRED_STAR}
                </label>
                <div className='relative'>
                  <select
                    id='pf-period'
                    name='period'
                    value={form.period}
                    onChange={handleChange}
                    className={`${INPUT_CLS} appearance-none pr-10 cursor-pointer`}
                  >
                    {BILLING_PERIODS.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
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

            {/* Mark as Popular */}
            <label className='flex items-center gap-3 cursor-pointer select-none w-fit'>
              <input
                type='checkbox'
                name='popular'
                checked={form.popular}
                onChange={handleChange}
                className='w-4 h-4 accent-orange-bg-cta rounded cursor-pointer'
              />
              <span className='text-sm font-medium text-gray-700'>
                Mark as Popular Package
              </span>
            </label>

            {/* Description */}
            <div>
              <label htmlFor='pf-tagline' className={LABEL_CLS}>
                Description{REQUIRED_STAR}
              </label>
              <input
                id='pf-tagline'
                name='tagline'
                type='text'
                value={form.tagline}
                onChange={handleChange}
                autoComplete='off'
                placeholder='Brief description of the package'
                required
                className={INPUT_CLS}
              />
            </div>

            {/* Features — one feature per line, split on submit */}
            <div>
              <label htmlFor='pf-features' className={LABEL_CLS}>
                Features{REQUIRED_STAR}
                <span className='ml-1 text-xs font-normal text-gray-400'>
                  (one per line)
                </span>
              </label>
              <textarea
                id='pf-features'
                name='featuresText'
                value={form.featuresText}
                onChange={handleChange}
                rows={6}
                required
                placeholder={
                  'Basic Website Design\nMobile Responsive\nUp to 5 Pages'
                }
                className={`${INPUT_CLS} resize-y`}
              />
            </div>
          </div>

          {/* Form actions */}
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
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

// Thin wrappers — single responsibility, keep PackageFormShell DRY
const AddPackageForm = ({ onCancel, onSubmit }) => (
  <PackageFormShell
    heading='Add New Pricing Package'
    initialValues={{
      name: '',
      tagline: '',
      service: '',
      price: '',
      period: '/month',
      popular: false,
      featuresText: '',
    }}
    submitLabel='Add Package'
    onSubmit={onSubmit}
    onCancel={onCancel}
  />
);

const EditPackageForm = ({ pkg, onCancel, onSubmit }) => (
  <PackageFormShell
    heading='Edit Package'
    initialValues={{
      name: pkg.name,
      tagline: pkg.tagline,
      service: pkg.service || '',
      price: pkg.price,
      period: pkg.period,
      popular: pkg.popular,
      // Convert array to multiline string for the textarea
      featuresText: pkg.features.join('\n'),
    }}
    submitLabel='Update Package'
    onSubmit={onSubmit}
    onCancel={onCancel}
  />
);

// ─── Page component ───────────────────────────────────────────────────────────
export default function Pricing() {
  useEffect(() => {
    document.title = 'Pricing – Maktech Admin';
  }, []);

  // Memoised derived count — avoids recalculation on every render
  const activeCount = useMemo(() => PACKAGES.length, []);

  // State machine: editingPkg (object) → addingPkg (true) → list (both falsy)
  const [editingPkg, setEditingPkg] = useState(null);
  const [addingPkg, setAddingPkg] = useState(false);

  const handleAddSubmit = () => {
    toast.success('Package added successfully!');
    setAddingPkg(false);
  };

  const handleEditSubmit = () => {
    toast.success('Package updated successfully!');
    setEditingPkg(null);
  };

  if (editingPkg)
    return (
      <EditPackageForm
        pkg={editingPkg}
        onCancel={() => setEditingPkg(null)}
        onSubmit={handleEditSubmit}
      />
    );

  if (addingPkg)
    return (
      <AddPackageForm
        onCancel={() => setAddingPkg(false)}
        onSubmit={handleAddSubmit}
      />
    );

  return (
    <div className='space-y-6 pb-8'>
      {/* Page header */}
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div>
          <div className='flex items-center gap-3'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
              Pricing
            </h1>
            <span className='inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-bg-cta text-white text-sm font-bold leading-none'>
              {activeCount}
            </span>
          </div>
          <p className='text-base text-gray-500 mt-1'>
            Manage service packages and pricing
          </p>
        </div>

        <button
          type='button'
          onClick={() => setAddingPkg(true)}
          className='group inline-flex cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
        >
          <MdAdd
            className='text-lg shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
            aria-hidden='true'
          />
          <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
            Add New Package
          </span>
        </button>
      </div>

      {/* pt-4 gives the "Most Popular" -top-4 badge room above the Professional card */}
      <section
        aria-label='Pricing packages'
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4'
      >
        {PACKAGES.map((pkg) => (
          <PricingCard key={pkg.id} pkg={pkg} onEdit={setEditingPkg} />
        ))}
      </section>
    </div>
  );
}
