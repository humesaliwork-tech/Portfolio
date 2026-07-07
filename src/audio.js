/**
 * The Bard — sound for the tale.
 *
 * Music: if you add a file at  public/audio/theme.mp3  it is used as the
 * looping soundtrack. Without one, a procedural dark-fantasy ambience is
 * synthesized live with WebAudio (low drone, wind, distant war drums and
 * sparse melancholy notes) — no asset needed.
 *
 * UI sounds are always synthesized: soft clicks, chapter thuds, the
 * project-view impact.
 *
 * Browsers only allow audio after a user gesture, so everything starts
 * from the ♪ toggle in the header (state remembered in localStorage).
 */

class Bard {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.musicGain = null;
    this.on = false;
    this.timers = [];
  }

  _ensure() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.9;
    this.master.connect(this.ctx.destination);
  }

  async toggle() {
    this._ensure();
    if (this.ctx.state === 'suspended') await this.ctx.resume();
    this.on = !this.on;
    localStorage.setItem('bard', this.on ? 'on' : 'off');
    if (this.on) this._startMusic();
    else this._stopMusic();
    return this.on;
  }

  /* ── music ─────────────────────────────────────────────── */
  async _startMusic() {
    if (this.musicGain) return;
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0;
    this.musicGain.connect(this.master);
    this.musicGain.gain.linearRampToValueAtTime(1, this.ctx.currentTime + 3);

    // prefer a real soundtrack file if one exists
    try {
      const head = await fetch('audio/theme.mp3', { method: 'HEAD' });
      const type = head.headers.get('content-type') || '';
      if (head.ok && type.startsWith('audio')) {
        this.el = new Audio('audio/theme.mp3');
        this.el.loop = true;
        this.el.volume = 0.4;
        const src = this.ctx.createMediaElementSource(this.el);
        src.connect(this.musicGain);
        this.el.play();
        return;
      }
    } catch { /* no file — synthesize */ }

    const ctx = this.ctx;
    const out = this.musicGain;

    // deep drone — two detuned lows through a dark filter
    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 190;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.05;
    droneFilter.connect(droneGain).connect(out);
    for (const [type, freq] of [['sawtooth', 55], ['sine', 55.6], ['sine', 110.3]]) {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = freq;
      o.connect(droneFilter);
      o.start();
      this.timers.push(() => o.stop());
    }
    // slow breathing of the drone filter
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05;
    const lfoAmt = ctx.createGain();
    lfoAmt.gain.value = 70;
    lfo.connect(lfoAmt).connect(droneFilter.frequency);
    lfo.start();
    this.timers.push(() => lfo.stop());

    // wind — filtered noise, slowly wandering
    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    const wind = ctx.createBufferSource();
    wind.buffer = noiseBuf;
    wind.loop = true;
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.value = 320;
    windFilter.Q.value = 0.6;
    const windGain = ctx.createGain();
    windGain.gain.value = 0.014;
    wind.connect(windFilter).connect(windGain).connect(out);
    const windLfo = ctx.createOscillator();
    windLfo.frequency.value = 0.07;
    const windAmt = ctx.createGain();
    windAmt.gain.value = 160;
    windLfo.connect(windAmt).connect(windFilter.frequency);
    wind.start();
    windLfo.start();
    this.timers.push(() => { wind.stop(); windLfo.stop(); });

    // echo for the lament notes
    const delay = ctx.createDelay(2);
    delay.delayTime.value = 0.55;
    const fb = ctx.createGain();
    fb.gain.value = 0.45;
    delay.connect(fb).connect(delay);
    const delayOut = ctx.createGain();
    delayOut.gain.value = 0.5;
    delay.connect(delayOut).connect(out);

    // sparse minor-key lament (A minor pentatonic, low register)
    const scale = [220, 261.6, 329.6, 392, 293.7, 174.6];
    const note = () => {
      if (!this.musicGain) return;
      const f = scale[Math.floor(Math.random() * scale.length)] / 2;
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      const g = ctx.createGain();
      const t = ctx.currentTime;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.05, t + 0.08);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);
      o.connect(g);
      g.connect(out);
      g.connect(delay);
      o.start(t);
      o.stop(t + 3.4);
      this._later(note, 6000 + Math.random() * 8000);
    };
    this._later(note, 3500);

    // distant war drum
    const drum = () => {
      if (!this.musicGain) return;
      this._hit(42, 0.5, 0.09, out);
      if (Math.random() < 0.35) setTimeout(() => this._hit(38, 0.4, 0.06, out), 260);
      this._later(drum, 9000 + Math.random() * 9000);
    };
    this._later(drum, 6000);
  }

  _stopMusic() {
    if (!this.musicGain) return;
    const g = this.musicGain;
    this.musicGain = null;
    g.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.2);
    setTimeout(() => {
      this.timers.forEach((stop) => { try { stop(); } catch { /* done */ } });
      this.timers = [];
      this.el?.pause();
      this.el = null;
      g.disconnect();
    }, 1400);
  }

  _later(fn, ms) {
    const id = setTimeout(fn, ms);
    this.timers.push(() => clearTimeout(id));
  }

  /* one low percussive hit: pitched drop + noise breath */
  _hit(freq, dur, vol, dest) {
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq * 2.2, t);
    o.frequency.exponentialRampToValueAtTime(freq, t + dur * 0.5);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(dest || this.master);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  /* ── UI sounds (work whenever sound is on) ─────────────── */
  click() {
    if (!this.on || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.setValueAtTime(1400, t);
    o.frequency.exponentialRampToValueAtTime(700, t + 0.06);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.055, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.09);
  }

  thud() {
    if (!this.on || !this.ctx) return;
    this._hit(60, 0.35, 0.07);
  }

  openHit() {
    if (!this.on || !this.ctx) return;
    this._hit(48, 0.55, 0.1);
  }
}

export const bard = new Bard();

/** header toggle + global click sounds */
export function wireSound() {
  const btn = document.getElementById('sound-toggle');
  const label = (on) => {
    btn.textContent = on ? '♪ Sound on' : '♪ Sound off';
    btn.setAttribute('aria-pressed', String(on));
  };

  btn.addEventListener('click', async () => {
    label(await bard.toggle());
    bard.click();
  });

  // gentle prompt: if they enabled sound last visit, light the button up
  if (localStorage.getItem('bard') === 'on') {
    btn.classList.add('is-suggested');
  }

  // clicks on nav, rail, cards, buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-nav], .rail-dot, .work-thumbs button, .pview-btn, .pview-close, .archive-tile, .head-cta')) {
      bard.click();
    }
  });
}
