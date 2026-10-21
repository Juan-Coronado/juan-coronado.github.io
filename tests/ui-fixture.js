import { content } from '../src/content.js?revision=grimoire-polish';
import { ProjectDialog } from '../src/sections/project-dialog.js?revision=grimoire-polish';
import { ProjectCatalog } from '../src/sections/project-catalog.js';
import { ProjectShowcase } from '../src/sections/project-showcase.js';

// Synthetic fixtures must not depend on entries in the real portfolio.
const template = {
  category: 'Proyecto de prueba', status: 'Datos sintéticos',
  description: 'Contenido sintético para comprobar el carrusel y la ordenación del catálogo.',
  image: new URL('../assets/fondo-desktop.webp', import.meta.url).href,
  imageAlt: 'Textura utilizada exclusivamente en las pruebas.',
  technologies: ['HTML', 'CSS'], demo: null, source: null,
  details: { summary: 'Detalle sintético de prueba.', features: ['Comprobar foco y diálogos.'] },
};
const fixtures = [
  { id: 'test-advanced-a', title: 'Prueba avanzada A', difficulty: 'advanced' },
  { id: 'test-unknown', title: 'Prueba por clasificar', difficulty: null },
  { id: 'test-initial', title: 'Prueba inicial', difficulty: 'initial' },
  { id: 'test-advanced-b', title: 'Prueba avanzada B', difficulty: 'advanced' },
  { id: 'test-intermediate', title: 'Prueba intermedia', difficulty: 'intermediate' },
].map(item => ({ ...template, ...item }));
const detail = new ProjectDialog(document.querySelector('#project-dialog'), document.querySelector('#fixture-detail'), document.querySelector('#fixture-close'), content.labels);
const onOpen = (project, trigger) => detail.show(project, trigger);
let showcase;
let catalog;
function mount(count) {
  showcase?.destroy();
  catalog?.destroy();
  const data = { ...content.projects, items: fixtures.slice(0, count) };
  catalog = new ProjectCatalog(document.querySelector('#project-catalog'), data, content.labels, onOpen);
  showcase = new ProjectShowcase(document.querySelector('#fixture-carousel'), data, content.labels, {
    onOpen, onViewAll: trigger => catalog.show(trigger), reducedMotion: matchMedia('(prefers-reduced-motion: reduce)'),
  });
  document.body.dataset.fixtureCount = String(count);
}
document.querySelector('#fixture-controls').addEventListener('click', event => {
  const control = event.target.closest('[data-count]');
  if (control) mount(Number(control.dataset.count));
});
mount(5);
