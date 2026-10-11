import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const svg = await readFile(resolve(root, "src/app/icon.svg"));
const png = async (size) => sharp(svg).resize(size, size).png().toBuffer();
await writeFile(resolve(root, "src/app/apple-icon.png"), await png(180));

// ICO can contain PNG-compressed entries; this preserves the SVG's crisp small sizes.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((image, index) => {
  const at = 6 + index * 16;
  header[at] = sizes[index];
  header[at + 1] = sizes[index];
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(image.length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += image.length;
});
await writeFile(resolve(root, "src/app/favicon.ico"), Buffer.concat([header, ...images]));

const ogBackground = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#150d14"/><stop offset="1" stop-color="#341522"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <path d="M68 72h1064M68 558h1064" stroke="#925361" stroke-width="2"/>
  <text x="68" y="113" fill="#e4b5ae" font-family="Arial,sans-serif" font-size="20" letter-spacing="7">THE LIVING MANUSCRIPT</text>
  <text x="68" y="328" fill="#f0e9e1" font-family="Georgia,serif" font-style="italic" font-size="110">Muwafaq</text>
  <text x="68" y="438" fill="#f0e9e1" font-family="Georgia,serif" font-style="italic" font-size="110">Sami.</text>
  <text x="70" y="505" fill="#e4b5ae" font-family="Arial,sans-serif" font-size="24">Creative writer · Screenwriter · Narrative designer</text>
  <text x="70" y="586" fill="#bd9299" font-family="Arial,sans-serif" font-size="16" letter-spacing="3">STORIES WITH A PULSE. WORLDS WITH A MEMORY.</text>
</svg>`);
const wolf = await sharp(svg).resize({ height: 480 }).png().toBuffer();
await writeFile(resolve(root, "src/app/opengraph-image.png"), await sharp(ogBackground).composite([{ input: wolf, left: 740, top: 94 }]).png().toBuffer());
