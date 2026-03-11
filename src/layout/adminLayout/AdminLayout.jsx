import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './adminSidebar/AdminSidebar';
import { MdMenu } from 'react-icons/md';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <div className='flex h-screen overflow-hidden bg-gray-50'>
      {/* ── Mobile backdrop overlay ── */}
      <div
        className={`fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          sidebarOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden='true'
      />

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-72 transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto lg:shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* ── Main content ── */}
      <main className='flex-1 flex flex-col min-w-0 overflow-hidden'>
        {/* Mobile top bar — visible only below lg breakpoint */}
        <header className='lg:hidden flex items-center gap-3 h-14 px-4 bg-white border-b border-gray-100 shrink-0'>
          <button
            onClick={() => setSidebarOpen(true)}
            className='p-2 -ml-1 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors'
            aria-label='Open navigation'
          >
            <MdMenu className='text-xl' />
          </button>
          <img
            src='/maktech_logo.png'
            alt='Maktech'
            width={120}
            height={28}
            fetchPriority='high'
            className='h-7 w-auto object-contain'
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </header>

        {/* Scrollable page area */}
        <div className='flex-1 overflow-y-auto'>
          <div className='container mx-auto p-5 sm:p-6 lg:p-8'>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
