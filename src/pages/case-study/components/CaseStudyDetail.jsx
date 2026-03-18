import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb';

// --- Section icons ---

const ProblemIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    aria-hidden='true'
  >
    <circle cx='12' cy='12' r='10' stroke='white' strokeWidth='1.5' />
    <path d='M12 8v4' stroke='white' strokeWidth='2' strokeLinecap='round' />
    <circle cx='12' cy='16' r='1' fill='white' />
  </svg>
);

const SolutionIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    aria-hidden='true'
  >
    <path
      d='M9 12l2 2 4-4'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <circle cx='12' cy='12' r='10' stroke='white' strokeWidth='1.5' />
  </svg>
);

const StarIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    aria-hidden='true'
  >
    <path
      d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
      stroke='white'
      strokeWidth='1.5'
      strokeLinejoin='round'
    />
  </svg>
);

// --- Content section ---

const ContentSection = ({ icon: Icon, label, heading, points }) => (
  <div className='flex flex-col md:flex-row gap-8 md:gap-16 py-10 border-t border-white/10'>
    {/* Left: icon + label */}
    <div className='flex items-start gap-3 md:w-72 shrink-0'>
      <span
        className='flex items-center justify-center w-11 h-11 rounded-full shrink-0'
        style={{ background: '#ff6533' }}
      >
        <Icon />
      </span>
      <p className='text-lg font-semibold text-white/90 pt-2 leading-snug'>
        {label}
      </p>
    </div>

    {/* Right: heading + bullets */}
    <div className='flex flex-col gap-5 flex-1 min-w-0'>
      <p
        className='text-xl xl:text-2xl font-medium leading-snug'
        style={{ color: '#dbdbdb' }}
      >
        {heading}
      </p>
      <ul className='flex flex-col gap-3'>
        {points.map((point, i) => (
          <li
            key={i}
            className='flex items-start gap-3 text-base xl:text-lg'
            style={{ color: '#dbdbdb' }}
          >
            <span
              className='mt-1.5 w-2 h-2 rounded-full shrink-0'
              style={{ background: '#ff6533' }}
            />
            {point}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// --- Main component ---

const CaseStudyDetail = ({ project }) => {
  const { state } = useLocation();
  const category = state?.category ?? project.primaryCategory;

  const breadcrumbCrumbs = [
    { label: 'Case Studies', href: '/case-study' },
    { label: category },
    { label: project.title },
  ];

  return (
    <section className='w-full pt-10 pb-20 xl:pb-28'>
      <div className='max-w-7xl mx-auto px-5 xl:px-10 2xl:px-16 flex flex-col gap-10'>
        {/* Breadcrumb */}
        <Breadcrumb crumbs={breadcrumbCrumbs} />

        {/* Cover image */}
        <div
          className='w-full overflow-hidden rounded-2xl'
          style={{ height: 'clamp(280px, 40vw, 560px)' }}
        >
          <img
            src={project.coverImage}
            alt={project.title}
            className='w-full h-full object-cover'
          />
        </div>

        {/* Title block */}
        <div className='flex flex-col gap-3'>
          <h1 className='text-4xl xl:text-5xl font-bold text-white leading-tight'>
            {project.title}
          </h1>
          <p
            className='text-lg xl:text-xl max-w-3xl'
            style={{ color: '#aaaaaa' }}
          >
            {project.subtitle}
          </p>
        </div>

        {/* Tags */}
        <div className='flex flex-wrap gap-3'>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className='bg-white/10 text-[#bababa] text-sm px-4 py-1.5 rounded-full'
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content sections */}
        <div className='flex flex-col'>
          <ContentSection
            icon={ProblemIcon}
            label='Problem'
            heading={project.problem.heading}
            points={project.problem.points}
          />
          <ContentSection
            icon={SolutionIcon}
            label='Solution'
            heading={project.solution.heading}
            points={project.solution.points}
          />
          <ContentSection
            icon={StarIcon}
            label='Why This Product is the Best'
            heading={project.whyBest.heading}
            points={project.whyBest.points}
          />
        </div>
      </div>
    </section>
  );
};

export default CaseStudyDetail;
