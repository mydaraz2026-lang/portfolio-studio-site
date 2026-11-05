export const wa = (msg: string) => `https://wa.me/8801790653537?text=${encodeURIComponent(msg)}`;

export const contact = {
  whatsappUrl: 'https://wa.me/8801790653537',
  whatsappLabel: 'WhatsApp +880 1790-653537',
  email: 'portfoliostudio.cv@gmail.com',
};

export const sites = [
  { name: 'MH Chowdhury', host: 'mhchowdhury.netlify.app', url: 'https://mhchowdhury.netlify.app/', image: '/sites/mh-chowdhury.webp' },
  { name: 'SM Atiqur Rahman', host: 'sm-atiqurrahman.netlify.app', url: 'https://sm-atiqurrahman.netlify.app/', image: '/sites/sm-atiqur-rahman.webp' },
  { name: 'Tausif Karim', host: 'tausif-karim.netlify.app', url: 'https://tausif-karim.netlify.app/', image: '/sites/tausif-karim.webp' },
];

export const getItems = [
  ['Impact and metrics showcase', 'Your numbers, up front'],
  ['Experience timeline', 'Your roles and growth, told as a story'],
  ['Skills and credentials', 'Degrees, certifications and strengths in one place'],
  ['One-tap contact', 'PDF CV, LinkedIn, WhatsApp and email, one tap away'],
  ['Media & Guest Profile', 'Optional: a producer-ready profile for podcasts, panels and keynotes, quoted to your brief'],
];

const terms = '5 to 7 working days. Free CV audit first. Advance payment via bKash, Nagad or Upay.';
export const plans = [
  { label: 'Website \u00b7 Bangladesh', price: 'BDT 20,000 \u2013 25,000', note: terms, featured: true, cta: 'Start with a free CV audit', href: wa('Hi Shuvo, I would like a portfolio website. Here is my CV and LinkedIn profile.') },
  { label: 'Website \u00b7 International', price: '$450 \u2013 $600 USD', note: terms, featured: false, cta: 'Start with a free CV audit', href: wa('Hi Shuvo, I would like a portfolio website. Here is my CV and LinkedIn profile.') },
  { label: 'Media & Guest Profile', price: 'Quoted', note: 'Positioning, headline numbers, interview angles and a booking page, built for podcasts, panels and keynotes. Priced to your brief.', featured: false, cta: 'Request a quote', href: wa('Hi Shuvo, I would like a quote for a media and guest profile.') },
];

export const faq = [
  ['How fast can my site go live?', 'Within 5 to 7 working days of starting.'],
  ['What does it cost?', 'BDT 20,000 \u2013 25,000 in Bangladesh, and $450 \u2013 $600 USD internationally.'],
  ['How do I pay?', 'You pay an advance via bKash, Nagad or Upay.'],
  ['What do I need to send?', 'Your current CV is enough. We start with a free CV audit.'],
  ['What is a Media & Guest Profile?', 'A producer-ready profile with your positioning, headline numbers, interview angles and a booking page. It is built for podcasts, panels and keynotes.'],
  ['How much does a Media & Guest Profile cost?', 'It is quoted individually, based on your brief. Message us with your role and where you want to be booked.'],
  ['Can I see my site before it goes live?', 'Yes. You review a private preview before your site goes live.'],
  ['Will it work on a phone?', 'Yes. Each profile is built to load fast and read well on a phone.'],
];

// Case study shown in the 7-day build scrubber: [step name, panel text] for Day 0 to Day 7.
export const buildSteps = [
  [
    "Free CV audit",
    "We start with his 4-page base CV: 23 years of experience, with the strongest results buried in long paragraphs."
  ],
  [
    "Story and metrics",
    "We pick the results that prove the story: 400% international growth in one year, 36% loyal dealers, 80% of overdue corporate dues recovered."
  ],
  [
    "Story and metrics",
    "The headline and key proof points are chosen, and the career is shaped into a timeline."
  ],
  [
    "Design and build",
    "The design takes shape, built for phones first."
  ],
  [
    "Design and build",
    "The numbers and timeline are placed: 25+ years, 194% sales growth, 400% international growth in a year, a 230-member team."
  ],
  [
    "Design and build",
    "His PDF CV and contact links are added. The CV itself is tightened from 4 pages to a clean 2-page final version."
  ],
  [
    "Review and launch",
    "He reviews the site and we refine it."
  ],
  [
    "Review and launch",
    "mhchowdhury.netlify.app goes live."
  ]
];

export const buildPhases = [
  { name: 'Free CV audit', from: 0, to: 0 },
  { name: 'Story and metrics', from: 1, to: 2 },
  { name: 'Design and build', from: 3, to: 5 },
  { name: 'Review and launch', from: 6, to: 7 },
];
