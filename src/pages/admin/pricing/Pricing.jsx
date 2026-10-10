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
  MdDelete,
  MdClose
} from 'react-icons/md';
import { toast } from 'react-toastify';
import * as MdIcons from 'react-icons/md';
import { IconPickerModal } from '../../../components/IconPickerModal/IconPickerModal';
import apiClient from '../../../services/apiClient';

const BILLING_PERIODS = [
  { value: 'MONTHLY', label: 'Per month' },
  { value: 'YEARLY', label: 'Per year' },
  { value: 'ONETIME', label: 'One-time' },
];

const SERVICES = [
  'MERN STACK Development',
  'UI/UX Design',
  'Flutter App Development',
  'eCommerce Development',
  'Digital Marketing',
  'Laravel Development',
];

const formatPrice = (n) => `$${Number(n).toLocaleString('en-US')}`;
const renderPeriod = (period) => {
  if (period === 'MONTHLY') return '/month';
  if (period === 'YEARLY') return '/year';
  if (period === 'ONETIME') return '';
  return '';
};

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

const LABEL_CLS = 'block text-sm font-medium text-gray-600 mb-1.5';
const INPUT_CLS =
  'w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition';
const REQUIRED_STAR = (
  <span className='text-red-500 ml-0.5' aria-hidden='true'>
    *
  </span>
);

const PricingCard = ({ pkg, onEdit, onDelete, onView }) => (
  <article
    onClick={() => onView(pkg.id)}
    className={`relative flex flex-col bg-white rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
      pkg.isPopular
        ? 'border-2 border-orange-bg-cta shadow-[0_8px_32px_rgba(255,101,51,0.18)]'
        : 'border border-gray-100 shadow-sm hover:shadow-md'
    }`}
  >
    {pkg.isPopular && (
      <div className='absolute -top-4.5 left-1/2 -translate-x-1/2 z-10'>
        <span className='inline-flex items-center gap-1.5 bg-orange-bg-cta text-white text-xs font-bold px-5 py-2 rounded-full whitespace-nowrap tracking-widest uppercase shadow-[0_4px_12px_rgba(255,101,51,0.38)]'>
          <MdRocketLaunch className='text-sm shrink-0' aria-hidden='true' />
          Most Popular
        </span>
      </div>
    )}

    <div
      className={`px-6 pt-10 pb-6 rounded-t-2xl ${
        pkg.isPopular ? 'bg-linear-to-br from-orange-50 via-white to-white' : ''
      }`}
    >
      <h2 className='text-xl font-bold text-gray-900 mb-2'>{pkg.name}</h2>
      {pkg.service && (
        <span
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
            pkg.isPopular
              ? 'bg-orange-bg-cta text-white'
              : 'bg-orange-50 text-orange-bg-cta border border-orange-100'
          }`}
        >
          {pkg.service}
        </span>
      )}
      <p className='text-sm text-gray-500 leading-relaxed'>{pkg.description}</p>
    </div>

    <div className='px-6 py-5 border-t border-gray-100'>
      <div className='flex items-end gap-1.5'>
        <span className='text-4xl font-bold tracking-tight text-gray-900 leading-none'>
          {formatPrice(pkg.price)}
        </span>
        <span className='text-sm text-gray-500 font-medium pb-1'>{renderPeriod(pkg.billingCycle)}</span>
      </div>
    </div>

    <div className='px-6 pb-6 flex-1'>
      <ul role='list' className='space-y-3 border-t border-gray-100 pt-5'>
        {(pkg.features || []).map((feature, i) => {
          const Icon = feature.isIncluded ? (MdIcons[feature.icon] || MdIcons.MdCheck) : MdIcons.MdClose;
          return (
            <li
              key={feature.id || i}
              className={`flex items-center gap-3 text-sm ${feature.isIncluded ? 'text-gray-600' : 'text-gray-400 line-through'}`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  feature.isIncluded
                    ? pkg.isPopular
                      ? 'bg-orange-50 text-orange-bg-cta'
                      : 'bg-gray-50 text-gray-500'
                    : 'bg-gray-50 text-gray-300'
                }`}
              >
                <Icon className='text-xs' aria-hidden='true' />
              </span>
              {feature.name}
            </li>
          );
        })}
      </ul>
    </div>

    <div className='px-6 pb-6 flex items-center gap-3'>
      <button
        type='button'
        onClick={(e) => { e.stopPropagation(); onEdit(pkg); }}
        aria-label={`Edit ${pkg.name} package`}
        className={`group flex-1 inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
          pkg.isPopular
            ? 'bg-orange-bg-cta text-white shadow-[0_4px_14px_rgba(255,101,51,0.3)] hover:bg-[#e5501a] hover:shadow-[0_6px_20px_rgba(255,101,51,0.45)]'
            : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
        }`}
      >
        <MdEdit
          className='text-base shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
          aria-hidden='true'
        />
        <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
          Edit
        </span>
      </button>
      
      <button
        type='button'
        onClick={(e) => { e.stopPropagation(); onDelete(pkg); }}
        aria-label={`Delete ${pkg.name} package`}
        className='p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer'
      >
        <MdDelete size={20} />
      </button>
    </div>
  </article>
);

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

const PackageFormShell = ({
  heading,
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
  onDelete,
  isEditing,
}) => {
  const [form, setForm] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [iconPickerTarget, setIconPickerTarget] = useState(null);

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...form.features];
    newFeatures[index][field] = value;
    setForm({ ...form, features: newFeatures });
  };

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, { name: '', isIncluded: true, icon: 'MdCheck' }] });
  };

  const removeFeature = (index) => {
    const newFeatures = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: newFeatures });
  };

  const handleChange = ({ target: { name, value, type, checked } }) =>
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      
      const payload = {
        name: form.name,
        service: form.service,
        description: form.tagline,
        price: parseInt(form.price, 10),
        billingCycle: form.period,
        isPopular: form.popular,
        features: form.features
          .filter(f => f.name.trim() !== '')
          .map((f, i) => ({
            name: f.name.trim(),
            isIncluded: f.isIncluded,
            icon: f.icon || 'MdCheck',
            order: i + 1
          }))
      };

      await onSubmit(payload);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='space-y-6 pb-8'>
      <button
        type='button'
        onClick={onCancel}
        className='inline-flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors'
      >
        <MdArrowBack className='text-lg' aria-hidden='true' />
        Back to Pricing
      </button>

      <div className='bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm'>
        <div className='mb-8 flex justify-between items-center'>
          <div>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>
              {heading}
            </h2>
            <p className='text-sm text-gray-500 mt-1'>
              Fill in the details for this pricing package
            </p>
          </div>
          
        </div>

        <form onSubmit={handleSubmit} className='space-y-8'>
          <div className='space-y-6 w-full'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
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
                  placeholder='e.g. Starter'
                  required
                  className={INPUT_CLS}
                />
              </div>
              <div>
                <label htmlFor='pf-service' className={LABEL_CLS}>
                  Service Category{REQUIRED_STAR}
                </label>
                <ServiceDropdown value={form.service} onChange={handleChange} />
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div>
                <label htmlFor='pf-price' className={LABEL_CLS}>
                  Price (USD){REQUIRED_STAR}
                </label>
                <input
                  id='pf-price'
                  name='price'
                  type='number'
                  min='0'
                  value={form.price}
                  onChange={handleChange}
                  autoComplete='off'
                  placeholder='25000'
                  required
                  className={INPUT_CLS}
                />
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

            <div>
              <label className={LABEL_CLS}>
                Features{REQUIRED_STAR}
              </label>
              <div className='space-y-3'>
                {form.features.map((feature, index) => (
                  <div key={index} className='flex flex-col sm:flex-row sm:items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100'>
                    <div className='flex-1 flex items-center'>
                      <button
                        type='button'
                        onClick={() => setIconPickerTarget(index)}
                        className='p-2 mr-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center shrink-0 w-11 h-11 cursor-pointer transition-colors'
                        title='Choose Icon'
                      >
                        {(() => { const SelectedIcon = MdIcons[feature.icon] || MdIcons.MdCheck; return <SelectedIcon className='text-xl text-gray-600' />; })()}
                      </button>
                      <input
                        type='text'
                        value={feature.name}
                        onChange={(e) => handleFeatureChange(index, 'name', e.target.value)}
                        placeholder='e.g. Basic Website Design'
                        required
                        className={INPUT_CLS}
                      />
                    </div>
                    <div className='flex items-center gap-3 shrink-0'>
                      <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={feature.isIncluded}
                          onChange={(e) => handleFeatureChange(index, 'isIncluded', e.target.checked)}
                          className='w-4 h-4 accent-emerald-500 rounded cursor-pointer'
                        />
                        <span className='text-sm font-medium text-gray-700 w-16'>Included</span>
                      </label>
                      <button
                        type='button'
                        onClick={() => removeFeature(index)}
                        className='p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer'
                        title='Remove Feature'
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type='button'
                onClick={addFeature}
                className='mt-3 flex items-center gap-2 text-sm font-medium text-orange-bg-cta hover:text-[#e5501a] transition-colors cursor-pointer'
              >
                <MdAdd size={18} />
                Add Feature
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='group inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed'
            >
              <MdCheck
                className='text-base shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
                aria-hidden='true'
              />
              <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
                {isSubmitting ? 'Saving...' : submitLabel}
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
        <IconPickerModal
          isOpen={iconPickerTarget !== null}
          onClose={() => setIconPickerTarget(null)}
          onSelect={(iconName) => {
            if (iconPickerTarget !== null) {
              handleFeatureChange(iconPickerTarget, 'icon', iconName);
              setIconPickerTarget(null);
            }
          }}
        />
      </div>
    </div>
  );
};

export default function Pricing() {
  useEffect(() => {
    document.title = 'Pricing – Maktech Admin';
  }, []);

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPkg, setEditingPkg] = useState(null);
  const [addingPkg, setAddingPkg] = useState(false);
  const [viewingPkg, setViewingPkg] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  const handleView = async (id) => {
    try {
      setViewLoading(true);
      const res = await apiClient.get(`/api/v1/pricing/${id}`);
      setViewingPkg(res.data.data);
    } catch (err) {
      toast.error('Failed to load package details');
    } finally {
      setViewLoading(false);
    }
  };

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/api/v1/pricing');
      const sortedPackages = res.data.data.sort((a, b) => a.price - b.price);
      setPackages(sortedPackages);
    } catch (err) {
      toast.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const activeCount = packages.length;

  const handleAddSubmit = async (payload) => {
    try {
      await apiClient.post('/api/v1/pricing', payload);
      toast.success('Package added successfully!');
      setAddingPkg(false);
      fetchPackages();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add package');
      throw err;
    }
  };

  const handleEditSubmit = async (payload) => {
    try {
      await apiClient.patch(`/api/v1/pricing/${editingPkg.id}`, payload);
      toast.success('Package updated successfully!');
      setEditingPkg(null);
      fetchPackages();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update package');
      throw err;
    }
  };

  const handleDelete = async (pkgToDelete) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await apiClient.delete(`/api/v1/pricing/${pkgToDelete.id}`);
        toast.success('Package deleted successfully!');
        setEditingPkg(null);
        fetchPackages();
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete package');
      }
    }
  };

  if (viewingPkg) {
    return (
      <div className='space-y-6 pb-8'>
        <button
          type='button'
          onClick={() => setViewingPkg(null)}
          className='inline-flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors'
        >
          <MdArrowBack className='text-lg' aria-hidden='true' />
          Back to Pricing
        </button>

        <div className='bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm'>
          <div className='mb-8 flex justify-between items-start'>
            <div>
              <div className='flex items-center gap-3 mb-2'>
                <h2 className='text-2xl sm:text-3xl font-bold text-gray-900'>
                  {viewingPkg.name}
                </h2>
                {viewingPkg.isPopular && (
                  <span className='inline-flex items-center gap-1 bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase'>
                    <MdRocketLaunch className='text-sm' />
                    Popular
                  </span>
                )}
              </div>
              <p className='text-gray-500'>{viewingPkg.description}</p>
            </div>
            
            <div className='text-right'>
              <div className='text-3xl font-bold text-gray-900'>
                {formatPrice(viewingPkg.price)}
              </div>
              <div className='text-sm text-gray-500 font-medium'>
                {renderPeriod(viewingPkg.billingCycle)}
              </div>
            </div>
          </div>
          
          <div className='mb-6 border-t border-gray-100 pt-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Service Category</h3>
            <span className='inline-block bg-orange-50 text-orange-bg-cta border border-orange-100 text-sm font-semibold px-4 py-2 rounded-full'>
              {viewingPkg.service}
            </span>
          </div>

          <div className='border-t border-gray-100 pt-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Included Features</h3>
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {(viewingPkg.features || []).map((feature, i) => {
                const Icon = feature.isIncluded ? (MdIcons[feature.icon] || MdIcons.MdCheck) : MdIcons.MdClose;
                return (
                  <li key={feature.id || i} className={`flex items-center gap-3 p-3 rounded-lg ${feature.isIncluded ? 'bg-gray-50' : 'bg-gray-50/50'}`}>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${feature.isIncluded ? 'bg-white text-orange-bg-cta' : 'bg-gray-100 text-gray-400'}`}>
                      <Icon className='text-base' aria-hidden='true' />
                    </span>
                    <span className={`font-medium ${feature.isIncluded ? 'text-gray-700' : 'text-gray-400 line-through'}`}>{feature.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div className='mt-8 pt-6 border-t border-gray-100 text-sm text-gray-400'>
            <p>Created: {new Date(viewingPkg.createdAt).toLocaleString()}</p>
            <p>Last Updated: {new Date(viewingPkg.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    );
  }

  if (editingPkg)

    return (
      <PackageFormShell
        heading='Edit Package'
        isEditing={true}
        initialValues={{
          name: editingPkg.name,
          tagline: editingPkg.description || '',
          service: editingPkg.service || '',
          price: editingPkg.price,
          period: editingPkg.billingCycle || 'ONETIME',
          popular: editingPkg.isPopular || false,
          features: editingPkg.features?.map(f => ({ name: f.name, isIncluded: f.isIncluded ?? true, icon: f.icon || 'MdCheck' })) || [{ name: '', isIncluded: true }],
        }}
        submitLabel='Update Package'
        onSubmit={handleEditSubmit}
        onCancel={() => setEditingPkg(null)}
        onDelete={handleDelete}
      />
    );

  if (addingPkg)
    return (
      <PackageFormShell
        heading='Add New Pricing Package'
        isEditing={false}
        initialValues={{
          name: '',
          tagline: '',
          service: '',
          price: '',
          period: 'ONETIME',
          popular: false,
          features: [{ name: '', isIncluded: true, icon: 'MdCheck' }],
        }}
        submitLabel='Add Package'
        onSubmit={handleAddSubmit}
        onCancel={() => setAddingPkg(false)}
      />
    );

  return (
    <div className='space-y-6 pb-8'>
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

      {viewLoading && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/20 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <section
          aria-label='Pricing packages'
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4'
        >
          {packages.map((pkg) => (
            <PricingCard key={pkg.id} pkg={pkg} onEdit={setEditingPkg} onDelete={handleDelete} onView={handleView} />
          ))}
        </section>
      )}
    </div>
  );
}
