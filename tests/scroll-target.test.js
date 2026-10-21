import test from 'node:test';
import assert from 'node:assert/strict';
import { sectionScrollTarget } from '../src/ui/scroll-target.js';

const options = { overlap: .12, tolerance: 2 };
const screens = [{ top: 0, bottom: 800 }, { top: 800, bottom: 1600 }, { top: 1600, bottom: 2400 }];

test('one step reaches an adjacent screen and stays within the first and last screens', () => {
  assert.equal(sectionScrollTarget(screens, 0, 800, 1, options), 800);
  assert.equal(sectionScrollTarget(screens, 800, 800, 1, options), 1600);
  assert.equal(sectionScrollTarget(screens, 800, 800, -1, options), 0);
  assert.equal(sectionScrollTarget(screens, 0, 800, -1, options), 0);
  assert.equal(sectionScrollTarget(screens, 1600, 800, 1, options), 1600);
});

test('tall sections are fully readable in both directions before leaving them', () => {
  const sections = [{ top: 0, bottom: 800 }, { top: 800, bottom: 2800 }, { top: 2800, bottom: 3600 }];
  assert.equal(sectionScrollTarget(sections, 800, 800, 1, options), 1504);
  assert.equal(sectionScrollTarget(sections, 1504, 800, 1, options), 2000);
  assert.equal(sectionScrollTarget(sections, 2000, 800, 1, options), 2800);
  assert.equal(sectionScrollTarget(sections, 2800, 800, -1, options), 2000);
  assert.equal(sectionScrollTarget(sections, 2000, 800, -1, options), 1296);
  assert.equal(sectionScrollTarget(sections, 1296, 800, -1, options), 800);
});

test('destinations adapt to changed viewport and section sizes', () => {
  const sections = [{ top: 0, bottom: 600 }, { top: 600, bottom: 1650 }, { top: 1650, bottom: 2250 }];
  assert.equal(sectionScrollTarget(sections, 600, 600, 1, options), 1050);
  assert.equal(sectionScrollTarget(sections, 1050, 600, 1, options), 1650);
  assert.equal(sectionScrollTarget([], 140, 600, 1, options), 140);
});
