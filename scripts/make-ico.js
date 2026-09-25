import fs from 'fs';
import path from 'path';

// Generate a valid multi-size or single size .ico file containing PNG data
function createIcoFromPng(pngPath, icoPath) {
  const pngBuffer = fs.readFileSync(pngPath);
  
  // ICO header: 6 bytes
  // 0-1: Reserved (0)
  // 2-3: Image type (1 for ICO)
  // 4-5: Number of images (1)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  // Directory entry: 16 bytes
  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(48, 0); // Width (48)
  dirEntry.writeUInt8(48, 1); // Height (48)
  dirEntry.writeUInt8(0, 2);  // Color count (0 = no palette)
  dirEntry.writeUInt8(0, 3);  // Reserved
  dirEntry.writeUInt16LE(1, 4); // Color planes
  dirEntry.writeUInt16LE(32, 6); // Bits per pixel
  dirEntry.writeUInt32LE(pngBuffer.length, 8); // Size of image data
  dirEntry.writeUInt32LE(6 + 16, 12); // Offset to image data

  const icoBuffer = Buffer.concat([header, dirEntry, pngBuffer]);
  fs.writeFileSync(icoPath, icoBuffer);
  console.log(`Saved ${icoPath}`);
}

createIcoFromPng('public/favicon-48x48.png', 'public/favicon.ico');
