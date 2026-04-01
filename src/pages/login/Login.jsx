import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdOutlineEmail,
  MdOutlineLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdArrowForward,
} from 'react-icons/md';

const LINE_POSITIONS = [12, 30, 50, 68, 88];

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@test.com');
  const [password, setPassword] = useState('123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate('/admin/dashboard');
    }, 700);
  };

  return (
    <div className='min-h-screen flex' style={{ backgroundColor: '#1c1c1c' }}>
      {/* ── Left Branding Panel (desktop only) ── */}
      <div
        className='hidden xl:flex xl:w-1/2 relative overflow-hidden flex-col justify-between p-12 2xl:p-16'
        style={{
          background:
            'radial-gradient(ellipse 90% 110% at 20% 55%, rgba(255,101,51,0.13) 0%, rgba(255,101,51,0.04) 52%, transparent 70%), #1c1c1c',
        }}
      >
        {/* Animated vertical lines */}
        <div
          className='absolute inset-0 pointer-events-none z-0'
          aria-hidden='true'
        >
          {LINE_POSITIONS.map((pos, i) => (
            <div
              key={pos}
              className='absolute top-0 bottom-0 w-px'
              style={{
                left: `${pos}%`,
                background:
                  'linear-gradient(to bottom, transparent, rgba(255,255,255,0.055), transparent)',
              }}
            >
              <div
                className='absolute w-0.5 h-14 rounded-full animate-dropFall'
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background:
                    'linear-gradient(to bottom, rgba(255,255,255,0.04), #FF6533)',
                  animationDelay: `${i * 2}s`,
                  opacity: 0.55,
                }}
              />
              <div
                className='absolute w-0.5 h-10 rounded-full animate-dropFall'
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background:
                    'linear-gradient(to bottom, rgba(255,255,255,0.04), #FF6533)',
                  animationDelay: `${i * 2 + 4}s`,
                  opacity: 0.38,
                }}
              />
            </div>
          ))}
        </div>

        {/* Logo */}
        <div className='relative z-10'>
          <img
            src='/maktech_logo_white.png'
            alt='MakTech'
            className='h-7 w-auto'
          />
        </div>

        {/* Centre copy */}
        <div className='relative z-10 flex flex-col gap-5 max-w-sm'>
          {/* Badge */}
          <div
            className='inline-flex items-center gap-2 px-3 py-1.5 rounded-md w-fit'
            style={{
              backgroundColor: 'rgba(255,101,51,0.08)',
              border: '1px solid rgba(255,101,51,0.22)',
            }}
          >
            <span className='relative flex items-center justify-center w-3.5 h-3.5'>
              <span className='absolute w-full h-full bg-orange-bg-cta rounded-full opacity-30' />
              <span className='w-2 h-2 bg-orange-bg-cta rounded-full' />
            </span>
            <span className='text-sm font-medium text-[#AAAAAA]'>
              Admin Portal
            </span>
          </div>

          {/* Heading */}
          <h2 className='text-3xl xl:text-4xl 2xl:text-[46px] font-medium leading-tight tracking-tight'>
            <span style={{ color: '#ffffff' }}>Welcome </span>
            <span style={{ color: '#BFBDBD' }}>Back </span>
            <span style={{ color: '#AAAAAA' }}>to</span>
            <br />
            <span style={{ color: '#ffffff' }}>MakTech </span>
            <span style={{ color: '#ff6533' }}>Dashboard</span>
          </h2>

          <p className='text-[#AAAAAA] text-base 2xl:text-lg leading-relaxed'>
            Manage projects, track leads, and oversee operations — all in one
            powerful workspace.
          </p>
        </div>

        {/* Copyright */}
        <div className='relative z-10 text-[#AAAAAA] text-sm'>
          © 2024 MakTech. All rights reserved.
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div
        className='w-full xl:w-1/2 flex flex-col items-center justify-center min-h-screen px-5 py-20 md:px-10 xl:px-12 2xl:px-16 relative'
        style={{
          background:
            'radial-gradient(ellipse 100% 70% at 80% 50%, rgba(255,101,51,0.07) 0%, transparent 60%), #1c1c1c',
        }}
      >
        {/* Mobile logo */}
        <div className='xl:hidden mb-10'>
          <img
            src='/maktech_logo_white.png'
            alt='MakTech'
            className='h-7 w-auto'
          />
        </div>

        <div className='w-full max-w-110'>
          {/* Card */}
          <div
            className='p-7 md:p-10'
            style={{
              backgroundColor: 'rgba(66, 66, 66, 0.18)',
              backdropFilter: 'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
            }}
          >
            {/* Card header */}
            <div className='mb-7'>
              <h1 className='text-2xl md:text-3xl font-bold text-white mb-1.5'>
                Sign In
              </h1>
              <p className='text-[#AAAAAA] text-base'>
                Enter your credentials to access the admin dashboard.
              </p>
            </div>

            {/* Demo credentials hint */}
            <div
              className='mb-6 p-3.5 flex items-start gap-3'
              style={{
                backgroundColor: 'rgba(255,101,51,0.07)',
                border: '1px solid rgba(255,101,51,0.22)',
              }}
            >
              <span
                className='shrink-0 mt-0.5 flex items-center justify-center rounded-full'
                style={{
                  width: '18px',
                  height: '18px',
                  border: '1px solid rgba(255,101,51,0.5)',
                  color: '#ff6533',
                }}
              >
                <svg
                  width='9'
                  height='9'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' />
                </svg>
              </span>
              <div>
                <p className='text-sm font-semibold text-orange-bg-cta mb-1'>
                  Demo Credentials
                </p>
                <p className='text-sm text-[#AAAAAA]'>
                  Email:{' '}
                  <span className='text-white font-medium'>admin@test.com</span>
                </p>
                <p className='text-sm text-[#AAAAAA]'>
                  Password: <span className='text-white font-medium'>123</span>
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-4' noValidate>
              {/* Email */}
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-[#AAAAAA] mb-2'
                >
                  Email Address
                </label>
                <div className='relative'>
                  <span className='absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#555]'>
                    <MdOutlineEmail size={19} />
                  </span>
                  <input
                    id='email'
                    type='email'
                    autoComplete='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='admin@test.com'
                    className='w-full pl-10 pr-4 py-3 text-white placeholder-[#444] text-base focus:outline-none transition-colors duration-200'
                    style={{
                      backgroundColor: 'rgba(66,66,66,0.28)',
                      border: '1px solid rgba(255,255,255,0.09)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        'rgba(255,101,51,0.55)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        'rgba(255,255,255,0.09)';
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-[#AAAAAA] mb-2'
                >
                  Password
                </label>
                <div className='relative'>
                  <span className='absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#555]'>
                    <MdOutlineLock size={19} />
                  </span>
                  <input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    className='w-full pl-10 pr-11 py-3 text-white placeholder-[#444] text-base focus:outline-none transition-colors duration-200'
                    style={{
                      backgroundColor: 'rgba(66,66,66,0.28)',
                      border: '1px solid rgba(255,255,255,0.09)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        'rgba(255,101,51,0.55)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        'rgba(255,255,255,0.09)';
                    }}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((v) => !v)}
                    className='absolute right-3.5 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#AAAAAA] transition-colors duration-150'
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <MdOutlineVisibilityOff size={19} />
                    ) : (
                      <MdOutlineVisibility size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type='submit'
                disabled={isLoading}
                className='w-full mt-1 flex items-center justify-center gap-2.5 py-3.5 text-white font-semibold text-base transition-opacity duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-60'
                style={{ backgroundColor: '#ff6533' }}
              >
                {isLoading ? (
                  <>
                    <svg
                      className='animate-spin h-4.5 w-4.5 shrink-0'
                      viewBox='0 0 24 24'
                      fill='none'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      />
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                      />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <MdArrowForward className='text-xl shrink-0' />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Mobile copyright */}
          <p className='xl:hidden text-center text-[#AAAAAA] text-sm mt-8'>
            © 2024 MakTech. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
