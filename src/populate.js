import {
  profile, chapters, experience, projects, archive,
  arsenal, honors, education,
} from './data/content.js';
import { bard } from './audio.js';

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
};

/** Fill every chapter with content from the data file. */
export function populate() {
  document.getElementById('calling-summary').textContent = profile.summary;

  // rail
  const rail = document.querySelector('.rail');
  for (const ch of chapters) {
    const b = el('button', 'rail-dot');
    b.dataset.target = ch.id;
    b.setAttribute('aria-label', ch.label);
    b.appendChild(el('span', 'rail-tip', ch.numeral ? `${ch.numeral} · ${ch.label}` : ch.label));
    rail.appendChild(b);
  }

  // experience
  const xp = document.getElementById('xp-list');
  for (const job of experience) {
    const li = el('li', 'xp-item reveal');
    li.appendChild(el('span', 'xp-period', job.period));
    const body = el('div');
    body.appendChild(el('h3', 'xp-role', job.role));
    body.appendChild(el('p', 'xp-company', `${job.company} — ${job.place}`));
    const deeds = el('div', 'xp-deeds');
    for (const d of job.deeds) deeds.appendChild(el('p', '', d));
    body.appendChild(deeds);
    li.appendChild(body);
    xp.appendChild(li);
  }

  // gallery — every card opens the project detail view
  const track = document.getElementById('gallery-track');
  projects.forEach((p, i) => {
    const card = el('article', 'work-card');
    const frame = el('div', 'work-frame');

    const img = el('img');
    if (p.images.length) {
      img.src = p.images[0];
      img.alt = p.title;
      img.loading = i < 2 ? 'eager' : 'lazy';
      img.referrerPolicy = 'no-referrer';
      img.onload = () => img.classList.add('is-loaded');
      frame.appendChild(img);
    } else {
      frame.appendChild(el('span', 'work-mono', p.title[0]));
    }
    frame.appendChild(el('span', 'work-open', 'View project ↗'));

    if (p.images.length > 1) {
      const thumbs = el('div', 'work-thumbs');
      p.images.forEach((src, j) => {
        const b = el('button', j === 0 ? 'is-active' : '');
        const ti = el('img');
        ti.src = src.replace('w1600', 'w200');
        ti.alt = '';
        ti.loading = 'lazy';
        ti.referrerPolicy = 'no-referrer';
        b.appendChild(ti);
        b.addEventListener('click', (e) => {
          e.stopPropagation();
          img.classList.remove('is-loaded');
          img.src = src;
          thumbs.querySelectorAll('button').forEach((x) => x.classList.remove('is-active'));
          b.classList.add('is-active');
        });
        thumbs.appendChild(b);
      });
      frame.appendChild(thumbs);
    }
    card.appendChild(frame);

    const meta = el('div', 'work-meta');
    meta.appendChild(el('span', 'work-index', String(i + 1).padStart(2, '0')));
    meta.appendChild(el('h3', 'work-title', p.title));
    meta.appendChild(el('span', 'work-cat', `${p.category}<br>${p.year}`));
    card.appendChild(meta);
    card.appendChild(el('p', 'work-desc', p.description));
    card.addEventListener('click', () => openProject(p));
    track.appendChild(card);
  });

  // complete works grid — every tile opens its Drive folder
  const grid = document.getElementById('archive-grid');
  for (const c of archive) {
    const a = el('a', 'archive-tile');
    a.href = c.drive;
    a.target = '_blank';
    a.rel = 'noreferrer';
    const visual = el('div', 'archive-thumb');
    if (c.thumb) {
      const im = el('img');
      im.src = c.thumb;
      im.alt = c.name;
      im.loading = 'lazy';
      im.referrerPolicy = 'no-referrer';
      visual.appendChild(im);
    } else {
      visual.appendChild(el('span', 'archive-mono', c.name[0]));
    }
    a.appendChild(visual);
    const meta = el('div', 'archive-meta');
    meta.appendChild(el('strong', '', c.name));
    meta.appendChild(el('span', '', c.category));
    a.appendChild(meta);
    grid.appendChild(a);
  }

  // arsenal
  const groups = document.getElementById('arsenal-groups');
  for (const g of arsenal) {
    const div = el('div', 'arsenal-group reveal');
    div.appendChild(el('h3', '', g.group));
    const tags = el('div', 'arsenal-tags');
    for (const item of g.items) tags.appendChild(el('span', 'arsenal-tag', item));
    div.appendChild(tags);
    groups.appendChild(div);
  }

  // honors
  const hc = document.getElementById('honor-cards');
  for (const h of honors) {
    const card = el('div', 'honor-card reveal');
    card.appendChild(el('h3', '', h.title));
    card.appendChild(el('p', 'honor-event', h.event));
    card.appendChild(el('p', 'honor-detail', h.detail));
    hc.appendChild(card);
  }

  // education
  const edu = document.getElementById('education');
  for (const e of education) {
    const d = el('div');
    d.appendChild(el('h4', '', e.period ? `Schooling · ${e.period}` : 'Certification'));
    d.appendChild(el('p', '', `${e.degree}<br>${e.school}`));
    edu.appendChild(d);
  }

  // summon
  const mail = document.getElementById('summon-mail');
  mail.href = `mailto:${profile.email}`;
  mail.textContent = profile.email;

  document.getElementById('summon-links').innerHTML = [
    [`tel:${profile.phone.replace(/\s/g, '')}`, profile.phone],
    [profile.linkedin, 'LinkedIn'],
    [profile.drive, 'Full Portfolio Drive'],
    [null, profile.location],
  ]
    .map(([href, label]) =>
      href
        ? `<li><a href="${href}" target="_blank" rel="noreferrer">${label}</a></li>`
        : `<li>${label}</li>`
    )
    .join('');

  document.getElementById('colophon-left').textContent =
    `© ${new Date().getFullYear()} ${profile.fullName}`;
}

// ── project detail view ──────────────────────────────────────
let lenisRef = null;
export function wireProjects(lenis) {
  lenisRef = lenis;
  const view = document.getElementById('project-view');
  view.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) closeProject();
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !view.hidden) closeProject();
  });
}

function openProject(p) {
  const view = document.getElementById('project-view');
  document.getElementById('pv-cat').textContent = `${p.category} — ${p.year}`;
  document.getElementById('pv-title').textContent = p.title;
  document.getElementById('pv-desc').textContent = p.description;

  const actions = document.getElementById('pv-actions');
  actions.innerHTML = '';
  const addBtn = (href, label) => {
    const a = document.createElement('a');
    a.className = 'pview-btn';
    a.href = href;
    a.target = '_blank';
    a.rel = 'noreferrer';
    a.textContent = label;
    actions.appendChild(a);
  };
  if (p.drive) addBtn(p.drive, 'Full project folder on Drive ↗');
  if (p.video) addBtn(p.video, 'Watch motion & video ↗');

  const imgs = document.getElementById('pv-images');
  imgs.innerHTML = '';
  for (const src of p.images) {
    const im = document.createElement('img');
    im.src = src;
    im.alt = p.title;
    im.loading = 'lazy';
    im.referrerPolicy = 'no-referrer';
    imgs.appendChild(im);
  }

  view.hidden = false;
  document.body.style.overflow = 'hidden';
  bard.openHit();
  lenisRef?.stop();
  view.querySelector('.pview-panel').scrollTop = 0;
}

function closeProject() {
  document.getElementById('project-view').hidden = true;
  document.body.style.overflow = '';
  lenisRef?.start();
}
