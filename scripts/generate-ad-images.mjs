import sharp from 'sharp';

// Square sources are user-cropped, wide-aspect screenshots without page chrome
const squareSources = [
  { name: 'dashboard', file: 'public/images/ads/dashboard_square.png' },
  { name: 'supplier-clean', file: 'public/images/ads/supplier-clean_Square.png' },
];

// Full-page sources for horizontal/landscape variants
const wideSources = [
  { name: 'ai-copilot', file: 'public/images/demos/tprm/ai-copilot.png' },
  { name: 'batch-screening', file: 'public/images/demos/tprm/batch-screening.png' },
];

function navySvg(w, h) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a1424"/>
        <stop offset="60%" stop-color="#0d1a2e"/>
        <stop offset="100%" stop-color="#0e2a3a"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
  </svg>`);
}

async function compose({ src, outW, outH, padPct, outPath, trim = false }) {
  let buf = src;
  if (trim) {
    const trimmed = await sharp(src)
      .trim({ background: '#ffffff', threshold: 10 })
      .toBuffer();
    buf = trimmed;
  }

  const padX = Math.round(outW * padPct);
  const padY = Math.round(outH * padPct);
  const innerW = outW - padX * 2;
  const innerH = outH - padY * 2;

  const resized = await sharp(buf)
    .resize(innerW, innerH, { fit: 'inside', withoutEnlargement: false })
    .toBuffer({ resolveWithObject: true });

  const x = Math.round((outW - resized.info.width) / 2);
  const y = Math.round((outH - resized.info.height) / 2);

  await sharp(navySvg(outW, outH))
    .composite([{ input: resized.data, left: x, top: y }])
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log('wrote', outPath, `${outW}x${outH}`);
}

// Squares + horizontals from cropped sources (regenerate to keep current set)
for (const s of squareSources) {
  await compose({
    src: s.file,
    outW: 1200, outH: 1200, padPct: 0.04,
    outPath: `public/images/ads/${s.name}-square-1200.png`,
  });
  await compose({
    src: s.file,
    outW: 1200, outH: 628, padPct: 0.03,
    outPath: `public/images/ads/${s.name}-horizontal-1200x628.png`,
  });
  // NEW: vertical 4:5 (960x1200)
  await compose({
    src: s.file,
    outW: 960, outH: 1200, padPct: 0.05,
    outPath: `public/images/ads/${s.name}-vertical-960x1200.png`,
  });
}

// NEW: additional horizontal variants from full-page screenshots
for (const s of wideSources) {
  await compose({
    src: s.file,
    outW: 1200, outH: 628, padPct: 0.04,
    outPath: `public/images/ads/${s.name}-horizontal-1200x628.png`,
    trim: true,
  });
}
