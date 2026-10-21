import { node } from './dom.js';

const CLOVER_LEAVES = 5;

/** Decorative brand mark composed from five heart-shaped leaves and a stem. */
export function createCloverSeal() {
  const seal = node('span', 'clover-seal', '', { 'aria-hidden': 'true' });
  for (let index = 0; index < CLOVER_LEAVES; index++) {
    const leaf = node('span', 'clover-seal__leaf');
    leaf.style.setProperty('--leaf-angle', `${index * 360 / CLOVER_LEAVES}deg`);
    seal.append(leaf);
  }
  seal.append(node('span', 'clover-seal__stem'));
  return seal;
}
