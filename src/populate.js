import {
  profile, experience, projects, archive,
  arsenal, honors, education,
} from './data/content.js';

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
};

let lenisRef = null;
export function setLenis(l) { lenisRef = l; }

export function populate() {
  // marquee
  const words = ['Brand Identity', 'Motion Design', '3D & CGI', 'Campaign', 'Web Design', 'Illustration', 'Art Direction'];
  const chunk = words.map((w) => `${w}<span class="marquee-star">✦</span>`).join('');
  const track = document.getElementById('marquee-track');
  track.innerHTML = `<span>${chunk}</span><span>${chunk}</span><span>${chunk}</span>`;

  // work list
  document.getElementById('work-count').textContent =
    `${String(projects.length).padStart(2, '0')} Projects`;
  const list = document.getElementById('work-list');
  projects.forEach((p, i) => {
    const li = el('li', 'work-row');
    li.dataset.img = p.images[0] || '';
    li.setAttribute('data-cursor', 'view');
    li.appendChild(el('span', 'work-row-idx', String(i + 1).padStart(2, '0')));
    li.appendChild(el('span', 'work-row-title', p.title));
    li.appendChild(el('span', 'work-row-cat', p.category));
    li.appendChild(el('span', 'work-row-year', p.year));
    li.addEventListener('click', () => openProject(p, i));
    list.appendChild(li);
  });

  // archive grid
  const grid = document.getElementById('archive-grid');
  for (const c of archive) {
    const a = el('a', 'archive-tile');
    a.href = c.drive; a.target = '_blank'; a.rel = 'noreferrer';
    a.setAttribute('data-cursor', 'open');
    const thumb = el('div', 'archive-thumb');
    if (c.thumb) {
      const im = el('img');
      im.src = c.thumb; im.alt = c.name; im.loading = 'lazy'; im.referrerPolicy = 'no-referrer';
      thumb.appendChild(im);
    } else {
      thumb.appendChild(el('span', 'archive-mono', c.name[0]));
    }
    a.appendChild(thumb);
    const meta = el('div', 'archive-meta');
    meta.appendChild(el('strong', '', c.name));
    meta.appendChild(el('span', '', c.category));
    a.appendChild(meta);
    grid.appendChild(a);
  }
  const toggle = document.getElementById('archive-toggle');
  toggle.addEventListener('click', () => {
    const hidden = grid.hasAttribute('hidden');
    if (hidden) grid.removeAttribute('hidden');
    else grid.setAttribute('hidden', '');
    toggle.querySelector('span').textContent =
      hidden ? 'Hide the archive' : 'The complete archive';
  });

  // about
  document.getElementById('about-lead').textContent = profile.summary;
  document.getElementById('about-location').textContent = profile.location;
  const edu = document.getElementById('about-education');
  for (const e of education) {
    const d = el('p', '', `${e.degree}${e.school ? `<br>${e.school}${e.period ? ` · ${e.period}` : ''}` : ''}`);
    edu.appendChild(d);
  }

  // experience
  const exp = document.getElementById('exp-list');
  for (const job of experience) {
    const li = el('li', 'exp-row');
    li.appendChild(el('span', 'exp-period', job.period));
    const mid = el('div');
    mid.appendChild(el('h3', 'exp-role', job.role));
    mid.appendChild(el('p', 'exp-company', `${job.company} — ${job.place}`));
    li.appendChild(mid);
    const deeds = el('div', 'exp-deeds');
    for (const d of job.deeds) deeds.appendChild(el('p', '', d));
    li.appendChild(deeds);
    exp.appendChild(li);
  }

  // capabilities
  const caps = document.getElementById('caps-grid');
  for (const g of arsenal) {
    const col = el('div', 'caps-col');
    col.appendChild(el('h3', '', g.group === 'Craft' ? 'Disciplines' : 'Tools'));
    const ul = el('ul');
    for (const item of g.items) ul.appendChild(el('li', '', item));
    col.appendChild(ul);
    caps.appendChild(col);
  }

  // recognition
  const rec = document.getElementById('rec-list');
  for (const h of honors) {
    const row = el('div', 'rec-row');
    const left = el('div');
    left.appendChild(el('h3', 'rec-title', h.title));
    left.appendChild(el('p', 'rec-event', h.event));
    row.appendChild(left);
    row.appendChild(el('p', 'rec-detail', h.detail));
    rec.appendChild(row);
  }

  // contact
  const mail = document.getElementById('contact-mail');
  mail.href = `mailto:${profile.email}`;
  document.getElementById('contact-mail-text').textContent = profile.email;
  document.getElementById('contact-links').innerHTML = [
    [profile.linkedin, 'LinkedIn'],
    [profile.drive, 'Portfolio Drive'],
    [`tel:${profile.phone.replace(/\s/g, '')}`, 'Call'],
  ].map(([href, label]) => `<li><a href="${href}" target="_blank" rel="noreferrer" data-cursor="open">${label}</a></li>`).join('');
  document.getElementById('contact-copy').textContent =
    `© ${new Date().getFullYear()} ${profile.fullName}`;
}

// ── project detail ───────────────────────────────────────────
export function wireProjects() {
  const view = document.getElementById('project-view');
  view.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) closeProject();
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !view.hidden) closeProject();
  });
}

function openProject(p, i) {
  const view = document.getElementById('project-view');
  document.getElementById('pv-idx').textContent = String(i + 1).padStart(2, '0');
  document.getElementById('pv-title').textContent = p.title;
  document.getElementById('pv-cat').textContent = p.category;
  document.getElementById('pv-year').textContent = p.year;
  document.getElementById('pv-desc').textContent = p.description;

  const actions = document.getElementById('pv-actions');
  actions.innerHTML = '';
  const addBtn = (href, label) => {
    const a = document.createElement('a');
    a.className = 'pview-btn';
    a.href = href; a.target = '_blank'; a.rel = 'noreferrer';
    a.setAttribute('data-cursor', 'open');
    a.textContent = label;
    actions.appendChild(a);
  };
  if (p.drive) addBtn(p.drive, 'Full folder on Drive ↗');
  if (p.video) addBtn(p.video, 'Watch motion & video ↗');

  const imgs = document.getElementById('pv-images');
  imgs.innerHTML = '';
  if (p.images.length) {
    for (const src of p.images) {
      const im = document.createElement('img');
      im.src = src; im.alt = p.title; im.loading = 'lazy'; im.referrerPolicy = 'no-referrer';
      imgs.appendChild(im);
    }
  } else {
    imgs.appendChild(el('p', 'pview-desc', 'Full case study coming soon — reach out for the deck.'));
  }

  view.hidden = false;
  document.body.classList.add('no-scroll');
  lenisRef?.stop();
  view.querySelector('.pview-panel').scrollTop = 0;
  document.getElementById('work-preview').classList.remove('is-visible');
}

function closeProject() {
  document.getElementById('project-view').hidden = true;
  document.body.classList.remove('no-scroll');
  lenisRef?.start();
}
