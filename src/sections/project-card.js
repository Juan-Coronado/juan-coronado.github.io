import { node } from '../ui/dom.js';
import { createCloverSeal } from '../ui/emblems.js?revision=grimoire-polish';
import { technologyTags, projectLinks } from './project-elements.js?revision=grimoire-polish';
import { projectDifficulty } from './project-order.js';

export function createProjectCard(project, data, labels, { onOpen, prefix, signal }) {
  const titleId = `${prefix}-${project.id}`;
  const card = node('article', 'project-card', '', { 'aria-labelledby': titleId, 'data-project-id': project.id });
  const imageButton = node('button', 'project-card__visual', '', {
    type: 'button', 'aria-label': `${labels.viewProject}: ${project.title}`, 'aria-haspopup': 'dialog',
  });
  imageButton.append(node('img', '', '', {
    src: project.image, alt: project.imageAlt, width: 1200, height: 750, loading: 'lazy', decoding: 'async',
  }));
  imageButton.addEventListener('click', () => onOpen(project, imageButton), { signal });
  const body = node('div', 'project-card__body');
  const metadata = node('div', 'project-meta');
  metadata.append(node('span', '', project.category), node('span', 'project-status', project.status));
  const difficulty = node('span', 'project-difficulty', `${data.difficultyLabel}: ${projectDifficulty(project, data)}`);
  const title = node('h3', 'project-card__title', project.title, { id: titleId });
  const description = node('p', 'project-card__description', project.description);
  const action = node('button', 'grimoire-button grimoire-button--primary project-action', labels.viewProject, { type: 'button', 'aria-haspopup': 'dialog' });
  action.append(createCloverSeal());
  action.addEventListener('click', () => onOpen(project, action), { signal });
  const actions = node('div', 'project-card__actions');
  actions.append(action, projectLinks(project, labels, { includeCaseStudy: false, includeLocalDemo: false }));
  body.append(metadata, title, difficulty, description, technologyTags(project.technologies), actions);
  card.append(imageButton, body);
  return card;
}
