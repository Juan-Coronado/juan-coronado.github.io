import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { content } from '../src/content.js';

const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

export function preparePage(template, data, siteUrl = data.site.url) {
  const block = (name, markup) => {
    const pattern = new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`);
    if (!pattern.test(template)) throw new Error(`Falta el bloque de plantilla: ${name}`);
    template = template.replace(pattern, () => `<!-- ${name}:start -->${markup}<!-- ${name}:end -->`);
  };
  let metadata = `<meta name="description" content="${escape(data.site.description)}"><title>${escape(data.site.title)}</title>`;
  for (const [property, value] of Object.entries({ 'og:title': data.site.title, 'og:description': data.site.description, 'og:type': 'website', 'og:locale': 'es_PE' })) {
    metadata += `<meta property="${property}" content="${escape(value)}">`;
  }
  metadata += `<meta name="twitter:card" content="${siteUrl ? 'summary_large_image' : 'summary'}">`;
  if (siteUrl) {
    const base = new URL(siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`);
    if (!['https:', 'http:'].includes(base.protocol)) throw new Error('La URL pública debe usar HTTP o HTTPS.');
    const image = new URL(data.site.socialImage, base).href;
    metadata += `<link rel="canonical" href="${escape(base.href)}"><meta property="og:url" content="${escape(base.href)}"><meta property="og:image" content="${escape(image)}"><meta name="twitter:image" content="${escape(image)}"><meta property="og:image:alt" content="Portafolio de ${escape(data.identity.fullName)}">`;
  }
  block('metadata', metadata);
  block('nav-fallback', data.navigation.map(item => `<a class="nav-link" href="#${escape(item.id)}">${escape(item.label)}</a>`).join(''));
  block('project-fallback', `<div class="project-static-list">${data.projects.items.map(project => `<article class="project-static-card"><h3>${escape(project.title)}</h3><p>${escape(project.description)}</p><a href="./projects/${escape(project.id)}/">${escape(data.labels.viewCaseStudy)}</a></article>`).join('')}</div>`);
  block('contact-fallback', data.contact.channels.filter(channel => channel.href).map(channel => `<li class="contact-item"><a class="contact-item__link" href="${escape(channel.href)}"><span class="contact-item__title">${escape(channel.label)}</span><span class="contact-item__description">${escape(channel.description)}</span></a></li>`).join(''));

  // This pattern targets the simple text bindings in our own HTML template.
  return template.replace(/<([a-z][a-z0-9]*)\b([^>]*\bdata-(copy|content)="([^"]+)"[^>]*)>[\s\S]*?<\/\1>/g, (match, tag, attributes, kind, key) => {
    const value = kind === 'copy' ? key.split('.').reduce((item, part) => item?.[part], data) : data.identity[key] ?? data.labels[key];
    if (value === undefined) throw new Error(`Contenido desconocido: ${key}`);
    const markup = Array.isArray(value) ? value.map(paragraph => `<p>${escape(paragraph)}</p>`).join('') : escape(value);
    return `<${tag}${attributes}>${markup}</${tag}>`;
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const path = new URL('../index.html', import.meta.url);
  const page = preparePage(await readFile(path, 'utf8'), content, process.env.PORTFOLIO_SITE_URL);
  await writeFile(path, page);
  console.log('HTML preparado desde content.js; fichas y contenido disponibles sin ejecutar JavaScript.');
}
