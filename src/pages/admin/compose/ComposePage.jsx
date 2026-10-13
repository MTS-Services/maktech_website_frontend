import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MdArrowBack, MdSend, MdTrackChanges, MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import apiClient from '../../../services/apiClient';

export default function ComposePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [to, setTo] = useState(searchParams.get('to') || '');
  const [subject, setSubject] = useState(searchParams.get('subject') || '');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    document.title = 'Compose Email – Maktech Admin';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!to.trim() || !subject.trim() || !message.trim()) {
      toast.error('Please fill in all fields (To, Subject, and Message).');
      return;
    }

    // Convert newlines to HTML paragraphs/breaks if plain text
    const formattedHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
        ${message
          .split('\n\n')
          .map((paragraph) => `<p style="margin-bottom: 16px;">${paragraph.replace(/\n/g, '<br/>')}</p>`)
          .join('')}
      </div>
    `;

    setIsSending(true);
    try {
      const res = await apiClient.post('/api/v1/emails/send', {
        to: to.trim(),
        subject: subject.trim(),
        html: formattedHtml,
      });

      if (res.data?.success) {
        toast.success('Email sent successfully! Read & click tracking is now active.');
        navigate('/admin/emails');
      } else {
        throw new Error(res.data?.message || 'Failed to send email');
      }
    } catch (err) {
      console.error('Send email error:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to send email';
      toast.error(msg);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className='space-y-6 pb-8'>
      {/* Back link */}
      <button
        type='button'
        onClick={() => navigate('/admin/emails')}
        className='inline-flex cursor-pointer items-center gap-1.5 text-base text-gray-500 hover:text-gray-800 transition-colors duration-150 group'
      >
        <MdArrowBack
          className='text-lg group-hover:-translate-x-0.5 transition-transform duration-150'
          aria-hidden='true'
        />
        Back to Emails
      </button>

      {/* Compose card */}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8'>
        <div className='flex flex-wrap items-center justify-between gap-3 mb-6'>
          <div>
            <h1 className='text-xl font-bold text-gray-900'>
              Compose New Email
            </h1>
            <p className='text-xs sm:text-sm text-gray-400 mt-0.5'>
              Send direct messages to clients with real-time delivery and read receipt tracking
            </p>
          </div>

          {/* Tracking Badge */}
          <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200'>
            <MdTrackChanges className='text-sm text-emerald-600 animate-pulse' />
            <span>Open & Click Tracking Active</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className='space-y-5'>
          {/* To */}
          <div>
            <label
              htmlFor='compose-to'
              className='block text-sm font-medium text-gray-700 mb-1.5'
            >
              Recipient Email <span className='text-rose-500'>*</span>
            </label>
            <input
              id='compose-to'
              name='to'
              type='email'
              autoComplete='email'
              required
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder='client@example.com'
              className='w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6533]/30 focus:border-[#ff6533] transition bg-white'
            />
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor='compose-subject'
              className='block text-sm font-medium text-gray-700 mb-1.5'
            >
              Subject <span className='text-rose-500'>*</span>
            </label>
            <input
              id='compose-subject'
              name='subject'
              type='text'
              autoComplete='off'
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder='e.g. Website Development Proposal & Scope of Work'
              className='w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6533]/30 focus:border-[#ff6533] transition bg-white'
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor='compose-message'
              className='block text-sm font-medium text-gray-700 mb-1.5'
            >
              Email Content / Message <span className='text-rose-500'>*</span>
            </label>
            <textarea
              id='compose-message'
              name='message'
              rows={8}
              autoComplete='off'
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Type your message here... Any links you include (e.g. https://yourwebsite.com) will be automatically tracked for clicks.'
              className='w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#ff6533]/30 focus:border-[#ff6533] transition bg-white leading-relaxed'
            />
          </div>

          {/* Tracking info strip */}
          <div className='p-3.5 rounded-xl bg-orange-50/50 border border-orange-100 flex items-center gap-2.5 text-xs text-gray-600'>
            <MdCheckCircle className='text-base text-[#ff6533] shrink-0' />
            <span>
              An invisible tracking beacon and secure redirect links will be automatically attached so you can see when the recipient opens this email and where they view it from.
            </span>
          </div>

          {/* Send */}
          <div className='pt-2'>
            <button
              type='submit'
              disabled={isSending}
              className={`group inline-flex cursor-pointer items-center gap-2 overflow-hidden px-6 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-xl hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97] ${
                isSending ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSending ? (
                <>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  <span>Sending</span>
                </>
              ) : (
                <>
                  <MdSend
                    className='text-lg shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
                    aria-hidden='true'
                  />
                  <span>Send Email</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

