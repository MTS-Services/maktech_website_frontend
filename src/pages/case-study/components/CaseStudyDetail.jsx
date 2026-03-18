import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb';

// --- Content section ---

const ContentSection = ({ label, heading, points }) => (
  <div className='flex flex-col md:flex-row gap-8 md:gap-16 py-10 border-t border-white/10'>
    {/* Left: dot + label */}
    <div className='flex items-start gap-3 md:w-72 shrink-0'>
      <span
        className='relative z-10 w-3 h-3 mt-1.5 rounded-full shrink-0'
        style={{ background: '#ff6533' }}
      />
      <p className='text-lg font-semibold text-white/90 leading-snug'>
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
        <div className='relative flex flex-col'>
          {/* Vertical timeline line — desktop only */}
          <div
            aria-hidden='true'
            className='pointer-events-none absolute hidden md:block w-px bg-white/20'
            style={{ left: '5px', top: '52px', bottom: '52px' }}
          />
          <ContentSection
            label='Problem'
            heading={project.problem.heading}
            points={project.problem.points}
          />
          <ContentSection
            label='Solution'
            heading={project.solution.heading}
            points={project.solution.points}
          />
          <ContentSection
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
