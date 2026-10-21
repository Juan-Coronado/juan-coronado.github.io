import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { preparePage } from '../scripts/prepare-page.mjs';
import { content } from '../src/content.js';

test('la página generada conserva comillas y cursiva, los diez proyectos y es idempotente', async () => {
  const template = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const page = preparePage(template, content);
  assert.equal(preparePage(page, content), page);
  assert.match(page, /<em data-copy="about.quote">«Mi magia es no rendirme»<\/em>/);
  for (const project of content.projects.items) assert.ok(page.includes(`href="./projects/${project.id}/"`));
  assert.ok(!page.includes('file:///'));
  assert.match(page, /<title>Juan Coronado/);
});
test('los metadatos respetan la ruta del repositorio y escapan contenido', async () => {
  const template = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const data = { ...content, site: { ...content.site, title: 'A & B <prueba>' } };
  const page = preparePage(template, data, 'https://example.test/mi-portafolio');
  assert.match(page, /https:\/\/example.test\/mi-portafolio\/assets\/social-preview.jpg/);
  assert.match(page, /<title>A &amp; B &lt;prueba&gt;<\/title>/);
  assert.throws(() => preparePage(template, content, 'file:///private'), /HTTP/);
});
