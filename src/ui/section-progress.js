import { node } from './dom.js';

/** A visual replacement for the document scrollbar, backed by ordinary anchors. */
export class SectionProgress {
  constructor(container, items, labels) {
    this.container = container;
    container.setAttribute('aria-label', labels.screens);
    this.links = items.map((item, index) => {
      const label = labels.screenPosition.replace('{current}', index + 1).replace('{total}', items.length).replace('{title}', item.label);
      const link = node('a', 'section-progress__link', '', { href: `#${item.id}`, 'aria-label': label });
      link.append(node('span', 'section-progress__mark', '', { 'aria-hidden': 'true' }), node('span', 'section-progress__label', item.label, { 'aria-hidden': 'true' }));
      return link;
    });
    container.replaceChildren(...this.links);
    document.documentElement.classList.toggle('has-section-progress', this.links.length > 0);
  }

  setActive(id) {
    for (const link of this.links) {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }

  destroy() { document.documentElement.classList.remove('has-section-progress'); }
}
