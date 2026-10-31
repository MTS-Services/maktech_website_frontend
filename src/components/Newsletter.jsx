import { useState } from 'react';
import { toast } from 'react-toastify';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    // Simulate subscription API request
    setTimeout(() => {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <section
      aria-label='Newsletter subscription'
      className='relative overflow-hidden bg-[#161616] py-14 md:py-20 lg:py-24'
    >
      {/* Background vertical grid lines matching site theme */}
      <div
        className='absolute inset-0 pointer-events-none overflow-hidden z-0'
        aria-hidden='true'
      >
        {[12, 30, 50, 68, 88].map((pos) => (
          <div
            key={pos}
            className='absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent'
            style={{ left: `${pos}%` }}
          />
        ))}
      </div>

      <div className='relative z-10 max-w-5xl mx-auto px-4 sm:px-6'>
        {/* Main Newsletter Card with Clean Dark Background */}
        <div
          className='relative rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden px-6 py-14 md:py-20 text-center shadow-2xl bg-[#0e0e0e]'
        >
          {/* Subtle top ambient glow */}
          <div
            className='absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 pointer-events-none'
            style={{
              background:
                'radial-gradient(ellipse at top, rgba(255, 101, 51, 0.08), transparent 70%)',
            }}
            aria-hidden='true'
          />

          <h2 className='relative z-10 text-white text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight mb-3'>
            Subscribe to our newsletter
          </h2>

          <p className='relative z-10 text-[#A0A0A0] text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal'>
            Stay updated with the latest tech trends, AI tools, and business tips.
          </p>

          <form
            onSubmit={handleSubmit}
            className='relative z-10 max-w-xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border border-white/10 gap-2 sm:gap-3 transition-all duration-200'
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.35)',
            }}
          >
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email address'
              required
              aria-label='Email address'
              className='flex-1 bg-transparent px-4 py-3 text-sm sm:text-base text-white placeholder-[#787878] outline-none border-none focus:outline-none focus:ring-0 w-full'
            />

            <button
              type='submit'
              disabled={isSubmitting}
              className='shrink-0 bg-orange-bg-cta hover:bg-[#e05322] active:scale-[0.98] text-white font-medium text-sm sm:text-base px-6 py-3 rounded-lg sm:rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(255,101,51,0.4)] hover:shadow-[0_4px_28px_rgba(255,101,51,0.6)] cursor-pointer disabled:opacity-70'
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
