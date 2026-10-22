import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { getLenisInstance } from '../../utils/lenisManager';
import PolicyBlock from './components/PolicyBlocks';

const SCROLL_OFFSET = 120;
const pad = (n) => String(n).padStart(2, '0');

const PolicyHero = ({ policy }) => {
  const plain = policy.title.replace(policy.highlight, '').trim();

  return (
    <section className='relative flex min-h-[85vh] flex-col items-center justify-center px-5 pt-28 pb-16 text-center'>
      <div className='relative z-10 mb-8'>
        <Breadcrumb label={policy.title} />
      </div>

      <h1
        id='policy-heading'
        className='relative z-10 mb-5 max-w-4xl font-[Poppins] text-[clamp(2rem,5.5vw,4rem)] font-semibold leading-tight tracking-tight text-white'
      >
        {plain} <span className='text-orange-bg-cta'>{policy.highlight}</span>
      </h1>

      <p className='relative z-10 mb-3 max-w-xl text-base leading-relaxed text-white/70 xl:text-lg'>
        {policy.description}
      </p>
      <p className='relative z-10 mb-10 text-sm text-white/45'>
        Last Updated: {policy.lastUpdated}
      </p>

      <Link
        to='/contact'
        className='group relative z-10 inline-flex items-center gap-3 overflow-hidden rounded-full bg-orange-bg-cta font-semibold text-white transition-all duration-200 hover:bg-[#e5501a] hover:shadow-[0_4px_20px_rgba(255,101,51,0.45)] active:scale-[0.97]'
        style={{ padding: '13px 28px' }}
      >
        <span className='inline-block -translate-x-0.5 transition-transform delay-75 duration-300 ease-out group-hover:translate-x-0'>
          Contact With US
        </span>
        <span
          className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-300 ease-out group-hover:translate-x-1'
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
          >
            <path d='M3 8h10M9 4l4 4-4 4' />
          </svg>
        </span>
      </Link>
    </section>
  );
};

const PolicyIndex = ({ sections, activeId, onSelect }) => (
  <nav
    aria-label='Policy sections'
    className='sticky top-28 rounded-[4px] border border-white/15 bg-[#232323]/90 px-3 pt-3.5 pb-3 backdrop-blur-sm'
  >
    <div className='mb-2 flex items-start justify-between gap-2'>
      <p className='text-[15px] uppercase leading-none tracking-wide text-white'>Policy Index</p>
      <p className='text-[10px] leading-none text-white/60'>{sections.length} Sections</p>
    </div>
    <ol className='divide-y divide-white/10'>
      {sections.map((section, i) => {
        const active = section.id === activeId;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => onSelect(e, section.id)}
              aria-current={active ? 'true' : undefined}
              className={`block px-1 py-[7px] transition-colors ${
                active ? 'bg-orange-bg-cta/50' : 'hover:bg-white/5'
              }`}
            >
              <span className='block text-[10px] leading-tight text-orange-bg-cta'>
                {pad(i + 1)}
              </span>
              <span className='block truncate text-xs leading-snug text-white/90'>
                {section.shortTitle || section.title}
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  </nav>
);

const PolicySection = ({ section, index, active }) => (
  <section
    id={section.id}
    aria-labelledby={`${section.id}-title`}
    className={`scroll-mt-28 rounded-xl border bg-[#1f1f1f]/80 px-5 py-5 backdrop-blur-sm transition-colors duration-300 md:px-6 ${
      active ? 'border-orange-bg-cta/80' : 'border-white/50'
    }`}
  >
    <h2
      id={`${section.id}-title`}
      className='mb-3 flex items-center gap-2.5 font-[Poppins] text-xl font-semibold text-white md:text-[26px]'
    >
      <span className='rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-[#FFB59F]'>
        {pad(index + 1)}
      </span>
      {section.title}
    </h2>
    <div className='space-y-3'>
      {section.blocks.map((block, i) => (
        <PolicyBlock key={i} block={block} />
      ))}
    </div>
  </section>
);

const PolicyPage = ({ policy }) => {
  const [activeId, setActiveId] = useState(policy.sections[0]?.id);

  useEffect(() => {
    document.title = `${policy.title} – Maktech`;
  }, [policy.title]);

  useEffect(() => {
    const elements = policy.sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [policy.sections]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(el, { offset: -SCROLL_OFFSET });
    } else {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
        behavior: 'smooth',
      });
    }
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <main id={policy.slug} aria-labelledby='policy-heading' className='relative w-full'>
      <PolicyHero policy={policy} />

      <section className='relative w-full pb-24 text-white'>
        <div className='container mx-auto px-5 xl:px-8 2xl:px-12'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-[230px_1fr] xl:grid-cols-[260px_1fr]'>
            <aside className='hidden lg:block'>
              <PolicyIndex
                sections={policy.sections}
                activeId={activeId}
                onSelect={scrollToSection}
              />
            </aside>

            <div className='space-y-6'>
              {policy.sections.map((section, i) => (
                <PolicySection
                  key={section.id}
                  section={section}
                  index={i}
                  active={section.id === activeId}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PolicyPage;
