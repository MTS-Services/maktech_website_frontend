import { useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  MdAttachMoney,
  MdShowChart,
  MdPeople,
  MdPersonAdd,
} from 'react-icons/md';

const STAT_CARDS = [
  {
    Icon: MdAttachMoney,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    badge: '+12.5%',
    badgeColor: 'text-green-600',
    label: 'Monthly Revenue',
    value: '$95,000',
  },
  {
    Icon: MdShowChart,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    badge: 'All Time',
    badgeColor: 'text-blue-600',
    label: 'Lifetime Revenue',
    value: '$8,08,000',
  },
  {
    Icon: MdPeople,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    badge: 'Active',
    badgeColor: 'text-purple-600',
    label: 'Active Clients',
    value: '24',
  },
  {
    Icon: MdPersonAdd,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    badge: '+8 this week',
    badgeColor: 'text-orange-500',
    label: 'Total Leads',
    value: '47',
  },
];

const REVENUE_DATA = [
  { month: 'Jan', revenue: 47000 },
  { month: 'Feb', revenue: 49000 },
  { month: 'Mar', revenue: 52000 },
  { month: 'Apr', revenue: 58000 },
  { month: 'May', revenue: 63000 },
  { month: 'Jun', revenue: 67000 },
  { month: 'Jul', revenue: 69000 },
  { month: 'Aug', revenue: 74000 },
  { month: 'Sep', revenue: 76000 },
  { month: 'Oct', revenue: 82000 },
  { month: 'Nov', revenue: 89000 },
  { month: 'Dec', revenue: 99000 },
];

const ORDER_DATA = [
  { day: 'Mon', orders: 12 },
  { day: 'Tue', orders: 18 },
  { day: 'Wed', orders: 13 },
  { day: 'Thu', orders: 19 },
  { day: 'Fri', orders: 17 },
  { day: 'Sat', orders: 7 },
  { day: 'Sun', orders: 5 },
];

const CHART_COLOR = '#FF6533';
const TICK_STYLE = { fill: '#9ca3af', fontSize: 12 };

const Dashboard = () => {
  // Computed at render time so it reflects the user's actual session hour
  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 18) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  return (
    <div className='space-y-6 pb-8'>
      {/* Page Header */}
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 leading-tight'>
            {greeting}, Admin!
          </h1>
          <p className='text-base text-gray-500 mt-1'>
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <button
            type='button'
            className='flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
          >
            + Create New Order
          </button>
          <button
            type='button'
            className='flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-black-bg-cta rounded-lg hover:opacity-90 transition-opacity'
          >
            + Compose Email
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
        {STAT_CARDS.map(
          ({ Icon, iconBg, iconColor, badge, badgeColor, label, value }) => (
            <div
              key={label}
              className='bg-white rounded-xl p-5 border border-gray-100 shadow-sm'
            >
              <div className='flex items-start justify-between mb-4'>
                <div className={`p-2.5 rounded-xl ${iconBg}`}>
                  <Icon className={`text-xl ${iconColor}`} />
                </div>
                <span className={`text-sm font-medium ${badgeColor}`}>
                  {badge}
                </span>
              </div>
              <p className='text-sm text-gray-500 mb-1'>{label}</p>
              <p className='text-2xl font-bold text-gray-900'>{value}</p>
            </div>
          ),
        )}
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
        {/* Revenue Performance */}
        <div className='bg-white rounded-xl p-6 border border-gray-100 shadow-sm'>
          <h3 className='text-base font-semibold text-gray-900 mb-5'>
            Revenue Performance
          </h3>
          <div
            role='img'
            aria-label='Line chart: monthly revenue from $47,000 in January to $99,000 in December'
          >
            <ResponsiveContainer width='100%' height={260}>
              <LineChart
                data={REVENUE_DATA}
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray='3 3'
                  stroke='#f3f4f6'
                  vertical={false}
                />
                <XAxis
                  dataKey='month'
                  tick={TICK_STYLE}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100000]}
                  ticks={[0, 25000, 50000, 75000, 100000]}
                  tick={TICK_STYLE}
                  axisLine={false}
                  tickLine={false}
                  width={58}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #f3f4f6',
                    fontSize: '13px',
                  }}
                />
                <Line
                  type='monotone'
                  dataKey='revenue'
                  stroke={CHART_COLOR}
                  strokeWidth={2}
                  dot={{ fill: CHART_COLOR, r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Volume */}
        <div className='bg-white rounded-xl p-6 border border-gray-100 shadow-sm'>
          <h3 className='text-base font-semibold text-gray-900 mb-5'>
            Order Volume (This Week)
          </h3>
          <div
            role='img'
            aria-label='Bar chart: daily order volume this week, peaking at 19 orders on Thursday'
          >
            <ResponsiveContainer width='100%' height={260}>
              <BarChart
                data={ORDER_DATA}
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id='barGradient' x1='0' y1='0' x2='0' y2='1'>
                    <stop
                      offset='0%'
                      stopColor={CHART_COLOR}
                      stopOpacity={0.9}
                    />
                    <stop
                      offset='100%'
                      stopColor={CHART_COLOR}
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray='3 3'
                  stroke='#f3f4f6'
                  vertical={false}
                />
                <XAxis
                  dataKey='day'
                  tick={TICK_STYLE}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 24]}
                  ticks={[0, 6, 12, 18, 24]}
                  tick={TICK_STYLE}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #f3f4f6',
                    fontSize: '13px',
                  }}
                />
                <Bar
                  dataKey='orders'
                  fill='url(#barGradient)'
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
