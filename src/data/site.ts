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
  ['Executive portfolio website', 'A fast, single-link home for your career'],
  ['Impact and metrics showcase', 'Your numbers, up front'],
  ['Experience timeline', 'Your roles and growth, told as a story'],
  ['Skills and credentials', 'Degrees, certifications and strengths in one place'],
  ['One-tap contact', 'PDF CV, LinkedIn, WhatsApp and email, one tap away'],
];

const terms = '5 to 7 working days. Free CV audit first. Advance payment via bKash, Nagad or Upay.';
export const plans = [
  { label: 'Bangladesh', price: 'BDT 20,000 \u2013 25,000', note: terms, featured: true },
  { label: 'International', price: '$450 \u2013 $600 USD', note: terms, featured: false },
];

export const faq = [
  ['How fast can my site go live?', 'Within 5 to 7 working days of starting.'],
  ['What does it cost?', 'BDT 20,000 \u2013 25,000 in Bangladesh, and $450 \u2013 $600 USD internationally.'],
  ['How do I pay?', 'You pay an advance via bKash, Nagad or Upay.'],
  ['What do I need to send?', 'Your current CV is enough. We start with a free CV audit.'],
  ['Will it work on a phone?', 'Yes. Each profile is built to load fast and read well on a phone.'],
];

// The 7-day build: four stages (tabs), each with its own days. Every day has its own preview of a sample sales professional.
export const buildStages = [
  {
    tab: 'Day 0', name: 'Free CV audit',
    summary: 'We start by reading your CV and marking the results that carry the most weight.',
    send: ['Your current CV', 'A WhatsApp message to say you want an audit'],
    get: ['A free audit of your CV', 'Your strongest results marked, so you see what the site will lead with'],
    days: [{ n: 0, label: 'Day 0', today: 'We read your CV and mark the six results that carry the most weight.' }],
  },
  {
    tab: 'Days 1\u20132', name: 'Story and metrics',
    summary: 'Your career is shaped into a headline, key numbers and a timeline.',
    send: ['A recent photo', 'Confirmation of your key numbers and dates', 'The advance payment via bKash, Nagad or Upay'],
    get: ['A headline that says what you do', 'Your key numbers, chosen and worded', 'A plan for your site and a timeline of your roles'],
    days: [
      { n: 1, label: 'Day 1', today: 'We choose your headline and the numbers that prove it.' },
      { n: 2, label: 'Day 2', today: 'We plan the sections of your site and draft your career timeline.' },
    ],
  },
  {
    tab: 'Days 3\u20135', name: 'Design and build',
    summary: 'Your site is built for phones first, with your contact links ready.',
    send: ['Nothing, unless we have a question'],
    get: ['A draft of your site to open on your phone', 'One-tap PDF CV, LinkedIn, WhatsApp and email'],
    days: [
      { n: 3, label: 'Day 3', today: 'The design takes shape: your name, role and key numbers up front.' },
      { n: 4, label: 'Day 4', today: 'Your impact figures and career timeline are placed in the layout.' },
      { n: 5, label: 'Day 5', today: 'The phone view is built and your contact links are added.' },
    ],
  },
  {
    tab: 'Days 6\u20137', name: 'Review and launch',
    summary: 'You review the draft, we refine it, and it goes live.',
    send: ['Your feedback on the draft', 'Your go-ahead to launch'],
    get: ['Your live executive website', 'A link you can put in your email, LinkedIn and CV'],
    days: [
      { n: 6, label: 'Day 6', today: 'You review the draft and we apply your changes.' },
      { n: 7, label: 'Day 7', today: 'Your site goes live, with a link ready to share.' },
    ],
  },
];
