import {
  MdOutlineVpnKey,
  MdTune,
  MdLockOutline,
  MdOutlineShield,
  MdOutlineInfo,
  MdOutlineCheckCircle,
  MdOutlineLocationOn,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLanguage,
  MdOutlineBusiness,
} from 'react-icons/md';
import { companyContact } from '../data/companyContact';

const NOTE_ICONS = {
  key: MdOutlineVpnKey,
  filter: MdTune,
  lock: MdLockOutline,
  shield: MdOutlineShield,
  info: MdOutlineInfo,
};

const Paragraph = ({ text, strong }) => (
  <p
    className={`max-w-[640px] text-sm md:text-[15px] leading-relaxed ${
      strong ? 'font-semibold text-white' : 'text-white/75'
    }`}
  >
    {text}
  </p>
);

const BulletGrid = ({ items }) => (
  <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
    {items.map((item, i) => {
      const isLastOdd = items.length % 2 === 1 && i === items.length - 1;
      return (
        <li
          key={item}
          className={`flex items-start gap-3 rounded-lg bg-black/40 px-4 py-3 text-sm text-white/85 ${
            isLastOdd ? 'sm:col-span-2' : ''
          }`}
        >
          <span className='mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-bg-cta' />
          {item}
        </li>
      );
    })}
  </ul>
);

const Checklist = ({ items }) => (
  <ul className='space-y-2.5'>
    {items.map((item) => (
      <li key={item} className='flex items-start gap-3 text-sm text-white/85'>
        <MdOutlineCheckCircle className='mt-0.5 shrink-0 text-base text-orange-bg-cta' />
        {item}
      </li>
    ))}
  </ul>
);

const NOTE_TONES = {
  key: 'bg-white/[0.07] text-white/80',
  lock: 'bg-white/[0.12] text-white/80',
};

const Note = ({ text, icon }) => {
  const Icon = NOTE_ICONS[icon];
  return (
    <div
      className={`flex items-start gap-3 rounded-lg px-4 py-3.5 ${
        NOTE_TONES[icon] || 'bg-black/50 text-white/60'
      }`}
    >
      {Icon && <Icon className='mt-0.5 shrink-0 text-base text-orange-bg-cta' />}
      <p className='max-w-[600px] text-xs md:text-[13px] leading-relaxed'>{text}</p>
    </div>
  );
};

const Highlight = ({ text, icon = 'shield' }) => {
  const Icon = NOTE_ICONS[icon];
  return (
    <div className='flex items-start gap-3 rounded-lg bg-white/5 px-4 py-3.5'>
      <Icon className='mt-0.5 shrink-0 text-base text-orange-bg-cta' />
      <p className='max-w-[600px] text-sm font-semibold leading-relaxed text-white'>{text}</p>
    </div>
  );
};

const RequestBox = ({ label, email, subject }) => (
  <div className='flex flex-col gap-3 rounded-lg bg-black/40 px-4 py-4 sm:flex-row sm:items-center sm:justify-between'>
    <div>
      <p className='text-[11px] font-semibold uppercase tracking-wider text-orange-bg-cta'>
        {label}
      </p>
      <p className='mt-1 text-sm font-semibold text-white'>{email}</p>
    </div>
    <a
      href={`mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`}
      className='self-start rounded-full bg-orange-bg-cta px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[#e5501a] hover:shadow-[0_4px_20px_rgba(255,101,51,0.45)] sm:self-auto'
    >
      Send Request
    </a>
  </div>
);

const ContactDetails = () => {
  const rows = [
    { icon: MdOutlineLocationOn, label: 'Address', value: companyContact.address },
    { icon: MdOutlineBusiness, label: 'Company', value: companyContact.company },
    {
      icon: MdOutlineEmail,
      label: 'Email',
      value: companyContact.email,
      href: `mailto:${companyContact.email}`,
    },
    {
      icon: MdOutlinePhone,
      label: 'Phone',
      value: companyContact.phone,
      href: `tel:${companyContact.phone.replace(/[^+\d]/g, '')}`,
    },
    {
      icon: MdOutlineLanguage,
      label: 'Website',
      value: companyContact.website,
      href: companyContact.website,
    },
  ];

  return (
    <div className='space-y-4'>
      <dl className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
        {rows.map(({ icon: Icon, label, value, href }) => (
          <div
            key={label}
            className={`flex items-start gap-3 rounded-lg bg-black/40 px-4 py-3 ${
              label === 'Address' ? 'sm:col-span-2' : ''
            }`}
          >
            <Icon className='mt-0.5 shrink-0 text-base text-orange-bg-cta' />
            <div className='min-w-0'>
              <dt className='text-[11px] uppercase tracking-wider text-white/45'>{label}</dt>
              <dd className='mt-0.5 break-words text-sm text-white/90'>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    className='transition-colors hover:text-orange-bg-cta'
                  >
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          </div>
        ))}
      </dl>
      <p className='text-sm font-semibold text-white'>{companyContact.tagline}</p>
    </div>
  );
};

const PolicyBlock = ({ block }) => {
  switch (block.type) {
    case 'p':
      return <Paragraph {...block} />;
    case 'lead':
      return <p className='text-sm md:text-[15px] text-orange-200/80'>{block.text}</p>;
    case 'grid':
      return <BulletGrid items={block.items} />;
    case 'checklist':
      return <Checklist items={block.items} />;
    case 'note':
      return <Note {...block} />;
    case 'highlight':
      return <Highlight {...block} />;
    case 'request':
      return <RequestBox {...block} />;
    case 'contact':
      return <ContactDetails />;
    default:
      return null;
  }
};

export default PolicyBlock;
