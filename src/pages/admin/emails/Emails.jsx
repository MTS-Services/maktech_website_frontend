import { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../../components/StatCard';
import AdminTable from '../../../components/AdminTable';
import Pagination from '../../../components/Pagination';
import { getPageRange } from '../../../utils/helpers';
import apiClient from '../../../services/apiClient';
import { toast } from 'react-toastify';
import {
  MdEmail,
  MdScheduleSend,
  MdReply,
  MdAdd,
  MdArrowBack,
  MdVisibility,
  MdLocationOn,
  MdDevices,
  MdMouse,
  MdCheckCircle,
  MdAccessTime,
  MdRefresh,
  MdSearch,
  MdTrackChanges,
} from 'react-icons/md';

const PAGE_SIZE = 4;

/**
 * ─── DEDICATED SENT EMAIL DETAIL PAGE VIEW ───
 */
function SentEmailDetailView({ email, onBack, onRefresh }) {
  const navigate = useNavigate();
  const isClicked = email.isClicked;
  const isOpened = email.isOpened;

  return (
    <div className='space-y-6 pb-8 animate-in fade-in duration-200'>
      {/* Top Navigation Bar */}
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <button
          type='button'
          onClick={onBack}
          className='flex items-center text-[13px] text-gray-500 hover:text-gray-800 transition-colors font-medium cursor-pointer'
        >
          <MdArrowBack size={16} className='mr-1.5' /> Back to Sent Emails
        </button>

        <div className='flex items-center gap-2.5'>
          <button
            type='button'
            onClick={onRefresh}
            className='inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:text-[#ff6533] shadow-2xs transition cursor-pointer'
          >
            <MdRefresh className='text-sm' />
            <span>Refresh Status</span>
          </button>
          <button
            type='button'
            onClick={() => navigate('/admin/compose')}
            className='inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-bg-cta text-white text-xs font-semibold hover:bg-[#e5501a] shadow-2xs transition cursor-pointer'
          >
            <MdAdd className='text-sm' />
            <span>Compose Email</span>
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6'>
        {/* Header Strip */}
        <div className='flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-5'>
          <div>
            <span className='inline-flex items-center gap-1.5 text-xs font-bold text-[#ff6533] uppercase tracking-wider bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200'>
              <MdTrackChanges className='text-sm' />
              Email Tracking Intelligence
            </span>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mt-2.5 leading-snug'>
              {email.subject || '(No Subject)'}
            </h1>
            <p className='text-sm text-gray-500 mt-1'>
              Sent to <span className='font-semibold text-gray-800'>{email.toEmail}</span> &bull;{' '}
              <span>{new Date(email.sentAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
            </p>
          </div>

          <div className='flex items-center gap-2 flex-wrap'>
            {isClicked && (
              <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200'>
                <MdMouse className='text-sm text-purple-600' />
                <span>Link Clicked ({email.clickCount})</span>
              </span>
            )}
            {isOpened ? (
              <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200'>
                <span className='w-2 h-2 rounded-full bg-emerald-500 animate-ping' />
                <span>Opened</span>
              </span>
            ) : (
              <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500'>
                <MdAccessTime className='text-xs' />
                <span>Unopened</span>
              </span>
            )}
          </div>
        </div>

        {/* 4 Quick Metrics Cards */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='p-4 rounded-xl bg-gray-50 border border-gray-100'>
            <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Read Status</p>
            <p className='text-base font-extrabold text-gray-900 mt-1.5 flex items-center gap-1.5'>
              {email.isOpened ? (
                <span className='text-emerald-700 font-bold flex items-center gap-1.5'>
                  <span className='w-2 h-2 rounded-full bg-emerald-500' />
                  Opened
                </span>
              ) : (
                <span className='text-gray-400 font-semibold'>Unopened</span>
              )}
            </p>
          </div>

          <div className='p-4 rounded-xl bg-emerald-50/60 border border-emerald-100'>
            <p className='text-xs font-semibold text-emerald-600 uppercase tracking-wider'>First Opened</p>
            <p className='text-sm font-bold text-emerald-800 mt-1.5'>
              {email.firstOpenedAt
                ? new Date(email.firstOpenedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                : 'Not yet opened'}
            </p>
          </div>

          <div className='p-4 rounded-xl bg-purple-50/60 border border-purple-100'>
            <p className='text-xs font-semibold text-purple-600 uppercase tracking-wider'>Links Clicked</p>
            <p className='text-xl font-extrabold text-purple-800 mt-1'>
              {email.clickCount || 0}
            </p>
          </div>

          <div className='p-4 rounded-xl bg-blue-50/60 border border-blue-100'>
            <p className='text-xs font-semibold text-blue-600 uppercase tracking-wider'>Client Device</p>
            <p className='text-sm font-bold text-blue-800 mt-1.5 truncate'>
              {email.device || 'Desktop'} &bull; {email.browser || 'Browser'}
            </p>
          </div>
        </div>



        {/* Live Engagement Timeline */}
        <div className='pt-2'>
          <h2 className='text-base font-bold text-gray-900 mb-4'>Live Engagement Timeline</h2>
          <div className='border-l-2 border-orange-200 ml-4 space-y-5 pl-5 py-1'>
            {/* Server Dispatch */}
            <div className='relative'>
              <span className='absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#ff6533] border-2 border-white shadow-xs' />
              <p className='text-sm font-bold text-gray-800'>Email Dispatched</p>
              <p className='text-xs text-gray-400 mt-0.5'>
                {new Date(email.sentAt).toLocaleString()}
              </p>
            </div>

            {/* Activities */}
            {email.activities && email.activities.length > 0 ? (
              email.activities.map((act, idx) => (
                <div key={act.id || idx} className='relative'>
                  <span
                    className={`absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs ${
                      act.type === 'CLICK' ? 'bg-purple-500' : 'bg-emerald-500'
                    }`}
                  />
                  <p className='text-sm font-bold text-gray-800'>
                    {act.type === 'CLICK' ? (
                      <span className='text-purple-700'>
                        Clicked Link:{' '}
                        <span className='font-mono font-normal underline'>
                          {act.targetUrl
                            ? (() => {
                                try {
                                  return new URL(act.targetUrl).hostname;
                                } catch {
                                  return act.targetUrl;
                                }
                              })()
                            : 'Target URL'}
                        </span>
                      </span>
                    ) : (
                      <span className='text-emerald-700'>
                        Email Opened in {act.city || act.country || 'Client App'}
                      </span>
                    )}
                  </p>
                  <p className='text-xs text-gray-400 mt-0.5'>
                    {new Date(act.createdAt).toLocaleString()} &bull; {act.device || 'Desktop'} ({act.browser || 'Browser'})
                  </p>
                </div>
              ))
            ) : email.isOpened ? (
              <div className='relative'>
                <span className='absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs' />
                <p className='text-sm font-bold text-emerald-700'>Email Viewed by Client</p>
                <p className='text-xs text-gray-400 mt-0.5'>
                  {new Date(email.firstOpenedAt).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className='text-xs text-gray-400 italic'>No recipient opens recorded yet.</p>
            )}
          </div>
        </div>

        {/* Message Content Preview */}
        <div className='pt-2'>
          <h2 className='text-base font-bold text-gray-900 mb-3'>Email Message Content</h2>
          <div className='p-6 rounded-2xl bg-gray-50 border border-gray-100 text-sm text-gray-800 leading-relaxed max-h-96 overflow-y-auto'>
            {email.html ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: email.html.replace(/<img[^>]*track\/open[^>]*>/gi, ''),
                }}
              />
            ) : (
              <p className='whitespace-pre-wrap'>{email.text || 'No message content'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ─── DEDICATED INBOX EMAIL DETAIL PAGE VIEW ───
 */
function InboxEmailDetailView({ email, onBack }) {
  const navigate = useNavigate();

  const handleReply = () => {
    const replyEmail = email.from?.match(/<([^>]+)>/)?.[1] || email.from || '';
    const replySubject = email.subject
      ? email.subject.startsWith('Re:')
        ? email.subject
        : `Re: ${email.subject}`
      : '';
    navigate(
      `/admin/compose?to=${encodeURIComponent(replyEmail)}&subject=${encodeURIComponent(replySubject)}`
    );
  };

  return (
    <div className='space-y-6 pb-8 animate-in fade-in duration-200'>
      {/* Top Back Navigation Bar */}
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <button
          type='button'
          onClick={onBack}
          className='flex items-center text-[13px] text-gray-500 hover:text-gray-800 transition-colors font-medium cursor-pointer'
        >
          <MdArrowBack size={16} className='mr-1.5' /> Back to Inbox
        </button>

        <button
          type='button'
          onClick={handleReply}
          className='inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-bg-cta text-white text-xs font-semibold hover:bg-[#e5501a] shadow-2xs transition cursor-pointer'
        >
          <MdReply className='text-base' />
          <span>Reply to Client</span>
        </button>
      </div>

      {/* Main Message Card */}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6'>
        {/* Header */}
        <div className='flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-5'>
          <div>
            <span className='inline-flex items-center gap-1 text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200'>
              <MdEmail className='text-sm' />
              Client Inbox Message
            </span>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mt-2.5 leading-snug'>
              {email.subject || '(No Subject)'}
            </h1>
          </div>

          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200'>
            <MdCheckCircle className='text-sm' />
            <span>Read</span>
          </span>
        </div>

        {/* Sender Meta Strip */}
        <div className='flex items-center gap-3.5 p-4 rounded-xl bg-gray-50 border border-gray-100'>
          <div className='w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-base'>
            {(email.from || 'CL').slice(0, 2).toUpperCase()}
          </div>
          <div className='min-w-0 flex-1'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
              <p className='text-sm font-bold text-gray-900 truncate'>{email.from}</p>
              <span className='text-xs text-gray-400'>
                {email.date
                  ? new Date(email.date).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })
                  : ''}
              </span>
            </div>
            <p className='text-xs text-gray-500 mt-0.5'>
              Recipient: <span className='font-semibold text-gray-700'>{email.to || 'Maktech Services'}</span>
            </p>
          </div>
        </div>

        {/* Message Body */}
        <div>
          <h2 className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5'>Message Content</h2>
          <div className='p-6 rounded-2xl bg-white border border-gray-100 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap min-h-[160px]'>
            {email.html ? (
              <div dangerouslySetInnerHTML={{ __html: email.html }} />
            ) : (
              <p>{email.text || email.body || 'No message content'}</p>
            )}
          </div>
        </div>

        {/* Quick Action Footer */}
        <div className='pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100'>
          <p className='text-xs text-gray-400'>
            Reply will be sent directly through SMTP with active read tracking attached.
          </p>
          <button
            type='button'
            onClick={handleReply}
            className='inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-bg-cta text-white text-xs font-semibold hover:bg-[#e5501a] shadow-xs transition cursor-pointer'
          >
            <MdReply className='text-base' />
            <span>Compose Direct Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * ─── MAIN EMAILS PAGE COMPONENT ───
 */
export default function Emails() {
  const navigate = useNavigate();

  // Active Tab: 'SENT_TRACKING' or 'INBOX'
  const [activeTab, setActiveTab] = useState('SENT_TRACKING');

  // Sent Emails State
  const [sentEmails, setSentEmails] = useState([]);
  const [loadingSent, setLoadingSent] = useState(true);
  const [sentPage, setSentPage] = useState(1);
  const [sentMeta, setSentMeta] = useState(null);
  const [sentStats, setSentStats] = useState({
    totalSent: 0,
    totalOpened: 0,
    totalClicked: 0,
    openRate: '0%',
  });
  const [sentFilter, setSentFilter] = useState('ALL'); // ALL, OPENED, UNOPENED, CLICKED
  const [sentSearch, setSentSearch] = useState('');

  // Selected Email for Detail Page View (NOT modal)
  const [selectedSentEmail, setSelectedSentEmail] = useState(null);

  // Inbox State
  const [inboxEmails, setInboxEmails] = useState([]);
  const [loadingInbox, setLoadingInbox] = useState(false);
  const [inboxPage, setInboxPage] = useState(1);
  const [inboxMeta, setInboxMeta] = useState(null);
  const [selectedInboxEmail, setSelectedInboxEmail] = useState(null);

  // Overall Stats
  const [inboxStats, setInboxStats] = useState({ unread: 0, today: 0 });

  useEffect(() => {
    document.title = 'Emails & Tracking – Maktech Admin';
  }, []);

  // Fetch Sent Emails & Tracking
  const fetchSentEmails = useCallback(async () => {
    setLoadingSent(true);
    try {
      const params = new URLSearchParams();
      params.append('page', sentPage);
      params.append('limit', PAGE_SIZE);
      if (sentFilter !== 'ALL') params.append('status', sentFilter);
      if (sentSearch.trim()) params.append('searchTerm', sentSearch.trim());

      const res = await apiClient.get(`/api/v1/emails/sent?${params.toString()}`);
      if (res.data?.success) {
        const list = res.data.data || [];
        setSentEmails(list);
        setSentMeta(res.data.meta);
        if (res.data.stats) {
          setSentStats(res.data.stats);
        } else {
          const totalSent = res.data.meta?.total ?? list.length;
          const totalOpened = list.filter((m) => m.isOpened || m.isClicked).length;
          const totalClicked = list.filter((m) => m.isClicked).length;
          const totalClickCount = list.reduce((sum, m) => sum + (m.clickCount || 0), 0);
          const openRate = totalSent > 0 ? `${Math.round((totalOpened / totalSent) * 100)}%` : '0%';
          setSentStats({
            totalSent,
            totalOpened,
            totalClicked: totalClickCount || totalClicked,
            totalClickCount,
            openRate,
          });
        }
      }
    } catch (err) {
      console.warn('Failed to fetch sent emails:', err);
    } finally {
      setLoadingSent(false);
    }
  }, [sentPage, sentFilter, sentSearch]);

  // Fetch Inbox Emails
  const fetchInbox = useCallback(async () => {
    setLoadingInbox(true);
    try {
      const res = await apiClient.get(`/api/v1/emails/inbox?page=${inboxPage}&limit=${PAGE_SIZE}`);
      if (res.data?.success) {
        setInboxEmails(res.data.data || []);
        setInboxMeta(res.data.meta);
      }
    } catch (err) {
      console.warn('Failed to fetch inbox:', err);
    } finally {
      setLoadingInbox(false);
    }
  }, [inboxPage]);

  // Fetch Email Stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await apiClient.get('/api/v1/emails/stats');
      if (res.data?.success && res.data.data) {
        setInboxStats(res.data.data);
      }
    } catch (err) {
      console.warn('Failed to fetch stats:', err);
    }
  }, []);

  useEffect(() => {
    fetchSentEmails();
  }, [fetchSentEmails]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    if (activeTab === 'INBOX' && inboxEmails.length === 0) {
      fetchInbox();
    }
  }, [activeTab, inboxEmails.length, fetchInbox]);

  /**
   * Handle selecting an inbox email:
   * Opens the dedicated detail page and immediately marks the email as Read
   */
  const handleSelectInboxEmail = async (email) => {
    setSelectedInboxEmail({ ...email, status: 'Read' });

    if (email.status !== 'Read') {
      // 1. Instantly update UI status in inbox list
      setInboxEmails((prev) =>
        prev.map((item) => (item.id === email.id ? { ...item, status: 'Read' } : item))
      );

      // 2. Decrement unread counter
      setInboxStats((prev) => ({
        ...prev,
        unread: Math.max(0, (prev.unread || 1) - 1),
      }));

      // 3. Persist read status to IMAP server
      try {
        await apiClient.patch(`/api/v1/emails/${email.id}/read`);
        // Refresh server stats
        fetchStats();
      } catch (err) {
        console.warn('Failed to mark email as read on server:', err);
      }
    }
  };

  // ─── IF VIEWING DEDICATED SENT EMAIL DETAIL PAGE ───
  if (selectedSentEmail) {
    return (
      <SentEmailDetailView
        email={selectedSentEmail}
        onBack={() => setSelectedSentEmail(null)}
        onRefresh={() => {
          fetchSentEmails();
          toast.info('Refreshed email status');
        }}
      />
    );
  }

  // ─── IF VIEWING DEDICATED INBOX EMAIL DETAIL PAGE ───
  if (selectedInboxEmail) {
    return (
      <InboxEmailDetailView
        email={selectedInboxEmail}
        onBack={() => setSelectedInboxEmail(null)}
      />
    );
  }

  // Stat Cards Configuration
  const statCardsData = [
    {
      Icon: MdScheduleSend,
      accentColor: '#ff6533',
      iconBg: 'bg-orange-50',
      iconColor: 'text-[#ff6533]',
      badge: 'Sent',
      badgeBg: 'bg-orange-50',
      badgeColor: 'text-orange-700',
      label: 'Total Sent',
      value: (sentStats.totalSent ?? sentMeta?.total ?? 0).toString(),
    },
    {
      Icon: MdVisibility,
      accentColor: '#16a34a',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      badge: sentStats.openRate || '0%',
      badgeBg: 'bg-emerald-50',
      badgeColor: 'text-emerald-700',
      label: 'Read Rate',
      value: `${sentStats.totalOpened ?? 0} Opened`,
    },
    {
      Icon: MdMouse,
      accentColor: '#8b5cf6',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      badge: 'Clicks',
      badgeBg: 'bg-purple-50',
      badgeColor: 'text-purple-700',
      label: 'Links Clicked',
      value: (sentStats.totalClickCount ?? sentStats.totalClicked ?? 0).toString(),
    },
    {
      Icon: MdEmail,
      accentColor: '#2563eb',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      badge: 'Inbox',
      badgeBg: 'bg-blue-50',
      badgeColor: 'text-blue-700',
      label: 'Unread Inbox',
      value: inboxStats.unread ? inboxStats.unread.toString() : '0',
    },
  ];

  const SENT_COLS = [
    { label: 'Recipient' },
    { label: 'Subject' },
    { label: 'Sent Date' },
    { label: 'Read Status' },
    { label: 'Location & Device' },
    { label: 'Actions', align: 'right' },
  ];

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
            Emails & Live Tracking
          </h1>
          <p className='text-sm sm:text-base text-gray-500 mt-1'>
            Compose client emails and monitor read receipts, open counts, and geolocation in real time
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <button
            type='button'
            onClick={() => {
              if (activeTab === 'SENT_TRACKING') fetchSentEmails();
              else fetchInbox();
              fetchStats();
              toast.info('Refreshed email statuses');
            }}
            title='Refresh'
            className='p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-[#ff6533] hover:border-orange-200 shadow-2xs transition cursor-pointer'
          >
            <MdRefresh className='text-lg' />
          </button>
          <button
            type='button'
            onClick={() => navigate('/admin/compose')}
            className='group inline-flex cursor-pointer items-center gap-1.5 overflow-hidden px-4 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-xl hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
          >
            <MdAdd className='text-lg shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1' />
            <span>Compose Email</span>
          </button>
        </div>
      </div>

      {/* Stat Strip */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {statCardsData.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Tab Selector Strip */}
      <div className='flex items-center gap-2 p-1 bg-gray-100/80 rounded-2xl max-w-md'>
        <button
          type='button'
          onClick={() => {
            setActiveTab('SENT_TRACKING');
            setSelectedSentEmail(null);
            setSelectedInboxEmail(null);
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'SENT_TRACKING'
              ? 'bg-white text-gray-900 shadow-xs'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <MdTrackChanges className='text-base text-[#ff6533]' />
          <span>Send & Tracking ({sentStats.totalSent ?? sentMeta?.total ?? sentEmails.length})</span>
        </button>

        <button
          type='button'
          onClick={() => {
            setActiveTab('INBOX');
            setSelectedSentEmail(null);
            setSelectedInboxEmail(null);
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'INBOX'
              ? 'bg-white text-gray-900 shadow-xs'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <MdEmail className='text-base text-blue-600' />
          <span>Client Inbox ({inboxStats.unread || 0})</span>
        </button>
      </div>

      {/* ─── TAB 1: SENT EMAILS WITH LIVE TRACKING ─── */}
      {activeTab === 'SENT_TRACKING' && (
        <div className='space-y-4'>
          {/* Controls: Filter & Search Bar */}
          <div className='flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-2xs'>
            <div className='flex items-center gap-2 flex-1 min-w-[240px] px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-200/60'>
              <MdSearch className='text-gray-400 text-lg shrink-0' />
              <input
                type='text'
                placeholder='Search by recipient email, subject, country...'
                value={sentSearch}
                onChange={(e) => {
                  setSentSearch(e.target.value);
                  setSentPage(1);
                }}
                className='w-full text-xs sm:text-sm bg-transparent outline-none text-gray-800 placeholder:text-gray-400'
              />
            </div>

            <div className='flex items-center gap-2'>
              <span className='text-xs font-semibold text-gray-500 hidden sm:inline'>Filter:</span>
              <select
                value={sentFilter}
                onChange={(e) => {
                  setSentFilter(e.target.value);
                  setSentPage(1);
                }}
                className='px-3 py-2 bg-gray-50 border border-gray-200/80 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 outline-none cursor-pointer hover:border-gray-300 transition'
              >
                <option value='ALL'>All Sent Emails</option>
                <option value='OPENED'>Opened by Client</option>
                <option value='CLICKED'>Clicked Links</option>
                <option value='UNOPENED'>Unopened Yet</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <section className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
            {loadingSent ? (
              <div className='p-12 flex items-center justify-center'>
                <div className='w-8 h-8 border-2 border-[#ff6533] border-t-transparent rounded-full animate-spin' />
              </div>
            ) : sentEmails.length === 0 ? (
              <div className='p-12 text-center text-gray-400'>
                <MdScheduleSend className='text-4xl text-gray-300 mx-auto mb-2' />
                <p className='text-sm font-semibold text-gray-700'>No sent emails found</p>
                <p className='text-xs text-gray-400 mt-0.5 mb-4'>
                  Emails you send to clients with tracking beacons will appear here
                </p>
                <button
                  type='button'
                  onClick={() => navigate('/admin/compose')}
                  className='inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#ff6533] hover:bg-[#e5501a] transition shadow-xs'
                >
                  <MdAdd className='text-base' />
                  <span>Compose Now</span>
                </button>
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <AdminTable columns={SENT_COLS} ariaLabel='Sent tracked emails'>
                  {sentEmails.map((email) => {
                    const isOpened = email.isOpened;
                    const isClicked = email.isClicked;

                    return (
                      <tr
                        key={email.id}
                        onClick={() => setSelectedSentEmail(email)}
                        className='border-b border-gray-50 transition-colors duration-150 cursor-pointer hover:bg-orange-50/20 group'
                      >
                        {/* Recipient */}
                        <td className='py-4 px-5'>
                          <div className='flex items-center gap-3'>
                            <div className='w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-orange-100 text-gray-600 group-hover:text-[#ff6533] flex items-center justify-center font-bold text-xs uppercase shrink-0 transition-colors'>
                              {email.toEmail.slice(0, 2)}
                            </div>
                            <div className='min-w-0'>
                              <p className='text-sm font-bold text-gray-900 truncate'>{email.toEmail}</p>
                              <span className='text-[11px] text-gray-400'>Client Recipient</span>
                            </div>
                          </div>
                        </td>

                        {/* Subject */}
                        <td className='py-4 px-5 max-w-[240px]'>
                          <p className='text-sm font-semibold text-gray-800 truncate'>
                            {email.subject || '(No Subject)'}
                          </p>
                          <p className='text-xs text-gray-400 truncate mt-0.5'>
                            {email.text ? email.text.slice(0, 45) + '...' : 'Direct Client Communication'}
                          </p>
                        </td>

                        {/* Sent Date */}
                        <td className='py-4 px-5 whitespace-nowrap'>
                          <p className='text-xs font-semibold text-gray-700'>
                            {new Date(email.sentAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                          <p className='text-[11px] text-gray-400'>
                            {new Date(email.sentAt).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </td>

                        {/* Read Status Badge */}
                        <td className='py-4 px-5 whitespace-nowrap'>
                          {isClicked ? (
                            <div className='inline-flex flex-col gap-1 items-start'>
                              <div className='inline-flex items-center gap-1.5 flex-wrap'>
                                <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200'>
                                  <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping' />
                                  <span>Opened</span>
                                </span>
                                <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200'>
                                  <MdMouse className='text-xs text-purple-600' />
                                  <span>Link Clicked ({email.clickCount})</span>
                                </span>
                              </div>
                              {(email.lastClickedAt || email.lastOpenedAt) && (
                                <span className='text-[10px] text-gray-500 pl-1'>
                                  {email.lastClickedAt
                                    ? `Clicked at ${new Date(email.lastClickedAt).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}`
                                    : `Opened at ${new Date(email.lastOpenedAt).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}`}
                                </span>
                              )}
                            </div>
                          ) : isOpened ? (
                            <div className='inline-flex flex-col'>
                              <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200'>
                                <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping' />
                                <span>Opened</span>
                              </span>
                              {email.lastOpenedAt && (
                                <span className='text-[10px] text-emerald-600 mt-0.5 pl-1'>
                                  {new Date(email.lastOpenedAt).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500'>
                              <MdAccessTime className='text-xs' />
                              <span>Unopened</span>
                            </span>
                          )}
                        </td>

                        {/* Location & Device */}
                        <td className='py-4 px-5'>
                          {email.country || email.city ? (
                            <div className='text-xs text-gray-700'>
                              <div className='flex items-center gap-1 font-semibold'>
                                <MdLocationOn className='text-rose-500 text-sm shrink-0' />
                                <span>{[email.city, email.country].filter(Boolean).join(', ')}</span>
                              </div>
                              <div className='flex items-center gap-1 text-[11px] text-gray-400 mt-0.5'>
                                <MdDevices className='text-xs shrink-0' />
                                <span>{[email.device, email.browser].filter(Boolean).join(' • ')}</span>
                              </div>
                            </div>
                          ) : (
                            <span className='text-xs text-gray-400 italic'>Awaiting first open</span>
                          )}
                        </td>

                        {/* Action: Details button */}
                        <td className='py-4 px-5 text-right whitespace-nowrap'>
                          <button
                            type='button'
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSentEmail(email);
                            }}
                            className='inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-orange-50 hover:bg-[#ff6533] text-[#ff6533] hover:text-white border border-orange-200 hover:border-[#ff6533] transition shadow-2xs group/btn cursor-pointer'
                          >
                            <MdVisibility className='text-base group-hover/btn:scale-110 transition-transform' />
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </AdminTable>
              </div>
            )}

            {/* Pagination */}
            {sentMeta && sentMeta.totalPages > 1 && (
              <div className='flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50'>
                <p className='text-xs text-gray-500'>
                  Showing <span className='font-bold text-gray-700'>{(sentPage - 1) * PAGE_SIZE + 1} to {Math.min(sentPage * PAGE_SIZE, sentMeta.total)}</span> of{' '}
                  <span className='font-bold text-gray-700'>{sentMeta.total}</span> emails
                </p>
                <Pagination
                  page={sentPage}
                  totalPages={sentMeta.totalPages}
                  pageRange={getPageRange(sentPage, sentMeta.totalPages)}
                  onPage={(p) => setSentPage(p)}
                />
              </div>
            )}
          </section>
        </div>
      )}

      {/* ─── TAB 2: CLIENT INBOX VIEW ─── */}
      {activeTab === 'INBOX' && (
        <section className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
          {loadingInbox ? (
            <div className='p-12 flex items-center justify-center'>
              <div className='w-8 h-8 border-2 border-[#ff6533] border-t-transparent rounded-full animate-spin' />
            </div>
          ) : inboxEmails.length === 0 ? (
            <div className='p-12 text-center text-gray-400'>
              <MdEmail className='text-4xl text-gray-300 mx-auto mb-2' />
              <p className='text-sm font-semibold text-gray-700'>Inbox is empty</p>
              <p className='text-xs text-gray-400 mt-0.5'>No incoming messages found</p>
            </div>
          ) : (
            <div className='divide-y divide-gray-100'>
              {inboxEmails.map((email) => {
                const isUnread = email.status !== 'Read';
                return (
                  <div
                    key={email.id}
                    onClick={() => handleSelectInboxEmail(email)}
                    className={`p-4 sm:p-5 transition cursor-pointer flex items-start justify-between gap-4 ${
                      isUnread ? 'bg-blue-50/30 hover:bg-blue-50/50' : 'hover:bg-orange-50/20'
                    }`}
                  >
                    <div className='flex items-start gap-3 min-w-0'>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                          isUnread ? 'bg-blue-600 text-white shadow-xs' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {email.from.slice(0, 2).toUpperCase()}
                      </div>
                      <div className='min-w-0'>
                        <div className='flex items-center gap-2'>
                          <p
                            className={`text-sm truncate ${
                              isUnread ? 'font-extrabold text-gray-900' : 'font-semibold text-gray-700'
                            }`}
                          >
                            {email.from}
                          </p>
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                              isUnread
                                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {email.status}
                          </span>
                        </div>
                        <p
                          className={`text-sm mt-0.5 truncate ${
                            isUnread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'
                          }`}
                        >
                          {email.subject}
                        </p>
                        <p className='text-xs text-gray-500 mt-1 line-clamp-2'>{email.text || email.body}</p>
                      </div>
                    </div>
                    <div className='text-right shrink-0'>
                      <span className='text-xs text-gray-400 whitespace-nowrap block'>
                        {new Date(email.date).toLocaleDateString()}
                      </span>
                      {isUnread && (
                        <span className='inline-block w-2 h-2 rounded-full bg-blue-600 mt-1.5' />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Inbox Pagination */}
          {inboxMeta && inboxMeta.totalPages > 1 && (
            <div className='flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50'>
              <p className='text-xs text-gray-500'>
                Showing <span className='font-bold text-gray-700'>{(inboxPage - 1) * PAGE_SIZE + 1} to {Math.min(inboxPage * PAGE_SIZE, inboxMeta.total)}</span> of{' '}
                <span className='font-bold text-gray-700'>{inboxMeta.total}</span> messages
              </p>
              <Pagination
                page={inboxPage}
                totalPages={inboxMeta.totalPages}
                pageRange={getPageRange(inboxPage, inboxMeta.totalPages)}
                onPage={(p) => setInboxPage(p)}
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
}
