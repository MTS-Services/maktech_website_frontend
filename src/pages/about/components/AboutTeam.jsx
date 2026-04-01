import AnimatedLines from '../../../components/AnimatedLines';

const OWNERS = [
  {
    name: 'Mohammad Alamgir Kabir',
    role: 'Chief Executive Officer',
    photo: '/sir.png',
    badge: 'CEO',
  },
  {
    name: 'Nasrin Akter Pinky',
    role: 'Director, HR & Admin',
    photo: '/pinkey2.png',
  },
];

const DIRECTORS = [
  {
    name: 'Toufiq Ahmed Akash',
    role: 'Director, Finance',
    photo: '/toufiq.png',
  },
  {
    name: 'Mukabber Hossain',
    role: 'Director, Sales & Business Development',
    photo: '/mukabber.png',
  },
  {
    name: 'Md. Firoj Mia',
    role: 'Director, Operations',
    photo: '/firoj.png',
  },
];

const OwnerCard = ({ name, role, photo, badge, index }) => (
  <article
    style={{
      background:
        'radial-gradient(ellipse at 20% 10%, rgba(255,101,51,0.28) 0%, transparent 55%), linear-gradient(175deg, #1f1510 0%, #0e0d0d 100%)',
      animation: 'cardFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both',
      animationDelay: `${index * 0.12}s`,
    }}
    className='group relative rounded-2xl overflow-hidden aspect-3/4 cursor-default transition-transform duration-500 hover:-translate-y-2 ring-1 ring-orange-bg-cta/45 hover:ring-orange-bg-cta/80'
  >
    {/* Badge */}
    {badge && (
      <div className='absolute top-4 right-4 z-20'>
        <span className='text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-bg-cta border border-orange-bg-cta/50 rounded-full px-2.5 py-0.5 bg-black/40 backdrop-blur-sm'>
          {badge}
        </span>
      </div>
    )}

    <img
      src={photo}
      alt={`${name} — ${role}`}
      width={480}
      height={640}
      className='w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]'
      loading='lazy'
    />

    {/* Deep gradient overlay */}
    <div
      className='absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black via-black/75 to-transparent'
      aria-hidden='true'
    />

    {/* Bottom info */}
    <div className='absolute inset-x-0 bottom-0 px-5 pb-6'>
      <div className='h-px mb-3.5 w-10 bg-orange-bg-cta transition-all duration-500 group-hover:w-16' />
      <p className='text-white text-xl font-semibold leading-tight tracking-tight'>
        {name}
      </p>
      <p className='text-orange-bg-cta/80 text-base mt-1 leading-snug'>
        {role}
      </p>
    </div>
  </article>
);

const DirectorCard = ({ name, role, photo, index }) => (
  <article
    style={{
      background:
        'radial-gradient(ellipse at 20% 10%, rgba(255,101,51,0.10) 0%, transparent 50%), linear-gradient(175deg, #181614 0%, #0e0d0d 100%)',
      animation: 'cardFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both',
      animationDelay: `${0.24 + index * 0.1}s`,
    }}
    className='group relative rounded-2xl overflow-hidden aspect-3/4 cursor-default transition-transform duration-500 hover:-translate-y-1.5 ring-1 ring-white/5 hover:ring-orange-bg-cta/75'
  >
    <img
      src={photo}
      alt={`${name} — ${role}`}
      width={400}
      height={533}
      className='w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]'
      loading='lazy'
    />

    {/* Deep gradient overlay */}
    <div
      className='absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black via-black/75 to-transparent'
      aria-hidden='true'
    />

    {/* Bottom info */}
    <div className='absolute inset-x-0 bottom-0 px-5 pb-6'>
      <div className='h-px mb-3.5 w-6 bg-white/30 transition-all duration-500 group-hover:w-10 group-hover:bg-orange-bg-cta/70' />
      <p className='text-white text-lg font-semibold leading-tight tracking-tight'>
        {name}
      </p>
      <p className='text-white/55 text-base mt-1 leading-snug'>{role}</p>
    </div>
  </article>
);

const AboutTeam = () => (
  <section
    aria-label='Meet the Maktech team'
    className='relative w-full min-h-screen bg-black-bg overflow-hidden px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 py-16 lg:py-24 flex flex-col justify-center'
  >
    <style>{`
      @keyframes cardFadeUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0);    }
      }
    `}</style>
    <AnimatedLines />

    <div className='relative z-10 max-w-360 mx-auto w-full'>
      {/* Section label */}
      <div className='flex items-center justify-center gap-3 mb-5'>
        <span
          className='block w-6 h-px bg-orange-bg-cta/70'
          aria-hidden='true'
        />
        <span className='text-orange-bg-cta text-sm font-semibold uppercase tracking-[0.2em]'>
          Our Leadership
        </span>
        <span
          className='block w-6 h-px bg-orange-bg-cta/70'
          aria-hidden='true'
        />
      </div>

      <h2 className='text-white text-3xl sm:text-4xl xl:text-5xl font-bold text-center mb-4 leading-tight'>
        Where Innovation <span className='text-orange-bg-cta'>Begins</span>
      </h2>

      <p className='text-white/50 text-base leading-relaxed text-center max-w-xl mx-auto mb-14'>
        Behind every system we build is a team that takes ownership seriously.
        These are the people who define how Maktech thinks, works, and delivers.
      </p>

      {/* Owners row — 2 centered featured cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-5'>
        {OWNERS.map((owner, idx) => (
          <OwnerCard key={idx} {...owner} index={idx} />
        ))}
      </div>

      {/* Divider */}
      <div className='flex items-center gap-5 my-12 max-w-5xl mx-auto w-full'>
        <div className='flex-1 h-px bg-linear-to-r from-transparent via-orange-bg-cta/30 to-orange-bg-cta/60' />
        <div className='flex items-center gap-2.5 px-5 py-2 rounded-full border border-orange-bg-cta/25 bg-orange-bg-cta/5 backdrop-blur-sm'>
          <span className='w-1.5 h-1.5 rounded-full bg-orange-bg-cta inline-block' />
          <span className='text-white/70 text-xs font-semibold uppercase tracking-[0.22em]'>
            Directors
          </span>
          <span className='w-1.5 h-1.5 rounded-full bg-orange-bg-cta inline-block' />
        </div>
        <div className='flex-1 h-px bg-linear-to-l from-transparent via-orange-bg-cta/30 to-orange-bg-cta/60' />
      </div>

      {/* Directors row — 3 cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto w-full'>
        {DIRECTORS.map((director, idx) => (
          <DirectorCard key={idx} {...director} index={idx} />
        ))}
      </div>
    </div>
  </section>
);

export default AboutTeam;
