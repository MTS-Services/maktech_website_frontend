import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../data/projects';

const TABS = [
  'UI/UX',
  'MERN',
  'Laravel',
  'Flutter',
  'CMS',
  'Digital Marketing',
  'AI',
];

const ProjectCard = ({ project, activeTab }) => (
  <Link
    to={`/case-study/${project.slug}`}
    state={{ category: activeTab }}
    aria-label={`View case study: ${project.title}`}
    className='group bg-[#262626] block overflow-hidden relative rounded-2xl aspect-6/5'
  >
    <img
      src={project.coverImage}
      alt={project.title}
      loading='lazy'
      decoding='async'
      className='absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105'
    />

    {/* Gradient overlay */}
    <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent' />

    {/* Bottom info */}
    <div className='absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3'>
      <p className='text-white font-semibold text-xl leading-snug'>
        {project.title}
      </p>
      <div className='flex flex-wrap gap-3'>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className='bg-white/10 text-[#bababa] text-sm px-4 py-1 rounded'
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </Link>
);

const CaseStudyGrid = () => {
  const [activeTab, setActiveTab] = useState('UI/UX');

  const filtered = ALL_PROJECTS.filter((p) => p.categories.includes(activeTab));

  const handleKeyDown = (e, tab) => {
    const idx = TABS.indexOf(activeTab);
    if (e.key === 'ArrowRight') setActiveTab(TABS[(idx + 1) % TABS.length]);
    else if (e.key === 'ArrowLeft')
      setActiveTab(TABS[(idx - 1 + TABS.length) % TABS.length]);
    else if (e.key === 'Enter' || e.key === ' ') setActiveTab(tab);
  };

  return (
    <section className='w-full pb-20 xl:pb-28'>
      <div className='max-w-7xl mx-auto px-5 xl:px-10 2xl:px-16 flex flex-col gap-10'>
        {/* Tab bar */}
        <div className='w-full overflow-x-auto scrollbar-none'>
          <div
            role='tablist'
            aria-label='Project categories'
            className='flex items-center gap-1 p-4 rounded-2xl w-max mx-auto'
            style={{ background: 'rgba(154,140,136,0.2)' }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  role='tab'
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab)}
                  onKeyDown={(e) => handleKeyDown(e, tab)}
                  className={`shrink-0 px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-orange-bg-cta text-white shadow-md'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project grid — fadeSlideUp on tab change */}
        <div
          key={activeTab}
          className='grid grid-cols-1 md:grid-cols-2 gap-6'
          style={{
            animation: 'fadeSlideUp 0.35s ease both',
            willChange: 'opacity, transform',
          }}
        >
          {filtered.length > 0 ? (
            filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                activeTab={activeTab}
              />
            ))
          ) : (
            <p className='text-white/50 text-center col-span-2 py-16'>
              No projects in this category yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyGrid;
