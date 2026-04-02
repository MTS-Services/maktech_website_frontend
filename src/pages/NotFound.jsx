import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden'>
      <div className='w-full max-w-3xl text-center px-6 flex flex-col items-center justify-center flex-1'>
        {/* Animated 404 text */}
        <h1 className='notfound-404 text-8xl font-black leading-none select-none mb-4 lg:mt-40 mt-80 text-transparent bg-clip-text bg-linear-to-r from-orange-bg-cta to-orange-bg-cta/80 animate-pulse'>
          404
        </h1>

        {/* 404 GIF */}
        <div
          className='w-full h-full bg-center bg-no-repeat bg-cover'
          style={{
            backgroundImage:
              "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
          }}
        />

        {/* Content */}
        <div className='flex flex-col items-center gap-4 mt-2  mb-40'>
          <h3 className='text-3xl font-bold text-white-bg-font'>
            Look like you&apos;re lost
          </h3>
          <p className='text-base text-gray-500 leading-relaxed'>
            The page you are looking for is not available!
          </p>
          <button
            onClick={() => navigate('/')}
            className='mt-2 px-8 py-3 bg-orange-bg-cta text-white text-base font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all duration-150 cursor-pointer'
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
