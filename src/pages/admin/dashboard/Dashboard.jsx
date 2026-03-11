import { useMemo } from 'react';
import StatCard from '../../../components/StatCard';
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
    accentColor: '#16a34a',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    badge: '+12.5%',
    badgeBg: 'bg-green-50',
    badgeColor: 'text-green-700',
    label: 'Monthly Revenue',
    value: '$95,000',
  },
  {
    Icon: MdShowChart,
    accentColor: '#2563eb',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    badge: 'All Time',
    badgeBg: 'bg-blue-50',
    badgeColor: 'text-blue-700',
    label: 'Lifetime Revenue',
    value: '$8,08,000',
  },
  {
    Icon: MdPeople,
    accentColor: '#9333ea',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    badge: 'Active',
    badgeBg: 'bg-purple-50',
    badgeColor: 'text-purple-700',
    label: 'Active Clients',
    value: '24',
  },
  {
    // Brand orange on the Leads card anchors the accent palette to Maktech identity
    Icon: MdPersonAdd,
    accentColor: '#FF6533',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    badge: '+8 this week',
    badgeBg: 'bg-orange-50',
    badgeColor: 'text-orange-700',
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

// Shared chart config — spread onto each recharts primitive to stay DRY
const AXIS_BASE = { axisLine: false, tickLine: false, tick: TICK_STYLE };
const GRID_PROPS = {
  strokeDasharray: '3 3',
  stroke: '#f3f4f6',
  vertical: false,
};
const TOOLTIP_STYLE = {
  borderRadius: '8px',
  border: '1px solid #f3f4f6',
  fontSize: '13px',
};

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
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
            {greeting}, Admin!
          </h1>
          <p className='text-base text-gray-500 mt-1'>
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <button
            type='button'
            className='flex cursor-pointer items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200 active:scale-[0.97]'
          >
            + Create New Order
          </button>
          <button
            type='button'
            className='flex cursor-pointer items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-black-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
          >
            + Compose Email
          </button>
        </div>
      </div>

      {/* Stat Cards — StatCard is importable on any admin page */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
        {STAT_CARDS.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
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
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey='month' {...AXIS_BASE} />
                <YAxis
                  domain={[0, 100000]}
                  ticks={[0, 25000, 50000, 75000, 100000]}
                  width={58}
                  {...AXIS_BASE}
                />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
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
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey='day' {...AXIS_BASE} />
                <YAxis
                  domain={[0, 24]}
                  ticks={[0, 6, 12, 18, 24]}
                  width={28}
                  {...AXIS_BASE}
                />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
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
