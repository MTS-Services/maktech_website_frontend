import { companyContact } from './companyContact';

export const privacyPolicy = {
  slug: 'privacy-policy',
  title: 'Privacy Policy',
  highlight: 'Policy',
  description:
    'At maktech, we are firmly committed to safeguarding enterprise data, engineering integrity, and the confidentiality of every client partnership.',
  lastUpdated: 'October 21, 2026',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      blocks: [
        {
          type: 'p',
          text: 'At maktech, we respect your privacy and want you to understand how we handle your personal information. This Privacy Policy explains what information we may collect, why we use it, how we handle it, and how you can contact us about your privacy.',
        },
      ],
    },
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      blocks: [
        {
          type: 'p',
          text: 'When you contact us or ask about our services, we may collect:',
        },
        {
          type: 'grid',
          items: [
            'Your name and email address.',
            'Your WhatsApp number or other contact details.',
            'Your company or business information.',
            'Details about your project, requirements, or inquiry.',
            'Any other information you choose to share with us.',
          ],
        },
        {
          type: 'note',
          icon: 'key',
          text: "We may also handle business information and account credentials when needed to deliver or maintain a client's project.",
        },
      ],
    },
    {
      id: 'how-we-collect-information',
      title: 'How We Collect Information',
      blocks: [
        {
          type: 'p',
          text: 'We may collect information when you contact us through our website, email, WhatsApp, or other communication channels.',
        },
        {
          type: 'p',
          text: 'We may also receive information directly from clients during project discussions, development, maintenance, and support.',
        },
        {
          type: 'note',
          icon: 'filter',
          text: 'We aim to collect only the information reasonably needed to respond to inquiries, communicate with clients, and provide our services.',
        },
      ],
    },
    {
      id: 'how-we-use-your-information',
      title: 'How We Use Your Information',
      blocks: [
        { type: 'lead', text: 'We may use your information to:' },
        {
          type: 'checklist',
          items: [
            'Respond to questions and service inquiries.',
            'Understand your business needs and discuss suitable solutions.',
            'Communicate with you about projects and services.',
            'Deliver, maintain, and support client projects.',
            'Manage client relationships and business records.',
            'Respond to requests about your personal information.',
            'Meet applicable legal obligations and protect our legitimate business interests.',
          ],
        },
        {
          type: 'note',
          text: 'The maktech Marketing Team handles website inquiries. Information is used for relevant business purposes and should not be used in ways that are inconsistent with this policy or applicable law.',
        },
      ],
    },
    {
      id: 'data-sharing-with-third-parties',
      title: 'Data Sharing with Third Parties',
      blocks: [
        {
          type: 'highlight',
          icon: 'shield',
          text: 'We do not sell your personal information or share it with third parties for their own marketing purposes.',
        },
        {
          type: 'p',
          text: 'We may disclose information if required by law or when necessary to protect our legal rights, safety, or property.',
        },
        {
          type: 'p',
          text: 'Our team has reported that third-party services do not currently process or store personal information on our behalf. However, our CRM, email, hosting, and future WhatsApp arrangements should be checked to confirm whether any external provider processes information. If service providers are involved, they may process relevant information as needed to provide their services.',
        },
      ],
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      blocks: [
        {
          type: 'p',
          text: 'We retain personal information only for as long as reasonably necessary for the purposes described in this policy, subject to applicable legal requirements.',
        },
        {
          type: 'p',
          text: 'Email addresses and WhatsApp numbers collected through inquiries are intended to be stored in our customer relationship management (CRM) system so we can manage communications and business relationships.',
        },
        {
          type: 'p',
          text: 'For client projects, relevant business information and login credentials may be handed over to the client when the agreed maintenance or service period ends. The timing and handling of project information may depend on the project agreement.',
        },
        {
          type: 'p',
          text: 'If you request deletion of your information, we will review the request and delete information where appropriate, unless we need to retain it for legal, security, or legitimate business reasons.',
        },
      ],
    },
    {
      id: 'data-security',
      title: 'Data Security',
      blocks: [
        {
          type: 'p',
          text: 'We take reasonable steps to handle personal information responsibly. Our website uses HTTPS to help protect information sent between your browser and our website.',
        },
        {
          type: 'p',
          text: 'No website or electronic storage system can be guaranteed to be completely secure. We continue to review our security practices as our systems and business needs change.',
        },
        {
          type: 'note',
          icon: 'lock',
          text: 'Please avoid sending passwords or other sensitive credentials through public forms or unsecured communication channels.',
        },
      ],
    },
    {
      id: 'your-privacy-rights',
      title: 'Your Privacy Rights',
      blocks: [
        {
          type: 'p',
          text: 'Depending on applicable law, you may be able to request access to, correction of, or deletion of your personal information.',
        },
        {
          type: 'request',
          label: 'Request Submission',
          email: companyContact.email,
          subject: 'Privacy request',
        },
        {
          type: 'p',
          text: `To make a request, contact us at ${companyContact.email}. We may ask for information to verify your identity before responding.`,
        },
        {
          type: 'p',
          text: 'We will review and handle requests in accordance with applicable privacy laws. Some information may need to be retained where required by law or for legitimate business purposes.',
        },
      ],
    },
    {
      id: 'international-data-transfers',
      title: 'International Data Transfers',
      blocks: [
        {
          type: 'p',
          text: 'Our current practice is not to store or process personal information outside Bangladesh. We aim to keep personal information within Bangladesh.',
        },
        {
          type: 'p',
          text: 'We will review this practice if our systems, service providers, or business operations change. The actual data location should be confirmed with our technical team and service providers.',
        },
      ],
    },
    {
      id: 'cookies-and-tracking-technologies',
      title: 'Cookies and Tracking Technologies',
      shortTitle: 'Cookies & Tracking',
      blocks: [
        {
          type: 'p',
          text: 'We have not currently installed analytics or advertising tracking tools on our website, based on our current website setup.',
        },
        {
          type: 'p',
          text: 'The website may use cookies required for basic functions, depending on its technical configuration. We are reviewing whether any third-party services or embedded tools are used.',
        },
        {
          type: 'p',
          strong: true,
          text: 'Please read our Cookies Policy for further information about cookies and how to manage them.',
        },
      ],
    },
    {
      id: 'childrens-privacy',
      title: "Children's Privacy",
      blocks: [
        {
          type: 'p',
          text: 'Our website and services are intended for businesses, professionals, and other people seeking digital and technology solutions. We do not knowingly collect children\'s personal information through our website. If you believe a child has provided personal information to us, please contact us so we can review the matter.',
        },
      ],
    },
    {
      id: 'changes-to-this-policy',
      title: 'Changes to This Policy',
      blocks: [
        {
          type: 'p',
          text: 'We may update this Privacy Policy as our business practices, technology, or legal requirements change. Any updates will be published on this page with a revised date.',
        },
      ],
    },
    {
      id: 'contact-information',
      title: 'Contact Information',
      blocks: [
        {
          type: 'p',
          text: 'If you have questions about this Privacy Policy or how your information is handled, please contact us.',
        },
        { type: 'contact' },
      ],
    },
  ],
};
