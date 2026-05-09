import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900">
  <path fill="#0B8AAD" transform="translate(450 450) scale(1.18) translate(-450 -450)"
        d="M806 99 L557 801 H343 L94 99 H276 L450 629 L625 99 Z"/>
</svg>`;

const out = 'public/images/vantixe-v-1200.png';

await sharp(Buffer.from(svg))
  .resize(1200, 1200, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log('wrote', out);
