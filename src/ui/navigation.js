import { node } from './dom.js';

export class SectionNavigation {
  constructor({ header, nav, toggle, onActive = () => {} }, items) {
    this.header = header;
    this.nav = nav;
    this.toggle = toggle;
    this.onActive = onActive;
    this.abort = new AbortController();
    const options = { signal: this.abort.signal };
    this.links = items.map(item => node('a', 'nav-link', item.label, { href: `#${item.id}` }));
    nav.replaceChildren(...this.links);
    this.setActive(location.hash.slice(1) || items[0]?.id);
    toggle.addEventListener('click', () => this.setOpen(toggle.getAttribute('aria-expanded') !== 'true'), options);
    nav.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link) return;
      this.setActive(link.hash.slice(1));
      this.setOpen(false);
    }, options);
    document.addEventListener('pointerdown', event => {
      if (!header.contains(event.target)) this.setOpen(false);
    }, options);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        this.setOpen(false);
        toggle.focus();
      }
    }, options);
    this.media = matchMedia('(min-width: 64rem)');
    this.media.addEventListener('change', event => { if (event.matches) this.setOpen(false); }, options);
    this.observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) this.setActive(entry.target.id);
    }, { rootMargin: '-18% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('[data-nav-section]').forEach(section => this.observer.observe(section));
    this.heroObserver = new IntersectionObserver(([entry]) => {
      header.classList.toggle('is-scrolled', !entry.isIntersecting);
    }, { threshold: 0 });
    this.heroObserver.observe(document.getElementById(items[0].id));
  }

  setActive(id) {
    for (const link of this.links) {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    this.onActive(id);
  }

  setOpen(open) {
    this.toggle.setAttribute('aria-expanded', String(open));
    this.header.classList.toggle('is-menu-open', open);
    this.toggle.querySelector('.menu-toggle__mark').textContent = open ? '−' : '+';
  }

  destroy() { this.abort.abort(); this.observer.disconnect(); this.heroObserver.disconnect(); }
}
