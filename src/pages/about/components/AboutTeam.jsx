import AnimatedLines from '../../../components/AnimatedLines';

const TEAM_MEMBERS = [
  {
    name: 'Mohammad Alamgir Kabir',
    role: 'Chief Executive Officer',
    photo: '/sir.png',
    featured: true,
  },
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

const TeamCard = ({ name, role, photo, index, featured }) => (
  <article
    className={`group relative rounded-2xl overflow-hidden aspect-3/4 bg-[#181818] cursor-default transition-transform duration-500 hover:-translate-y-1.5 ${
      featured
        ? 'ring-1 ring-orange-bg-cta/40 hover:ring-orange-bg-cta/75'
        : 'ring-1 ring-white/5 hover:ring-white/15'
    }`}
  >
    {/* Index badge */}
    <span
      className={`absolute top-4 left-4 z-20 text-xs font-bold tabular-nums tracking-widest ${
        featured ? 'text-orange-bg-cta' : 'text-white/30'
      }`}
    >
      {String(index + 1).padStart(2, '0')}
    </span>

    {/* Featured crown indicator */}
    {featured && (
      <div className='absolute top-4 right-4 z-20'>
        <span className='text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-bg-cta border border-orange-bg-cta/50 rounded-full px-2.5 py-0.5 bg-black/40 backdrop-blur-sm'>
          CEO
        </span>
      </div>
    )}

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

    {/* Bottom info — left-aligned for editorial feel */}
    <div className='absolute inset-x-0 bottom-0 px-5 pb-6'>
      {/* Accent bar */}
      <div
        className={`h-px mb-3.5 transition-all duration-500 ${
          featured
            ? 'w-10 bg-orange-bg-cta group-hover:w-16'
            : 'w-6 bg-white/30 group-hover:w-10 group-hover:bg-orange-bg-cta/70'
        }`}
      />
      <p className='text-white text-lg font-semibold leading-tight tracking-tight'>
        {name}
      </p>
      <p
        className={`text-base mt-1 leading-snug ${
          featured ? 'text-orange-bg-cta/80' : 'text-white/55'
        }`}
      >
        {role}
      </p>
    </div>
  </article>
);

const AboutTeam = () => (
  <section
    aria-label='Meet the Maktech team'
    className='relative w-full min-h-screen bg-black-bg overflow-hidden px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 py-16 lg:py-24 flex flex-col justify-center'
  >
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

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
        {TEAM_MEMBERS.map((member, idx) => (
          <TeamCard key={idx} {...member} index={idx} />
        ))}
      </div>
    </div>
  </section>
);

export default AboutTeam;
