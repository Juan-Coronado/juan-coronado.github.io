import { backgroundMask, samplePortrait } from './particles.js';

export class ParticlePortrait {
  constructor(canvas, options, { reducedMotion = false } = {}) {
    this.canvas = canvas;
    this.options = options;
    this.context = canvas.getContext('2d', { alpha: true });
    this.reducedMotion = reducedMotion;
    this.visible = false;
    this.inViewport = true;
    this.frame = 0;
    this.lastFrame = 0;
    this.startedAt = -Infinity;
    this.buckets = [];
    this.pointer = { x: -10000, y: -10000 };
    this.abort = new AbortController();
    this.tick = this.tick.bind(this);
    this.onVisibility = () => {
      if (document.hidden) this.stop();
      else if (this.visible) this.requestFrame();
    };
    document.addEventListener('visibilitychange', this.onVisibility, { signal: this.abort.signal });
    canvas.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      this.pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }, { passive: true, signal: this.abort.signal });
    canvas.addEventListener('pointerleave', () => {
      this.pointer = { x: -10000, y: -10000 };
    }, { signal: this.abort.signal });
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(canvas);
    this.viewportObserver = new IntersectionObserver(([entry]) => {
      this.inViewport = entry.isIntersecting;
      if (!this.inViewport) this.stop();
      else if (this.visible) { this.draw(performance.now()); this.requestFrame(); }
    });
    this.viewportObserver.observe(canvas);
  }

  async load(source) {
    if (!this.context) throw new Error('Canvas 2D no disponible.');
    const image = new Image();
    image.src = source;
    await image.decode();
    const sample = document.createElement('canvas');
    sample.width = this.options.sampleSize;
    sample.height = this.options.sampleSize;
    const context = sample.getContext('2d', { willReadFrequently: true });
    if (!context) throw new Error('No se pudo preparar la fotografía.');
    context.drawImage(image, 0, 0, sample.width, sample.height);
    const pixels = context.getImageData(0, 0, sample.width, sample.height);
    const mask = backgroundMask(pixels, this.options);
    const result = samplePortrait(pixels, {
      ...this.options,
      maxParticles: matchMedia('(max-width: 48rem)').matches ? this.options.mobileParticles : this.options.desktopParticles,
    });
    this.buckets = result.buckets;
    // A faint photographic luminance layer retains facial details between the dots.
    // Both layers use exactly the supplied pixels and the same background mask.
    const tones = context.createImageData(sample.width, sample.height);
    for (let pixel = 0; pixel < mask.length; pixel++) {
      if (mask[pixel]) continue;
      const offset = pixel * 4;
      const luminance = (.2126 * pixels.data[offset] + .7152 * pixels.data[offset + 1] + .0722 * pixels.data[offset + 2]) / 255;
      tones.data.set([236, 236, 218, Math.pow(luminance, 1.4) * 255 * this.options.tonalStrength], offset);
    }
    context.putImageData(tones, 0, 0);
    this.toneImage = sample;
    this.canvas.dataset.particleCount = String(result.count);
    this.resize();
    this.canvas.parentElement.classList.add('is-ready');
  }

  resize() {
    if (!this.context) return;
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    const ratio = Math.min(devicePixelRatio || 1, this.options.maxPixelRatio);
    this.canvas.width = Math.max(1, Math.round(rect.width * ratio));
    this.canvas.height = Math.max(1, Math.round(rect.height * ratio));
    this.context.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (this.visible) this.draw(performance.now());
  }

  reveal({ immediate = false } = {}) {
    this.visible = true;
    this.startedAt = immediate || this.reducedMotion ? -Infinity : performance.now();
    this.draw(performance.now());
    this.requestFrame();
  }

  hide() {
    this.visible = false;
    this.stop();
    this.context?.clearRect(0, 0, this.width, this.height);
  }

  setReducedMotion(value) {
    this.reducedMotion = value;
    if (value) {
      this.startedAt = -Infinity;
      this.stop();
      if (this.visible) this.draw(performance.now());
    } else this.requestFrame();
  }

  requestFrame() {
    if (!this.frame && this.visible && this.inViewport && !this.reducedMotion && !document.hidden) {
      this.frame = requestAnimationFrame(this.tick);
    }
  }

  tick(now) {
    this.frame = 0;
    if (now - this.lastFrame >= 1000 / this.options.framesPerSecond) {
      this.draw(now);
      this.lastFrame = now;
    }
    this.requestFrame();
  }

  draw(now) {
    if (!this.context || !this.visible || !this.width) return;
    const context = this.context;
    context.clearRect(0, 0, this.width, this.height);
    const size = Math.min(this.width, this.height);
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const progress = (now - this.startedAt) / this.options.formationDuration;
    const staticFrame = this.reducedMotion;
    const time = staticFrame ? 0 : now / 1600;

    if (this.toneImage) {
      context.globalAlpha = Math.max(0, Math.min(1, (progress - .5) * 2));
      context.drawImage(this.toneImage, centerX - size / 2, centerY - size / 2, size, size);
      context.globalAlpha = 1;
    }

    for (let bin = 0; bin < this.buckets.length; bin++) {
      const level = bin / 15;
      const color = this.options.palette[Math.min(this.options.palette.length - 1, Math.floor(level * this.options.palette.length))];
      const opacity = .04 + Math.pow(level, 1.5) * .96;
      const dotSize = (.9 + level * .75) * Math.max(.75, size / 780);
      context.fillStyle = `rgba(${color.join(',')},${opacity})`;

      for (const point of this.buckets[bin]) {
        const local = Math.max(0, Math.min(1, (progress - point.delay) / (1 - point.delay)));
        if (local <= 0) continue;
        const formed = 1 - Math.pow(1 - local, 4);
        const targetX = centerX + point.x * size;
        const targetY = centerY + point.y * size;
        let x = centerX + (point.originX + (point.x - point.originX) * formed) * size;
        let y = centerY + (point.originY + (point.y - point.originY) * formed) * size;
        if (!staticFrame) {
          x += Math.sin(time + point.phase) * formed * .8;
          y += Math.cos(time * .7 + point.phase) * formed * .8;
          const dx = targetX - this.pointer.x;
          const dy = targetY - this.pointer.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared > 1 && distanceSquared < 6400) {
            const distance = Math.sqrt(distanceSquared);
            const force = (1 - distance / 80) * 6 * formed;
            x += dx / distance * force;
            y += dy / distance * force;
          }
        }
        context.fillRect(x, y, dotSize, dotSize);
      }
    }
  }

  stop() { cancelAnimationFrame(this.frame); this.frame = 0; }
  destroy() { this.stop(); this.observer.disconnect(); this.viewportObserver.disconnect(); this.abort.abort(); }
}
