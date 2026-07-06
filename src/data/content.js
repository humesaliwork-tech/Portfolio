// ─────────────────────────────────────────────────────────────
//  All portfolio content: sourced from Syed Humes Ali's CV and
//  the public Google Drive portfolio folder.
//  Images are served from Google Drive's thumbnail CDN — the
//  parent folder is publicly link-shared. Swap `driveImg` for
//  local asset paths if you later self-host the artwork.
// ─────────────────────────────────────────────────────────────

export const driveImg = (id, w = 1600) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;

export const profile = {
  name: 'Humes Ali',
  fullName: 'Syed Humes Ali',
  title: 'Senior Creative Designer & 3D Artist',
  location: 'Sports City, Dubai — United Arab Emirates',
  phone: '+971 58 935 2784',
  email: 'humesaliwork@gmail.com',
  linkedin: 'https://www.linkedin.com/in/syed-humes-ali-aa619624b',
  website: 'https://humesali.framer.website/',
  drive:
    'https://drive.google.com/drive/folders/1b35TljD22OrIDln24-KRYBAA25s7H9cA',
  summary:
    'Creative digital artist with a relentless eye for detail and a hunger for high-quality work. I forge ideas into visually compelling designs that carry a brand’s message — thriving in fast-paced arenas, pushing creative boundaries, and sharpening production speed with every campaign.',
};

export const chapters = [
  { id: 'hero', numeral: '', label: 'The Gate' },
  { id: 'calling', numeral: 'I', label: 'The Calling' },
  { id: 'campaigns', numeral: 'II', label: 'The Campaigns' },
  { id: 'conquests', numeral: 'III', label: 'The Conquests' },
  { id: 'arsenal', numeral: 'IV', label: 'The Arsenal' },
  { id: 'honors', numeral: 'V', label: 'The Honors' },
  { id: 'summon', numeral: 'VI', label: 'Join Forces' },
];

export const experience = [
  {
    role: 'Senior Creative Designer',
    company: 'DIFC — Ignyte',
    period: '2024 — Present',
    place: 'Dubai, UAE',
    deeds: [
      'Leading design across marketing, events and product for DIFC’s flagship innovation initiative under the Dubai Digital Economy Mandate.',
      'Event branding that lifted attendance 40% · campaigns that raised engagement 35% · ads with a 25% higher CTR · emails opened 33% more often.',
    ],
  },
  {
    role: 'Creative Manager',
    company: 'La Cima Production Studios & Events',
    period: '2023 — 2024',
    place: 'Dubai, UAE',
    deeds: [
      'Commanded website, social, campaign and branding assets for the 21st Asian U20 Athletics Championship and the 13th Regional IP Crime Conference.',
      '25% rise in online engagement · 20+ projects delivered at a 95% on-time rate · client satisfaction up 30%.',
    ],
  },
  {
    role: 'Graphic Designer',
    company: 'Adstermonk — Digital Marketing Agency',
    period: '2022 — 2023',
    place: 'India',
    deeds: [
      '40 designs forged for 12 clients — social creatives, flyers and campaigns — while lifting team creativity by 30%.',
    ],
  },
  {
    role: 'Motion Graphic Designer',
    company: 'Mreatives',
    period: '2021 — 2022',
    place: 'India',
    deeds: [
      '50+ social creatives and motion reels that raised brand engagement 30% and average client sales 15%.',
    ],
  },
  {
    role: 'Graphic Designer',
    company: 'IncNut Digital',
    period: '2021',
    place: 'India',
    deeds: [
      '70 infographics that sharpened brand recognition by 20% and boosted team productivity 15%.',
    ],
  },
];

export const projects = [
  {
    title: 'DIFC Ignyte',
    category: 'Brand & Event Design',
    year: '2024–26',
    description:
      'Flagship innovation initiative of Dubai International Financial Centre. Event branding, digital campaigns, merch and experience design for the city’s start-up ecosystem.',
    images: [
      driveImg('1KrWoZEncrmuWu0YXtSTwywOqKY-8YEz_'),
      driveImg('1Zf62pode0z0nLoXiMKyIKpJdk-eUnCz9'),
      driveImg('1u92_M69PVnb0XCDzd5hoUbKwNvTJchuq'),
    ],
  },
  {
    title: '21st Asian U20 Athletics Championship',
    category: 'Event Branding · Website · Campaign',
    year: '2024',
    description:
      'Full identity, website and campaign system for the continental championship in Dubai — honored by the UAE Athletics Federation and Dubai Police.',
    images: [
      driveImg('1Vl1v4LrnhU2k1naVIiRRHZnxRUlE4W9J'),
      driveImg('1ux78B5vBm4HMHvIOZPnUTciV8Jn0Xu2Z'),
      driveImg('1EyzRfbGhc0hO_-yIMFOw93Ck8rYQQN8s'),
    ],
  },
  {
    title: '13th Regional IP Crime Conference',
    category: 'Event Branding · Website · Print',
    year: '2024',
    description:
      'Branding, website and campaign material for the EIPAC conference on combating IP crime — awarded an Appreciation Award by Dubai Police.',
    images: [
      driveImg('1F5w920PuG7cJAjjwXzi0rmhwilayvf5p'),
      driveImg('1EZ0dujT3DpsgiUCr_2HUCyA9bdPmXq-v'),
      driveImg('1Qlc7HCogbfEhCw3Lkn-qGr3U0NADkiHQ'),
    ],
  },
  {
    title: 'BMW E30 M3',
    category: '3D Modeling & Animation',
    year: '2023',
    description:
      'Full-CG build of the legendary E30 M3 — modeled, textured, lit and animated as a cinematic automotive short.',
    images: [
      driveImg('1qrzYcoQSn5Ve_i9H5ylKuy3BR7JNbpuN'),
      driveImg('1C26IBu1f8lOr3RG7bhp8nFs2mJhHzNsa'),
      driveImg('1fl-Gw4ZNgVpbpiQYMFwErRHTixxeCaXn'),
    ],
  },
  {
    title: 'Ya Halla',
    category: 'Brand Identity & Campaign',
    year: '2024',
    description:
      'Identity system and campaign deck — logo, color world and social language for a hospitality brand.',
    images: [
      driveImg('1HkKrmnYfxv0MpmUNMu-eP3kbvD31jb1q'),
      driveImg('1IQd3c14sYPoXIXNeKLFMKl_ywQF44x1m'),
      driveImg('1jRk61Uz4_dwaE6LGHtKlbGHUiem-iBZv'),
    ],
  },
  {
    title: 'Kohinoor Diamond',
    category: '3D Art & Lighting',
    year: '2022',
    description:
      'A study of light through the world’s most storied gem — caustics, dispersion and darkness.',
    images: [
      driveImg('1ABEH-ETriErmCQs8rVk8awmIDm4ieSOH'),
      driveImg('1Ii0ShVnFrfwmQZgF7WMAE1UlBtX919pc'),
    ],
  },
  {
    title: 'Iron Man — Light Study',
    category: '3D Lighting & Look-Dev',
    year: '2022',
    description:
      'Cinematic lighting scenarios over a hero model — rim, mood and metal.',
    images: [
      driveImg('177AkqmzGXXhcP4GdfjW2tAUg57Zvxu7O'),
      driveImg('1aP0XZsRnadggf4it7h77KTOEFGEwD59v'),
      driveImg('1OUUKSfS3Y2c5f68FLl4vv7qpiEZVR51-'),
    ],
  },
  {
    title: 'Throne-Room Lamp',
    category: '3D Product Visualization',
    year: '2021',
    description:
      'Game-of-Thrones-inspired table lamp — modeled and rendered through five lighting moods.',
    images: [
      driveImg('1lljGAewGhDQvB0td75IWnP-aqXmcdWL-'),
      driveImg('1vpWamBrlU2oWj5oSer5tsCFO3qu3JwDT'),
      driveImg('1BENiakTZI9TQXOgSZJHS6E8peRj7qDWT'),
    ],
  },
  {
    title: 'Digital Paintings',
    category: 'Illustration & Digital Art',
    year: '2021–22',
    description:
      'Kratos, Wolverine, Killmonger, Bumblebee, Neeraj Chopra — character studies painted stroke by stroke.',
    images: [
      driveImg('1_X0hAgbnPlmduFzerqyH8vs8lWhwJtmT'),
      driveImg('1UteAl_-DMdtfeM3WQjOEWHYsmFIJeOMn'),
      driveImg('1_tUG5TDMepcpvehv3tWr7lRDiXo5HN4i'),
    ],
  },
  {
    title: 'Fine Arts',
    category: 'Traditional Media',
    year: 'Ongoing',
    description:
      'Where it all began — graphite, ink and paint on paper.',
    images: [
      driveImg('1oblHVQfZRPkP1E-QMXMCZPvCp_dqH8Xu'),
      driveImg('1RCTPDs8l4AAGa9pZDKZ83D1xs2U44BDp'),
      driveImg('1_2ABxV0c-xsl_Tj4DbC5q2kz60p4ncxx'),
    ],
  },
];

export const alsoServed = [
  'BADEA', 'Kiara', 'Stylecraze', 'Pourhouse 7', 'Finecab', 'Kadayifzade',
  'Hotel Kass', 'Hyaline Enviro', 'TSK', 'Shubh Samriddhi', 'Gulabo',
  'Star Talk Show', 'Low-Poly Mustang', 'Futuristic Type Concepts',
];

export const arsenal = [
  {
    group: 'Craft',
    items: [
      'Graphic Design', 'Motion Design', '3D Modeling', '3D Animation',
      'Brand Identity', 'Illustration', 'Digital Painting', 'Typography',
      'Web Design', 'Video Editing', 'Print & Campaign Design', 'Infographics',
    ],
  },
  {
    group: 'Steel',
    items: [
      'Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro',
      'Autodesk Maya', 'Blender', 'ZBrush', 'Substance Painter',
      'Figma', 'Wix Studio', 'Canva',
    ],
  },
];

export const honors = [
  {
    title: 'Appreciation Award — Dubai Police',
    event: '13th Regional Conference on Combating IP Crime — MENA',
    detail:
      'Honored by His Excellency Major General Dr. Abdul Quddus Al Obaidly for masterminding the event branding, website and campaign materials.',
  },
  {
    title: 'Appreciation Award — UAE Athletics Federation & Dubai Police',
    event: '21st Asian U20 Athletics Championship, Dubai 2024',
    detail:
      'For designing and operating the event branding, website and campaign — with full on-site support at the accreditation center.',
  },
];

export const education = [
  {
    degree: 'B.Sc. Multimedia & Animation',
    school: 'Loyola Academy Degree College, Hyderabad',
    period: '2020 — 2023',
  },
  {
    degree: 'Visual Communication Design for Digital Media',
    school: 'IIT Roorkee — Certification',
    period: '',
  },
];
