import test from 'node:test';
import assert from 'node:assert/strict';
import { backgroundMask, samplePortrait } from '../src/animation/particles.js';

const options = { backgroundThreshold: 228, backgroundChroma: 36, maxParticles: 31 };
function image(width, height, color = [255, 255, 255, 255]) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let index = 0; index < width * height; index++) data.set(color, index * 4);
  return { data, width, height };
}

test('removes the connected white background and preserves an enclosed white shirt', () => {
  const source = image(5, 5);
  for (let y = 1; y <= 3; y++) {
    for (let x = 1; x <= 3; x++) {
      if (x !== 2 || y !== 2) source.data.set([20, 20, 20, 255], (y * 5 + x) * 4);
    }
  }
  const mask = backgroundMask(source, options);
  assert.equal(mask[0], 1);
  assert.equal(mask[24], 1);
  assert.equal(mask[12], 0);
  assert.equal(mask[6], 0);
});

test('blank and transparent photographs yield no visible particles', () => {
  assert.equal(samplePortrait(image(8, 8), options).count, 0);
  assert.equal(samplePortrait(image(8, 8, [0, 0, 0, 0]), options).count, 0);
});

test('particle count is bounded and the layout stays deterministic and normalized', () => {
  const source = image(20, 20, [120, 80, 50, 255]);
  const result = samplePortrait(source, options);
  assert.equal(result.count, options.maxParticles);
  assert.deepEqual(result, samplePortrait(source, options));
  assert.equal(result.buckets.flat().length, options.maxParticles);
  for (const point of result.buckets.flat()) {
    assert.ok(point.x >= -.5 && point.x <= .5);
    assert.ok(point.y >= -.5 && point.y <= .5);
    assert.ok(Number.isFinite(point.phase));
  }
});
