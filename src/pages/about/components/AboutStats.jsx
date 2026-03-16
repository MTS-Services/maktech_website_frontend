import AnimatedCounter from '../../../components/AnimatedCounter';

const STATS = [
  { target: 7500, label: 'Clients Worldwide', suffix: '+' },
  { target: 11000, label: 'Projects Delivered', suffix: '+' },
  { target: 180, label: 'In-House Professionals', suffix: '+' },
  { target: 6, label: 'Years in Operation', suffix: '+' },
];

const AboutStats = () => (
  <div className='border-t border-white/10 px-5 py-12 xl:px-16'>
    <div className='container mx-auto grid grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-4'>
      {STATS.map(({ target, label, suffix }) => (
        <div key={label} className='flex flex-col gap-1'>
          <span className='text-white text-4xl xl:text-5xl font-bold tracking-tight'>
            <AnimatedCounter target={target} suffix={suffix} />
          </span>
          <span className='text-white/50 text-base font-medium mt-1'>
            {label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default AboutStats;
