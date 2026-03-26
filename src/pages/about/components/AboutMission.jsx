import AnimatedLines from '../../../components/AnimatedLines';
import {
  MdOutlinePlace,
  MdOutlineBolt,
  MdOutlineAutorenew,
  MdOutlineVerifiedUser,
} from 'react-icons/md';

// ─── Data ─────────────────────────────────────────────────────────────────────

const MV_ROWS = [
  {
    id: 'mission',
    label: 'Our Mission',
    heading:
      'We build scalable digital systems that turn ambition into measurable outcomes, aligning product delivery.',
    cols: [
      'We integrate technology, product strategy, and performance into structured delivery systems that ensure clarity, efficiency.',
      'Our focus goes beyond short term output creating systems that remain effective, relevant, and scalable long after initial launch and deployment.',
    ],
  },
  {
    id: 'vision',
    label: 'Our Vision',
    heading:
      'To become a globally trusted full-stack IT company known for disciplined delivery and lasting partnerships.',
    cols: [
      'Our vision is grounded in practicality eliminating ambiguity in digital work by ensuring clear scope, defined processes, and accountable execution at stage.',
      'We prioritize clarity in decisions, structured delivery, and transparent progress establishing standards that build trust, consistency.',
    ],
  },
  {
    id: 'values',
    label: 'Our Values',
    heading:
      'Our values define how we work, guided by integrity, ownership, and commitment to excellence.',
    cols: [
      'Our values shape every decision and interaction driving accountability, strengthening culture, and ensuring we deliver results clients trust.',
    ],
  },
];

const CORE_VALUES = [
  {
    Icon: MdOutlinePlace,
    title: 'Skill',
    description:
      'Strong technical capability across development, applications, UI/UX, and marketing built through practice, not claims.',
  },
  {
    Icon: MdOutlineBolt,
    title: 'Speed',
    description:
      'Fast execution matters, but speed without alignment tends to create rework. We prioritize pace that stays connected to outcomes.',
  },
  {
    Icon: MdOutlineAutorenew,
    title: 'Innovation',
    description:
      'We keep systems adaptable. Not every feature is necessary, and not every trend is useful but thoughtful iteration is often essential.',
  },
  {
    Icon: MdOutlineVerifiedUser,
    title: 'Accountability',
    description:
      "Clear ownership, documented milestones, and measurable performance standards. If results are the goal, responsibilities can't be vague.",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Orange dot + label — used in the narrow left column of every row */
const RowLabel = ({ children }) => (
  <div className='flex items-start gap-2.5 pt-12 lg:pt-14'>
    <span
      className='mt-1.5 w-2 h-2 rounded-full bg-orange-bg-cta shrink-0'
      aria-hidden='true'
    />
    <span className='text-white/80 text-sm font-medium leading-snug'>
      {children}
    </span>
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

const AboutMission = () => (
  <section
    aria-label='Maktech mission, vision, and values'
    className='relative w-full bg-black-bg overflow-hidden px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16'
  >
    <AnimatedLines />

    <div className='relative z-10 max-w-360 mx-auto'>
      {/* ── Mission & Vision rows (shared structure) ── */}
      {MV_ROWS.map(({ id, label, heading, cols }) => (
        <div
          key={id}
          className='border-t border-white/10 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-x-10'
        >
          <RowLabel>{label}</RowLabel>

          <div className='pt-6 lg:pt-14 pb-12 lg:pb-14'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10'>
              <h2 className='text-white/80 text-xl sm:text-2xl xl:text-2xl font-semibold leading-snug'>
                {heading}
              </h2>
            </div>
            <div className='mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10'>
              {cols.map((text, i) => (
                <p key={i} className='text-white/60 text-base leading-relaxed'>
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* ── Our Core Values row ── */}
      <div className='border-t border-white/10 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-x-10'>
        <RowLabel>Our Core Values</RowLabel>

        <div className='pt-6 lg:pt-14 pb-12 lg:pb-14 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-x-10 lg:gap-y-10'>
          {CORE_VALUES.map(({ title, description }) => (
            <div key={title} className='flex flex-col gap-3'>
              <h3 className='text-white/80 text-lg font-semibold'>{title}</h3>
              <p className='text-white/60 text-base leading-relaxed'>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutMission;
