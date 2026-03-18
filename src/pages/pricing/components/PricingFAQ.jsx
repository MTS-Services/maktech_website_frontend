import { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: 'How are your pricing plans structured?',
    answer:
      'Our pricing is structured into three tiers — Basic, Standard, and Business — across all service categories. Each tier is designed to match different project scopes, team sizes, and budget levels.',
  },
  {
    id: 2,
    question: 'Can I upgrade or change my plan later?',
    answer:
      'Absolutely. You can upgrade, downgrade, or switch between plans at any time. Our team will seamlessly transition your project to the new scope without any disruption.',
  },
  {
    id: 3,
    question: 'Are there any hidden fees?',
    answer:
      'None. Every plan is transparently priced. The only additions would be optional third-party services (like hosting, domains, or paid APIs) which are always communicated in advance.',
  },
  {
    id: 4,
    question: 'Do you offer custom or enterprise pricing?',
    answer:
      'Yes — for large-scale or long-term projects that fall outside our standard plans, we create fully customised proposals tailored to your specific requirements and timeline.',
  },
  {
    id: 5,
    question: 'What payment methods do you accept?',
    answer:
      'We accept bank transfers, major credit/debit cards, and popular digital wallets. Payment schedules (milestone-based or monthly) are agreed upon before the project begins.',
  },
];

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className='bg-[#f4f4f4] rounded-lg overflow-hidden transition-all duration-300'>
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className='w-full flex items-center justify-between p-6 text-left hover:bg-[#ebebeb] transition-colors duration-200'
    >
      <span className='text-[#2b2b2b] text-base xl:text-lg font-medium pr-4'>
        {faq.question}
      </span>
      <div
        className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M5 12.5L10 7.5L15 12.5'
            stroke='#2b2b2b'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </button>

    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className='px-6 pb-6 pt-0'>
        <p className='text-[#666] text-sm xl:text-base leading-relaxed'>
          {faq.answer}
        </p>
      </div>
    </div>
  </div>
);

const LINE_POSITIONS = [12, 30, 50, 70, 88];

const PricingFAQ = () => {
  const [openId, setOpenId] = useState(1);

  const toggleFAQ = (id) => setOpenId(openId === id ? null : id);

  return (
    <section className='w-full bg-white overflow-hidden pt-16 xl:pt-20 2xl:pt-24 pb-16 xl:pb-20 2xl:pb-24 relative'>
      {/* Orange ambient glow — left */}
      <div
        className='absolute -left-48 top-1/2 -translate-y-1/2 w-175 h-175 rounded-full pointer-events-none'
        style={{
          background:
            'radial-gradient(circle, rgba(255,101,51,0.22) 0%, rgba(255,101,51,0.08) 45%, transparent 70%)',
        }}
      />
      {/* Orange ambient glow — right */}
      <div
        className='absolute -right-48 top-1/3 w-150 h-150 rounded-full pointer-events-none'
        style={{
          background:
            'radial-gradient(circle, rgba(255,101,51,0.15) 0%, rgba(255,101,51,0.05) 45%, transparent 70%)',
        }}
      />

      {/* Scoped animated vertical lines */}
      {LINE_POSITIONS.map((pos, i) => (
        <div
          key={i}
          className='absolute top-0 bottom-0 w-px pointer-events-none'
          style={{
            left: `${pos}%`,
            background:
              'linear-gradient(to bottom, transparent, rgba(0,0,0,0.06), transparent)',
          }}
        >
          <div
            className='absolute w-px rounded-full'
            style={{
              height: '80px',
              background:
                'linear-gradient(to bottom, transparent, rgba(255,101,51,0.4), transparent)',
              animation: 'lineDrop 6s linear infinite',
              animationDelay: `${i * 1.2}s`,
            }}
          />
          <div
            className='absolute w-px rounded-full'
            style={{
              height: '50px',
              background:
                'linear-gradient(to bottom, transparent, rgba(255,101,51,0.25), transparent)',
              animation: 'lineDrop 6s linear infinite',
              animationDelay: `${i * 1.2 + 3}s`,
            }}
          />
        </div>
      ))}

      <div className='max-w-full xl:max-w-[65%] mx-auto px-5 xl:px-8 2xl:px-12 relative z-10'>
        {/* Header */}
        <div className='mb-12 xl:mb-16 text-center'>
          {/* Badge */}
          <div
            className='flex items-center gap-2 px-3 py-1.5 rounded-md w-fit mb-6 mx-auto'
            style={{
              background:
                'linear-gradient(90.71deg, rgba(255,101,51,0.06) 0%, rgba(228,228,228,0.6) 100%)',
              border: '1px solid rgba(255,101,51,0.18)',
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
            <span className='text-base font-medium text-[#666]'>
              Need Help?
            </span>
          </div>

          {/* Heading */}
          <h2 className='text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-4 leading-tight bg-linear-to-r from-[#7d7d7d] to-[#2f2f2f] bg-clip-text text-transparent'>
            Answers to Common Questions
          </h2>

          {/* Subheading */}
          <p className='text-white-bg-secondary text-base xl:text-lg max-w-2xl mx-auto'>
            Everything you need to know before starting your project with us.
          </p>
        </div>

        {/* FAQ List */}
        <div className='max-w-4xl mx-auto flex flex-col gap-4'>
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;
