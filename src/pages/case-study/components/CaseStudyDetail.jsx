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

const renderHighlightedTitle = (title) => {
  if (!title) return null;
  const words = title.trim().split(' ');
  if (words.length <= 2) {
    return <span className='text-white'>{title}</span>;
  }
  const highlightCount = words.length >= 7 ? 2 : Math.min(2, Math.floor(words.length / 2));
  const mainWords = words.slice(0, words.length - highlightCount).join(' ');
  const highlightWords = words.slice(words.length - highlightCount).join(' ');

  return (
    <>
      <span className='text-white'>{mainWords} </span>
      <span className='text-[#ff6533] block sm:inline lg:block'>{highlightWords}</span>
    </>
  );
};

const CaseStudyDetail = ({ project }) => {
  const { state } = useLocation();
  const category = project.category || state?.category || project.primaryCategory || 'IT Service · Web App';
  const client = project.client || 'Md Alamgir Kabir';
  const timeline = project.timeline || '14 weeks';
  const services = project.services || (project.tags ? (Array.isArray(project.tags) ? project.tags.join(' · ') : project.tags) : 'International IT Product & Services');
  const description = project.description || project.subtitle || '';

  const tags = Array.isArray(project.tags)
    ? project.tags
    : typeof project.tags === 'string'
    ? project.tags.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  const breadcrumbCrumbs = [
    { label: 'Case Studies', href: '/case-study' },
    { label: category },
    { label: project.title },
  ];

  const normalizeImageUrl = (url) => {
    if (!url || typeof url !== 'string') return url;
    if (url.startsWith('http://www.api.maktechgroup.com')) {
      return url.replace('http://www.api.maktechgroup.com', 'https://www.api.maktechgroup.com');
    }
    return url;
  };

  const coverImg = normalizeImageUrl(project.coverImage || project.image);

  return (
    <section className='w-full pt-20 xl:pt-10 pb-20 xl:pb-28'>
      <div className='max-w-7xl mx-auto px-5 xl:px-10 2xl:px-16 flex flex-col gap-10'>
        {/* Breadcrumb */}
        <Breadcrumb crumbs={breadcrumbCrumbs} />

        {/* Cover image */}
        {coverImg && (
          <div
            className='w-full overflow-hidden rounded-2xl bg-[#161616]'
            style={{ height: 'clamp(280px, 40vw, 560px)' }}
          >
            <img
              src={coverImg}
              alt={project.title}
              className='w-full h-full object-cover'
            />
          </div>
        )}

        {/* Overview & About Project Header Section */}
        <div className='flex flex-col lg:flex-row items-start gap-8 lg:gap-14 my-4'>
          {/* Left Column: OVERVIEW Card */}
          <aside className='w-full lg:w-[280px] shrink-0 rounded-2xl border border-white/10 bg-[#161616]/80 p-6 md:p-7 backdrop-blur-md shadow-2xl'>
            <h2 className='text-white font-bold text-base tracking-wider uppercase mb-5'>
              OVERVIEW
            </h2>
            <div className='space-y-4'>
              <div className='border-b border-white/10 pb-3.5'>
                <p className='text-xs font-semibold text-[#ff6533] uppercase tracking-wider mb-1'>
                  Client
                </p>
                <p className='text-white text-sm font-medium leading-snug'>
                  {client}
                </p>
              </div>

              <div className='border-b border-white/10 pb-3.5'>
                <p className='text-xs font-semibold text-[#ff6533] uppercase tracking-wider mb-1'>
                  Category
                </p>
                <p className='text-white text-sm font-medium leading-snug'>
                  {category}
                </p>
              </div>

              <div className='border-b border-white/10 pb-3.5'>
                <p className='text-xs font-semibold text-[#ff6533] uppercase tracking-wider mb-1'>
                  Timeline
                </p>
                <p className='text-white text-sm font-medium leading-snug'>
                  {timeline}
                </p>
              </div>

              <div>
                <p className='text-xs font-semibold text-[#ff6533] uppercase tracking-wider mb-1'>
                  Services
                </p>
                <p className='text-white text-sm font-medium leading-snug'>
                  {services}
                </p>
              </div>
            </div>
          </aside>

          {/* Right Column: Title & Description */}
          <div className='flex-1 min-w-0'>
            {/* Kicker */}
            <div className='flex items-center gap-2.5 mb-5'>
              <span className='w-2 h-2 rounded-full bg-[#ff6533] shrink-0' />
              <span className='text-xs font-bold tracking-widest text-[#a0a0a0] uppercase'>
                ABOUT THE PROJECT
              </span>
            </div>

            {/* Title */}
            <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] tracking-tight mb-6'>
              {renderHighlightedTitle(project.title)}
            </h1>

            {/* Description */}
            {description && (
              <p className='text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed max-w-3xl font-normal'>
                {description}
              </p>
            )}

            {/* Tags (if any) */}
            {tags.length > 0 && (
              <div className='flex flex-wrap gap-2.5 mt-6'>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className='bg-white/10 text-[#bababa] text-xs sm:text-sm px-3.5 py-1 rounded-full font-medium'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content sections */}
        <div className='relative flex flex-col'>
          {/* Vertical timeline line — desktop only */}
          {(project.problem || project.solution || project.whyBest) && (
            <div
              aria-hidden='true'
              className='pointer-events-none absolute hidden md:block w-px bg-white/20'
              style={{ left: '5px', top: '52px', bottom: '52px' }}
            />
          )}
          {project.problem && (
            <ContentSection
              label='Problem'
              heading={project.problem.heading}
              points={project.problem.points || []}
            />
          )}
          {project.solution && (
            <ContentSection
              label='Solution'
              heading={project.solution.heading}
              points={project.solution.points || []}
            />
          )}
          {project.whyBest && (
            <ContentSection
              label='Why This Product is the Best'
              heading={project.whyBest.heading}
              points={project.whyBest.points || []}
            />
          )}

          {/* Render Rich HTML Content if available */}
          {typeof project.content === 'string' && project.content.trim() ? (
            <div
              className='py-8 text-white prose prose-invert max-w-none'
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          ) : project.content?.html ? (
            <div
              className='py-8 text-white prose prose-invert max-w-none'
              dangerouslySetInnerHTML={{ __html: project.content.html }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyDetail;
