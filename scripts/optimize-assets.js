/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

async function run() {
  const publicDir = path.join(__dirname, '..', 'public')
  const imagesDir = path.join(publicDir, 'images')

  // 1. Générer l'image Open Graph 1200x630 Noir + Or (OuliBij Beauté)
  const hero1Buffer = fs.readFileSync(path.join(imagesDir, 'hero-1.jpg'))
  const heroResized = await sharp(hero1Buffer)
    .resize(540, 630, { fit: 'cover', position: 'center' })
    .toBuffer()

  const svgOverlay = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0c0a09" />
        <stop offset="82%" stop-color="#14120f" />
        <stop offset="100%" stop-color="#14120f" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#f3d578" />
        <stop offset="50%" stop-color="#d4af37" />
        <stop offset="100%" stop-color="#b8860b" />
      </linearGradient>
    </defs>

    <!-- Panneau principal noir velours avec fondu doux sur le visuel à droite -->
    <rect x="0" y="0" width="840" height="630" fill="url(#bgGrad)" />

    <!-- Cadre fin doré -->
    <rect x="24" y="24" width="1152" height="582" rx="26" fill="none" stroke="#d4af37" stroke-width="1.8" stroke-opacity="0.55" />

    <!-- Badge supérieur -->
    <rect x="64" y="64" width="415" height="40" rx="20" fill="#1c1917" stroke="#d4af37" stroke-opacity="0.65" stroke-width="1.4" />
    <text x="86" y="89" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="bold" fill="#f3d578" letter-spacing="1.8">
      MAQUILLAGE • COIFFURE • PARFUMERIE
    </text>

    <!-- Nom du salon -->
    <text x="64" y="182" font-family="Georgia, serif" font-style="italic" font-size="60" font-weight="bold" fill="#ffffff">
      OuliBij Beauté
    </text>

    <!-- Slogan officiel en or chaud -->
    <text x="64" y="236" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="bold" fill="url(#goldGrad)">
      Prenez en main la beauté de votre regard
    </text>

    <!-- Ligne séparatrice dorée -->
    <line x1="64" y1="266" x2="220" y2="266" stroke="#d4af37" stroke-width="2" stroke-opacity="0.7" />

    <!-- Spécialités réelles -->
    <text x="64" y="315" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold" fill="#f5f5f4">
      Maquillage : Cérémonie, Simple &amp; Contouring
    </text>
    <text x="64" y="355" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold" fill="#f5f5f4">
      Coiffure : Tissage, Tresse, Pose Lace, Stream Pod, Soins
    </text>
    <text x="64" y="395" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold" fill="#f5f5f4">
      Boutique : Cosmétiques, Parfumerie &amp; Accessoires
    </text>

    <!-- Adresse & Horaires -->
    <text x="64" y="452" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#d6d3d1">
      Cité Sonatel 2, en face UNO des 2 Voies — Liberté 6, Dakar (Lun–Dim : 9h–21h)
    </text>

    <!-- Bouton WhatsApp & Appel -->
    <g transform="translate(64, 484)">
      <rect x="0" y="0" width="335" height="54" rx="27" fill="#059669" />
      <text x="28" y="34" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="bold" fill="#ffffff">
        Tél &amp; WhatsApp : 77 619 58 50
      </text>
    </g>
  </svg>
  `

  const baseCanvas = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 12, g: 10, b: 9, alpha: 1 },
    },
  })
    .png()
    .toBuffer()

  const ogComposite = await sharp(baseCanvas)
    .composite([
      { input: heroResized, top: 0, left: 660 },
      { input: Buffer.from(svgOverlay), top: 0, left: 0 },
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer()

  const ogOutputPathJpg = path.join(imagesDir, 'og-image.jpg')
  const ogOutputPathPng = path.join(imagesDir, 'og-image.png')
  const ogPublicRootPath = path.join(publicDir, 'og-image.jpg')

  fs.writeFileSync(ogOutputPathJpg, ogComposite)
  fs.writeFileSync(ogPublicRootPath, ogComposite)

  const ogCompositePng = await sharp(ogComposite).png().toBuffer()
  fs.writeFileSync(ogOutputPathPng, ogCompositePng)
  console.log(`Generated OG Image (1200x630): ${Math.round(ogComposite.length / 1024)}KB`)

  // 2. Générer le Logo/Favicon Noir + Or (OuliBij Beauté)
  const iconSvg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldRing" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f3d578" />
      <stop offset="50%" stop-color="#d4af37" />
      <stop offset="100%" stop-color="#9a6f08" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="120" fill="#0f0e0c" />
  <rect x="22" y="22" width="468" height="468" rx="102" fill="none" stroke="url(#goldRing)" stroke-width="12" />
  <path d="M112 204 C156 136 205 104 256 104 C307 104 356 136 400 204 C356 272 307 304 256 304 C205 304 156 272 112 204 Z" fill="none" stroke="url(#goldRing)" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="256" cy="204" r="46" fill="none" stroke="url(#goldRing)" stroke-width="16" />
  <circle cx="256" cy="204" r="16" fill="#f3d578" />
  <text x="256" y="424" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-weight="bold" font-size="112" fill="url(#goldRing)" letter-spacing="4">OB</text>
</svg>`

  const icon512 = await sharp(Buffer.from(iconSvg)).resize(512, 512).png().toBuffer()
  const icon192 = await sharp(Buffer.from(iconSvg)).resize(192, 192).png().toBuffer()
  const icon32 = await sharp(Buffer.from(iconSvg)).resize(32, 32).png().toBuffer()
  const icon16 = await sharp(Buffer.from(iconSvg)).resize(16, 16).png().toBuffer()

  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512)
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192)
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), icon32)
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), icon16)
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), icon192)
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icon32)

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'icon.png'), icon192)
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'icon.svg'), iconSvg)
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'favicon.ico'), icon32)

  console.log('OuliBij Beauté Noir + Or OG image and icons generated successfully.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
