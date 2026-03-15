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
  <article
    aria-label={label}
    className='group relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1.5 hover:border-gray-200 transition-all duration-300 cursor-default'
  >
    <div className='p-5 sm:p-6'>
      {/* Icon + badge */}
      <div className='flex items-start justify-between mb-5'>
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 ${iconBg}`}
        >
          <Icon className={`text-2xl ${iconColor}`} />
        </div>
        <span
          className={`inline-flex items-center text-xs font-semibold px-2.5 py-1.5 rounded-full ${badgeBg} ${badgeColor}`}
        >
          {badge}
        </span>
      </div>

      {/* Value */}
      <p className='text-2xl font-bold text-gray-900 tracking-tight leading-none mb-2'>
        {value}
      </p>

      {/* Label */}
      <p className='text-sm font-medium text-gray-400'>{label}</p>
    </div>

    <div
      aria-hidden='true'
      className='absolute bottom-0 left-0 h-0.75 w-0 group-hover:w-full transition-all duration-500 ease-out'
      style={{ backgroundColor: accentColor }}
    />
  </article>
);

export default StatCard;
