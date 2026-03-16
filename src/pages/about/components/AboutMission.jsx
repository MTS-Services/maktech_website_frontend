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
      'To build scalable digital systems that turn ambition into measurable progress.',
    cols: [
      'We align technology, product design, and performance into structured delivery frameworks.',
      "The point isn't short-term activity — it's systems that keep working after launch and still make sense six months later, when your business has moved forward.",
    ],
  },
  {
    id: 'vision',
    label: 'Our Vision',
    heading:
      "To become a globally trusted full-stack IT company known for institutional discipline, long-term partnerships, and delivery standards that don't depend on individual personalities.",
    cols: [
      'That may sound formal — but the intention is practical. Too many businesses have experienced digital work that feels opaque: unclear scope, inconsistent reporting, no one accountable when things slip.',
      'We want the opposite. Clarity in decisions, structure in delivery, transparency in progress. Not as a pitch. As a standard we hold ourselves to every day.',
    ],
  },
];

const CORE_VALUES = [
  {
    Icon: MdOutlinePlace,
    title: 'Skill',
    description:
      'Strong technical capability across development, applications, UI/UX, and marketing — built through practice, not claims.',
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
      'We keep systems adaptable. Not every feature is necessary, and not every trend is useful — but thoughtful iteration is often essential.',
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
            <h2 className='text-white/80 text-xl sm:text-2xl xl:text-2xl font-semibold leading-snug max-w-2xl'>
              {heading}
            </h2>
            <div className='mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10'>
              {cols.map((text, i) => (
                <p key={i} className='text-white/60 text-base leading-relaxed'>
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* ── Our Values row ── */}
      <div className='border-t border-white/10 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-x-10'>
        <RowLabel>Our Values</RowLabel>
        <p className='pt-6 lg:pt-14 pb-12 lg:pb-14 text-white/80 font-semibold text-xl lg:text-2xl leading-relaxed max-w-2xl'>
          The team understood our vision from day one. The final product was
          clean, fast, and exactly what we.
        </p>
      </div>

      {/* ── Our Core Values row ── */}
      <div className='border-t border-white/10 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-x-10'>
        <RowLabel>Our Core Values</RowLabel>

        <div className='pt-6 lg:pt-14 pb-12 lg:pb-14 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-x-10 lg:gap-y-10'>
          {CORE_VALUES.map(({ Icon, title, description }) => (
            <div key={title} className='flex flex-col gap-3'>
              <Icon
                size={26}
                className='text-orange-bg-cta'
                aria-hidden='true'
              />
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
