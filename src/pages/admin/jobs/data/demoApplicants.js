// Realistic demo applicants dataset with full form question answers
// Supports all 14 question types created in QuestionBuilder & ApplyContact

export const INITIAL_DEMO_APPLICANTS = [
  {
    id: 'app-001',
    jobId: 'cmv3nvons00030xoi3684co7y',
    jobTitle: 'Product Designer',
    applicantName: 'Tanvir Hossain',
    applicantEmail: 'tanvir.ux@gmail.com',
    applicantPhone: '+880 1711-234567',
    location: 'Dhaka, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    appliedAt: '2026-10-11T14:35:00Z',
    status: 'SHORTLISTED', // PENDING | REVIEWING | SHORTLISTED | INTERVIEW | HIRED | REJECTED
    experience: '5+ Years',
    currentCompany: 'Optima Design Lab',
    resumeUrl: 'https://example.com/resumes/tanvir-hossain-cv.pdf',
    resumeName: 'Tanvir_Hossain_Senior_Product_Designer.pdf',
    resumeSize: '3.2 MB',
    portfolioUrl: 'https://dribbble.com/tanvirux',
    linkedinUrl: 'https://linkedin.com/in/tanvir-ux',
    githubUrl: '',
    recruiterNotes: 'Exceptional visual polish and strong system thinking. Passed portfolio screen with 9/10 score.',
    answers: [
      {
        questionId: 'q-name',
        questionTitle: 'Full Name',
        type: 'short_answer',
        value: 'Tanvir Hossain',
      },
      {
        questionId: 'q-email',
        questionTitle: 'Email Address',
        type: 'email',
        value: 'tanvir.ux@gmail.com',
      },
      {
        questionId: 'q-phone',
        questionTitle: 'Phone Number',
        type: 'phone',
        value: '+880 1711-234567',
      },
      {
        questionId: 'q-portfolio',
        questionTitle: 'Portfolio / Behance / Dribbble Link',
        type: 'url',
        value: 'https://dribbble.com/tanvirux',
      },
      {
        questionId: 'q-exp',
        questionTitle: 'Years of Experience in Product/UI Design',
        type: 'dropdown',
        value: '5+ Years',
      },
      {
        questionId: 'q-tools',
        questionTitle: 'Which tools and design systems do you use on a daily basis?',
        type: 'checkboxes',
        value: ['Figma', 'Design Tokens & Style Guides', 'Framer / Prototyping', 'Adobe Illustrator'],
      },
      {
        questionId: 'q-agile',
        questionTitle: 'Are you comfortable collaborating in cross-functional Agile sprint cycles?',
        type: 'yes_no',
        value: 'Yes',
      },
      {
        questionId: 'q-scale',
        questionTitle: 'Rate your expertise in Design System governance and token architecture (1-10)',
        type: 'linear_scale',
        value: 9,
      },
      {
        questionId: 'q-date',
        questionTitle: 'Earliest Available Joining Date',
        type: 'date',
        value: '2026-11-01',
      },
      {
        questionId: 'q-time',
        questionTitle: 'Preferred Interview Time Window',
        type: 'time',
        value: '15:00',
      },
      {
        questionId: 'q-problem',
        questionTitle: 'Describe a complex product/UX problem you recently solved and the measurable impact',
        type: 'paragraph',
        value: 'I redesigned a complex SaaS multi-tenant billing and subscription workflow. We conducted usability sessions with 14 enterprise clients, restructured tiered pricing comparisons, and simplified token payment flows. Result: Checkout abandonment dropped by 29% and customer support billing tickets decreased by 42% over one quarter.',
      },
      {
        questionId: 'q-resume',
        questionTitle: 'Attach your Resume / Curriculum Vitae',
        type: 'file_upload',
        value: 'Tanvir_Hossain_Senior_Product_Designer.pdf',
        fileUrl: '#',
        fileSize: '3.2 MB',
      },
    ],
  },
  {
    id: 'app-002',
    jobId: 'cmv3nvons00030xoi3684co7y',
    jobTitle: 'Product Designer',
    applicantName: 'Farhana Rahman',
    applicantEmail: 'farhana.design@outlook.com',
    applicantPhone: '+880 1823-889900',
    location: 'Chittagong, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    appliedAt: '2026-10-10T11:15:00Z',
    status: 'REVIEWING',
    experience: '3 - 5 Years',
    currentCompany: 'Studio Pixelworks',
    resumeUrl: 'https://example.com/resumes/farhana-rahman-resume.pdf',
    resumeName: 'Farhana_Rahman_UI_UX_Resume.pdf',
    resumeSize: '1.8 MB',
    portfolioUrl: 'https://farhana-designs.webflow.io',
    linkedinUrl: 'https://linkedin.com/in/farhana-designs',
    githubUrl: '',
    recruiterNotes: 'Solid mobile UX case studies, good Figma component architecture.',
    answers: [
      {
        questionId: 'q-name',
        questionTitle: 'Full Name',
        type: 'short_answer',
        value: 'Farhana Rahman',
      },
      {
        questionId: 'q-email',
        questionTitle: 'Email Address',
        type: 'email',
        value: 'farhana.design@outlook.com',
      },
      {
        questionId: 'q-phone',
        questionTitle: 'Phone Number',
        type: 'phone',
        value: '+880 1823-889900',
      },
      {
        questionId: 'q-portfolio',
        questionTitle: 'Portfolio / Behance / Dribbble Link',
        type: 'url',
        value: 'https://farhana-designs.webflow.io',
      },
      {
        questionId: 'q-exp',
        questionTitle: 'Years of Experience in Product/UI Design',
        type: 'dropdown',
        value: '3 - 5 Years',
      },
      {
        questionId: 'q-tools',
        questionTitle: 'Which tools and design systems do you use on a daily basis?',
        type: 'checkboxes',
        value: ['Figma', 'Framer / Prototyping', 'UserTesting / Hotjar'],
      },
      {
        questionId: 'q-agile',
        questionTitle: 'Are you comfortable collaborating in cross-functional Agile sprint cycles?',
        type: 'yes_no',
        value: 'Yes',
      },
      {
        questionId: 'q-scale',
        questionTitle: 'Rate your expertise in Design System governance and token architecture (1-10)',
        type: 'linear_scale',
        value: 8,
      },
      {
        questionId: 'q-date',
        questionTitle: 'Earliest Available Joining Date',
        type: 'date',
        value: '2026-11-15',
      },
      {
        questionId: 'q-time',
        questionTitle: 'Preferred Interview Time Window',
        type: 'time',
        value: '11:30',
      },
      {
        questionId: 'q-problem',
        questionTitle: 'Describe a complex product/UX problem you recently solved and the measurable impact',
        type: 'paragraph',
        value: 'Revamped the mobile onboarding journey for an e-wallet fintech app. Simplified KYC identity verification into 3 progressive micro-steps with inline camera verification, which boosted identity completion rate from 61% to 84%.',
      },
      {
        questionId: 'q-resume',
        questionTitle: 'Attach your Resume / Curriculum Vitae',
        type: 'file_upload',
        value: 'Farhana_Rahman_UI_UX_Resume.pdf',
        fileUrl: '#',
        fileSize: '1.8 MB',
      },
    ],
  },
  {
    id: 'app-003',
    jobId: 'cmv3nvons00030xoi3684co7y',
    jobTitle: 'Product Designer',
    applicantName: 'Mahmudul Hasan',
    applicantEmail: 'mahmud.designer@gmail.com',
    applicantPhone: '+880 1955-443322',
    location: 'Dhaka, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    appliedAt: '2026-10-09T18:20:00Z',
    status: 'INTERVIEW',
    experience: '4 Years',
    currentCompany: 'NextGen Interfaces',
    resumeUrl: 'https://example.com/resumes/mahmudul-hasan-cv.pdf',
    resumeName: 'Mahmudul_Hasan_ProductDesign_CV.pdf',
    resumeSize: '2.1 MB',
    portfolioUrl: 'https://behance.net/mahmudulhasan',
    linkedinUrl: 'https://linkedin.com/in/mahmud-hasan-ux',
    githubUrl: '',
    recruiterNotes: '1st interview round cleared. Technical interview scheduled for Thursday 3:00 PM.',
    answers: [
      {
        questionId: 'q-name',
        questionTitle: 'Full Name',
        type: 'short_answer',
        value: 'Mahmudul Hasan',
      },
      {
        questionId: 'q-email',
        questionTitle: 'Email Address',
        type: 'email',
        value: 'mahmud.designer@gmail.com',
      },
      {
        questionId: 'q-phone',
        questionTitle: 'Phone Number',
        type: 'phone',
        value: '+880 1955-443322',
      },
      {
        questionId: 'q-portfolio',
        questionTitle: 'Portfolio / Behance / Dribbble Link',
        type: 'url',
        value: 'https://behance.net/mahmudulhasan',
      },
      {
        questionId: 'q-exp',
        questionTitle: 'Years of Experience in Product/UI Design',
        type: 'dropdown',
        value: '3 - 5 Years',
      },
      {
        questionId: 'q-tools',
        questionTitle: 'Which tools and design systems do you use on a daily basis?',
        type: 'checkboxes',
        value: ['Figma', 'Adobe XD', 'Protopie'],
      },
      {
        questionId: 'q-agile',
        questionTitle: 'Are you comfortable collaborating in cross-functional Agile sprint cycles?',
        type: 'yes_no',
        value: 'Yes',
      },
      {
        questionId: 'q-scale',
        questionTitle: 'Rate your expertise in Design System governance and token architecture (1-10)',
        type: 'linear_scale',
        value: 8,
      },
      {
        questionId: 'q-date',
        questionTitle: 'Earliest Available Joining Date',
        type: 'date',
        value: '2026-11-01',
      },
      {
        questionId: 'q-time',
        questionTitle: 'Preferred Interview Time Window',
        type: 'time',
        value: '16:00',
      },
      {
        questionId: 'q-problem',
        questionTitle: 'Describe a complex product/UX problem you recently solved and the measurable impact',
        type: 'paragraph',
        value: 'Designed an end-to-end B2B analytics dashboard that centralized multiple disparate reporting widgets into a configurable workspace. Users could export customized executive reports in under 30 seconds.',
      },
      {
        questionId: 'q-resume',
        questionTitle: 'Attach your Resume / Curriculum Vitae',
        type: 'file_upload',
        value: 'Mahmudul_Hasan_ProductDesign_CV.pdf',
        fileUrl: '#',
        fileSize: '2.1 MB',
      },
    ],
  },
  {
    id: 'app-004',
    jobId: 'cmv3nvons00030xoi3684co7y',
    jobTitle: 'Product Designer',
    applicantName: 'Nusrat Jahan Bristy',
    applicantEmail: 'bristy.nusrat@yahoo.com',
    applicantPhone: '+880 1677-112233',
    location: 'Dhaka, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    appliedAt: '2026-10-08T09:40:00Z',
    status: 'PENDING',
    experience: '2 Years',
    currentCompany: 'Freelance / Creative Agency',
    resumeUrl: 'https://example.com/resumes/nusrat-jahan-cv.pdf',
    resumeName: 'Nusrat_Jahan_CV.pdf',
    resumeSize: '1.5 MB',
    portfolioUrl: 'https://dribbble.com/nusratbristy',
    linkedinUrl: '',
    githubUrl: '',
    recruiterNotes: 'Newly applied, portfolio pending HR review.',
    answers: [
      {
        questionId: 'q-name',
        questionTitle: 'Full Name',
        type: 'short_answer',
        value: 'Nusrat Jahan Bristy',
      },
      {
        questionId: 'q-email',
        questionTitle: 'Email Address',
        type: 'email',
        value: 'bristy.nusrat@yahoo.com',
      },
      {
        questionId: 'q-phone',
        questionTitle: 'Phone Number',
        type: 'phone',
        value: '+880 1677-112233',
      },
      {
        questionId: 'q-portfolio',
        questionTitle: 'Portfolio / Behance / Dribbble Link',
        type: 'url',
        value: 'https://dribbble.com/nusratbristy',
      },
      {
        questionId: 'q-exp',
        questionTitle: 'Years of Experience in Product/UI Design',
        type: 'dropdown',
        value: '1 - 3 Years',
      },
      {
        questionId: 'q-tools',
        questionTitle: 'Which tools and design systems do you use on a daily basis?',
        type: 'checkboxes',
        value: ['Figma', 'Adobe Illustrator'],
      },
      {
        questionId: 'q-agile',
        questionTitle: 'Are you comfortable collaborating in cross-functional Agile sprint cycles?',
        type: 'yes_no',
        value: 'Yes',
      },
      {
        questionId: 'q-scale',
        questionTitle: 'Rate your expertise in Design System governance and token architecture (1-10)',
        type: 'linear_scale',
        value: 6,
      },
      {
        questionId: 'q-date',
        questionTitle: 'Earliest Available Joining Date',
        type: 'date',
        value: '2026-10-25',
      },
      {
        questionId: 'q-time',
        questionTitle: 'Preferred Interview Time Window',
        type: 'time',
        value: '10:00',
      },
      {
        questionId: 'q-problem',
        questionTitle: 'Describe a complex product/UX problem you recently solved and the measurable impact',
        type: 'paragraph',
        value: 'Designed brand marketing landing pages with clean micro-interactions, helping an artisanal coffee startup acquire their first 1,500 newsletter subscribers.',
      },
      {
        questionId: 'q-resume',
        questionTitle: 'Attach your Resume / Curriculum Vitae',
        type: 'file_upload',
        value: 'Nusrat_Jahan_CV.pdf',
        fileUrl: '#',
        fileSize: '1.5 MB',
      },
    ],
  },
  {
    id: 'app-005',
    jobId: 'cmv3nvons00030xoi3684co7y',
    jobTitle: 'Product Designer',
    applicantName: 'Siam Chowdhury',
    applicantEmail: 'siam.dev.design@gmail.com',
    applicantPhone: '+880 1744-998877',
    location: 'Sylhet, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    appliedAt: '2026-10-06T16:50:00Z',
    status: 'HIRED',
    experience: '6 Years',
    currentCompany: 'FinTech Dynamics',
    resumeUrl: 'https://example.com/resumes/siam-chowdhury-cv.pdf',
    resumeName: 'Siam_Chowdhury_Lead_Designer.pdf',
    resumeSize: '4.1 MB',
    portfolioUrl: 'https://siamchowdhury.design',
    linkedinUrl: 'https://linkedin.com/in/siam-chowdhury',
    githubUrl: '',
    recruiterNotes: 'Offer accepted! Start date confirmed for November 1st, 2026.',
    answers: [
      {
        questionId: 'q-name',
        questionTitle: 'Full Name',
        type: 'short_answer',
        value: 'Siam Chowdhury',
      },
      {
        questionId: 'q-email',
        questionTitle: 'Email Address',
        type: 'email',
        value: 'siam.dev.design@gmail.com',
      },
      {
        questionId: 'q-phone',
        questionTitle: 'Phone Number',
        type: 'phone',
        value: '+880 1744-998877',
      },
      {
        questionId: 'q-portfolio',
        questionTitle: 'Portfolio / Behance / Dribbble Link',
        type: 'url',
        value: 'https://siamchowdhury.design',
      },
      {
        questionId: 'q-exp',
        questionTitle: 'Years of Experience in Product/UI Design',
        type: 'dropdown',
        value: '5+ Years',
      },
      {
        questionId: 'q-tools',
        questionTitle: 'Which tools and design systems do you use on a daily basis?',
        type: 'checkboxes',
        value: ['Figma', 'Design Tokens & Style Guides', 'Framer / Prototyping', 'Storybook UI'],
      },
      {
        questionId: 'q-agile',
        questionTitle: 'Are you comfortable collaborating in cross-functional Agile sprint cycles?',
        type: 'yes_no',
        value: 'Yes',
      },
      {
        questionId: 'q-scale',
        questionTitle: 'Rate your expertise in Design System governance and token architecture (1-10)',
        type: 'linear_scale',
        value: 10,
      },
      {
        questionId: 'q-date',
        questionTitle: 'Earliest Available Joining Date',
        type: 'date',
        value: '2026-11-01',
      },
      {
        questionId: 'q-time',
        questionTitle: 'Preferred Interview Time Window',
        type: 'time',
        value: '14:30',
      },
      {
        questionId: 'q-problem',
        questionTitle: 'Describe a complex product/UX problem you recently solved and the measurable impact',
        type: 'paragraph',
        value: 'Created a cross-platform design token system connecting Figma with React/Tailwind tokens via GitHub actions. Saved engineering and design teams an estimated 200 hours per release cycle.',
      },
      {
        questionId: 'q-resume',
        questionTitle: 'Attach your Resume / Curriculum Vitae',
        type: 'file_upload',
        value: 'Siam_Chowdhury_Lead_Designer.pdf',
        fileUrl: '#',
        fileSize: '4.1 MB',
      },
    ],
  },
  {
    id: 'app-006',
    jobId: 'cmv3nvons00030xoi3684co7y',
    jobTitle: 'Product Designer',
    applicantName: 'Kazi Rayhan',
    applicantEmail: 'rayhan.kazi@gmail.com',
    applicantPhone: '+880 1511-002244',
    location: 'Dhaka, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
    appliedAt: '2026-10-05T13:10:00Z',
    status: 'REJECTED',
    experience: '1 Year',
    currentCompany: 'Junior Designer',
    resumeUrl: 'https://example.com/resumes/kazi-rayhan-cv.pdf',
    resumeName: 'Kazi_Rayhan_Resume.pdf',
    resumeSize: '1.2 MB',
    portfolioUrl: 'https://behance.net/kazirayhan',
    linkedinUrl: '',
    githubUrl: '',
    recruiterNotes: 'Skills not aligned with senior product designer requirements. Sent polite feedback letter.',
    answers: [
      {
        questionId: 'q-name',
        questionTitle: 'Full Name',
        type: 'short_answer',
        value: 'Kazi Rayhan',
      },
      {
        questionId: 'q-email',
        questionTitle: 'Email Address',
        type: 'email',
        value: 'rayhan.kazi@gmail.com',
      },
      {
        questionId: 'q-phone',
        questionTitle: 'Phone Number',
        type: 'phone',
        value: '+880 1511-002244',
      },
      {
        questionId: 'q-portfolio',
        questionTitle: 'Portfolio / Behance / Dribbble Link',
        type: 'url',
        value: 'https://behance.net/kazirayhan',
      },
      {
        questionId: 'q-exp',
        questionTitle: 'Years of Experience in Product/UI Design',
        type: 'dropdown',
        value: 'Less than 1 Year',
      },
      {
        questionId: 'q-tools',
        questionTitle: 'Which tools and design systems do you use on a daily basis?',
        type: 'checkboxes',
        value: ['Photoshop'],
      },
      {
        questionId: 'q-agile',
        questionTitle: 'Are you comfortable collaborating in cross-functional Agile sprint cycles?',
        type: 'yes_no',
        value: 'No',
      },
      {
        questionId: 'q-scale',
        questionTitle: 'Rate your expertise in Design System governance and token architecture (1-10)',
        type: 'linear_scale',
        value: 4,
      },
      {
        questionId: 'q-date',
        questionTitle: 'Earliest Available Joining Date',
        type: 'date',
        value: '2026-10-20',
      },
      {
        questionId: 'q-time',
        questionTitle: 'Preferred Interview Time Window',
        type: 'time',
        value: '10:00',
      },
      {
        questionId: 'q-problem',
        questionTitle: 'Describe a complex product/UX problem you recently solved and the measurable impact',
        type: 'paragraph',
        value: 'Created social media banners and graphic posters for local brand campaigns.',
      },
      {
        questionId: 'q-resume',
        questionTitle: 'Attach your Resume / Curriculum Vitae',
        type: 'file_upload',
        value: 'Kazi_Rayhan_Resume.pdf',
        fileUrl: '#',
        fileSize: '1.2 MB',
      },
    ],
  },
];

const STORAGE_KEY = 'maktech_demo_applicants_v1';

export const getStoredApplicants = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored applicants:', err);
  }
  return INITIAL_DEMO_APPLICANTS;
};

export const saveStoredApplicants = (applicants) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applicants));
  } catch (err) {
    console.warn('Failed to save applicants to storage:', err);
  }
};

/**
 * Returns applicants for a given job.
 * If the job ID matches specific demo ones, returns them;
 * if not, returns a clone adapted to that job title so any job card can be tested!
 */
export const getApplicantsByJobId = (jobId, jobTitle = 'Open Position') => {
  const all = getStoredApplicants();
  const directMatches = all.filter((a) => a.jobId === jobId);

  if (directMatches.length > 0) {
    return directMatches;
  }

  // Generate customized demo applicants for this specific job if none exist yet
  const generated = INITIAL_DEMO_APPLICANTS.map((applicant, idx) => ({
    ...applicant,
    id: `app-${jobId.slice(-4)}-${idx + 1}`,
    jobId,
    jobTitle,
  }));

  return generated;
};

export const getApplicantById = (applicantId) => {
  const all = getStoredApplicants();
  const found = all.find((a) => a.id === applicantId);
  if (found) return found;

  // Search in dynamically generated pool
  for (const demo of INITIAL_DEMO_APPLICANTS) {
    if (demo.id === applicantId) return demo;
  }

  return null;
};

export const updateApplicantStatusInStorage = (applicantId, newStatus) => {
  const all = getStoredApplicants();
  const index = all.findIndex((a) => a.id === applicantId);
  if (index !== -1) {
    all[index] = { ...all[index], status: newStatus };
    saveStoredApplicants(all);
    return all[index];
  }
  return null;
};

export const updateApplicantNotesInStorage = (applicantId, notes) => {
  const all = getStoredApplicants();
  const index = all.findIndex((a) => a.id === applicantId);
  if (index !== -1) {
    all[index] = { ...all[index], recruiterNotes: notes };
    saveStoredApplicants(all);
    return all[index];
  }
  return null;
};

export const getApplicantCountForJob = (jobId) => {
  const matches = getApplicantsByJobId(jobId);
  return matches.length;
};
