import { useState } from 'react';

// Figma project card images (remote — available for 7 days)
const imgDesktop831 =
  'https://www.figma.com/api/mcp/asset/780f5b2c-1d40-49bb-83be-c6a459062005';
const imgMar1 =
  'https://www.figma.com/api/mcp/asset/931072f5-e93d-47f3-bb18-d0e5fa6bddea';
const imgMockup182 =
  'https://www.figma.com/api/mcp/asset/ed63f473-64ea-4ca9-a699-976716525414';
const img01WebShowcase =
  'https://www.figma.com/api/mcp/asset/ec23a3f1-bcbd-4cf9-8fe5-fd89d69bcf7c';
const imgMockupImage11 =
  'https://www.figma.com/api/mcp/asset/b34547e3-4ce1-442f-89e0-d98760806b88';
const imgDesktop512 =
  'https://www.figma.com/api/mcp/asset/abe64753-38cf-4522-a8c2-cb62176a4800';

const TABS = [
  'UI/UX',
  'MERN',
  'Laravel',
  'Flutter',
  'CMS',
  'Digital Marketing',
  'AI',
];

const ALL_PROJECTS = [
  {
    id: 1,
    title: 'Maktech Website Redesign',
    image: imgDesktop831,
    tags: ['UI/UX', 'Graphic', 'Laravel'],
    categories: ['UI/UX', 'Laravel'],
  },
  {
    id: 2,
    title: 'Flexible Freelance Platform',
    image: imgMar1,
    tags: ['UI/UX', 'Graphic', 'MERN'],
    categories: ['UI/UX', 'MERN'],
  },
  {
    id: 3,
    title: 'E-commerce Dashboard',
    image: imgMockup182,
    tags: ['UI/UX', 'Graphic', 'Laravel'],
    categories: ['UI/UX', 'Laravel'],
  },
  {
    id: 4,
    title: 'Corporate Portfolio',
    image: img01WebShowcase,
    tags: ['UI/UX', 'Graphic', 'MERN'],
    categories: ['UI/UX', 'MERN'],
  },
  {
    id: 5,
    title: 'Real Estate Showcase',
    image: imgMockupImage11,
    tags: ['UI/UX', 'Graphic', 'Laravel'],
    categories: ['UI/UX', 'CMS'],
  },
  {
    id: 6,
    title: 'Property Discovery App',
    image: imgDesktop512,
    tags: ['UI/UX', 'Graphic', 'Laravel'],
    categories: ['UI/UX', 'Flutter'],
  },
];

const ProjectCard = ({ project }) => (
  <a
    href='#'
    className='group bg-[#262626] block overflow-hidden relative rounded-2xl'
    style={{ aspectRatio: '600/500' }}
  >
    {/* Project image */}
    <img
      src={project.image}
      alt={project.title}
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
  </a>
);

const CaseStudyGrid = () => {
  const [activeTab, setActiveTab] = useState('UI/UX');

  const filtered =
    activeTab === 'UI/UX'
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.categories.includes(activeTab));

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
        <div className='flex justify-center'>
          <div
            role='tablist'
            aria-label='Project categories'
            className='flex items-center gap-1 p-4 rounded-2xl overflow-x-auto scrollbar-none'
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

        {/* Project grid */}
        <div
          key={activeTab}
          className='grid grid-cols-1 md:grid-cols-2 gap-6'
          style={{ animation: 'fadeSlideUp 0.4s ease both' }}
        >
          {filtered.length > 0 ? (
            filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
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
