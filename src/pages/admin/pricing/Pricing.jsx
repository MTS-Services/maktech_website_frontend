import { useEffect, useMemo, useState } from 'react';
import {
  MdAdd,
  MdEdit,
  MdArrowBack,
  MdCheck,
  MdKeyboardArrowDown,
} from 'react-icons/md';
import { toast } from 'react-toastify';

// ─── Static package data ──────────────────────────────────────────────────────
const PACKAGES = [
  {
    id: 1,
    name: 'Starter',
    tagline: 'Perfect for small businesses and startups',
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

const BILLING_PERIODS = ['/month', '/year', '/project', '/hour'];

// Comma-format price with $ prefix: 25000 → "$25,000"
const formatPrice = (n) => `$${Number(n).toLocaleString('en-US')}`;

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
  // No overflow-hidden — the "Most Popular" badge sits above the card boundary
  <article
    className={`relative flex flex-col bg-white rounded-2xl shadow-sm px-6 py-8 ${
      pkg.popular ? 'border-2 border-orange-bg-cta' : 'border border-gray-100'
    }`}
  >
    {/* Overflowing badge — absolute, centered at top edge */}
    {pkg.popular && (
      <div className='absolute -top-4 left-1/2 -translate-x-1/2 z-10'>
        <span className='inline-block bg-orange-bg-cta text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap tracking-wide'>
          Most Popular
        </span>
      </div>
    )}

    <div className='flex-1'>
      <h2 className='text-xl font-bold text-gray-900 mb-1'>{pkg.name}</h2>
      <p className='text-sm text-gray-500 mb-5'>{pkg.tagline}</p>

      {/* Price — large bold number + smaller period suffix */}
      <div className='flex items-baseline gap-0.5 mb-6'>
        <span className='text-3xl sm:text-4xl font-extrabold text-gray-900 leading-none'>
          {formatPrice(pkg.price)}
        </span>
        <span className='text-base text-gray-400 ml-1'>{pkg.period}</span>
      </div>

      {/* Feature checklist */}
      <ul role='list' className='space-y-2.5 mb-8'>
        {pkg.features.map((feature, i) => (
          <li
            key={i}
            className='flex items-center gap-2.5 text-sm text-gray-700'
          >
            <MdCheck
              className='text-green-500 text-base shrink-0'
              aria-hidden='true'
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>

    {/* Edit CTA — orange for popular, gray for others */}
    <button
      type='button'
      onClick={() => onEdit(pkg)}
      aria-label={`Edit ${pkg.name} package`}
      className={`group w-full inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
        pkg.popular
          ? 'bg-orange-bg-cta text-white hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)]'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
  </article>
);

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
            {/* Package Name */}
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
                required
                className={INPUT_CLS}
              />
            </div>

            {/* Tagline */}
            <div>
              <label htmlFor='pf-tagline' className={LABEL_CLS}>
                Tagline / Subtitle{REQUIRED_STAR}
              </label>
              <input
                id='pf-tagline'
                name='tagline'
                type='text'
                value={form.tagline}
                onChange={handleChange}
                autoComplete='off'
                required
                className={INPUT_CLS}
              />
            </div>

            {/* Price + Billing period — responsive 2-col on sm+ */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
              <div>
                <label htmlFor='pf-period' className={LABEL_CLS}>
                  Billing Period
                </label>
                <div className='relative'>
                  <select
                    id='pf-period'
                    name='period'
                    value={form.period}
                    onChange={handleChange}
                    className={`${INPUT_CLS} appearance-none pr-10 cursor-pointer`}
                  >
                    {BILLING_PERIODS.map((p) => (
                      <option key={p} value={p}>
                        {p}
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

            {/* Most Popular checkbox */}
            <label className='flex items-center gap-3 cursor-pointer select-none w-fit'>
              <input
                type='checkbox'
                name='popular'
                checked={form.popular}
                onChange={handleChange}
                className='w-4 h-4 accent-orange-bg-cta rounded cursor-pointer'
              />
              <span className='text-sm font-medium text-gray-700'>
                Mark as Most Popular
              </span>
            </label>
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
    heading='Add New Package'
    initialValues={{
      name: '',
      tagline: '',
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
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
            Pricing
          </h1>
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

      {/* Stat card — full width */}
      <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6'>
        <p className='text-sm font-medium text-gray-500 mb-2'>
          Active Pricing Packages
        </p>
        <p className='text-4xl font-bold text-gray-900'>{activeCount}</p>
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
