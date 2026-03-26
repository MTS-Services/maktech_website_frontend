import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6';
import { MdKeyboardArrowDown } from 'react-icons/md';

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);
  const desktopBrandRef = useRef(null);
  const mobileBrandRef = useRef(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    const targets = [desktopBrandRef.current, mobileBrandRef.current].filter(
      Boolean,
    );
    if (!targets.length) return;

    // Clip below container — overflow-hidden keeps it invisible
    gsap.set(targets, { y: 600, opacity: 0 });

    let isShowing = false;

    const handleScroll = () => {
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 120;

      if (atBottom && !isShowing) {
        isShowing = true;
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: 'power4.out',
          overwrite: true,
        });
      } else if (!atBottom && isShowing) {
        isShowing = false;
        gsap.to(targets, {
          y: 600,
          opacity: 0,
          duration: 0.2,
          ease: 'power4.in',
          overwrite: true,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className='relative overflow-hidden'>
      {/* ── Top CTA Section ── */}
      <section
        aria-label='Call to action'
        className='relative overflow-hidden'
        style={{
          /* Orange glow centred in the section */
          background:
            'radial-gradient(ellipse 80% 120% at 50% 50%, rgba(255,101,51,0.09) 0%, rgba(255,101,51,0.03) 55%, transparent 72%), #1c1c1c',
        }}
      >
        {/* Scoped animated vertical lines — absolute so they clip to this section */}
        <div
          className='absolute inset-0 pointer-events-none overflow-hidden z-0'
          aria-hidden='true'
        >
          {[12, 30, 50, 68, 88].map((pos, i) => (
            <div
              key={pos}
              className='absolute top-0 bottom-0 w-px bg-linear-to-b from-transparent via-gray-600/50 to-transparent'
              style={{ left: `${pos}%` }}
            >
              <div
                className='absolute w-0.5 h-12 rounded-full opacity-70'
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(to bottom, #1C1C1C, #FF6533)',
                  animation: `dropFall 8s linear infinite`,
                  animationDelay: `${i * 2}s`,
                  animationFillMode: 'backwards',
                }}
              />
              <div
                className='absolute w-0.5 h-10 rounded-full opacity-50'
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(to bottom, #1C1C1C, #FF6533)',
                  animation: `dropFall 8s linear infinite`,
                  animationDelay: `${i * 2 + 4}s`,
                  animationFillMode: 'backwards',
                }}
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className='relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28 text-center'>
          <h2 className='text-white text-2xl md:text-4xl font-bold mb-4'>
            Want to grow with us?
          </h2>
          <p className='text-gray-400 text-sm md:text-base mb-8'>
            Let&apos;s implement your skills toward
            <br />
            to grow MAKTECH.
          </p>
          <NavLink
            to='/contact'
            className='inline-block bg-orange-bg-cta hover:bg-[#d14608] text-white px-8 py-3 rounded-full text-base font-medium transition-colors duration-200'
          >
            Contact Now
          </NavLink>
        </div>
      </section>

      {/* Footer Content */}
      <div className='relative'>
        {/* Desktop Footer Content */}
        <div className='hidden md:block relative z-10 max-w-7xl mx-auto px-4 py-12'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Column 1 - Logo & Social Card */}
            <div className='bg-[#2a2a2a] border border-white/10 rounded-2xl p-6'>
              <div className='flex items-center gap-2 mb-6'>
                <img
                  src='/maktech_logo_white.png'
                  alt='maktech logo'
                  className='h-6 w-auto'
                />
              </div>

              {/* Social Media Icons */}
              <div className='flex items-center gap-3 mb-6'>
                <a
                  href='https://www.facebook.com/maktechgroup'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-orange-bg-cta border border-white/5 flex items-center justify-center transition-all duration-200'
                  aria-label='Facebook'
                >
                  <FaFacebook className='text-white text-lg' />
                </a>
                <a
                  href='https://www.instagram.com/maktechgroup/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-orange-bg-cta border border-white/5 flex items-center justify-center transition-all duration-200'
                  aria-label='Instagram'
                >
                  <FaInstagram className='text-white text-lg' />
                </a>
                <a
                  href='https://www.linkedin.com/company/maktechgroup'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-orange-bg-cta border border-white/5 flex items-center justify-center transition-all duration-200'
                  aria-label='LinkedIn'
                >
                  <FaLinkedinIn className='text-white text-lg' />
                </a>
                <a
                  href='https://x.com/MakTechSolution'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-orange-bg-cta border border-white/5 flex items-center justify-center transition-all duration-200'
                  aria-label='X (Twitter)'
                >
                  <FaXTwitter className='text-white text-lg' />
                </a>
              </div>

              {/* Tagline */}
              <p className='text-gray-400 text-sm leading-relaxed'>
                Let&apos;s turn your idea into a powerful digital solution
                starting today.
              </p>
            </div>

            {/* Column 2 - Quick Link */}
            <div className='justify-self-center '>
              <h3 className='text-white text-base font-normal mb-4'>
                Quick Link
              </h3>
              <ul className='space-y-3'>
                <li>
                  <NavLink
                    to='/about'
                    className='text-gray-400 hover:text-orange-bg-cta transition-colors duration-200 text-sm'
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/services'
                    className='text-gray-400 hover:text-orange-bg-cta transition-colors duration-200 text-sm'
                  >
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/case-study'
                    className='text-gray-400 hover:text-orange-bg-cta transition-colors duration-200 text-sm'
                  >
                    Case Study&apos;s
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/contact'
                    className='text-gray-400 hover:text-orange-bg-cta transition-colors duration-200 text-sm'
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Column 3 - Contacts */}
            <div>
              <h3 className='text-white text-base font-normal mb-4'>
                Get in Touch
              </h3>
              <ul className='space-y-3'>
                <li className='text-gray-400 text-sm italic'>
                  maktechgroup@gmail.com
                </li>
                <li className='text-gray-400 text-sm'>+88 01897-669233</li>
                <li className='text-gray-400 text-sm'>
                  8th Floor, A, Majid Tower, Ka-24 Progati Sarani Rd, Dhaka 1229
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Footer Content (Accordion) */}
        <div className='md:hidden relative z-10 px-4 py-8'>
          {/* Logo & Social Card */}
          <div className='bg-[#2a2a2a] border border-white/10 rounded-2xl p-6 mb-6'>
            <div className='flex items-center gap-2 mb-6'>
              <img
                src='/maktech_logo_white.png'
                alt='maktech logo'
                className='h-6 w-auto'
              />
            </div>

            {/* Social Media Icons */}
            <div className='flex items-center gap-3 mb-6'>
              <a
                href='https://www.facebook.com/maktechgroup'
                target='_blank'
                rel='noopener noreferrer'
                className='group w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-orange-bg-cta border border-white/5 flex items-center justify-center transition-all duration-200'
                aria-label='Facebook'
              >
                <FaFacebook className='text-white text-lg' />
              </a>
              <a
                href='https://www.instagram.com/maktechgroup/'
                target='_blank'
                rel='noopener noreferrer'
                className='group w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-orange-bg-cta border border-white/5 flex items-center justify-center transition-all duration-200'
                aria-label='Instagram'
              >
                <FaInstagram className='text-white text-lg' />
              </a>
              <a
                href='https://www.linkedin.com/company/maktechgroup'
                target='_blank'
                rel='noopener noreferrer'
                className='group w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-orange-bg-cta border border-white/5 flex items-center justify-center transition-all duration-200'
                aria-label='LinkedIn'
              >
                <FaLinkedinIn className='text-white text-lg' />
              </a>
              <a
                href='https://x.com/MakTechSolution'
                target='_blank'
                rel='noopener noreferrer'
                className='group w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-orange-bg-cta border border-white/5 flex items-center justify-center transition-all duration-200'
                aria-label='X (Twitter)'
              >
                <FaXTwitter className='text-white text-lg' />
              </a>
            </div>

            {/* Tagline */}
            <p className='text-gray-400 text-sm leading-relaxed'>
              Let&apos;s turn your idea into a powerful digital
              solution—starting today.
            </p>
          </div>

          {/* Quick Link Accordion */}
          <div className='border-b border-white/10'>
            <button
              onClick={() => toggleSection('quicklink')}
              className='w-full flex items-center justify-between py-4 text-white text-base font-normal'
            >
              Quick Link
              <MdKeyboardArrowDown
                className={`transition-transform duration-200 text-white text-xl ${
                  openSection === 'quicklink' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openSection === 'quicklink' && (
              <div className='pb-4 space-y-3'>
                <NavLink
                  to='/about'
                  className='block text-gray-400 hover:text-white transition-colors duration-200 text-sm'
                >
                  About Us
                </NavLink>
                <NavLink
                  to='/services'
                  className='block text-gray-400 hover:text-white transition-colors duration-200 text-sm'
                >
                  Services
                </NavLink>
                <NavLink
                  to='/case-study'
                  className='block text-gray-400 hover:text-white transition-colors duration-200 text-sm'
                >
                  Case Study&apos;s
                </NavLink>
                <NavLink
                  to='/contact'
                  className='block text-gray-400 hover:text-white transition-colors duration-200 text-sm'
                >
                  Contact
                </NavLink>
              </div>
            )}
          </div>

          {/* Contacts Accordion */}
          <div className='border-b border-white/10'>
            <button
              onClick={() => toggleSection('contacts')}
              className='w-full flex items-center justify-between py-4 text-white text-base font-normal'
            >
              Contacts
              <MdKeyboardArrowDown
                className={`transition-transform duration-200 text-white text-xl ${
                  openSection === 'contacts' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openSection === 'contacts' && (
              <div className='pb-4 space-y-3'>
                <p className='text-gray-400 text-sm italic'>
                  maktechgroup@gmail.com
                </p>
                <p className='text-gray-400 text-sm'>+88 01897-669233</p>
                <p className='text-gray-400 text-sm'>
                  8th Floor, A, Majid Tower, Ka-24 Progati Sarani Rd, Dhaka 1229
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Copyright Section with Orange Gradient */}
        <div className='relative overflow-hidden h-72 md:h-100 '>
          {/* Dark-to-orange layered glow */}
          {/* <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(18,18,18,1) 0%, rgba(20,20,20,0.98) 52%, rgba(22,22,22,0.78) 72%, rgba(255,101,51,0.20) 90%, rgba(255,101,51,0.45) 100%)",
            }}
          /> */}
          <div className='absolute inset-x-0 -bottom-28 h-[120%] pointer-events-none bg-[radial-gradient(62%_115%_at_50%_100%,rgba(255,101,51,0.70)_0%,rgba(255,101,51,0.70)_38%,rgba(255,101,51,0.10)_62%,rgba(255,101,51,0)_82%)]' />

          {/* Animated Brand Text at Top of Copyright Section */}
          <div
            ref={desktopBrandRef}
            className='hidden md:flex absolute inset-x-0 top-6 z-10 justify-center will-change-transform'
          >
            <p className='select-none leading-none text-[72px] lg:text-[240px] font-extrabold tracking-[0.08em] text-orange-bg-cta/45'>
              maktech
            </p>
          </div>

          {/* Mobile Brand Text */}
          <div
            ref={mobileBrandRef}
            className='md:hidden absolute inset-x-0 top-10 z-10 flex justify-center pointer-events-none will-change-transform'
          >
            <p className='select-none leading-none text-[62px] font-extrabold tracking-[0.06em] text-orange-bg-cta/40'>
              maktech
            </p>
          </div>

          {/* Vertical strip effect */}
          {/* <div className="absolute inset-0 pointer-events-none">
            <div className="h-full max-w-7xl mx-auto px-4 md:px-0 hidden md:flex">
              {Array.from({ length: 14 }).map((_, idx) => (
                <div key={idx} className="flex-1 border-r border-white/10" />
              ))}
            </div>
          </div> */}

          <div className='absolute inset-x-0 bottom-0 z-10 max-w-7xl mx-auto px-4 py-2 md:py-3'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
              <p className='text-gray-400 text-sm'>©2026 maktech</p>
              <div className='flex items-center gap-6'>
                {/* <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors duration-200 text-sm'
                >
                  Label here
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors duration-200 text-sm'
                >
                  Label here
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
