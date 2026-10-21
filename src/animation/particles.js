/** Deterministic values keep particle layouts stable between frames. */
export function randomAt(index) {
  let value = Math.imul(index + 1, 0x45d9f3b);
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
}

/** Remove only near-white pixels connected to the image edges, preserving the shirt. */
export function backgroundMask({ data, width, height }, { backgroundThreshold, backgroundChroma }) {
  const mask = new Uint8Array(width * height);
  const queue = new Int32Array(mask.length);
  let head = 0;
  let tail = 0;

  const enqueue = (pixel) => {
    if (mask[pixel]) return;
    const offset = pixel * 4;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    const isBackground = data[offset + 3] < 16 || (
      Math.min(r, g, b) >= backgroundThreshold &&
      Math.max(r, g, b) - Math.min(r, g, b) <= backgroundChroma
    );
    if (!isBackground) return;
    mask[pixel] = 1;
    queue[tail++] = pixel;
  };

  for (let x = 0; x < width; x++) { enqueue(x); enqueue((height - 1) * width + x); }
  for (let y = 1; y < height - 1; y++) { enqueue(y * width); enqueue(y * width + width - 1); }
  while (head < tail) {
    const pixel = queue[head++];
    const x = pixel % width;
    if (x > 0) enqueue(pixel - 1);
    if (x < width - 1) enqueue(pixel + 1);
    if (pixel >= width) enqueue(pixel - width);
    if (pixel < width * (height - 1)) enqueue(pixel + width);
  }
  return mask;
}

/** Sample real photograph pixels. No generated face, external model or landmark assumptions. */
export function samplePortrait(image, options) {
  const { data, width, height } = image;
  const mask = backgroundMask(image, options);
  const candidates = [];
  for (let pixel = 0; pixel < mask.length; pixel++) {
    if (!mask[pixel] && data[pixel * 4 + 3] > 16) candidates.push(pixel);
  }
  const count = Math.min(options.maxParticles, candidates.length);
  const stride = candidates.length / count;
  const buckets = Array.from({ length: 16 }, () => []);
  for (let index = 0; index < count; index++) {
    const pixel = candidates[Math.min(candidates.length - 1, Math.floor((index + randomAt(index + 9187)) * stride))];
    const offset = pixel * 4;
    const luminance = .2126 * data[offset] + .7152 * data[offset + 1] + .0722 * data[offset + 2];
    const bin = Math.min(15, Math.floor(luminance / 16));
    buckets[bin].push({
      x: ((pixel % width) + .2 + randomAt(index + 413) * .6) / width - .5,
      y: (Math.floor(pixel / width) + .2 + randomAt(index + 971) * .6) / height - .5,
      originX: (randomAt(index * 3) - .5) * 1.9,
      originY: (randomAt(index * 3 + 1) - .5) * 1.7,
      phase: randomAt(index * 3 + 2) * Math.PI * 2,
      delay: randomAt(index + 773) * .18,
    });
  }
  return { buckets, count };
}
