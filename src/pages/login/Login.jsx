import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import apiClient from '../../services/apiClient';
import { toast } from 'react-toastify';
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
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiClient.post("/api/v1/auth/login", { email, password });
      if (response.data.success) {
        Cookies.set("authToken", response.data.data.token, { expires: 7 });
        toast.success(response.data.message || "Logged in successfully");
        const destination = "/admin/dashboard";
        navigate(destination, { replace: true });
      }
    } catch (error) {
      if (error.response?.data?.errorMessages?.length > 0) {
        toast.error(error.response.data.errorMessages[0].message);
      } else {
        toast.error(error.response?.data?.message || "Failed to login");
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className='min-h-screen relative overflow-hidden'
      style={{ backgroundColor: '#1c1c1c' }}
    >
      {/* Ã¢â€â‚¬Ã¢â€â‚¬ Full-page radial glow Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <div
        className='absolute inset-0 pointer-events-none z-0'
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 20% 55%, rgba(255,101,51,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 50%, rgba(255,101,51,0.06) 0%, transparent 55%)',
        }}
        aria-hidden='true'
      />

      {/* Ã¢â€â‚¬Ã¢â€â‚¬ Full-page animated vertical lines Ã¢â€â‚¬Ã¢â€â‚¬ */}
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

      {/* Ã¢â€â‚¬Ã¢â€â‚¬ Container Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <div className='relative z-10 mx-auto w-full max-w-350 px-5 md:px-10 xl:px-16 2xl:px-20 min-h-screen flex xl:flex-row flex-col'>
        {/* Ã¢â€â‚¬Ã¢â€â‚¬ Left Branding Panel (desktop only) Ã¢â€â‚¬Ã¢â€â‚¬ */}
        <div className='hidden xl:flex xl:w-1/2 flex-col justify-between py-12 pr-12 2xl:pr-16'>
          {/* Logo */}
          <div>
            <a href='/' aria-label='Go to home'>
              <img
                src='/maktech_logo_white.webp'
                alt='MakTech'
                className='h-7 w-auto'
              />
            </a>
          </div>

          {/* Centre copy */}
          <div className='flex flex-col gap-5 max-w-sm'>
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
              Manage projects, track leads, and oversee operations Ã¢â‚¬â€ all in one
              powerful workspace.
            </p>
          </div>

          {/* Copyright */}
          <div className='text-[#AAAAAA] text-sm'>
            © 2024 MakTech. All rights reserved.
          </div>
        </div>

        {/* Ã¢â€â‚¬Ã¢â€â‚¬ Right Form Panel Ã¢â€â‚¬Ã¢â€â‚¬ */}
        <div className='w-full xl:w-1/2 flex flex-col items-center justify-center min-h-screen xl:min-h-0 py-20 xl:py-12 xl:pl-12 2xl:pl-16'>
          {/* Mobile logo */}
          <div className='xl:hidden mb-10'>
            <a href='/' aria-label='Go to home'>
              <img
                src='/maktech_logo_white.webp'
                alt='MakTech'
                className='h-7 w-auto'
              />
            </a>
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
                      Signing in....
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
        {/* end right panel */}
      </div>
      {/* end container */}
    </div>
  );
};

export default Login;
