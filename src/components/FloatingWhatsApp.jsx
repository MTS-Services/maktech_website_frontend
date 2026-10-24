import { FaWhatsapp } from 'react-icons/fa6';

const WHATSAPP_URL = 'https://wa.me/8801897669234';

const FloatingWhatsApp = () => (
  <a
    href={WHATSAPP_URL}
    target='_blank'
    rel='noopener noreferrer'
    aria-label='Chat with us on WhatsApp'
    title='Chat with us on WhatsApp'
    className='group fixed bottom-5 right-5 z-[980] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform duration-200 hover:scale-110 active:scale-95 md:bottom-9 md:right-8'
  >
    <span
      aria-hidden='true'
      className='absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping'
    />
    <FaWhatsapp className='relative text-[30px]' />
  </a>
);

export default FloatingWhatsApp;
