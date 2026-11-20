// Writes this entry's image to /output/entry.png: a 1024x1024 poster that sums up
// Thursday 19 November 2026. The image is drawn ahead of time and shipped beside this
// file, so the program only has to copy it, and two runs write the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_BYTES = 1024 * 1024;
const MAX_EDGE = 1024;
const PNG_SIGNATURE = 0x89504e47;

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const image = readFileSync(join(here, 'entry.png'));

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

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), image);
console.log(`wrote ${image.length} bytes (${width}x${height}) to ${join(outDir, 'entry.png')}`);
