import { node } from '../ui/dom.js';
import { technologyTags, projectLinks } from './project-elements.js?revision=github-projects-1';
import { syncDialogState, closeDialogsForNavigation } from '../ui/dialog-state.js';

export class ProjectDialog {
  constructor(dialog, container, closeButton, labels) {
    this.dialog = dialog;
    this.container = container;
    this.labels = labels;
    this.abort = new AbortController();
    const options = { signal: this.abort.signal };
    closeButton.addEventListener('click', () => dialog.close(), options);
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }, options);
    dialog.addEventListener('close', () => {
      syncDialogState();
      if (dialog.returnValue !== 'navigate' && this.restoreFocus && this.trigger?.isConnected) this.trigger.focus({ preventScroll: true });
    }, options);
    dialog.addEventListener('click', event => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      this.restoreFocus = false;
      closeDialogsForNavigation();
      location.hash = link.hash;
      target.focus({ preventScroll: true });
    }, options);
  }

  show(project, trigger) {
    this.trigger = trigger;
    this.restoreFocus = true;
    const evidence = project.evidence;
    const media = node('figure', 'project-evidence');
    if (evidence?.type === 'image') {
      media.append(node('img', 'project-dialog__image', '', { src: evidence.src, alt: evidence.caption, width: 1200, height: 750 }));
    } else if (evidence?.type === 'console') {
      media.append(node('pre', 'project-evidence__console', evidence.text));
    } else if (evidence?.type === 'document') {
      media.append(node('p', 'project-evidence__document', evidence.text));
    } else {
      media.append(node('img', 'project-dialog__image', '', { src: project.image, alt: project.imageAlt, width: 1200, height: 750 }));
    }
    if (evidence?.caption) media.append(node('figcaption', '', evidence.caption));
    const body = node('div', 'project-dialog__body');
    const title = node('h2', 'section-title', project.title, { id: 'project-dialog-title' });
    const summary = node('p', 'section-description', project.details.summary);
    const features = node('ul', 'project-features');
    features.append(...project.details.features.map(feature => node('li', '', feature)));
    const information = node('div');
    information.append(summary, technologyTags(project.technologies), features, projectLinks(project, this.labels));
    if (project.period) information.insertBefore(node('p', 'project-period', `Trabajo original: ${project.period}`), summary);
    body.append(title, media);
    body.append(information);
    for (const [key, heading] of [['learning', 'Aprendizaje'], ['changes', 'Trabajo de recuperación']]) {
      const entries = project.details[key];
      if (!entries?.length) continue;
      const list = node('ul', 'project-features');
      list.append(...entries.map(entry => node('li', '', entry)));
      information.append(node('h3', 'project-dialog__subtitle', heading), list);
    }
    if (project.details.verification) information.append(node('h3', 'project-dialog__subtitle', 'Comprobación'), node('p', 'section-description', project.details.verification));
    this.container.replaceChildren(body);
    this.dialog.returnValue = '';
    this.dialog.showModal();
    syncDialogState();
    this.dialog.scrollTop = 0;
  }

  destroy() { this.abort.abort(); if (this.dialog.open) this.dialog.close(); syncDialogState(); }
}
