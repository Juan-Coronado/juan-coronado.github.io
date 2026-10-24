import test from 'node:test';
import assert from 'node:assert/strict';
import { content } from '../src/content.js';
import { projectLinks } from '../src/sections/project-elements.js';

function mountDocument(t) {
  const previous = {document:globalThis.document, location:globalThis.location};
  globalThis.location = {hostname:'juan-coronado.github.io'};
  globalThis.document = {createElement(tag) {
    return {tag, attributes:{}, children:[], setAttribute(key,value) { this.attributes[key]=value; }, append(...children) { this.children.push(...children); }};
  }};
  t.after(() => Object.assign(globalThis, previous));
}

test('cada detalle con fuentes publicadas enlaza a su repositorio y JImport se presenta como documentación', t => {
  mountDocument(t);
  for (const project of content.projects.items) {
    if (project.id === 'cargomesh') {
      assert.equal(project.source, null);
      continue;
    }
    const url = new URL(project.source);
    assert.equal(url.origin, 'https://github.com');
    assert.equal(url.pathname, `/Juan-Coronado/${project.id}`);
    const source = projectLinks(project, content.labels).children.find(link => link.attributes.href === project.source);
    assert.ok(source);
    assert.equal(source.target, '_blank');
    assert.equal(source.rel, 'noopener noreferrer');
    if (project.id === 'jimport-oracle') assert.match(source.textContent, /documentación/);
  }
});

test('CargoMesh enlaza al sitio sin repositorio, ZIP ni aviso de código pendiente', t => {
  mountDocument(t);
  const project = content.projects.items.find(item => item.id === 'cargomesh');
  assert.ok(project);
  assert.equal(project.download, null);
  assert.equal(project.demo, 'https://cargomesh.vercel.app/');
  assert.equal(project.source, null);
  assert.equal(project.details.changesTitle, 'Desarrollo en equipo');
  const links = projectLinks(project, content.labels, {includeCaseStudy:false, includeLocalDemo:false});
  assert.equal(links.children.length, 1);
  assert.equal(links.children[0].attributes.href, project.demo);
  assert.equal(links.children[0].textContent, 'Visitar CargoMesh');
});

test('las tarjetas conservan la descarga sin añadir el enlace de código al carrusel', t => {
  mountDocument(t);
  const project = content.projects.items[0];
  const links = projectLinks(project, content.labels, {includeCaseStudy:false, includeLocalDemo:false, includeSource:false});
  assert.equal(links.children.length, 1);
  assert.equal(links.children[0].attributes.href, project.download);
});
