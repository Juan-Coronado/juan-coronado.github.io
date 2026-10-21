import { node, externalLink } from '../ui/dom.js';

export function technologyTags(technologies) {
  const list = node('ul', 'technology-tags');
  list.append(...technologies.map(name => node('li', '', name)));
  return list;
}

export function projectLinks(project, labels, { includeCaseStudy = true, includeLocalDemo = true, includeSource = true } = {}) {
  const links = node('div', 'project-links');
  if (includeCaseStudy && project.caseStudy) links.append(externalLink(labels.viewCaseStudy, project.caseStudy, 'grimoire-button grimoire-button--secondary quiet-link'));
  if (project.demo) links.append(externalLink(labels.viewDemo, project.demo, 'grimoire-button grimoire-button--secondary quiet-link'));
  if (includeLocalDemo && project.localDemo && ['127.0.0.1', 'localhost'].includes(location.hostname)) links.append(externalLink('Abrir aplicación real local', project.localDemo, 'grimoire-button grimoire-button--secondary quiet-link'));
  if (project.download) {
    const download = node('a', 'grimoire-button grimoire-button--secondary quiet-link', project.downloadLabel || labels.downloadCode, { href: project.download, download: '' });
    links.append(download);
  }
  if (includeSource && project.source) links.append(externalLink(project.sourceLabel || labels.sourceCode, project.source, 'grimoire-button grimoire-button--secondary quiet-link'));
  else if (!project.download) links.append(node('span', 'pending-note', labels.sourcePending));
  return links;
}
