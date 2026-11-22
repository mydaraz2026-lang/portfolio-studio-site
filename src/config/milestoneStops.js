/**
 * MILESTONE STOPS — Portfolio Studio landing page as a camera journey.
 * Copy is taken from portfoliostudiocv.netlify.app. See the base template README for field docs.
 *
 * Extra fields used here:
 *   sites   (samples)  [{ name, host, url, image }]
 *   send/get (stage)   what the client sends / receives at that stage
 *   days    (stage)    [{ label, text }]
 *   items   (offer)    [[title, text]]
 *   plans   (offer)    [{ label, price }]
 */
const base = import.meta.env?.BASE_URL ?? './';

export const CONTACT = {
  whatsappUrl: 'https://wa.me/8801790653537',
  whatsapp: '+880 1790-653537',
  email: 'portfoliostudio.cv@gmail.com',
};

export const SITES = [
  {
    name: 'MH Chowdhury',
    fullName: 'Muhammed Mehdi Hasan Chowdhury',
    host: 'mhchowdhury.netlify.app',
    url: 'https://mhchowdhury.netlify.app/',
    role: 'Senior Sales & Business Development Professional',
    summary: '25+ years directing distribution, trade marketing and channel growth, from Banglalink to national sales at BSRM Steels.',
    metrics: [
      { value: '25+', label: 'Years in sales and BD' },
      { value: '194%', label: '10-year sales growth' },
      { value: '230+', label: 'Team members led' },
    ],
    video: `${base}samples/mh.mp4`,
    poster: `${base}samples/mh.jpg`,
  },
  {
    name: 'SM Atiqur Rahman',
    fullName: 'S M Atiqur Rahman',
    host: 'sm-atiqurrahman.netlify.app',
    url: 'https://sm-atiqurrahman.netlify.app/',
    role: 'Account Opening In-Charge, Janata Bank PLC, Sharjah',
    summary: '14+ years of UAE financial expertise: customer onboarding delivered inside strict KYC/AML frameworks.',
    metrics: [
      { value: 'AED 8M+', label: 'Cheques cleared per month' },
      { value: '80–120+', label: 'High-risk onboardings a month' },
      { value: '100%', label: 'CBUAE and FIU compliance' },
    ],
    video: `${base}samples/sm.mp4`,
    poster: `${base}samples/sm.jpg`,
  },
  {
    name: 'Tausif Karim',
    fullName: 'Md. Tausif Karim',
    host: 'tausif-karim.netlify.app',
    url: 'https://tausif-karim.netlify.app/',
    role: 'Head of Administration & Facilities',
    summary: '21 years of military precision brought to multi-site facilities, industrial campus administration and compliance.',
    metrics: [
      { value: '17,000', label: 'Plant manpower on one campus' },
      { value: '9 → 18', label: 'Showrooms scaled' },
      { value: '24 → 48 Cr', label: 'Yearly turnover (BDT)' },
    ],
    video: `${base}samples/tk.mp4`,
    poster: `${base}samples/tk.jpg`,
  },
];

/** Recordings are cropped to the page area: 946 × 350. */
export const SCREEN_ASPECT = 946 / 350;

/** Showcase screens in the Samples cluster's local space (site index → screen). */
export const SHOWCASE_LAYOUT = [
  { site: 2, x: -3.3, y: 2.1, z: 0.9, rot: 0.38, width: 2.8 },
  { site: 1, x: 0, y: 2.7, z: -0.2, rot: 0, width: 3.6 },
  { site: 0, x: 3.3, y: 2.1, z: 0.9, rot: -0.38, width: 2.8 },
];

const BASE_STOPS = [
  {
    id: 'top',
    navLabel: 'Start',
    kind: 'intro',
    period: 'Portfolio Studio',
    title: 'Elevate your leadership footprint.',
    emphasis: 'leadership',
    summary: 'Your career story as a fast, executive website. Live in 7 days. Start with a free CV audit.',
    metrics: [
      { value: '5–7', label: 'Working days' },
      { value: 'Free', label: 'CV audit first' },
      { value: '1 link', label: 'CV, LinkedIn, WhatsApp, email' },
    ],
    monument: 'gateway',
    position: [0, 0, 0],
    cameraOffset: [0, 2.8, 15],
    focusHeight: 3.4,
    // phones: pull back and tilt down so the whole gateway sits above the card
    framingShift: { narrow: 4.4 },
    narrowDistance: 1.42,
    panelSide: 'left',
  },
  {
    id: 'samples',
    navLabel: 'Samples',
    kind: 'samples',
    period: 'Live samples',
    title: 'Profiles already live.',
    emphasis: 'live.',
    summary: 'Real executive portfolios built by Portfolio Studio. Keep scrolling to step inside each one.',
    visibleRange: 4.6,
    nearRange: 4,
    framingShift: { narrow: 3.1 }, // phones: lift the three screens clear of the card
    sites: SITES,
    monument: 'showcase',
    position: [16, 0, -20],
    cameraOffset: [-12, 2.4, 2],
    focusHeight: 2.4,
    panelSide: 'left',
  },
  {
    id: 'day-0',
    navLabel: 'Day 0',
    kind: 'stage',
    period: 'Day 0 · The audit and extraction',
    title: 'Free CV audit',
    summary: 'We start by reading your CV and marking the results that carry the most weight.',
    send: ['Your current CV', 'A WhatsApp message to say you want an audit'],
    get: ['A free audit of your CV', 'Your strongest results marked, so you see what the site will lead with'],
    days: [{ label: 'Day 0', text: 'We read your CV and mark the six results that carry the most weight.' }],
    monument: 'audit',
    poster: `${base}stages/audit.jpg`,
    posterAlt: 'A sample CV with its six key results highlighted and one task line rewritten as a result',
    position: [-5, 0, -36],
    cameraOffset: [5.52, 2.55, 5.23],
    focusHeight: 2.55,
    pan: true, // slide the camera sideways (not turn it) so the CV page stays face-on
    framingShift: { wide: 2.15, narrow: 1.15 },
    narrowDistance: 1.1,
    panelSide: 'right',
  },
  {
    id: 'days-1-2',
    navLabel: 'Days 1–2',
    kind: 'stage',
    period: 'Days 1–2 · The narrative rewrite',
    title: 'Story and metrics',
    summary: 'Your career is shaped into a headline, key numbers and a timeline.',
    send: ['A recent photo', 'Confirmation of your key numbers and dates', 'The advance payment via bKash, Nagad or Upay'],
    get: ['A headline that says what you do', 'Your key numbers, chosen and worded', 'A plan for your site and a timeline of your roles'],
    days: [
      { label: 'Day 1', text: 'We choose your headline and the numbers that prove it.' },
      { label: 'Day 2', text: 'We plan the sections of your site and draft your career timeline.' },
    ],
    monument: 'monoliths',
    position: [12, 0, -54],
    cameraOffset: [-9.5, 3, 8],
    focusHeight: 2.6,
    panelSide: 'left',
  },
  {
    id: 'days-3-5',
    navLabel: 'Days 3–5',
    kind: 'stage',
    period: 'Days 3–5 · The digital build',
    title: 'Design and build',
    summary: 'Your site is built for phones first, with your contact links ready.',
    send: ['Nothing, unless we have a question'],
    get: ['A draft of your site to open on your phone', 'One-tap PDF CV, LinkedIn, WhatsApp and email'],
    days: [
      { label: 'Day 3', text: 'The design takes shape: your name, role and key numbers up front.' },
      { label: 'Day 4', text: 'Your impact figures and career timeline are placed in the layout.' },
      { label: 'Day 5', text: 'The phone view is built and your contact links are added.' },
    ],
    monument: 'studio',
    poster: `${base}stages/monitor.jpg`,
    posterAlt: 'The sample portfolio site on a desktop screen, with its impact figures and contact links',
    position: [-7, 0, -72],
    cameraOffset: [6.93, 2.3, 6.93],
    focusHeight: 2.1,
    pan: true,
    framingShift: { wide: 2.76, narrow: 3.2 },
    narrowDistance: 1.45,
    panelSide: 'right',
  },
  {
    id: 'days-6-7',
    navLabel: 'Days 6–7',
    kind: 'stage',
    period: 'Days 6–7 · Review and live launch',
    title: 'Review and launch',
    summary: 'You review the draft, we refine it, and it goes live.',
    send: ['Your feedback on the draft', 'Your go-ahead to launch'],
    get: ['Your live executive website', 'A link you can put in your email, LinkedIn and CV'],
    days: [
      { label: 'Day 6', text: 'You review the draft and we apply your changes.' },
      { label: 'Day 7', text: 'Your site goes live, with a link ready to share.' },
    ],
    monument: 'beacon',
    position: [11, 0, -90],
    cameraOffset: [-9.5, 2.6, 12],
    focusHeight: 3.4,
    panelSide: 'left',
  },
  {
    id: 'pricing',
    navLabel: 'Pricing',
    kind: 'offer',
    period: 'What you get',
    title: 'One link that carries your career.',
    summary: 'Built for recruiters, boards and partners who give you about ninety seconds on a phone.',
    items: [
      ['Executive portfolio website', 'A fast, single-link home for your career'],
      ['Impact and metrics showcase', 'Your numbers, up front'],
      ['Experience timeline', 'Your roles and growth, told as a story'],
      ['Skills and credentials', 'Degrees, certifications and strengths in one place'],
      ['One-tap contact', 'PDF CV, LinkedIn, WhatsApp and email'],
    ],
    plans: [
      { label: 'Bangladesh', price: 'BDT 25,000' },
      { label: 'International', price: '$400 USD' },
    ],
    terms: '5 to 7 working days. Free CV audit first. Advance payment via bKash, Nagad or Upay.',
    monument: 'crystal',
    position: [-3, 2, -108],
    cameraOffset: [8.5, 0.8, 9],
    focusHeight: 0.8,
    panelSide: 'right',
  },
  {
    id: 'media',
    navLabel: 'Media',
    kind: 'media',
    period: 'Quoted individually',
    title: 'Media & Guest Profile',
    emphasis: 'Profile',
    summary:
      'A producer-ready profile for senior professionals: positioning, headline numbers, interview angles and a booking page. Built for podcasts, panels and keynotes.',
    parts: ['Positioning', 'Headline numbers', 'Interview angles', 'A booking page'],
    priceNote: 'Priced to your brief.',
    quoteUrl:
      'https://wa.me/8801790653537?text=Hi%20Shuvo%2C%20I%20would%20like%20a%20quote%20for%20a%20media%20and%20guest%20profile.',
    caption: 'Guest Profile: Muhammed Mehdi Hasan Chowdhury',
    monument: 'mediakit',
    poster: `${base}stages/guest-profile.jpg`,
    posterAlt:
      'Cover of the guest profile for Muhammed Mehdi Hasan Chowdhury: Sales Turnaround Strategist and Channel Growth Architect',
    position: [10, 0, -126],
    cameraOffset: [-4.17, 2.3, 4.45],
    focusHeight: 2.3,
    pan: true,
    framingShift: { wide: 1.27, narrow: 1.6 },
    narrowDistance: 1.41,
    panelSide: 'left',
  },
  {
    id: 'faq',
    navLabel: 'FAQ',
    kind: 'faq',
    period: 'FAQ',
    title: 'Questions, answered.',
    emphasis: 'answered.',
    summary: 'The short answers most people ask for before they send a CV.',
    faq: [
      ['How fast can my site go live?', 'Within 5 to 7 working days of starting.'],
      ['What does it cost?', 'BDT 25,000 in Bangladesh, and $400 USD internationally.'],
      ['How do I pay?', 'You pay an advance via bKash, Nagad or Upay.'],
      ['What do I need to send?', 'Your current CV is enough. We start with a free CV audit.'],
      ['Will it work on a phone?', 'Yes. Each profile is built to load fast and read well on a phone.'],
    ],
    monument: 'bubbles',
    position: [-4, 0, -144],
    cameraOffset: [8.5, 2.4, 9],
    focusHeight: 2.4,
    framingShift: { wide: 2.6, narrow: 3.4 },
    narrowDistance: 1.35,
    panelSide: 'right',
  },
  {
    id: 'contact',
    navLabel: 'Get started',
    kind: 'contact',
    period: 'Get started',
    title: 'Ready to stand out?',
    emphasis: 'stand out?',
    summary: 'Send your current CV on WhatsApp or by email. We start with a free audit.',
    monument: 'emergence',
    poster: `${base}logo/ps-logo-emblem.png`,
    posterAlt: 'Portfolio Studio logo',
    position: [10, 0, -162],
    cameraOffset: [-7, 2.8, 6.6],
    focusHeight: 2.6,
    panelSide: 'left',
  },
];

/**
 * Dive stops: one per sample site. The camera pushes in until the screen fills most of
 * the view and the recorded site scrolls top to bottom. Positions are derived from the
 * Samples stop and SHOWCASE_LAYOUT, so moving the Samples cluster moves these too.
 */
function buildDiveStops(samples) {
  const yaw = Math.atan2(samples.cameraOffset[0], samples.cameraOffset[2]);
  const rotate = (x, z, a) => [x * Math.cos(a) + z * Math.sin(a), -x * Math.sin(a) + z * Math.cos(a)];
  const WIDE_VIEW = 1.228; // visible width per unit distance at fov 42 on a 16:10 screen

  // One dive stop per site, in SITES order; `screen` is the screen's index in SHOWCASE_LAYOUT.
  return SITES.map((site, i) => {
    const screen = SHOWCASE_LAYOUT.findIndex((entry) => entry.site === i);
    const l = SHOWCASE_LAYOUT[screen];
    const [cx, cz] = rotate(l.x, l.z, yaw);
    const [nx, nz] = rotate(Math.sin(l.rot), Math.cos(l.rot), yaw);
    const distance = l.width / (0.68 * WIDE_VIEW); // screen fills ~68% of a wide viewport
    return {
      id: `sample-${i + 1}`,
      navLabel: site.name,
      kind: 'sample',
      screen,
      site,
      period: `Live sample · ${i + 1} of ${SITES.length}`,
      title: site.fullName,
      role: site.role,
      summary: site.summary,
      metrics: site.metrics,
      monument: null,
      dive: true,
      position: [samples.position[0] + cx, 0, samples.position[2] + cz],
      cameraOffset: [nx * distance, l.y, nz * distance],
      focusHeight: l.y,
      framingShift: { wide: 0.12 * WIDE_VIEW * distance, narrow: 0.45 * l.width },
      narrowDistance: 1.53,
      panelSide: 'left',
    };
  });
}

const samplesIndex = BASE_STOPS.findIndex((s) => s.id === 'samples');
export const MILESTONE_STOPS = [
  ...BASE_STOPS.slice(0, samplesIndex + 1),
  ...buildDiveStops(BASE_STOPS[samplesIndex]),
  ...BASE_STOPS.slice(samplesIndex + 1),
];
