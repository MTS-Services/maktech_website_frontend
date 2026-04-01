/**
 * Convert all PNG/JPG/JPEG images in /public to WebP
 * Skips files that already have a .webp counterpart
 * Originals are kept — remove manually once verified
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');

const SUPPORTED = new Set(['.png', '.jpg', '.jpeg']);

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (SUPPORTED.has(extname(entry.name).toLowerCase())) {
      yield full;
    }
  }
}

let converted = 0;
let skipped = 0;
let totalSavedBytes = 0;

for await (const filePath of walk(PUBLIC_DIR)) {
  const ext = extname(filePath);
  const webpPath = filePath.slice(0, -ext.length) + '.webp';

  // Check if webp already exists
  try {
    await stat(webpPath);
    skipped++;
    continue;
  } catch {
    // doesn't exist, proceed
  }

  try {
    const originalSize = (await stat(filePath)).size;
    await sharp(filePath).webp({ quality: 82, effort: 4 }).toFile(webpPath);
    const newSize = (await stat(webpPath)).size;
    const saved = originalSize - newSize;
    totalSavedBytes += saved;
    converted++;
    console.log(
      `✓ ${basename(filePath)} → ${basename(webpPath)}  ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB  (saved ${(saved / 1024).toFixed(0)}KB)`,
    );
  } catch (err) {
    console.error(`✗ Failed: ${filePath}`, err.message);
  }
}

console.log(
  `\nDone. Converted: ${converted}, Skipped (already exist): ${skipped}`,
);
console.log(`Total saved: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(
  `\nNext step: update image paths in your components from .png/.jpg → .webp`,
);
console.log(
  `Then delete the originals once you've verified the site looks correct.`,
);
