import { content } from './content.js?revision=grimoire-polish';
import { motion } from './config/motion.js?revision=grimoire-polish';
import { IntroSequence } from './animation/intro.js?revision=grimoire-polish';
import { ParticlePortrait } from './animation/portrait.js?revision=grimoire-polish';
import { SectionNavigation } from './ui/navigation.js?revision=grimoire-polish';
import { SectionProgress } from './ui/section-progress.js';
import { SectionScroll } from './ui/section-scroll.js';
import { ProjectDialog } from './sections/project-dialog.js?revision=grimoire-polish';
import { ProjectShowcase } from './sections/project-showcase.js?revision=grimoire-polish';
import { ProjectCatalog } from './sections/project-catalog.js?revision=grimoire-polish';
import { createCloverSeal } from './ui/emblems.js?revision=grimoire-polish';
import { TechnologyExplorer } from './sections/technologies.js?revision=grimoire-polish';
import { renderCopy, renderContact } from './sections/render.js?revision=grimoire-polish';

const byId = id => document.getElementById(id);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const lifecycle = new AbortController();
const header = document.querySelector('.site-header');

for (const element of document.querySelectorAll('[data-content]')) {
  const key = element.dataset.content;
  element.textContent = content.identity[key] ?? content.labels[key] ?? '';
}
document.title = content.site.title;
document.querySelector('meta[name="description"]').content = content.site.description;
byId('portrait').setAttribute('aria-label', `Retrato de ${content.identity.fullName} formado por partículas`);
byId('portrait-fallback').alt = `Retrato de ${content.identity.fullName}`;
byId('about-photo').src = content.portrait;
byId('about-photo').alt = `Retrato de ${content.identity.fullName}`;
byId('about-seal').append(createCloverSeal());
renderCopy(content);
const projectDialog = new ProjectDialog(byId('project-dialog'), byId('project-dialog-content'), byId('project-dialog-close'), content.labels);
const onOpenProject = (project, trigger) => projectDialog.show(project, trigger);
const projectCatalog = new ProjectCatalog(byId('project-catalog'), content.projects, content.labels, onOpenProject);
const projectShowcase = new ProjectShowcase(byId('project-list'), content.projects, content.labels, {
  onOpen: onOpenProject, onViewAll: trigger => projectCatalog.show(trigger), reducedMotion,
});
const technologies = new TechnologyExplorer(byId('technology-explorer'), content.technologies, content.projects.items);
renderContact(byId('contact-list'), content.contact, content.labels, { signal: lifecycle.signal });
const sectionProgress = new SectionProgress(byId('section-progress'), content.navigation, content.labels);
const navigation = new SectionNavigation({ header, nav: byId('primary-nav'), toggle: byId('menu-toggle'), onActive: id => sectionProgress.setActive(id) }, content.navigation);

const skipButton = byId('skip-intro');
skipButton.textContent = content.labels.skip;

async function initialize() {
  document.body.classList.add('is-playing');
  const portrait = new ParticlePortrait(byId('portrait-canvas'), motion.portrait, { reducedMotion: reducedMotion.matches });
  let activePortrait = portrait;
  try {
    await Promise.all([portrait.load(content.portrait), document.fonts.ready]);
  } catch (error) {
    console.warn('El efecto de partículas no está disponible. Se mostrará la fotografía.', error);
    portrait.destroy();
    activePortrait = null;
  }

  const sequence = new IntroSequence({
    intro: byId('intro'), name: byId('intro-name'), title: byId('intro-title'),
    punctuation: byId('intro-punctuation'), dot: byId('intro-dot'), bar: byId('intro-bar'),
    heroTitle: byId('hero-title'), status: byId('animation-status'),
    chrome: [...document.querySelectorAll('[data-chrome]')],
    skip: skipButton, focusTarget: byId('portada'),
  }, content, motion, activePortrait);
  const sectionScroll = new SectionScroll([...document.querySelectorAll('[data-nav-section]')], motion.sectionScroll, reducedMotion);

  const listen = { signal: lifecycle.signal };
  skipButton.addEventListener('click', () => sequence.finish(), listen);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && sequence.playing) sequence.finish();
  }, listen);
  reducedMotion.addEventListener('change', event => {
    activePortrait?.setReducedMotion(event.matches);
    if (event.matches) sequence.finish();
  }, listen);

  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      sequence.finish();
      activePortrait?.requestFrame();
    }
  }, listen);
  window.addEventListener('pagehide', event => {
    if (event.persisted) { activePortrait?.stop(); return; }
    sequence.destroy();
    activePortrait?.destroy();
    navigation.destroy();
    sectionScroll.destroy();
    projectDialog.destroy();
    projectCatalog.destroy();
    projectShowcase.destroy();
    sectionProgress.destroy();
    technologies.destroy();
    lifecycle.abort();
  }, listen);

  const initialSection = content.navigation.find(section => location.hash === `#${section.id}`) ?? content.navigation[0];
  const startsAtSection = initialSection.id !== content.navigation[0].id;
  sequence.play({ reducedMotion: reducedMotion.matches || startsAtSection });
  const section = byId(initialSection.id);
  sectionScroll.goTo(section.getBoundingClientRect().top + scrollY, { animate: false });
}

initialize().catch(error => {
  document.body.classList.remove('is-playing');
  document.body.dataset.introState = 'error';
  byId('intro').hidden = true;
  skipButton.hidden = true;
  console.error('No se pudo iniciar la introducción.', error);
});
