import { node } from '../ui/dom.js';
import { createProjectCard } from './project-card.js?revision=cargomesh-2026-10-23';
import { sortProjectsByDifficulty } from './project-order.js';
import { syncDialogState, closeDialogsForNavigation } from '../ui/dialog-state.js';

export class ProjectCatalog {
  constructor(dialog, data, labels, onOpen) {
    this.dialog = dialog;
    this.abort = new AbortController();
    const signal = this.abort.signal;
    const header = node('div', 'project-catalog__header');
    const heading = node('div', 'project-catalog__heading');
    heading.append(node('h2', 'section-title', data.catalogTitle, { id: 'project-catalog-title' }), node('p', 'section-description', data.catalogDescription, { id: 'project-catalog-description' }));
    const close = node('button', 'grimoire-button grimoire-button--compact', labels.close, { type: 'button' });
    close.addEventListener('click', () => dialog.close(), { signal });
    header.append(heading, close);
    const list = node('div', 'project-catalog__grid');
    const projects = sortProjectsByDifficulty(data.items, data.difficultyLevels);
    list.append(...projects.map(project => createProjectCard(project, data, labels, { onOpen, prefix: 'catalog-project', signal })));
    if (!projects.length) list.append(node('p', 'empty-message', data.empty));
    dialog.replaceChildren(header, list);
    dialog.setAttribute('aria-labelledby', 'project-catalog-title');
    dialog.setAttribute('aria-describedby', 'project-catalog-description');
    dialog.addEventListener('close', () => {
      syncDialogState();
      if (dialog.returnValue !== 'navigate' && this.trigger?.isConnected) this.trigger.focus({ preventScroll: true });
    }, { signal });
    dialog.addEventListener('click', event => {
      const link = event.target.closest('a[href^="#"]');
      const target = link && document.getElementById(link.hash.slice(1));
      if (target) {
        event.preventDefault();
        closeDialogsForNavigation();
        location.hash = link.hash;
        target.focus({ preventScroll: true });
        return;
      }
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }, { signal });
  }

  show(trigger) {
    this.trigger = trigger;
    this.dialog.returnValue = '';
    this.dialog.showModal();
    this.dialog.scrollTop = 0;
    syncDialogState();
  }

  destroy() {
    this.abort.abort();
    if (this.dialog.open) this.dialog.close();
    syncDialogState();
  }
}
