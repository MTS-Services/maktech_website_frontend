// Old slot-picker flow (commented out — replaced by free date/time picker below)
// import axios from 'axios';
import { useState, useEffect, useMemo, useRef } from 'react';
import CustomSelect from './CustomSelect';
import apiClient from '../services/apiClient';
import { toast } from 'react-toastify';
import {
  MdCalendarToday,
  MdAccessTime,
  MdPublic,
  MdCheckCircle,
  MdEventBusy,
  MdRefresh,
  // MdClose, // used only by the old slot-picker flow
} from 'react-icons/md';
// Old slot-picker flow (commented out)
// import MeetingBookingModal from './MeetingBookingModal';
import {
  // POPULAR_TIMEZONES, // used only by the old slot-picker flow
  getUserTimezone,
  getTimezoneSummary,
  // generateMeetingSlots,
  getLocationFromTimezone,
  zonedDateTimeToIso,
  getNowInputValue,
} from '../utils/timezoneHelper';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    industry: '',
    message: '',
  });

  /* ── Old slot-picker flow (commented out) ──────────────────────────────
  // Calculate smart default date (if past 5 PM BST, default to tomorrow)
  const defaultDateStr = useMemo(() => {
    const now = new Date();
    const bstHour = (now.getUTCHours() + 6) % 24;
    if (bstHour >= 17) {
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      return tomorrow.toISOString().split('T')[0];
    }
    return now.toISOString().split('T')[0];
  }, []);

  const [bookingDate, setBookingDate] = useState(defaultDateStr);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  ─────────────────────────────────────────────────────────────────────── */

  const [visitorTimezone] = useState(() => getUserTimezone());
  const tzSummary = useMemo(() => getTimezoneSummary(visitorTimezone), [visitorTimezone]);

  // Meeting picked freely by the visitor, as wall-clock time in visitorTimezone
  const [meetingLocal, setMeetingLocal] = useState('');
  const minMeetingLocal = getNowInputValue(visitorTimezone);

  const selectedSlot = useMemo(() => {
    const iso = zonedDateTimeToIso(meetingLocal, visitorTimezone);
    if (!iso) return null;
    const date = new Date(iso);
    return {
      iso,
      localDateLabel: new Intl.DateTimeFormat('en-US', {
        timeZone: visitorTimezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(date),
      localTimeLabel: new Intl.DateTimeFormat('en-US', {
        timeZone: visitorTimezone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(date),
    };
  }, [meetingLocal, visitorTimezone]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const formBoxRef = useRef(null);

  useEffect(() => {
    if (submittedBooking) {
      formBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [submittedBooking]);

  /* Old slot-picker flow (commented out)
  // Minimum selectable date is today
  const minDateStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  */

  /* Old slot-picker flow (commented out)
  // Timezone options (ensuring user's detected timezone is included)
  const timezoneOptions = useMemo(() => {
    const exists = POPULAR_TIMEZONES.some((tz) => tz.value === visitorTimezone);
    if (!exists && visitorTimezone) {
      return [{ value: visitorTimezone, label: `${visitorTimezone} (Local detected)` }, ...POPULAR_TIMEZONES];
    }
    return POPULAR_TIMEZONES;
  }, [visitorTimezone]);
  */

  /* ── Old slot-picker flow (commented out) ──────────────────────────────
  // Fetch booked slots from backend
  const fetchBookedSlots = useCallback(async (date) => {
    setLoadingSlots(true);
    try {
      let res;
      try {
        res = await apiClient.get(`/api/v1/leads/booked-slots${date ? `?date=${date}` : ''}`);
      } catch (primaryErr) {
        // If primary remote API fails (e.g. endpoint not deployed yet on production server),
        // fallback to local backend on port 5000 when running in local dev
        if (
          typeof window !== 'undefined' &&
          (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ) {
          try {
            res = await axios.get(`http://localhost:5000/api/v1/leads/booked-slots${date ? `?date=${date}` : ''}`);
          } catch (localErr) {
            throw primaryErr;
          }
        } else {
          throw primaryErr;
        }
      }
      if (res?.data?.success && Array.isArray(res.data.data)) {
        setBookedSlots(res.data.data);
      }
    } catch (err) {
      console.warn('Failed to fetch booked slots:', err);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    fetchBookedSlots(bookingDate);
  }, [bookingDate, fetchBookedSlots]);

  // Compute available slots in visitor's local timezone
  const slots = useMemo(() => {
    return generateMeetingSlots(bookingDate, visitorTimezone, bookedSlots);
  }, [bookingDate, visitorTimezone, bookedSlots]);
  ─────────────────────────────────────────────────────────────────────── */

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* Old slot-picker flow (commented out)
  // Handle slot selection/deselection
  const handleSlotClick = (slot) => {
    if (!slot.isAvailable) return;
    if (selectedSlot?.iso === slot.iso) {
      setSelectedSlot(null); // toggle off
    } else {
      setSelectedSlot(slot);
    }
  };
  */

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    if (meetingLocal && !selectedSlot) {
      toast.error('Please choose a valid meeting date and time');
      return;
    }
    if (selectedSlot && new Date(selectedSlot.iso).getTime() <= Date.now()) {
      toast.error('Please choose a meeting time in the future');
      return;
    }

    setIsSubmitting(true);
    try {
      const effectiveTimezone = visitorTimezone || getUserTimezone();
      const detectedLocation = getLocationFromTimezone(effectiveTimezone);

      const payload = {
        fullName: formData.fullName.trim(),
        companyName: formData.companyName.trim() || undefined,
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        service: formData.service || undefined,
        budget: formData.budget ? Number(formData.budget) : undefined,
        industry: formData.industry.trim() || undefined,
        message: formData.message.trim() || undefined,
        meetingDate: selectedSlot ? selectedSlot.iso : undefined,
        timezone: effectiveTimezone || undefined,
        location: detectedLocation || undefined,
      };

      const res = await apiClient.post('/api/v1/leads', payload);
      if (res.status >= 200 && res.status < 300 && res.data?.success !== false) {
        toast.success(
          selectedSlot
            ? 'Meeting booked & inquiry submitted successfully!'
            : 'Your message has been submitted successfully!'
        );

        setSubmittedBooking({
          lead: res.data?.data ?? payload,
          slot: selectedSlot,
          timezone: visitorTimezone,
        });

        // Reset form inputs
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          phone: '',
          service: '',
          budget: '',
          industry: '',
          message: '',
        });
        setMeetingLocal('');
        // Old slot-picker flow (commented out): refresh booked slots list
        // fetchBookedSlots(bookingDate);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit inquiry. Please try again.';
      toast.error(msg);
      if (err.response?.status === 409) {
        // Exact same time was already taken by another booking
        // fetchBookedSlots(bookingDate);
        setMeetingLocal('');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='w-full relative py-16 xl:py-20 2xl:py-24 overflow-hidden'>
      {/* Background Image */}
      <div
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: 'url(/contact/Frame 2147226071.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3,
        }}
      />

      <div className='container mx-auto px-5 xl:px-8 2xl:px-12 relative z-10'>
        {/* Header */}
        <div className='mb-12 xl:mb-16 text-center'>
          {/* Badge */}
          <div
            className='flex items-center gap-2 px-3 py-1.5 rounded-md w-fit mb-6 mx-auto'
            style={{
              background:
                'linear-gradient(90deg, rgba(46,34,30,0.98) 0%, rgba(38,30,28,0.92) 50%, rgba(28,22,20,0.88) 100%)',
              border: '1px solid rgba(255,255,255,0.03)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
            }}
          >
            <div className='relative flex items-center justify-center w-3.5 h-3.5'>
              <span
                className='absolute w-full h-full rounded-full'
                style={{
                  background:
                    'radial-gradient(circle at 35% 30%, rgba(255,101,51,0.95), rgba(255,101,51,0.6) 40%, rgba(255,101,51,0.25) 70%)',
                }}
              />
              <span
                className='w-2 h-2 rounded-full'
                style={{
                  background: 'linear-gradient(180deg, #ff8a5a, #ff6533)',
                }}
              />
            </div>
            <span className='text-base font-medium text-white'>
              Let&apos;s talk
            </span>
          </div>

          {/* Heading */}
          <h2 className='text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-4 leading-tight text-white'>
            Ready to scale? Let&apos;s talk.
          </h2>

          {/* Subheading */}
          <p className='text-[#AAAAAA] text-sm xl:text-lg max-w-3xl mx-auto'>
            If you are seeking more than short-term output and instead want a
            coordinated digital structure capable of growing with your business,
            the conversation is worth starting.
          </p>
        </div>

        {/* Contact Form Container */}
        <div className='container mx-auto relative'>
          {/* Orange Gradient Background Glow */}
          <div
            className='absolute inset-0 -z-10'
            style={{
              background:
                'radial-gradient(circle at center, rgba(254, 101, 51, 0.15), transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Outer Wrapper Box */}
          <div
            className='p-5 md:p-6 xl:p-8 rounded-2xl'
            style={{
              backgroundColor: 'rgba(66, 66, 66, 0.2)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8'>
              {/* Left Side - Company Info Box */}
              <div
                className='p-5 md:p-8 xl:p-10 rounded-xl'
                style={{
                  backgroundColor: 'rgba(66, 66, 66, 0.2)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Company Description */}
                <div className='mb-10'>
                  <h3 className='text-2xl xl:text-3xl font-semibold text-white mb-3 leading-tight'>
                    Designing Experiences That Drive Growth
                  </h3>
                  <p className='text-[#AAAAAA] text-sm md:text-base lg:text-lg'>
                    We&apos;re a digital-first team helping businesses build
                    meaningful, scalable digital solutions worldwide.
                  </p>
                </div>

                {/* Contact Details */}
                <div className='space-y-4'>
                  {/* Email */}
                  <div className='flex items-start gap-4 p-4 rounded-lg bg-[#3F3F3F] border border-white/10'>
                    <div className='shrink-0 mt-1'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          x='3'
                          y='5'
                          width='18'
                          height='14'
                          rx='2'
                          stroke='white'
                          strokeWidth='1.5'
                        />
                        <path
                          d='M3 7L12 13L21 7'
                          stroke='white'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                    <div>
                      <p className='text-white font-medium text-base md:text-lg mb-1'>
                        Email us
                      </p>
                      <p className='text-[#AAAAAA] text-sm md:text-base'>
                        info@maktechgroup.com
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className='flex items-start gap-4 p-4 rounded-lg bg-[#3F3F3F] border border-white/10'>
                    <div className='shrink-0 mt-1'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'
                          stroke='white'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                    <div>
                      <p className='text-white font-medium text-base md:text-lg mb-1'>
                        Call on
                      </p>
                      <p className='text-[#AAAAAA] text-sm md:text-base'>
                        +880 1897-669234
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className='flex items-start gap-4 p-4 rounded-lg bg-[#3F3F3F] border border-white/10'>
                    <div className='shrink-0 mt-1'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'
                          stroke='white'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <circle
                          cx='12'
                          cy='10'
                          r='3'
                          stroke='white'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                    <div>
                      <p className='text-white font-medium text-base md:text-lg mb-1'>
                        Location
                      </p>
                      <p className='text-[#AAAAAA] text-sm md:text-base'>
                        8th Floor, A, Majid Tower, Ka-24 Progati Sarani Rd,
                        Dhaka 1229
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form Box */}
              <div
                ref={formBoxRef}
                className='p-5 md:p-8 xl:p-10 rounded-xl'
                style={{
                  backgroundColor: 'rgba(66, 66, 66, 0.2)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {submittedBooking ? (
                  /* Success Confirmation Screen */
                  <div className='py-8 text-center space-y-5 animate-in fade-in duration-300'>
                    <div className='w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl border border-emerald-500/30'>
                      <MdCheckCircle />
                    </div>
                    <div>
                      <h3 className='text-2xl font-bold text-white'>
                        {submittedBooking.slot
                          ? 'Meeting Booked Successfully!'
                          : 'Thank You! Your Message Has Been Sent.'}
                      </h3>
                      <p className='text-sm text-gray-300 mt-2 max-w-md mx-auto'>
                        Thank you <span className='font-semibold text-white'>{submittedBooking.lead?.fullName}</span>. We have received your inquiry and will reach out to you shortly at <span className='text-[#ff8a5a] font-medium'>{submittedBooking.lead?.email}</span>.
                      </p>
                    </div>

                    {submittedBooking.slot && (
                      <div className='p-5 rounded-xl bg-white/5 border border-white/10 text-left space-y-2.5 max-w-md mx-auto'>
                        <div className='flex items-center gap-2 text-xs font-bold text-[#ff6533] uppercase tracking-wider'>
                          <MdCalendarToday />
                          <span>Confirmed Meeting Schedule</span>
                        </div>
                        <div className='text-sm text-white pt-1 space-y-1.5'>
                          <p>
                            <span className='text-gray-400 text-xs block'>Your Local Time:</span>
                            <span className='font-bold text-base text-white'>{submittedBooking.slot.localDateLabel} at {submittedBooking.slot.localTimeLabel}</span>{' '}
                            <span className='text-xs text-gray-400'>({submittedBooking.timezone})</span>
                          </p>
                          <p className='pt-0.5 text-xs text-emerald-400/90'>
                            &bull; Meeting invitation and calendar invite will be sent to your email.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className='pt-3'>
                      <button
                        type='button'
                        onClick={() => setSubmittedBooking(null)}
                        className='px-6 py-2.5 rounded-full bg-orange-bg-cta hover:bg-[#e5501a] text-white text-xs font-bold shadow-md transition cursor-pointer'
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className='space-y-5'>
                    {/* Full Name */}
                    <div>
                      <label className='text-white-bg-cta text-base md:text-lg mb-2 block'>
                        Full Name <span className='text-red-400'>*</span>
                      </label>
                      <input
                        type='text'
                        name='fullName'
                        required
                        placeholder='Full Name'
                        value={formData.fullName}
                        onChange={handleChange}
                        className='w-full px-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-bg-cta transition-colors duration-200'
                      />
                    </div>

                    {/* Company Name and Email */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                      <div>
                        <label className='text-white-bg-cta text-base md:text-lg mb-2 block'>
                          Company Name
                        </label>
                        <input
                          type='text'
                          name='companyName'
                          placeholder='Company Name'
                          value={formData.companyName}
                          onChange={handleChange}
                          className='w-full px-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-bg-cta transition-colors duration-200'
                        />
                      </div>
                      <div>
                        <label className='text-white-bg-cta text-base md:text-lg mb-2 block'>
                          Email <span className='text-red-400'>*</span>
                        </label>
                        <input
                          type='email'
                          name='email'
                          required
                          placeholder='Email Address'
                          value={formData.email}
                          onChange={handleChange}
                          className='w-full px-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-bg-cta transition-colors duration-200'
                        />
                      </div>
                    </div>

                    {/* Phone and Service */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                      <div>
                        <label className='text-white-bg-cta text-base md:text-lg mb-2 block'>
                          Phone / WhatsApp
                        </label>
                        <input
                          type='tel'
                          name='phone'
                          placeholder='+1 234 567 8900'
                          value={formData.phone}
                          onChange={handleChange}
                          className='w-full px-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-bg-cta transition-colors duration-200'
                        />
                      </div>
                      <div>
                        <label className='text-white-bg-cta text-base md:text-lg mb-2 block'>
                          Service
                        </label>
                        <CustomSelect
                          name='service'
                          value={formData.service}
                          onChange={handleChange}
                          placeholder='Select Service'
                          options={[
                            { value: 'ui-ux', label: 'UI/UX Design' },
                            { value: 'mern', label: 'MERN Stack Development' },
                            {
                              value: 'application',
                              label: 'Application Development',
                            },
                            {
                              value: 'ecommerce',
                              label: 'E-Commerce Development',
                            },
                            { value: 'marketing', label: 'Digital Marketing' },
                            {
                              value: 'wordpress',
                              label: 'WordPress Development',
                            },
                            { value: 'shopify', label: 'Shopify Development' },
                            { value: 'wix', label: 'WIX Development' },
                            { value: 'graphic', label: 'Graphic Design' },
                            { value: 'other', label: 'Other' },
                          ]}
                        />
                      </div>
                    </div>

                    {/* Budget and Industry */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                      <div>
                        <label className='text-white-bg-cta text-base md:text-lg mb-2 block'>
                          Budget ($ USD)
                        </label>
                        <div className='relative'>
                          <span className='absolute left-4 top-1/2 -translate-y-1/2 text-white pointer-events-none'>
                            $
                          </span>
                          <input
                            type='number'
                            name='budget'
                            placeholder='e.g. 5000'
                            value={formData.budget}
                            onChange={handleChange}
                            className='w-full pl-8 pr-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-bg-cta transition-colors duration-200'
                          />
                        </div>
                      </div>
                      <div>
                        <label className='text-white-bg-cta text-base md:text-lg mb-2 block'>
                          Industry
                        </label>
                        <input
                          type='text'
                          name='industry'
                          placeholder='e.g. Fintech, Healthcare, Retail'
                          value={formData.industry}
                          onChange={handleChange}
                          className='w-full px-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-bg-cta transition-colors duration-200'
                        />
                      </div>
                    </div>

                    {/* ─── Old slot-picker flow (commented out): MEETING & CONSULTATION BOOKING TRIGGER ───
                    <div>
                      <div className='flex items-center justify-between mb-2'>
                        <label className='text-white-bg-cta text-base md:text-lg block'>
                          Meeting &amp; Consultation <span className='text-xs text-gray-400 font-normal'>(Optional)</span>
                        </label>
                        {selectedSlot && (
                          <button
                            type='button'
                            onClick={() => setSelectedSlot(null)}
                            className='text-xs text-rose-400 hover:text-rose-300 underline cursor-pointer'
                          >
                            Remove Meeting
                          </button>
                        )}
                      </div>

                      {!selectedSlot ? (
                        <button
                          type='button'
                          onClick={() => setIsMeetingModalOpen(true)}
                          className='w-full px-3.5 sm:px-4 py-3 bg-[#3F3F3F] hover:bg-[#474747] border border-white/10 hover:border-[#ff6533] rounded-lg text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 group shadow-xs focus:outline-none focus:border-orange-bg-cta'
                        >
                          <div className='flex items-center gap-2.5 min-w-0 flex-1'>
                            <MdCalendarToday className='text-[#ff6533] text-lg sm:text-xl shrink-0' />
                            <span className='text-xs sm:text-base font-medium text-gray-300 group-hover:text-white truncate'>
                              Select Meeting Date &amp; Time
                            </span>
                          </div>
                          <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#ff6533]/15 text-[#ff8a5a] text-xs font-semibold border border-[#ff6533]/30 group-hover:bg-[#ff6533] group-hover:text-white transition-all shrink-0'>
                            <span>Pick Slot</span>
                            <span aria-hidden='true'>&rarr;</span>
                          </span>
                        </button>
                      ) : (
                        <div className='p-3 sm:p-3.5 bg-gradient-to-r from-orange-500/15 via-[#ff6533]/10 to-transparent border border-[#ff6533]/40 rounded-lg flex items-center justify-between gap-2.5 shadow-md'>
                          <div className='flex items-center gap-2.5 min-w-0 flex-1'>
                            <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#ff6533] text-white flex items-center justify-center text-base sm:text-lg shrink-0 shadow-sm'>
                              <MdCalendarToday />
                            </div>
                            <div className='min-w-0 flex-1'>
                              <p className='text-xs sm:text-sm font-bold text-white leading-snug truncate'>
                                {selectedSlot.localDateLabel} &bull; {selectedSlot.localTimeLabel}
                              </p>
                              <p className='text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate'>
                                {tzSummary.cityName} Time &bull; Auto-adjusted
                              </p>
                            </div>
                          </div>

                          <div className='flex items-center gap-1.5 shrink-0'>
                            <button
                              type='button'
                              onClick={() => setIsMeetingModalOpen(true)}
                              className='px-2.5 py-1 rounded-md bg-white/10 hover:bg-[#ff6533] text-white text-xs font-semibold transition cursor-pointer'
                            >
                              Change
                            </button>
                            <button
                              type='button'
                              onClick={() => setSelectedSlot(null)}
                              title='Remove meeting'
                              className='p-1 rounded-md text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer'
                            >
                              <MdClose className='text-base' />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    ─── end of old slot-picker flow ─── */}

                    {/* Meeting & Consultation: any date/time in the visitor's own timezone */}
                    <div>
                      <div className='flex items-center justify-between mb-2'>
                        <label
                          htmlFor='meetingLocal'
                          className='text-white-bg-cta text-base md:text-lg block'
                        >
                          Meeting &amp; Consultation <span className='text-xs text-gray-400 font-normal'>(Optional)</span>
                        </label>
                        {meetingLocal && (
                          <button
                            type='button'
                            onClick={() => setMeetingLocal('')}
                            className='text-xs text-rose-400 hover:text-rose-300 underline cursor-pointer'
                          >
                            Remove Meeting
                          </button>
                        )}
                      </div>

                      <div className='relative'>
                        <MdCalendarToday className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#ff6533]' />
                        <input
                          id='meetingLocal'
                          type='datetime-local'
                          value={meetingLocal}
                          min={minMeetingLocal}
                          onChange={(e) => setMeetingLocal(e.target.value)}
                          onClick={(e) => {
                            try {
                              e.currentTarget.showPicker?.();
                            } catch {
                              // showPicker can throw outside a user gesture; native behaviour still applies
                            }
                          }}
                          className='w-full cursor-pointer pl-11 pr-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white [color-scheme:dark] focus:outline-none focus:border-orange-bg-cta transition-colors duration-200'
                        />
                      </div>

                      <p className='mt-2 flex items-center gap-1.5 text-xs text-gray-400'>
                        <MdPublic className='shrink-0 text-sm text-[#ff6533]' />
                        {selectedSlot ? (
                          <span>
                            Your time: <span className='text-white'>{selectedSlot.localDateLabel}, {selectedSlot.localTimeLabel}</span> ({tzSummary.label})
                          </span>
                        ) : (
                          <span>Pick any date &amp; time that suits you, in your own time ({tzSummary.label}).</span>
                        )}
                      </p>
                    </div>

                    {/* Message */}
                    <div>
                      <label className='text-white-bg-cta text-base md:text-lg mb-2 block'>
                        Message
                      </label>
                      <textarea
                        name='message'
                        placeholder='Tell us about your project goals and requirements...'
                        value={formData.message}
                        onChange={handleChange}
                        rows='3'
                        className='w-full px-4 py-3 bg-[#3F3F3F] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-bg-cta transition-colors duration-200 resize-none'
                      />
                    </div>

                    {/* Submit Button */}
                    <div className='pt-2'>
                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className={`relative z-10 group inline-flex items-center gap-3 overflow-hidden bg-orange-bg-cta hover:bg-[#e5501a] hover:shadow-[0_4px_20px_rgba(255,101,51,0.45)] text-white font-semibold rounded-full transition-all duration-200 active:scale-[0.97] cursor-pointer ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        style={{ padding: '13px 28px' }}
                      >
                        {isSubmitting ? (
                          <span className='inline-flex items-center gap-2'>
                            <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                            <span>Submitting...</span>
                          </span>
                        ) : (
                          <>
                            <span className='inline-block -translate-x-0.5 transition-transform duration-300 ease-out delay-75 group-hover:translate-x-0'>
                              {selectedSlot ? 'Book Meeting & Submit' : 'Let’s Start'}
                            </span>
                            <span
                              className='w-7 h-7 flex items-center justify-center rounded-full bg-white shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
                              aria-hidden='true'
                            >
                              <svg
                                width='14'
                                height='14'
                                viewBox='0 0 16 16'
                                fill='none'
                                stroke='black'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                aria-hidden='true'
                              >
                                <path d='M3 8h10M9 4l4 4-4 4' />
                              </svg>
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Old slot-picker flow (commented out): Meeting Booking Modal
      <MeetingBookingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        initialSlot={selectedSlot}
        onConfirmSlot={(slot) => setSelectedSlot(slot)}
        bookingDate={bookingDate}
        setBookingDate={setBookingDate}
        minDateStr={minDateStr}
        visitorTimezone={visitorTimezone}
        setVisitorTimezone={setVisitorTimezone}
        timezoneOptions={timezoneOptions}
        tzSummary={tzSummary}
        slots={slots}
        loadingSlots={loadingSlots}
      />
      */}
    </section>
  );
};

export default ContactUs;
