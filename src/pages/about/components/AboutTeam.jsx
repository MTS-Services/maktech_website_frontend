import AnimatedLines from '../../../components/AnimatedLines';

const TEAM_MEMBERS = [
  {
    name: 'Mohammad Alamgir Kabir',
    role: 'Chief Executive Officer',
    photo: '/sir.png',
  },
  {
    name: 'Mukabber Hossain',
    role: 'Director, Sales & Business Development',
    photo: '/sir.png',
  },
  {
    name: 'Toufiq Ahmed Akash',
    role: 'Director, Finance',
    photo: '/sir.png',
  },
  {
    name: 'Md. Firoj Mia',
    role: 'Director, Operations',
    photo: '/sir.png',
  },
];

const TeamCard = ({ name, role, photo }) => (
  <article className='relative rounded-2xl overflow-hidden aspect-3/4 bg-[#1a1a1a]'>
    <img
      src={photo}
      alt={`${name} — ${role}`}
      width={400}
      height={533}
      className='w-full h-full object-cover object-top'
      loading='lazy'
    />
    {/* Bottom gradient overlay */}
    <div
      className='absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/95 via-black/60 to-transparent'
      aria-hidden='true'
    />
    <div className='absolute inset-x-0 bottom-0 px-6 py-5 text-center'>
      <p className='text-white text-lg font-semibold leading-snug'>{name}</p>
      <p className='text-white/60 text-base mt-0.5'>{role}</p>
    </div>
  </article>
);

const AboutTeam = () => (
  <section
    aria-label='Meet the Maktech team'
    className='relative w-full bg-black-bg overflow-hidden px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 py-16 lg:py-24'
  >
    <AnimatedLines />

    <div className='relative z-10 max-w-360 mx-auto'>
      <h2 className='text-white text-2xl sm:text-3xl xl:text-4xl font-normal text-center mb-4'>
        Where Innovation Begins
      </h2>
      <p className='text-white/60 text-base leading-relaxed text-center max-w-2xl mx-auto mb-12'>
        Behind every system we build is a team that takes ownership seriously.
        These are the people who define how Maktech thinks, works, and delivers.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-5'>
        {TEAM_MEMBERS.map((member, idx) => (
          <TeamCard key={idx} {...member} />
        ))}
      </div>
    </div>
  </section>
);

export default AboutTeam;
