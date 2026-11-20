// Writes this entry's image to /output/entry.png: a 1024x1024 poster that sums up
// Thursday 19 November 2026. The image is drawn ahead of time and shipped beside this
// file, so the program only has to copy it and two runs write the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_BYTES = 1024 * 1024;
const MAX_EDGE = 1024;
const PNG_SIGNATURE = 0x89504e47;
const IEND = Buffer.from('IEND');

/** Refuses an image the gate would refuse, so a broken file fails here instead of there. */
function checkImage(image) {
  if (image.readUInt32BE(0) !== PNG_SIGNATURE) {
    throw new Error('entry.png is not a PNG file');
  }
  if (image.length > MAX_BYTES) {
    throw new Error(`entry.png is ${image.length} bytes, over the 1 MiB cap`);
  }
  const width = image.readUInt32BE(16);
  const height = image.readUInt32BE(20);
  if (width > MAX_EDGE || height > MAX_EDGE) {
    throw new Error(`entry.png is ${width}x${height}, over ${MAX_EDGE}x${MAX_EDGE}`);
  }
  if (image.indexOf(IEND) < 0) {
    throw new Error('entry.png has no IEND chunk: it is not a whole image');
  }
  return { width, height };
}

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const image = readFileSync(join(here, 'entry.png'));
const { width, height } = checkImage(image);

mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.png');
writeFileSync(target, image);

const digest = createHash('sha256').update(image).digest('hex').slice(0, 16);
console.log(`wrote ${image.length} bytes (${width}x${height}, sha256 ${digest}…) to ${target}`);
