/** Small DOM helper: text is always assigned as text, never interpreted as markup. */
export function node(tag, className = '', text = '', attributes = {}) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));
  return element;
}

export function externalLink(label, href, className = '') {
  const link = node('a', className, label, { href });
  if (/^https?:\/\//i.test(href)) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  return link;
}
