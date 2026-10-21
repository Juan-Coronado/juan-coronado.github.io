import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { content } from '../src/content.js';

test('cada tecnología conserva un icono local válido y referencias a proyectos existentes', async () => {
  const ids = new Set(content.projects.items.map(project => project.id));
  for (const category of content.technologies.categories) {
    for (const technology of category.items) {
      assert.match(technology.icon, /^[a-z0-9-]+$/);
      const svg = await readFile(new URL(`../assets/technology-icons/${technology.icon}.svg`, import.meta.url), 'utf8');
      assert.match(svg, /<svg\b/);
      assert.doesNotMatch(svg, /<script\b|<foreignObject\b|\bon\w+=/i);
      for (const id of technology.projectIds ?? []) assert.ok(ids.has(id), `${technology.name}: ${id}`);
      if (technology.practice) assert.ok(content.technologies.practiceLabels[technology.practice]);
    }
  }
});

test('los casos sin ejecución comprobada no se presentan como uso verificado', () => {
  const items = content.technologies.categories.flatMap(category => category.items);
  assert.equal(items.find(item => item.name === 'Oracle Database').practice, 'documented');
  assert.equal(items.find(item => item.name === 'Google Maps API').practice, 'optional');
  assert.match(content.technologies.headline, /He utilizado y explorado/);
  assert.doesNotMatch(JSON.stringify(content.technologies), /manejo|domino|experto|\d+%/i);
});
