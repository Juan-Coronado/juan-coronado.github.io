import { node } from '../ui/dom.js';

export class TechnologyExplorer {
  constructor(container, data, projects = []) {
    this.categories = data.categories;
    this.abort = new AbortController();
    this.media = matchMedia('(min-width: 64rem)');
    const listen = { signal: this.abort.signal };
    this.tabs = node('div', 'technology-tabs', '', {
      role: 'tablist', 'aria-label': data.categoryLabel, 'aria-orientation': 'vertical',
    });
    this.select = node('select', 'technology-select', '', { 'aria-label': data.categoryLabel });
    const panels = node('div', 'technology-panels');

    this.views = this.categories.map((category, index) => {
      const tabId = `technology-tab-${category.id}`;
      const panelId = `technology-panel-${category.id}`;
      const headingId = `technology-heading-${category.id}`;
      const tab = node('button', 'grimoire-button grimoire-button--secondary technology-tab', category.title, {
        id: tabId, type: 'button', role: 'tab', 'aria-controls': panelId,
      });
      const panel = node('section', 'technology-panel', '', { id: panelId });
      const heading = node('h3', 'technology-group-title', category.title, { id: headingId });
      const list = node('ul', 'technology-entries');
      list.append(...category.items.map(technology => {
        const item = node('li', 'technology-entry');
        item.append(node('h4', 'technology-name', technology.name), node('p', 'technology-description', technology.description));
        const references = (technology.projectIds ?? []).map(id => projects.find(project => project.id === id)).filter(Boolean);
        const practice = node('div', 'technology-practice');
        if (references.length) {
          practice.append(node('span', 'sr-only', `${data.projectLabel}: `));
          for (const project of references) practice.append(node('a', 'technology-project', project.title, { href: project.caseStudy }));
        } else practice.append(node('span', 'technology-explored', data.exploredLabel));
        item.append(practice);
        return item;
      }));
      panel.append(heading, list);
      tab.addEventListener('click', () => this.activate(index), listen);
      tab.addEventListener('keydown', event => this.onKey(event, index), listen);
      this.tabs.append(tab);
      this.select.append(node('option', '', category.title, { value: category.id }));
      panels.append(panel);
      return { tab, panel, heading };
    });

    container.replaceChildren(this.tabs, this.select, panels);
    this.select.addEventListener('change', () => {
      this.activate(this.categories.findIndex(category => category.id === this.select.value));
    }, listen);
    this.media.addEventListener('change', () => this.updateLayout(), listen);
    this.activate(0);
    this.updateLayout();
  }

  activate(index, { focus = false } = {}) {
    if (!this.views[index]) return;
    this.activeIndex = index;
    this.views.forEach(({ tab, panel }, current) => {
      const active = current === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panel.setAttribute('aria-hidden', String(!active));
      panel.inert = !active;
      panel.tabIndex = active ? 0 : -1;
    });
    this.select.value = this.categories[index].id;
    this.select.setAttribute('aria-controls', this.views[index].panel.id);
    if (focus) this.views[index].tab.focus();
  }

  onKey(event, index) {
    let next;
    if (event.key === 'ArrowDown') next = (index + 1) % this.views.length;
    else if (event.key === 'ArrowUp') next = (index - 1 + this.views.length) % this.views.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = this.views.length - 1;
    else return;
    event.preventDefault();
    this.activate(next, { focus: true });
  }

  updateLayout() {
    const desktop = this.media.matches;
    const focusedTab = this.tabs.contains(document.activeElement);
    const focusedSelect = document.activeElement === this.select;
    this.tabs.hidden = !desktop;
    this.select.hidden = desktop;
    this.views.forEach(({ tab, panel, heading }) => {
      panel.setAttribute('role', desktop ? 'tabpanel' : 'region');
      panel.setAttribute('aria-labelledby', desktop ? tab.id : heading.id);
    });
    if (!desktop && focusedTab) this.select.focus({ preventScroll: true });
    if (desktop && focusedSelect) this.views[this.activeIndex].tab.focus({ preventScroll: true });
  }

  destroy() { this.abort.abort(); }
}
