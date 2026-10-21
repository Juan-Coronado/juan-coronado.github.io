import { node, externalLink } from '../ui/dom.js';
import { copyEmail } from '../ui/copy-email.js';

export function renderCopy(content) {
  for (const element of document.querySelectorAll('[data-copy]')) {
    const value = element.dataset.copy.split('.').reduce((current, key) => current?.[key], content);
    if (Array.isArray(value) && value.every(paragraph => typeof paragraph === 'string')) {
      element.replaceChildren(...value.map(paragraph => node('p', '', paragraph)));
      continue;
    }
    element.textContent = typeof value === 'string' ? value : '';
  }
}

export function renderContact(container, data, labels, { signal } = {}) {
  container.replaceChildren(...data.channels.map(channel => {
    const item = node('li', `contact-item${channel.href ? '' : ' is-pending'}`);
    const inner = channel.href ? externalLink('', channel.href, 'contact-item__link') : node('div', 'contact-item__link');
    const titleId = `contact-${channel.id}-title`;
    const roleId = `contact-${channel.id}-role`;
    const detailId = `contact-${channel.id}-description`;
    const title = node('span', 'contact-item__title', channel.label, { id: titleId });
    const role = node('span', 'contact-item__role', channel.role, { id: roleId });
    const detail = node('span', 'contact-item__description', channel.description, { id: detailId });
    const state = node('span', 'contact-item__state', channel.href ? '↗' : labels.contactPending, channel.href ? { 'aria-hidden': 'true' } : {});
    inner.append(title, role, detail, state);
    if (channel.href) {
      inner.setAttribute('aria-labelledby', `${titleId} ${roleId}`);
      inner.setAttribute('aria-describedby', detailId);
      const address = channel.href.replace(/^(mailto:|https?:\/\/)/i, '').replace(/\/$/, '');
      inner.append(node('span', 'contact-item__address', address));
    }
    item.append(inner);
    if (channel.href?.startsWith('mailto:')) {
      const button = node('button', 'grimoire-button grimoire-button--secondary contact-copy', labels.copyEmail, { type: 'button' });
      const status = node('p', 'contact-copy-status', '', { role: 'status', 'aria-live': 'polite' });
      button.addEventListener('click', () => copyEmail(channel.href.slice('mailto:'.length), button, status, labels), { signal });
      item.append(button, status);
    }
    return item;
  }));
}
