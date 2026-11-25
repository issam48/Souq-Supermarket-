import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const iconSize = 256;
const root = resolve(dirname(fileURLToPath(import.meta.url)));
const rowMaskBytes = Math.ceil(iconSize / 32) * 4;
const pixelBytes = iconSize * iconSize * 4;
const maskBytes = rowMaskBytes * iconSize;
const imageBytes = 40 + pixelBytes + maskBytes;
const icon = Buffer.alloc(22 + imageBytes);

icon.writeUInt16LE(0, 0);
icon.writeUInt16LE(1, 2);
icon.writeUInt16LE(1, 4);
icon.writeUInt8(0, 6);
icon.writeUInt8(0, 7);
icon.writeUInt8(0, 8);
icon.writeUInt8(0, 9);
icon.writeUInt16LE(1, 10);
icon.writeUInt16LE(32, 12);
icon.writeUInt32LE(imageBytes, 14);
icon.writeUInt32LE(22, 18);

icon.writeUInt32LE(40, 22);
icon.writeInt32LE(iconSize, 26);
icon.writeInt32LE(iconSize * 2, 30);
icon.writeUInt16LE(1, 34);
icon.writeUInt16LE(32, 36);
icon.writeUInt32LE(0, 38);
icon.writeUInt32LE(pixelBytes + maskBytes, 42);
icon.writeInt32LE(0, 46);
icon.writeInt32LE(0, 50);
icon.writeUInt32LE(0, 54);
icon.writeUInt32LE(0, 58);

const segments = [
  [18, 14, 46, 22],
  [14, 18, 22, 34],
  [18, 27, 46, 35],
  [42, 30, 50, 46],
  [18, 42, 46, 50],
];

for (let y = 0; y < iconSize; y += 1) {
  for (let x = 0; x < iconSize; x += 1) {
    const unitX = (x + 0.5) / 4;
    const unitY = (y + 0.5) / 4;
    const cornerX = unitX < 16 ? 16 : unitX > 48 ? 48 : null;
    const cornerY = unitY < 16 ? 16 : unitY > 48 ? 48 : null;
    const outsideCorner = cornerX !== null && cornerY !== null
      && (unitX - cornerX) ** 2 + (unitY - cornerY) ** 2 > 16 ** 2;
    const isLogo = segments.some(([left, top, right, bottom]) => unitX >= left && unitX < right && unitY >= top && unitY < bottom);
    const alpha = outsideCorner ? 0 : 255;
    const color = isLogo ? [255, 255, 255] : [19, 136, 115];
    const targetY = iconSize - 1 - y;
    const offset = 62 + (targetY * iconSize + x) * 4;
    icon[offset] = alpha ? color[2] : 0;
    icon[offset + 1] = alpha ? color[1] : 0;
    icon[offset + 2] = alpha ? color[0] : 0;
    icon[offset + 3] = alpha;
  }
}

await writeFile(resolve(root, 'souq.ico'), icon);
console.log(`Created ${resolve(root, 'souq.ico')}`);
