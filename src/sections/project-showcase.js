import { node } from '../ui/dom.js';
import { createProjectCard } from './project-card.js?revision=cargomesh-cover-2026-10-23';

/** Manual horizontal carousel. Native scrolling also supports trackpads and touch. */
export class ProjectShowcase {
  constructor(container, data, labels, { onOpen, onViewAll, reducedMotion }) {
    this.data = data;
    this.reducedMotion = reducedMotion;
    this.abort = new AbortController();
    this.index = 0;
    this.pendingIndex = null;
    this.frame = null;
    const signal = this.abort.signal;
    const root = node('div', 'project-carousel', '', { role: 'region', 'aria-roledescription': 'carrusel', 'aria-label': data.carouselLabel });
    this.viewport = node('div', 'project-carousel__viewport', '', { tabindex: '0', 'aria-label': data.carouselLabel });
    this.slides = data.items.map((project, index) => {
      const slide = node('div', 'project-carousel__slide', '', { role: 'group', 'aria-roledescription': 'diapositiva', 'aria-label': `${index + 1} / ${data.items.length}: ${project.title}` });
      slide.append(createProjectCard(project, data, labels, { onOpen, prefix: 'carousel-project', signal }));
      return slide;
    });
    this.viewport.append(...this.slides);
    if (!this.slides.length) this.viewport.append(node('p', 'empty-message', data.empty));
    const footer = node('div', 'project-carousel__footer');
    const controls = node('div', 'project-carousel__controls');
    this.previous = node('button', 'grimoire-button grimoire-button--compact carousel-arrow', '←', { type: 'button', 'aria-label': data.previous });
    this.next = node('button', 'grimoire-button grimoire-button--compact carousel-arrow', '→', { type: 'button', 'aria-label': data.next });
    this.status = node('span', 'project-carousel__status', '', { role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' });
    this.counter = node('span', '', '', { 'aria-hidden': 'true' });
    this.announcement = node('span', 'sr-only');
    this.status.append(this.counter, this.announcement);
    controls.append(this.previous, this.status, this.next);
    const viewAll = node('button', 'grimoire-button grimoire-button--secondary project-view-all', data.viewAll, { type: 'button', 'aria-haspopup': 'dialog' });
    viewAll.disabled = !this.slides.length;
    viewAll.addEventListener('click', () => onViewAll(viewAll), { signal });
    footer.append(controls, viewAll);
    root.append(footer, this.viewport);
    container.replaceChildren(root);
    this.previous.addEventListener('click', event => this.goTo(this.index - 1, event.detail !== 0), { signal });
    this.next.addEventListener('click', event => this.goTo(this.index + 1, event.detail !== 0), { signal });
    root.addEventListener('keydown', event => {
      const destinations = { ArrowLeft: this.index - 1, ArrowRight: this.index + 1, Home: 0, End: this.slides.length - 1 };
      if (!(event.key in destinations) || event.ctrlKey || event.altKey || event.metaKey) return;
      event.preventDefault();
      this.goTo(destinations[event.key], false);
    }, { signal });
    this.viewport.addEventListener('pointerdown', () => { this.pendingIndex = null; }, { signal });
    this.viewport.addEventListener('wheel', event => { if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) this.pendingIndex = null; }, { signal, passive: true });
    this.viewport.addEventListener('scroll', () => {
      if (this.frame !== null) return;
      this.frame = requestAnimationFrame(() => {
        this.frame = null;
        const width = this.viewport.clientWidth;
        if (!width) return;
        if (this.pendingIndex !== null && Math.abs(this.viewport.scrollLeft - this.pendingIndex * width) > 2) return;
        this.pendingIndex = null;
        this.setActive(Math.round(this.viewport.scrollLeft / width));
      });
    }, { signal, passive: true });
    this.resize = new ResizeObserver(() => this.goTo(this.index, false));
    this.resize.observe(this.viewport);
    this.slides.forEach(slide => this.resize.observe(slide.firstElementChild));
    reducedMotion.addEventListener('change', event => { if (event.matches) this.goTo(this.index, false); }, { signal });
    this.setActive(0);
  }

  setActive(index) {
    this.index = Math.max(0, Math.min(index, this.slides.length - 1));
    this.slides.forEach((slide, position) => {
      const active = position === this.index;
      if (!active && slide.contains(document.activeElement)) this.viewport.focus({ preventScroll: true });
      slide.inert = !active;
      slide.setAttribute('aria-hidden', String(!active));
    });
    this.previous.disabled = this.index === 0;
    this.next.disabled = this.index >= this.slides.length - 1;
    if ((this.previous.disabled && document.activeElement === this.previous) || (this.next.disabled && document.activeElement === this.next)) this.viewport.focus({ preventScroll: true });
    const total = this.slides.length;
    this.counter.textContent = `${String(total ? this.index + 1 : 0).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    this.announcement.textContent = total ? this.data.position.replace('{current}', this.index + 1).replace('{total}', total).replace('{title}', this.data.items[this.index].title) : this.data.empty;
    const card = this.slides[this.index]?.firstElementChild;
    const height = card ? `${Math.ceil(card.getBoundingClientRect().height)}px` : '';
    if (this.viewport.style.height !== height) this.viewport.style.height = height;
  }

  goTo(index, animate = true) {
    const destination = Math.max(0, Math.min(index, this.slides.length - 1));
    const smooth = animate && !this.reducedMotion.matches;
    this.pendingIndex = smooth ? destination : null;
    this.setActive(destination);
    this.viewport.scrollTo({ left: destination * this.viewport.clientWidth, behavior: smooth ? 'smooth' : 'instant' });
  }

  destroy() {
    this.abort.abort();
    this.resize.disconnect();
    if (this.frame !== null) cancelAnimationFrame(this.frame);
  }
}
