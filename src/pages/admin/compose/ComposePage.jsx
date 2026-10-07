import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdSend } from 'react-icons/md';
import apiClient from '../../../services/apiClient';
import { toast } from 'react-toastify';

export default function ComposePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Compose Email - Maktech Admin';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const to = formData.get('to');
    const subject = formData.get('subject');
    const html = formData.get('message');
    
    if (!to || !subject || !html) {
      return toast.error("Please fill in all fields");
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post('/api/v1/emails/send', { to, subject, html });
      if (response.data.success) {
        toast.success("Email sent successfully!");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send email");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-6 pb-8'>
      {/* Back link */}
      <button
        type='button'
        onClick={() => navigate(-1)}
        className='inline-flex cursor-pointer items-center gap-1.5 text-base text-gray-500 hover:text-gray-800 transition-colors duration-150 group'
      >
        <MdArrowBack
          className='text-lg group-hover:-translate-x-0.5 transition-transform duration-150'
          aria-hidden='true'
        />
        Back to Inbox
      </button>

      {/* Compose card */}
      <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8'>
        <h1 className='text-xl font-bold text-gray-900 mb-6'>
          Compose New Email
        </h1>

        <form onSubmit={handleSubmit} noValidate className='space-y-4'>
          {/* To */}
          <div>
            <label
              htmlFor='compose-to'
              className='block text-sm text-gray-500 mb-1.5'
            >
              To:
            </label>
            <input
              id='compose-to'
              name='to'
              type='email'
              autoComplete='email'
              required
              placeholder='client@example.com'
              className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-base text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition'
            />
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor='compose-subject'
              className='block text-sm text-gray-500 mb-1.5'
            >
              Subject:
            </label>
            <input
              id='compose-subject'
              name='subject'
              type='text'
              autoComplete='off'
              required
              placeholder='Email subject'
              className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-base text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition'
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor='compose-message'
              className='block text-sm text-gray-500 mb-1.5'
            >
              Message:
            </label>
            <textarea
              id='compose-message'
              name='message'
              rows={7}
              autoComplete='off'
              required
              placeholder='Type your message here..'
              className='w-full px-4 py-3 rounded-lg border border-gray-200 text-base text-gray-700 placeholder:text-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition'
            />
          </div>

          {/* Send */}
          <button
            type='submit'
            disabled={isLoading}
            className='group inline-flex cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <MdSend
              className='text-lg shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
              aria-hidden='true'
            />}
            <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
              Send Email
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}