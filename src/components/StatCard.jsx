/**
 * Reusable metric stat card.
 * Import on any admin page: import StatCard from '../../components/StatCard';
 *
 * Props
 *   Icon        — react-icons component
 *   iconBg      — Tailwind bg class for icon container  e.g. 'bg-green-50'
 *   iconColor   — Tailwind text class for icon          e.g. 'text-green-600'
 *   badge       — Short label shown top-right           e.g. '+12.5%'
 *   badgeBg     — Tailwind bg class for badge pill      e.g. 'bg-green-50'
 *   badgeColor  — Tailwind text class for badge         e.g. 'text-green-700'
 *   label       — Metric name                          e.g. 'Monthly Revenue'
 *   value       — Display value                         e.g. '$95,000'
 *   accentColor — Hex string for the top accent strip   e.g. '#16a34a'
 */
const StatCard = ({
  Icon,
  iconBg,
  iconColor,
  badge,
  badgeBg,
  badgeColor,
  label,
  value,
  accentColor,
}) => (
  <article className='group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default'>
    {/* Thin top strip — unique color per metric for instant visual recognition */}
    <div className='h-0.75 w-full' style={{ backgroundColor: accentColor }} />

    <div className='p-5 sm:p-6'>
      {/* Icon + badge row */}
      <div className='flex items-start justify-between mb-5'>
        <div
          className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl shrink-0 ${iconBg}`}
        >
          <Icon className={`text-xl ${iconColor}`} />
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${badgeBg} ${badgeColor}`}
        >
          {badge}
        </span>
      </div>

      {/* Metric */}
      <p className='text-sm font-medium text-gray-500 mb-1.5'>{label}</p>
      <p className='text-2xl font-bold text-gray-900 tracking-tight'>{value}</p>
    </div>
  </article>
);

export default StatCard;
