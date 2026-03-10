/**
 * Sidebar Navigation Component
 * 
 * This component renders the left sidebar navigation for the admin dashboard.
 * It provides navigation links to all major sections of the admin panel.
 * 
 * Features:
 * - Active link highlighting (shows which page user is on)
 * - Icon support via react-icons
 * - Smooth hover effects with custom Tailwind colors
 * - Full height with custom scrollbar styling
 * 
 * Navigation Items:
 * - Dashboard, Emails, Leads, Orders, Case Studies, Blog, Jobs, Pricing
 */

import { NavLink } from 'react-router-dom'
import { 
  MdDashboard, 
  MdEmail, 
  MdPeople, 
  MdShoppingCart,
  MdWork,
  MdArticle,
  MdWorkOutline,
  MdAttachMoney,
  MdLogout
} from 'react-icons/md'

const Sidebar = () => {
  /**
   * Navigation menu items configuration
   * Each item has:
   * - name: Display text
   * - path: Route path (relative to /admin)
   * - icon: React icon component
   */
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: MdDashboard },
    { name: 'Emails', path: '/admin/emails', icon: MdEmail },
    { name: 'Leads', path: '/admin/leads', icon: MdPeople },
    { name: 'Orders', path: '/admin/orders', icon: MdShoppingCart },
    { name: 'Case Studies', path: '/admin/case-studies', icon: MdWork },
    { name: 'Blog', path: '/admin/blog', icon: MdArticle },
    { name: 'Jobs', path: '/admin/jobs', icon: MdWorkOutline },
    { name: 'Pricing', path: '/admin/pricing', icon: MdAttachMoney },
  ]

  /**
   * Dynamic class name function for NavLink
   * Applies active styles when the link matches the current route
   * 
   * @param {boolean} isActive - True if this link matches current route
   * @returns {string} CSS class names
   */
  const getLinkClassName = ({ isActive }) => {
    const baseClasses = 'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200'
    const activeClasses = 'bg-black-bg-cta text-white font-medium shadow-sm'
    const inactiveClasses = 'text-gray-700 hover:bg-gray-100 border border-gray-200'
    
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
  }

  return (
    <div className="h-full bg-white flex flex-col shadow-lg border border-r-2 border-gray-100">
      {/* Sidebar Header */}
      <div className="p-6">
        <img src='/public/maktech_logo.png'/>
        <p className="text-base text-gray-500 mt-2">Admin Dashboard</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={getLinkClassName}
                  /**
                   * Adding 'end' prop to ensure exact matching
                   * Without it, /admin/dashboard would match /admin/dashboard-settings
                   */
                  end
                >
                  {/* Icon */}
                  <Icon className="text-xl shrink-0" />
                  
                  {/* Link Text */}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button className="w-full bg-black-bg-cta text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-start gap-2 hover:opacity-90 transition-all duration-200 shadow-sm">
          <MdLogout className="text-xl" />
          Logout
        </button>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-black-bg-cta flex items-center justify-center text-white font-semibold">
            M
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Maktech</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
