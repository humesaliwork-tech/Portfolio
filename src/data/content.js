// ─────────────────────────────────────────────────────────────
//  All portfolio content: sourced from Syed Humes Ali's CV and
//  the public Google Drive portfolio folder.
//  Images are served from Google Drive's thumbnail CDN — the
//  parent folder is publicly link-shared. Swap `driveImg` for
//  local asset paths if you later self-host the artwork.
// ─────────────────────────────────────────────────────────────

export const driveImg = (id, w = 1600) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;

export const driveFolder = (id) =>
  `https://drive.google.com/drive/folders/${id}`;

export const driveFile = (id) =>
  `https://drive.google.com/file/d/${id}/view`;

export const profile = {
  name: 'Syed Humes Ali',
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

// ── Featured projects (the big gallery, in display order) ────
// Each project can have:
//   drive: link shown as "Full project folder on Drive ↗"
//   video: link shown as "Watch motion & video ↗"
//   images: [] is allowed — the card shows a monogram until you add some
export const projects = [
  {
    title: 'DIFC Ignyte',
    category: 'Brand & Event Design',
    year: '2024–26',
    drive: driveFolder('14NAg1scP2qbyJQwaCjbEMNItV-hfq7e3'),
    video: driveFolder('1MASVCwvQEWjMYBgfkeQpdfBS8kX6YaGB'),
    description:
      'Flagship innovation initiative of Dubai International Financial Centre. Event branding, digital campaigns, merch and experience design for the city’s start-up ecosystem.',
    images: [
      driveImg('1Zf62pode0z0nLoXiMKyIKpJdk-eUnCz9'),
      driveImg('1u5n477EjFoeeDqEbktBzeVT4vuPML44x'),
      driveImg('1KrWoZEncrmuWu0YXtSTwywOqKY-8YEz_'),
      driveImg('184c0DtK0EEz3qtWBGvg6Il6DolvVY_sU'),
      driveImg('1u92_M69PVnb0XCDzd5hoUbKwNvTJchuq'),
      driveImg('1RfNHXbwnGVQa2peJ5JNE-Zt1mcNOKz6m'),
      driveImg('1VfjeV7T3_OTiAYT9BLCrAWqFPXsmDN2J'),
      driveImg('10YWPy0jb01hIHtOyQI3_tL2FRaaHxh3w'),
      driveImg('1jgEPS7GECHEdDw3t8bmMb0NsjcC4PihQ'),
      driveImg('1qh0xrQOJbHNC-WtZ3KsjHmnoQsxcG_e6'),
      driveImg('12VntcpfYszQIlQZfyYGP9zS4-330MvA2'),
      driveImg('1cfAQKqLOjc7djHeXC69qdTU--Xhfssuq'),
      driveImg('1Nyok0Q1dEs7uQU-_cvInNxTaOxK79_gn'),
    ],
  },
  {
    title: 'Kadayifzade',
    category: 'Social Media & Campaign',
    year: '2024',
    drive: driveFolder('1DNKEMY0h4NZkPBr_vTFFxuWecpp77MB6'),
    description:
      'Appetite-first social media and campaign design for the Turkish dessert house — content that made künefe irresistible online.',
    images: [
      driveImg('1akAxTIYMbVrZdiYxR-KSRCUf4vcWfRpW'),
      driveImg('19OdaLQaTU_f7JFWKp9C0YfLVBKzxKzDD'),
    ],
  },
  {
    title: '21st Asian U20 Athletics Championship',
    category: 'Event Branding · Website · Campaign',
    year: '2024',
    drive: driveFolder('11UzFMPD42_CMnvrPSZLPFW5wBqMBhOLr'),
    description:
      'Full identity, website and campaign system for the continental championship in Dubai — honored by the UAE Athletics Federation and Dubai Police.',
    images: [
      driveImg('1Vl1v4LrnhU2k1naVIiRRHZnxRUlE4W9J'),
      driveImg('1ux78B5vBm4HMHvIOZPnUTciV8Jn0Xu2Z'),
      driveImg('1EyzRfbGhc0hO_-yIMFOw93Ck8rYQQN8s'),
      driveImg('1oNWvGHfQa8e8yL0eyd2maMkzRF-Uqh28'),
      driveImg('1FYv4F8h__dghnOZoUCMqtB79Dxwjhen4'),
      driveImg('1lbxZm7Bvad9BNTJj6RCxA7kIvcwErRuk'),
      driveImg('1l9lXq0LNIG3jBLgz1YcInt2_BLqo6h36'),
      driveImg('1_8j3JryiaUH8IFxnkEPuCMsTHBiqytp2'),
    ],
  },
  {
    title: '13th Regional IP Crime Conference',
    category: 'Event Branding · Website · Print',
    year: '2024',
    drive: driveFolder('1SnwYCsMPBCou7zQWjz263SToUMB1SqP0'),
    description:
      'Branding, website and campaign material for the EIPAC conference on combating IP crime — awarded an Appreciation Award by Dubai Police.',
    images: [
      driveImg('1F5w920PuG7cJAjjwXzi0rmhwilayvf5p'),
      driveImg('1EZ0dujT3DpsgiUCr_2HUCyA9bdPmXq-v'),
      driveImg('1SUDMeGlRXe_VCC030v7pAtNE4ufA1Eqf'),
      driveImg('1Qlc7HCogbfEhCw3Lkn-qGr3U0NADkiHQ'),
      driveImg('1Ff_5Y-E5Nfe6Q0hmWSg_BZK8XuSedBRA'),
    ],
  },
  {
    title: 'Gulabo',
    category: 'Brand Creatives',
    year: '2023',
    drive: driveFolder('1ksJqR120XO2AFhN1JALELsgkVst5VW4B'),
    description:
      'Vivid brand creatives and campaign visuals for Gulabo — color-rich storytelling for a bold identity.',
    images: [
      driveImg('1YW5XOUFNnIsThsW1ru4I7_vl5goEBgVC'),
    ],
  },
  {
    title: 'La Cima Productions',
    category: 'Production Studio — Web & Brand',
    year: '2023–24',
    drive: driveFolder('1PvqfR1PLtekGSKGzV64S3qTShoa9W80O'),
    video: driveFolder('1Y-dxUf2mOXtyv8JDvCFj8lFTdWbs2iNT'),
    description:
      'Website and brand design for the production studio behind Dubai’s biggest event campaigns — my home base as Creative Manager.',
    images: [
      driveImg('1lbS0TVXb7xAMtBTRleLJEegoMcGFtQVx'),
      driveImg('1UI2CKnvBCjnF2hMb9bgP1v8p1nKypN5B'),
      driveImg('1hxn5gZuI-1El-h71FaM1HzRDUbeItC7h'),
      driveImg('14mlYLX40srJNApt-_A5eiUy4CsbIf_1G'),
      driveImg('1FAXiLzD9B_GNenIp20ZAwoj7wovyMDTl'),
      driveImg('1uKmH3qoM82XxTmNiHVsl_aXhiiEont5i'),
      driveImg('1jo2vlKpmijQcd_H577b3mQsiXxGmgYoS'),
    ],
  },
  {
    title: 'BADEA Bank',
    category: 'Event Branding',
    year: '2024',
    drive: driveFolder('1DRpcpsET_kpEvK4YbcsM2DooeYRCbguo'),
    description:
      'Event branding and environment design for the Arab Bank for Economic Development in Africa.',
    images: [
      driveImg('1MGsfsw3GtIaTZG9Zi6Ujqz074R8c-vNX'),
      driveImg('1NnbnQbCygIzcf6HuTEXKVTACBCY3MX0b'),
      driveImg('1W_7_hW3H57v1x9c8jUYPnxuH6TBqg4E6'),
      driveImg('1lx7FfGYyt5ipamo44H4VlCNCdXAO4lk-'),
      driveImg('1cnMzYUc0NCvQ_SefN_LQHOPVhqgfkp0t'),
      driveImg('1OrcDoPV8Jv_mVKFSSWk17jCgaBeuhWv3'),
      driveImg('1l-tUHtktk2WfDBw4X1w6T8E-WbzhGHk-'),
      driveImg('1XLICGm71mAAn1VhlptCWNJvYytrLmq6P'),
    ],
  },
  {
    title: 'Shubh Samriddhi',
    category: 'Festive & Devotional Creatives',
    year: '2023',
    drive: driveFolder('1PCeZ1B06i6uz70pT45sIsaqp0tIlvkHe'),
    description:
      'A year of festive, devotional and seasonal campaign creatives — from Ugadi to Holi, crafted for cultural resonance.',
    images: [
      driveImg('1iulzgrH5L3puPyFZzG9Xzo6QBlOeiN83'),
      driveImg('1HLXTOR2fldrsA29_eV7AZ8_jr0tm7IwK'),
      driveImg('1FqkvRGGtcRMTPPaM5Xl0pK5Xw00nL11M'),
      driveImg('1ezZaLjtUj_5u8fDVxYv51cWYtGoi9jqQ'),
      driveImg('1fusGGk4W24WBkJc5l5VXGVhp7apcfYwQ'),
      driveImg('15td_ONP7oBfRTUd1o-ahQDbZFTvFE01p'),
      driveImg('1-XNauuzLdZYCJUrXaPX5tfdd7OayY9fM'),
      driveImg('1k1J-MjxWCPfszeDPjyHuFumX2fPiHE6F'),
    ],
  },
  {
    // No ADPIC folder exists in the Drive portfolio yet — add image
    // file IDs below (and a drive folder link) when you upload them.
    title: 'ADPIC',
    category: 'Brand & Campaign Design',
    year: '2024',
    drive: driveFolder('1b35TljD22OrIDln24-KRYBAA25s7H9cA'),
    description:
      'Campaign and brand design work — full case study coming soon.',
    images: [],
  },
  {
    title: 'Pourhouse 7',
    category: 'Social Media Design',
    year: '2022–23',
    drive: driveFolder('1Bx0R_xy-ZnbO3lToc6BvwRHb_WM8RgcS'),
    description:
      'Ongoing social media design for the Pourhouse 7 brand — daily creatives with a consistent visual voice.',
    images: [
      driveImg('14f8nvtrTDK5HCTW1h8b0_309lQkxt_ln'),
      driveImg('1e-1nmYyxam6tlI2wLHBvFl7VAlY5nNtj'),
    ],
  },
  {
    title: 'Ya Halla',
    category: 'Brand Identity & Campaign',
    year: '2024',
    drive: driveFolder('1N2Q8EFitn9bcXugfuafZMtH-WRziapn6'),
    description:
      'Identity system and campaign deck — logo, color world and social language for a hospitality brand.',
    images: [
      driveImg('1HkKrmnYfxv0MpmUNMu-eP3kbvD31jb1q'),
      driveImg('1IQd3c14sYPoXIXNeKLFMKl_ywQF44x1m'),
      driveImg('1jRk61Uz4_dwaE6LGHtKlbGHUiem-iBZv'),
      driveImg('1an8JWty6Z28l4CoB1PUOnQpZpY_yLoKK'),
      driveImg('1AchQSQBCnkTSO6YXcQ0ttnA0rcBoS6ie'),
      driveImg('1EC5gl7XDpmwyy5BaydrLhmthTMIIV6C7'),
      driveImg('1hG87u5PPExEHuXnX_RIptc64VqxUA1oR'),
    ],
  },
  {
    title: 'BMW E30 M3',
    category: '3D Modeling & Animation',
    year: '2023',
    drive: driveFolder('1IIGsCC-5PVgr7tuq7GJTRqZswJcxKpYk'),
    video: driveFile('1sc-erQdaA4falEOfxyVvUBsmgtm9UKPu'),
    description:
      'Full-CG build of the legendary E30 M3 — modeled, textured, lit and animated as a cinematic automotive short.',
    images: [
      driveImg('1qrzYcoQSn5Ve_i9H5ylKuy3BR7JNbpuN'),
      driveImg('1C26IBu1f8lOr3RG7bhp8nFs2mJhHzNsa'),
      driveImg('1fl-Gw4ZNgVpbpiQYMFwErRHTixxeCaXn'),
      driveImg('1EXU6iyNj9L6Yk6PwgKlmLGXQXiGEqbBD'),
      driveImg('1ETLznge64GnpS35TBlUp4rZ7_y-a0G1U'),
      driveImg('1krvuHFlIv8odGZKebjSCcHAs3BF9dFmE'),
    ],
  },
  {
    title: 'Kohinoor Diamond',
    category: '3D Art & Lighting',
    year: '2022',
    drive: driveFolder('1IIGsCC-5PVgr7tuq7GJTRqZswJcxKpYk'),
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
    drive: driveFolder('1IIGsCC-5PVgr7tuq7GJTRqZswJcxKpYk'),
    description:
      'Cinematic lighting scenarios over a hero model — rim, mood and metal.',
    images: [
      driveImg('177AkqmzGXXhcP4GdfjW2tAUg57Zvxu7O'),
      driveImg('1aP0XZsRnadggf4it7h77KTOEFGEwD59v'),
      driveImg('1OUUKSfS3Y2c5f68FLl4vv7qpiEZVR51-'),
      driveImg('1cvQ60gSBbSlvyEVFhR2gSBcx81PT9Xfa'),
    ],
  },
  {
    title: 'Throne-Room Lamp',
    category: '3D Product Visualization',
    year: '2021',
    drive: driveFolder('1IIGsCC-5PVgr7tuq7GJTRqZswJcxKpYk'),
    description:
      'Game-of-Thrones-inspired table lamp — modeled and rendered through five lighting moods.',
    images: [
      driveImg('1lljGAewGhDQvB0td75IWnP-aqXmcdWL-'),
      driveImg('1vpWamBrlU2oWj5oSer5tsCFO3qu3JwDT'),
      driveImg('1BENiakTZI9TQXOgSZJHS6E8peRj7qDWT'),
      driveImg('197WNc1TJk6DYmVe2qnl-yE3Y-EYqFDaJ'),
    ],
  },
  {
    title: 'Digital Paintings',
    category: 'Illustration & Digital Art',
    year: '2021–22',
    drive: driveFolder('1ncmiw0fZ9vFboTU7Yn2jSTtGphHrdCEs'),
    description:
      'Kratos, Wolverine, Killmonger, Bumblebee, Neeraj Chopra — character studies painted stroke by stroke.',
    images: [
      driveImg('1_X0hAgbnPlmduFzerqyH8vs8lWhwJtmT'),
      driveImg('1UteAl_-DMdtfeM3WQjOEWHYsmFIJeOMn'),
      driveImg('1_tUG5TDMepcpvehv3tWr7lRDiXo5HN4i'),
      driveImg('1rjKeFZhJL8V8CihzAv9yNMxGvujDqgAb'),
      driveImg('12VKIFZ27utwIplrXt8eisHUJjXpoqNyM'),
    ],
  },
  {
    title: 'Fine Arts',
    category: 'Traditional Media',
    year: 'Ongoing',
    drive: driveFolder('1V7ohwjPmIyyXF50yStLPDsxecePJ4ZjV'),
    description:
      'Where it all began — graphite, ink and paint on paper.',
    images: [
      driveImg('1oblHVQfZRPkP1E-QMXMCZPvCp_dqH8Xu'),
      driveImg('1RCTPDs8l4AAGa9pZDKZ83D1xs2U44BDp'),
      driveImg('1_2ABxV0c-xsl_Tj4DbC5q2kz60p4ncxx'),
      driveImg('1y1qTGG8uuMaKWR2TseYumvcDA3YPWquq'),
      driveImg('1OGOqpQSVdjjwqoB9PMfA2ueFNdwMA_af'),
    ],
  },
];

// ── Complete works grid ──────────────────────────────────────
// Every remaining project/client. Each tile links to its Google
// Drive folder. To add one:
//   { name: 'Client', category: 'What it was',
//     drive: driveFolder('FOLDER_ID'), thumb: driveImg('IMAGE_FILE_ID') }
// FOLDER_ID = the part after /folders/ in the Drive URL.
// IMAGE_FILE_ID = the part after /d/ in the image's Drive URL.
// `thumb` is optional — without it the tile shows a monogram.
export const archive = [
  { name: 'Kiara', category: 'Social Media & Carousels', drive: driveFolder('1T0qqlt81G1-wvaN7ah5AWr869z_lZjP5'), thumb: driveImg('1k98rmfFsszjU1kpuPkINMuYPca7_1DZI', 400) },
  { name: 'Stylecraze', category: 'Infographics', drive: driveFolder('1luO6xOC-7cLtEAJESMiRLovIf8jjXLY2'), thumb: driveImg('1xV5PxKUejtCzWYshX6AhT6PA95tvWtGA', 400) },
  { name: 'Finecab', category: 'Brand Content', drive: driveFolder('1Tjqs8m8JTlrjFqrnwMGkU0D4hK1jkeJx') },
  { name: 'Hotel Kass', category: 'Hospitality Social Media', drive: driveFolder('1S40Z8py32TS8naCf0BzEemk-nv6MR0oY'), thumb: driveImg('141zAUSXuByxIG16oGwdugASD-UrfgyGh', 400) },
  { name: 'Hyaline Enviro', category: 'Brand Design', drive: driveFolder('1iPCQOaEyHBl6Zv8srz3N-Lv8zQzm_cCK') },
  { name: 'TSK', category: 'Social Media Design', drive: driveFolder('1xfF2-UiTaI-JalBepXm36i82XKqCxCcC'), thumb: driveImg('16IqD3HdCn-dCMgwgKMEfNy7xFJgUF51z', 400) },
  { name: 'Star Talk Show', category: 'Show Branding', drive: driveFolder('1oE9leuWJ4VzDxCNqqUtQVx6ZC8gC9YT4') },
  { name: 'Low-Poly Mustang', category: '3D Modeling', drive: driveFolder('1IIGsCC-5PVgr7tuq7GJTRqZswJcxKpYk'), thumb: driveImg('1CQR3rtXwGjJ1eH4V2koLUJTP12EmPtiD', 400) },
  { name: 'Park Concept', category: '3D Environment', drive: driveFolder('1IIGsCC-5PVgr7tuq7GJTRqZswJcxKpYk'), thumb: driveImg('1k5GHXPMhxCcdSqUO6e6F7TEKM2MhQAH4', 400) },
  { name: 'Futuristic Type Concept', category: '3D Typography', drive: driveFolder('1IIGsCC-5PVgr7tuq7GJTRqZswJcxKpYk'), thumb: driveImg('14NiM4uE4cV5gtBo-BNpaR3NUVLGwIJQv', 400) },
  { name: 'Motion Design Reels', category: 'Motion & Product Reels', drive: driveFolder('1Y-dxUf2mOXtyv8JDvCFj8lFTdWbs2iNT') },
  { name: 'Website Design', category: 'Web Design Collection', drive: driveFolder('15CcMJZlu7QjLNl82BxFV29lvKt-GcpAL'), thumb: driveImg('1Vl1v4LrnhU2k1naVIiRRHZnxRUlE4W9J', 400) },
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
