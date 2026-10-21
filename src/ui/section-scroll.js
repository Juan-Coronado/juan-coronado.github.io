import { sectionScrollTarget } from './scroll-target.js';

const editableSelector = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="slider"], [role="listbox"]';

export class SectionScroll {
  constructor(sections, options, reducedMotion) {
    this.sections = sections;
    this.options = options;
    this.reducedMotion = reducedMotion;
    this.root = document.documentElement;
    this.abort = new AbortController();
    this.gesture = { lastEvent: -Infinity, amount: 0, consumed: false };
    this.scrolling = false;
    this.frame = null;
    const listen = { signal: this.abort.signal };
    document.addEventListener('wheel', event => this.onWheel(event), { ...listen, passive: false });
    document.addEventListener('keydown', event => this.onKey(event), listen);
    document.addEventListener('click', event => this.onAnchor(event), listen);
    window.addEventListener('hashchange', () => {
      const section = this.sections.find(element => `#${element.id}` === location.hash);
      if (section) this.goTo(section.getBoundingClientRect().top + scrollY, { focus: section });
    }, listen);
    window.addEventListener('resize', () => this.cancelScroll(), listen);
    window.addEventListener('pagehide', () => this.cancelScroll(), listen);
    reducedMotion.addEventListener('change', event => {
      if (event.matches && this.scrolling) this.goTo(this.destination, { focus: this.destinationFocus, animate: false });
    }, listen);
  }

  unavailable() {
    return document.body.matches('.is-playing, .has-dialog') || Boolean(document.querySelector('.site-header.is-menu-open'));
  }

  geometry() {
    return this.sections.map(element => {
      const rect = element.getBoundingClientRect();
      return { element, top: rect.top + scrollY, bottom: rect.bottom + scrollY };
    });
  }

  scrollsInside(target, direction) {
    if (target.closest(`${editableSelector}, [data-native-scroll]`)) return true;
    for (let element = target; element && element !== document.body; element = element.parentElement) {
      const style = getComputedStyle(element);
      if (!/(auto|scroll)/.test(style.overflowY) || element.scrollHeight <= element.clientHeight) continue;
      const room = direction > 0
        ? element.scrollHeight - element.clientHeight - element.scrollTop
        : element.scrollTop;
      if (room > this.options.tolerance) return true;
    }
    return false;
  }

  onWheel(event) {
    if (this.unavailable() || event.defaultPrevented || !event.cancelable || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || this.scrollsInside(event.target, Math.sign(event.deltaY))) return;
    event.preventDefault();
    const now = performance.now();
    if (now - this.gesture.lastEvent > this.options.gestureQuietMs) {
      this.gesture.amount = 0;
      this.gesture.consumed = false;
    }
    this.gesture.lastEvent = now;
    if (this.scrolling) { this.gesture.consumed = true; return; }
    if (this.gesture.consumed) return;
    const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? this.options.linePixels
      : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? innerHeight : 1;
    this.gesture.amount += event.deltaY * unit;
    if (Math.abs(this.gesture.amount) < this.options.wheelThreshold) return;
    this.gesture.consumed = true;
    this.move(Math.sign(this.gesture.amount));
  }

  onKey(event) {
    if (this.unavailable() || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
    const directions = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1, ' ': event.shiftKey ? -1 : 1 };
    if (!(event.key in directions) && event.key !== 'Home' && event.key !== 'End') return;
    if (event.target.closest(editableSelector) || this.scrollsInside(event.target, directions[event.key] ?? 1)) return;
    if (event.key === ' ' && event.target.closest('a, button, [role="button"]')) return;
    event.preventDefault();
    if (event.repeat || this.scrolling) return;
    if (event.key === 'Home' || event.key === 'End') {
      const sections = this.geometry();
      const section = event.key === 'Home' ? sections[0] : sections.at(-1);
      const top = event.key === 'Home' ? section.top : Math.max(section.top, section.bottom - innerHeight);
      this.goTo(top, { focus: section.element, animate: false });
    } else this.move(directions[event.key], { keyboard: true });
  }

  onAnchor(event) {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || this.unavailable()) return;
    const link = event.target.closest('a[href^="#"]');
    const section = link && this.sections.find(element => `#${element.id}` === link.hash);
    if (!section) return;
    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(history.state, '', link.hash);
    this.goTo(section.getBoundingClientRect().top + scrollY, { focus: section, animate: event.detail !== 0 });
  }

  move(direction, { keyboard = false } = {}) {
    const sections = this.geometry();
    const target = sectionScrollTarget(sections, scrollY, innerHeight, direction, this.options);
    const destination = sections.find(section => target < section.bottom - this.options.tolerance) ?? sections.at(-1);
    this.goTo(target, { focus: keyboard ? destination.element : null, animate: !keyboard });
  }

  goTo(top, { focus = null, animate = true } = {}) {
    this.cancelScroll();
    const target = Math.max(0, Math.min(top, this.root.scrollHeight - innerHeight));
    const smooth = animate && !this.reducedMotion.matches && Math.abs(target - scrollY) > this.options.tolerance;
    this.root.classList.add('is-section-scrolling');
    this.scrolling = smooth;
    this.destination = target;
    this.destinationFocus = focus;
    window.scrollTo({ top: target, behavior: smooth ? 'smooth' : 'instant' });
    const finish = () => {
      this.scrolling = false;
      this.frame = null;
      this.root.classList.remove('is-section-scrolling');
      focus?.focus({ preventScroll: true });
    };
    if (!smooth) { finish(); return; }
    const started = performance.now();
    const settle = now => {
      if (Math.abs(scrollY - target) <= this.options.tolerance || now - started >= this.options.maxScrollMs) {
        window.scrollTo({ top: target, behavior: 'instant' });
        finish();
      } else this.frame = requestAnimationFrame(settle);
    };
    this.frame = requestAnimationFrame(settle);
  }

  cancelScroll() {
    if (this.scrolling) window.scrollTo({ top: scrollY, behavior: 'instant' });
    if (this.frame !== null) cancelAnimationFrame(this.frame);
    this.frame = null;
    this.scrolling = false;
    this.root.classList.remove('is-section-scrolling');
  }

  destroy() { this.abort.abort(); this.cancelScroll(); }
}
