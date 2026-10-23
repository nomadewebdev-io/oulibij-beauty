/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const publicDir = path.join(__dirname, '..', 'public');
  const imagesDir = path.join(publicDir, 'images');

  // 1. Optimize existing hero images (original: ~700KB each)
  const heroFiles = ['hero-1.jpg', 'hero-2.jpg', 'hero-3.jpg', 'hero-4.jpg'];
  for (const file of heroFiles) {
    const filePath = path.join(imagesDir, file);
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      // Optimize to max width 1200, quality 82% mozjpeg
      const optimized = await sharp(buffer)
        .resize({ width: 1000, height: 1200, fit: 'cover', position: 'center' })
        .jpeg({ quality: 82, progressive: true, mozjpeg: true })
        .toBuffer();
      
      const backupPath = path.join(imagesDir, `orig-${file}`);
      if (!fs.existsSync(backupPath)) {
        fs.writeFileSync(backupPath, buffer);
      }
      fs.writeFileSync(filePath, optimized);
      console.log(`Optimized ${file}: ${Math.round(buffer.length/1024)}KB -> ${Math.round(optimized.length/1024)}KB`);
    }
  }

  // 2. Generate 1200x630 OpenGraph Image from hero-1.jpg + dark luxe overlay + text SVG
  const hero1Buffer = fs.readFileSync(path.join(imagesDir, 'hero-1.jpg'));
  const heroResized = await sharp(hero1Buffer)
    .resize(600, 630, { fit: 'cover', position: 'center' })
    .toBuffer();

  const svgOverlay = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#18181b" />
        <stop offset="60%" stop-color="#27272a" />
        <stop offset="100%" stop-color="#4c0519" />
      </linearGradient>
      <linearGradient id="roseGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#fb7185" />
        <stop offset="100%" stop-color="#f43f5e" />
      </linearGradient>
    </defs>
    
    <!-- Background left dark panel -->
    <rect x="0" y="0" width="700" height="630" fill="url(#bgGrad)" />
    
    <!-- Decorative subtle border -->
    <rect x="24" y="24" width="1152" height="582" rx="28" fill="none" stroke="#be123c" stroke-width="2" stroke-opacity="0.3" />
    
    <!-- Tag badge -->
    <rect x="64" y="68" width="370" height="42" rx="21" fill="#be123c" fill-opacity="0.25" stroke="#fb7185" stroke-opacity="0.6" stroke-width="1.5" />
    <text x="82" y="94" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="bold" fill="#fecdd3" letter-spacing="1.5">
      SALON DE COIFFURE FÉMININ • DAKAR
    </text>

    <!-- Brand Name -->
    <text x="64" y="195" font-family="Plus Jakarta Sans, sans-serif" font-size="52" font-weight="900" fill="#ffffff" letter-spacing="-1">
      OULIBIJ BEAUTY
    </text>

    <!-- Tagline / Headline -->
    <text x="64" y="250" font-family="Plus Jakarta Sans, sans-serif" font-size="30" font-weight="700" fill="url(#roseGrad)">
      Haute Coiffure &amp; Soins d'Exception
    </text>

    <!-- Highlights pills -->
    <text x="64" y="325" font-family="Plus Jakarta Sans, sans-serif" font-size="19" font-weight="500" fill="#d4d4d8">
      • Tresses d'art (Knotless Braids) &amp; Nattes collées
    </text>
    <text x="64" y="365" font-family="Plus Jakarta Sans, sans-serif" font-size="19" font-weight="500" fill="#d4d4d8">
      • Soins profonds Botox Capillaire &amp; Kératine
    </text>
    <text x="64" y="405" font-family="Plus Jakarta Sans, sans-serif" font-size="19" font-weight="500" fill="#d4d4d8">
      • Balayages lumineux &amp; Coupes sur-mesure
    </text>

    <!-- Location & WhatsApp footer badge -->
    <g transform="translate(64, 475)">
      <!-- WhatsApp Badge -->
      <rect x="0" y="0" width="310" height="56" rx="28" fill="#059669" />
      <text x="32" y="35" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="800" fill="#ffffff">
        WhatsApp : +221 77 845 12 34
      </text>
      
      <!-- District -->
      <text x="335" y="35" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="600" fill="#a1a1aa">
        Almadies, Dakar
      </text>
    </g>
  </svg>
  `;

  // Composite: Base background, photo on the right with soft fade gradient, and SVG overlay
  const baseCanvas = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 24, g: 24, b: 27, alpha: 1 }
    }
  }).png().toBuffer();

  const ogComposite = await sharp(baseCanvas)
    .composite([
      { input: heroResized, top: 0, left: 600 },
      { input: Buffer.from(svgOverlay), top: 0, left: 0 }
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();

  const ogOutputPathJpg = path.join(imagesDir, 'og-image.jpg');
  const ogOutputPathPng = path.join(imagesDir, 'og-image.png');
  fs.writeFileSync(ogOutputPathJpg, ogComposite);
  
  const ogCompositePng = await sharp(ogComposite).png().toBuffer();
  fs.writeFileSync(ogOutputPathPng, ogCompositePng);
  console.log(`Generated OG Image (1200x630): ${Math.round(ogComposite.length/1024)}KB`);

  // 3. Generate Favicon and Web App Icons
  const iconSvg = `
  <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="iconGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#be123c" />
        <stop offset="100%" stop-color="#881337" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="128" fill="url(#iconGrad)" />
    <!-- Stylized Monogram OB & Sparkle -->
    <path d="M256 96 C256 160 300 204 364 204 C300 204 256 248 256 312 C256 248 212 204 148 204 C212 204 256 160 256 96 Z" fill="#ffffff" />
    <circle cx="360" cy="140" r="28" fill="#fecdd3" />
    <text x="256" y="420" text-anchor="middle" font-family="Plus Jakarta Sans, serif" font-weight="900" font-size="110" fill="#ffffff" letter-spacing="4">
      OB
    </text>
  </svg>
  `;

  const icon512 = await sharp(Buffer.from(iconSvg)).resize(512, 512).png().toBuffer();
  const icon192 = await sharp(Buffer.from(iconSvg)).resize(192, 192).png().toBuffer();
  const icon32 = await sharp(Buffer.from(iconSvg)).resize(32, 32).png().toBuffer();
  const icon16 = await sharp(Buffer.from(iconSvg)).resize(16, 16).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), icon32);
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), icon16);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), icon192);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icon32); // Valid ICO/PNG fallback
  
  // Also put icon.png and icon.svg in src/app for Next.js App Router metadata icon detection
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'icon.png'), icon192);
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'icon.svg'), iconSvg);

  console.log('All icons, favicons, OG image and optimized images successfully created!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
