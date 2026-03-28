import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  MdDashboard,
  MdEmail,
  MdPeople,
  MdShoppingCart,
  MdStorefront,
  MdWork,
  MdArticle,
  MdWorkOutline,
  MdAttachMoney,
  MdLogout,
  MdClose,
  MdChevronRight,
  MdDoubleArrow,
} from 'react-icons/md';
import { RxDoubleArrowRight } from 'react-icons/rx';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: MdDashboard },
  { name: 'Emails', path: '/admin/emails', icon: MdEmail },
  { name: 'Leads', path: '/admin/leads', icon: MdPeople },
  { name: 'Orders', path: '/admin/orders', icon: MdShoppingCart },
  {
    name: 'Marketplace Orders',
    path: '/admin/marketplace-orders',
    icon: MdStorefront,
    autoCollapse: true,
  },
  { name: 'Case Studies', path: '/admin/case-studies', icon: MdWork },
  { name: 'Blog', path: '/admin/blog', icon: MdArticle },
  { name: 'Jobs', path: '/admin/jobs', icon: MdWorkOutline },
  { name: 'Pricing', path: '/admin/pricing', icon: MdAttachMoney },
];

// border lives in NAV_BASE so layout never shifts; only the color changes between states (CLS fix)
const NAV_BASE =
  'group flex items-center gap-3 rounded-lg border text-base font-medium transition-all duration-200 pl-3.25 pr-3 py-2.5 hover:-translate-y-0.5';
const NAV_ACTIVE =
  'bg-orange-100 text-orange-700 border-transparent shadow-[inset_3px_0_0_0_#ea580c]';
const NAV_INACTIVE =
  'text-gray-700 border-gray-100 hover:bg-orange-50/40 hover:text-gray-900 hover:border-orange-100';

const getNavClass = ({ isActive }) =>
  `${NAV_BASE} ${isActive ? NAV_ACTIVE : NAV_INACTIVE}`;

const Sidebar = ({
  onClose,
  onDesktopClose,
  onAutoCollapse,
  isCollapsed,
  onExpand,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Signed out successfully');
    setTimeout(() => navigate('/login'), 900);
  };

  // ─── Icon-only collapsed strip ────────────────────────────────────
  if (isCollapsed) {
    return (
      <div className='h-full w-full bg-white flex flex-col items-center border-r border-gray-100 py-3 gap-1'>
        {/* Expand button */}
        <button
          type='button'
          onClick={onExpand}
          title='Expand sidebar'
          aria-label='Expand sidebar'
          className='w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-800 hover:bg-orange-50/40 transition-colors duration-200 mb-2 shrink-0'
        >
          <MdDoubleArrow className='text-xl' />
        </button>

        {/* Nav icons */}
        <nav
          className='flex-1 flex flex-col items-center gap-1 w-full px-2 overflow-y-auto'
          aria-label='Main navigation'
        >
          {NAV_ITEMS.map(({ name, path, icon: Icon, autoCollapse }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/admin/dashboard'}
              title={name}
              onClick={() => {
                onClose();
                if (window.innerWidth >= 1024) {
                  if (!autoCollapse && onExpand) onExpand();
                }
              }}
              className={({ isActive }) =>
                `w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-400 hover:text-gray-900 hover:bg-orange-50/40'
                }`
              }
            >
              <Icon className='text-xl' aria-hidden='true' />
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <button
          type='button'
          onClick={handleLogout}
          title='Sign Out'
          aria-label='Sign Out'
          className='mt-1 w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200 shrink-0'
        >
          <MdLogout className='text-xl' />
        </button>
      </div>
    );
  }

  return (
    <div className='h-full w-full bg-white flex flex-col border-r border-gray-100'>
      {/* Brand */}
      <div className='flex items-start justify-between px-5 pt-5 pb-4 border-b border-gray-100 shrink-0'>
        <div>
          <img
            src='/maktech_logo.png'
            alt='Maktech'
            width={120}
            height={32}
            fetchPriority='high'
            className='h-8 w-auto object-contain'
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <p className='text-sm text-gray-400 mt-1.5'>Admin Dashboard</p>
        </div>
        {/* Mobile close button */}
        <button
          type='button'
          onClick={onClose}
          className='lg:hidden mt-0.5 p-1.5 -mr-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors'
          aria-label='Close navigation'
        >
          <MdClose className='text-xl' />
        </button>
      </div>

      {/* Navigation */}
      <nav
        className='flex-1 overflow-y-auto px-3 py-5'
        aria-label='Main navigation'
      >
        <p className='px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-[0.08em]'>
          Main Menu
        </p>
        <ul className='space-y-1.5' role='list'>
          {NAV_ITEMS.map(({ name, path, icon: Icon, autoCollapse }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/admin/dashboard'}
                onClick={() => {
                  onClose();
                  if (
                    autoCollapse &&
                    onAutoCollapse &&
                    window.innerWidth >= 1024
                  )
                    onAutoCollapse();
                }}
                className={getNavClass}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`shrink-0 text-xl transition-colors ${
                        isActive
                          ? 'text-orange-600'
                          : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    <span className='truncate flex-1'>{name}</span>
                    {/* animate-nav-arrow re-fires the keyframe on every active entry */}
                    <MdChevronRight
                      className={`shrink-0 text-lg mr-0.5 text-orange-500 drop-shadow-[0_0_6px_#f97316] ${
                        isActive ? 'animate-nav-arrow' : 'opacity-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className='shrink-0 border-t border-gray-100 px-3 py-3 space-y-1.5'>
        <div className='flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50'>
          <div className='shrink-0 w-9 h-9 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-base font-bold select-none'>
            M
          </div>
          <div className='min-w-0 flex-1'>
            <p className='text-base font-semibold text-gray-900 leading-snug truncate'>
              Maktech Admin
            </p>
            <p className='text-sm text-gray-400 leading-snug truncate'>
              admin@maktech.com
            </p>
          </div>
        </div>

        <button
          type='button'
          onClick={handleLogout}
          className={`${NAV_BASE} w-full text-gray-600 border-transparent hover:bg-red-50 hover:text-red-600 hover:shadow-[inset_3px_0_0_0_#ef4444]`}
        >
          <MdLogout className='shrink-0 text-xl text-gray-400 group-hover:text-red-500 transition-colors' />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
