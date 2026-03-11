import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  MdDashboard,
  MdEmail,
  MdPeople,
  MdShoppingCart,
  MdWork,
  MdArticle,
  MdWorkOutline,
  MdAttachMoney,
  MdLogout,
  MdClose,
} from 'react-icons/md';

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: MdDashboard },
  { name: 'Emails', path: '/admin/emails', icon: MdEmail },
  { name: 'Leads', path: '/admin/leads', icon: MdPeople },
  { name: 'Orders', path: '/admin/orders', icon: MdShoppingCart },
  { name: 'Case Studies', path: '/admin/case-studies', icon: MdWork },
  { name: 'Blog', path: '/admin/blog', icon: MdArticle },
  { name: 'Jobs', path: '/admin/jobs', icon: MdWorkOutline },
  { name: 'Pricing', path: '/admin/pricing', icon: MdAttachMoney },
];

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Signed out successfully', {
      description: 'You have been securely logged out of your account.',
    });
    setTimeout(() => navigate('/login'), 900);
  };

  return (
    <div className='h-full w-full bg-white flex flex-col border-r border-gray-100'>
      {/* ── Brand header ── */}
      <div className='flex items-center justify-between h-16 px-5 border-b border-gray-100 shrink-0'>
        <div className='flex items-center gap-2.5'>
          <img
            src='/maktech_logo.png'
            alt='Maktech'
            className='h-7 w-auto object-contain'
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className='text-[15px] font-semibold text-gray-900 tracking-tight'>
            Maktech
          </span>
        </div>

        {/* Mobile close trigger */}
        <button
          onClick={onClose}
          className='lg:hidden p-1.5 -mr-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors'
          aria-label='Close navigation'
        >
          <MdClose className='text-lg' />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav
        className='flex-1 overflow-y-auto px-3 py-5'
        aria-label='Main navigation'
      >
        <p className='px-3 mb-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-[0.12em]'>
          Main Menu
        </p>

        <ul className='space-y-0.5' role='list'>
          {menuItems.map(({ name, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/admin/dashboard'}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-150
                  ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 shadow-[inset_3px_0_0_0_#f97316] pl-3.25 pr-3 py-2.5'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 pl-3.25 pr-3 py-2.5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`shrink-0 text-[1.05rem] transition-colors ${
                        isActive
                          ? 'text-orange-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    <span className='truncate flex-1'>{name}</span>
                    {isActive && (
                      <span className='w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mr-0.5' />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Footer ── */}
      <div className='shrink-0 border-t border-gray-100 px-3 py-3 space-y-1'>
        {/* Sign out */}
        <button
          onClick={handleLogout}
          className='group w-full flex items-center gap-3 pl-3.25 pr-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-150 hover:shadow-[inset_3px_0_0_0_#ef4444]'
        >
          <MdLogout className='shrink-0 text-[1.05rem] text-gray-400 group-hover:text-red-500 transition-colors' />
          <span>Sign Out</span>
        </button>

        {/* User profile card */}
        <div className='flex items-center gap-3 px-3 py-2.5 rounded-lg'>
          <div className='shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-[13px] font-bold select-none'>
            M
          </div>
          <div className='min-w-0 flex-1'>
            <p className='text-[13px] font-semibold text-gray-900 leading-snug truncate'>
              Maktech Admin
            </p>
            <p className='text-[11px] text-gray-400 leading-snug truncate'>
              admin@maktech.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
